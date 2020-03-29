namespace SaveSaviours.Controllers {
    using System;
    using System.Threading.Tasks;
    using Data;
    using Entities;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;

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
        }

        protected Guid UserId => User.Identity.Name.ToGuid();
        protected Task<User?> GetUserAsync() => UserManager.FindByIdAsync(User.Identity.Name)!;
    }
}
