namespace SaveSaviours.Controllers {
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Data;
    using Entities;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using Models;

    [ApiController]
    [Route("api/user")]
    //[Authorize]
    public class UserController : ApiController {
        private readonly SignInManager<User> _signInManager;

        public UserController(
            IOptions<AppSettings> options,
            SaveSavioursContext context,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
            : base(options, context, userManager) {
            _signInManager = signInManager;
        }


        [HttpPost, Route("authenticate"), AllowAnonymous]
        public async Task<ActionResult<string>> Token([Required]CredentialsModel model) {
            var user = await UserManager.FindByNameAsync(model.Username);

            var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, true);
            if (!result.Succeeded) {
                return StatusCode(401, new { msg = "auth.error.user-or-pass-mismatch" });
            } else if (result.IsLockedOut) {
                return StatusCode(401, new { msg = "auth.error.locked-out", args = new[] { user.LockoutUntil } });
            } else if (result.RequiresTwoFactor || result.IsNotAllowed) {
                return StatusCode(500, $"wrongly configured signin; result is {result}");
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor {
                SigningCredentials = new SigningCredentials(Settings.GetKey(), SecurityAlgorithms.HmacSha256Signature),
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.Name, user.Email),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(90),
            });

            return Ok(tokenHandler.WriteToken(token));
        }


        [HttpGet, Route("info")]
        public async Task<ActionResult<UserModel>> ActionGetInfo() =>
            Ok(UserModel.FromUser((await GetUserAsync())!));


        [HttpPost, Route("forgot-password"), AllowAnonymous]
        public async Task<ActionResult> ActionPostForgotPassword([FromBody]string email) {
            return Ok();
        }


        [HttpPost, Route("change-password")]
        public async Task<ActionResult> ActionPostChangePassword() {
            return Ok();
        }

        [HttpPost, Route("remove-profile")]
        public async Task<ActionResult> PostRemove() {
            return Ok();
        }

    }
}