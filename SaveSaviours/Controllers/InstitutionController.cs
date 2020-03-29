namespace SaveSaviours.Controllers {
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Data;
    using Entities;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
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
            return Ok(new TagModel[] {
                new TagModel(1, "Führerschein"),
            });
        }

        [HttpGet, Route("volunteers")]
        public async Task<ActionResult<IEnumerable<VolunteerModel>>> GetVolunteers() {
            return Ok(Enumerable.Empty<VolunteerModel>());
        }

        [HttpPost, Route("register")]
        public async Task<ActionResult> PostRegistration(RegisterInstitutionModel model) {
            return Ok();
        }

    }
}
