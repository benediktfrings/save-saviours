namespace SaveSaviours.Controllers {
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Threading.Tasks;
    using Data;
    using Entities;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
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
        public async Task<ActionResult<InstitutionModel>> ActionGetPending() =>
            Ok();

        [HttpPost, Route("verify")]
        public async Task<ActionResult> ActionPostAccept([Required, FromBody]Guid id) =>
            Ok();

        [HttpPost, Route("reject")]
        public async Task<ActionResult> ActionPostReject([Required, FromBody]Guid id) =>
            Ok();

    }
}
