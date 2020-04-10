namespace SaveSaviours.Controllers {
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Entities;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;
    using Models;

    [ApiController]
    [Route("api/volunteer")]
    [Authorize(Roles = Role.Names.VOLUNTEER)]
    public class VolunteerController : ApiController {
        public VolunteerController(
            IOptions<AppSettings> options,
            SaveSavioursContext context,
            UserManager<User> userManager)
            : base(options, context, userManager) { }


        [HttpPost, Route("register"), AllowAnonymous]
        public async Task<ActionResult> PostRegistration(RegisterVolunteerModel model) {
            int code = Int32.Parse(model.ZipCode);
            if (!Context.Zip.Any(z => z.Code == code)) {
                ModelState.AddModelError(nameof(model.ZipCode), "error.not-found");
                return BadRequest(ModelState);
            }

            string password = model.Password ?? GeneratePassword();
            var (user, result) = await CreateUserAsync(model.Email, password, Role.Volunteer);
            if (!result.Succeeded || user == null)
                return BadRequest(result.Errors.Select(e => new { e.Code, e.Description }));

            var tags = await Context.Tags.ToDictionaryAsync(t => t.Label, t => t.Value);
            var experiences = new List<VolunteerTag>();
            foreach (string label in model.Experiences) {
                if (tags.TryGetValue(label, out int value)) {
                    experiences.Add(new VolunteerTag { VolunteerId = user.Id, TagValue = value });
                } else {
                    var tag = Context.Tags.Add(new Tag { Label = label });
                    experiences.Add(new VolunteerTag { VolunteerId = user.Id, Tag = tag.Entity });
                }
            }

            user.Volunteer = new Volunteer {
                User = user,
                Bio = model.Bio,
                Name = model.Name,
                Experiences = experiences,
                PrimaryPhoneNumber = model.PrimaryPhoneNumber,
                SecondaryPhoneNumber = model.SecondaryPhoneNumber,
                ZipCode = code,
                IsActive = true,
            };

            await Context.SaveChangesAsync();

            string token = Settings.GenerateToken(user);
            // better enforce pasword and send email with token for validation
            return Ok(model.Password == null ? password : token);
        }


        [HttpGet, Route("tags")]
        public async Task<ActionResult<IEnumerable<string>>> GetTags() =>
            Ok(await Context.Tags.Select(t => t.Label).ToArrayAsync());


        [HttpPost, Route("update")]
        public async Task<ActionResult<UserModel>> PostUpdate(VolunteerProfileModel model) {
            var user = await GetUserAsync();
            user!.Volunteer!.Bio = model.Bio;
            user!.Volunteer!.Name = model.Name;
            user!.Volunteer!.PrimaryPhoneNumber = model.PrimaryPhoneNumber;
            user!.Volunteer!.SecondaryPhoneNumber = model.SecondaryPhoneNumber;
            user!.Volunteer!.ZipCode = Int32.Parse(model.ZipCode);
            user!.Volunteer!.IsActive = model.IsActive;

            user!.Volunteer.Experiences.Clear();
            var tags = await Context.Tags.ToDictionaryAsync(t => t.Label, t => t.Value);
            foreach (string label in model.Experiences) {
                if (tags.TryGetValue(label, out int value)) {
                    user!.Volunteer!.Experiences.Add(new VolunteerTag { VolunteerId = user.Id, TagValue = value });
                } else {
                    var tag = Context.Tags.Add(new Tag { Label = label });
                    user!.Volunteer!.Experiences.Add(new VolunteerTag { VolunteerId = user.Id, Tag = tag.Entity });
                }
            }

            await Context.SaveChangesAsync();

            return Ok();
        }

    }
}
