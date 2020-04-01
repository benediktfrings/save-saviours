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
    using SaveSaviours.Models;

    [ApiController]
    [Route("api/institution")]
    [Authorize(Roles = Role.Names.INSTITUTION)]
    public class InstitutionController : ApiController {
        public InstitutionController(
            IOptions<AppSettings> options,
            SaveSavioursContext context,
            UserManager<User> userManager)
            : base(options, context, userManager) { }


        [HttpGet, Route("tags")]
        public async Task<ActionResult<IEnumerable<TagModel>>> GetTags() {
            var tags = await Context.Tags.ToArrayAsync();
            return Ok(tags.Select(t => new TagModel(t.Value, t.Label)));
        }


        [HttpGet, Route("volunteers/{tags}")]
        public async Task<ActionResult<IEnumerable<VolunteerModel>>> GetVolunteers(string tags) {
            var user = await GetUserAsync();
            if (!user!.Institution!.Vetted) return Unauthorized("error.not-vetted");
            int zip = user.Institution.ZipCode;
            int[] values = tags
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(Int32.Parse)
                .ToArray();
            var result = await Context.Volunteers
                .Include(v => v.Experiences)
                .Join(Context.ZipCodesInDistance(zip), v => v.ZipCode, z => z.Code, (v, z) => new { v, z })
                .Where(x => x.v.IsActive && x.v.Experiences.Any(e => values.Contains(e.TagValue)))
                .OrderBy(x => x.z.Distance)
                .ToArrayAsync();
            return Ok(result.Select(x => new VolunteerModel {
                Id = x.v.UserId,
                Bio = x.v.Bio,
                Distance = x.z.Distance,
                Tags = x.v.Experiences.Select(e => e.TagValue),
            }));
        }


        [HttpGet, Route("detail/{id:guid}")]
        public async Task<ActionResult<VolunteerDetailsModel>> GetVolunteerDetail(Guid id) {
            var user = await GetUserAsync();
            if (!user!.Institution!.Vetted) return Unauthorized("error.not-vetted");

            var volunteer = await Context.Volunteers
                .Include(v => v.LinkedInstitutions)
                .Include(v => v.Experiences)
                .Include(v => v.User)
                .SingleOrDefaultAsync(v => v.UserId == id);
            if (!volunteer.LinkedInstitutions.Any(i => i.VolunteerId == UserId)) {
                volunteer.LinkedInstitutions.Add(new VolunteerLink {
                    Volunteer = volunteer,
                    InstitutionId = UserId,
                });
                await Context.SaveChangesAsync();
            }
            return Ok(new VolunteerDetailsModel {
                Id = volunteer.UserId,
                Bio = volunteer.Bio,
                Tags = volunteer.Experiences.Select(e => e.TagValue),
                Name = volunteer.Name,
                Email = volunteer.User.Email,
                PrimaryPhoneNumber = volunteer.PrimaryPhoneNumber,
                SecondaryPhoneNumber = volunteer.SecondaryPhoneNumber,
                ZipCode = volunteer.ZipCode.ToString("00000"),
            });
        }

        [HttpPost, Route("register"), AllowAnonymous]
        public async Task<ActionResult> PostRegistration(RegisterInstitutionModel model) {
            string password = model.Password ?? GeneratePassword();
            var (user, result) = await CreateUserAsync(model.Email, password, Role.Institution);
            if (!result.Succeeded) return BadRequest(result.Errors.Select(e => new { e.Code, e.Description }));

            user!.Institution = new Institution {
                User = user,
                Name = model.Name,
                ContactName = model.ContactName,
                PrimaryPhoneNumber = model.PrimaryPhoneNumber,
                SecondaryPhoneNumber = model.SecondaryPhoneNumber,
                ZipCode = Int32.Parse(model.ZipCode),
            };

            await Context.SaveChangesAsync();

            string token = Settings.GenerateToken(user);

            //string parameters = $"access-token={token}";
            //await _messenger.SendAsync(user, "workshop.register", new {
            //    user.Participant.FirstName,
            //    user.Participant.LastName,
            //    model.Birthday,
            //    ContactType = user.Participant.ContactType == ContactType.Email ? "E-Mail" : "Handynummer",
            //    model.Contact,
            //    user.Participant.ZipCode,
            //    AcceptLink = Link($"{_settings.Pages.AcceptValidation}?{parameters}"),
            //});

            // better enforce pasword and send email with token for validation
            return Ok(model.Password == null ? password : token);
        }


        [HttpPost, Route("update")]
        public async Task<ActionResult<UserModel>> PostUpdate(InstitutionProfileModel model) {
            var user = await GetUserAsync();
            user!.Institution!.Name = model.Name;
            user!.Institution!.ContactName = model.ContactName;
            user!.Institution!.PrimaryPhoneNumber = model.PrimaryPhoneNumber;
            user!.Institution!.SecondaryPhoneNumber = model.SecondaryPhoneNumber;
            user!.Institution!.ZipCode = Int32.Parse(model.ZipCode);

            await Context.SaveChangesAsync();
            return Ok();
        }

    }
}
