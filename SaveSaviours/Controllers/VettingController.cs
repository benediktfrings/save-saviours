namespace SaveSaviours.Controllers {
    using System;
    using System.ComponentModel.DataAnnotations;
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
    [Route("api/vetting")]
    [Authorize(Roles = Role.Names.ADMINISTRATOR)]
    public class VettingController : ApiController {
        public VettingController(
            IOptions<AppSettings> options,
            SaveSavioursContext context,
            UserManager<User> userManager)
            : base(options, context, userManager) { }


        [HttpGet]
        public async Task<ActionResult<InstitutionDetailsMdoel[]>> ActionGetPending() {
            var pending = await Context.Institutions
                .Include(i => i.User)
                .Where(i => !i.Vetted)
                .ToArrayAsync();
            return Ok(pending.Select(i => new InstitutionDetailsMdoel {
                Id = i.UserId,
                Name = i.Name,
                ContactName = i.ContactName,
                Email = i.User.Email,
                PrimaryPhoneNumber = i.PrimaryPhoneNumber,
                SecondaryPhoneNumber = i.SecondaryPhoneNumber,
                ZipCode = i.ZipCode.ToString("00000"),
            }));
        }


        [HttpPost, Route("verify")]
        public async Task<ActionResult> ActionPostAccept([Required, FromBody]Guid id) {
            var institution = await Context.Institutions.SingleAsync(i => i.UserId == id);
            institution.Vetted = true;
            await Context.SaveChangesAsync();
            return Ok();
        }


        [HttpPost, Route("reject")]
        public async Task<ActionResult> ActionPostReject([Required, FromBody]Guid id) {
            var institution = await Context.Institutions.SingleAsync(i => i.UserId == id);
            Context.Institutions.Remove(institution);
            await Context.SaveChangesAsync();
            return Ok();
        }
    }
}
