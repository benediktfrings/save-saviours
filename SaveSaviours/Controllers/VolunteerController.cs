namespace SaveSaviours.Controllers {
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Data;
    using Entities;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Models;

    [ApiController]
    [Route("api/volunteer")]
    //[Authorize(Roles = Role.Names.VOLUNTEER)]
    public class VolunteerController : ApiController {
        public VolunteerController(
            IOptions<AppSettings> options,
            SaveSavioursContext context,
            UserManager<User> userManager)
            : base(options, context, userManager) { }

        [HttpPost, Route("register"), AllowAnonymous]
        public async Task<ActionResult> PostRegistration(RegisterVolunteerModel model) {
            return Ok();
        }

        [HttpGet, Route("tags")]
        public async Task<ActionResult<IEnumerable<string>>> GetTags() {
            return Ok(new string[] { "Führerschein" });
        }

        [HttpPost, Route("update")]
        public async Task<ActionResult<UserModel>> PostUpdate(UserModel model) {
            return Ok();
        }

    }
}
