namespace SaveSaviours.Controllers {
    using System;
    using System.Text;
    using System.Threading.Tasks;
    using Data;
    using Entities;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using SaveSaviours.Models;

    public abstract class ApiController : ControllerBase {
        protected AppSettings Settings { get; }
        protected SaveSavioursContext Context { get; }
        protected UserManager<User> UserManager { get; }

        protected ApiController(
            IOptions<AppSettings> options,
            SaveSavioursContext context,
            UserManager<User> userManager) {
            Settings = options.Value;
            Context = context;
            UserManager = userManager;
            _guid = new Lazy<Guid>(() => User.Identity.Name.ToGuid());
        }

        private readonly Lazy<Guid> _guid;
        protected Guid UserId => _guid.Value;
        protected Task<User?> GetUserAsync() => UserManager.FindByIdAsync(User.Identity.Name)!;

        protected async Task<(User? user, IdentityResult result)>
            CreateUserAsync(string email, string password, Role role) {
            var id = Guid.NewGuid();
            var user = new User(id, email.Trim()) {
                RegistrationDate = DateTime.UtcNow,
            };

            var result = await UserManager.CreateAsync(user, password);
            if (!result.Succeeded) return (null, result);
            result = await UserManager.AddToRoleAsync(user, role.Id);
            return (user, result);
        }


        protected static string GeneratePassword() {
            const string VALID_CHARS = "abcdefghikmnopqrstuvwxyzABCDEFGHJKLMOPQRSTUVWXYZ1234567890";
            const int LENGTH = 12;

            var rd = new Random();
            var sb = new StringBuilder();
            for (int i = 0; i < LENGTH; i++) {
                if (i > 0 && i % 4 == 0) sb.Append('-');
                sb.Append(VALID_CHARS[rd.Next(VALID_CHARS.Length)]);
            }
            return sb.ToString();
        }

    }
}
