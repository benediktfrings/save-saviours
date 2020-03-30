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
            int[] values = tags
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(Int32.Parse)
                .ToArray();
            var volunteers = await Context.Volunteers
                .Include(v => v.Experiences)
                .Where(v => v.Experiences.Any(e => values.Contains(e.TagValue)))
                .ToArrayAsync();
            return Ok(volunteers.Select(volunteer => new VolunteerModel {
                Id = volunteer.UserId,
                Bio = volunteer.Bio,
                Tags = volunteer.Experiences.Select(e => e.TagValue),
            }));
        }


        [HttpGet, Route("detail/{id:guid}")]
        public async Task<ActionResult<VolunteerDetailsModel>> GetVolunteerDetail(Guid id) {
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
                ZipCode = volunteer.ZipCode,
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
                ZipCode = model.ZipCode,
            };

            await Context.SaveChangesAsync();

            string token = Settings.GenerateToken(user, 2);
            string parameters = $"access-token={token}";
            //await _messenger.SendAsync(user, "workshop.register", new {
            //    user.Participant.FirstName,
            //    user.Participant.LastName,
            //    model.Birthday,
            //    ContactType = user.Participant.ContactType == ContactType.Email ? "E-Mail" : "Handynummer",
            //    model.Contact,
            //    user.Participant.ZipCode,
            //    AcceptLink = Link($"{_settings.Pages.AcceptValidation}?{parameters}"),
            //});

            return Ok(token);
        }

    }
}
