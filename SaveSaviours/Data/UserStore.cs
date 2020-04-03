namespace SaveSaviours.Data {
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using Entities;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;

    internal sealed class UserStore
        : IUserStore<User>
        , IUserPasswordStore<User>
        , IUserLockoutStore<User>
        , IUserRoleStore<User> {
        private SaveSavioursContext Context { get; }

        public UserStore(SaveSavioursContext context) =>
            Context = context;


        #region IUserStore<User>

        async Task<IdentityResult> IUserStore<User>.CreateAsync(User user, CancellationToken cancellationToken) {
            Context.Users.Add(user);
            await Context.SaveChangesAsync(cancellationToken);
            return IdentityResult.Success;
        }

        async Task<IdentityResult> IUserStore<User>.DeleteAsync(User user, CancellationToken cancellationToken) {
            var deleted = Context.Users.Remove(user);
            if (deleted == null)
                return IdentityResult.Failed(new IdentityError { Code = "not-found" });
            await Context.SaveChangesAsync(cancellationToken);
            return IdentityResult.Success;
        }

        async Task<User> IUserStore<User>.FindByIdAsync(string userId, CancellationToken cancellationToken) {
            var id = Guid.Parse(userId);
            return await Context.Users
                .Include(u => u.UserRoles)
                .Include(u => u.Volunteer).ThenInclude(v => v!.Zip)
                .Include(u => u.Volunteer).ThenInclude(v => v!.LinkedInstitutions).ThenInclude(i => i.Institution)
                .Include(u => u.Volunteer).ThenInclude(v => v!.Experiences).ThenInclude(e => e.Tag)
                .Include(u => u.Institution).ThenInclude(i => i!.Zip)
                .SingleOrDefaultAsync(u => u.Id == id, cancellationToken);
        }

        async Task<User> IUserStore<User>.FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken) {
            var user = await Context.Users
                .Include(u => u.UserRoles)
                .Include(u => u.Volunteer).ThenInclude(v => v!.Zip)
                .Include(u => u.Volunteer).ThenInclude(v => v!.LinkedInstitutions).ThenInclude(i => i.Institution)
                .Include(u => u.Volunteer).ThenInclude(v => v!.Experiences).ThenInclude(e => e.Tag)
                .Include(u => u.Institution).ThenInclude(i => i!.Zip)
                .SingleOrDefaultAsync(u => u.Email == normalizedUserName, cancellationToken);
            return user!;
        }

        Task<string> IUserStore<User>.GetNormalizedUserNameAsync(User user, CancellationToken cancellationToken) =>
            Task.FromResult(user.Email.ToUpperInvariant());

        Task<string> IUserStore<User>.GetUserIdAsync(User user, CancellationToken cancellationToken) =>
            Task.FromResult(user.Id.ToString());

        Task<string> IUserStore<User>.GetUserNameAsync(User user, CancellationToken cancellationToken) =>
            Task.FromResult(user.Email);

        Task IUserStore<User>.SetNormalizedUserNameAsync(User user, string normalizedName, CancellationToken cancellationToken) =>
            Context.SaveChangesAsync(cancellationToken);

        async Task IUserStore<User>.SetUserNameAsync(User user, string userName, CancellationToken cancellationToken) {
            user.Email = userName;
            await Context.SaveChangesAsync(cancellationToken);
        }

        async Task<IdentityResult> IUserStore<User>.UpdateAsync(User user, CancellationToken cancellationToken) {
            await Context.SaveChangesAsync(cancellationToken);
            return IdentityResult.Success;
        }

        #endregion IUserStore<User>


        #region IUserPasswordStore<User>

        Task<string> IUserPasswordStore<User>.GetPasswordHashAsync(User user, CancellationToken cancellationToken) =>
            Task.FromResult(user.PasswordHash);

        Task<bool> IUserPasswordStore<User>.HasPasswordAsync(User user, CancellationToken cancellationToken) =>
            Task.FromResult(true);

        async Task IUserPasswordStore<User>.SetPasswordHashAsync(User user, string passwordHash, CancellationToken cancellationToken) {
            user.PasswordHash = passwordHash;
            await Context.SaveChangesAsync(cancellationToken);
        }

        #endregion IUserPasswordStore<User>


        #region IUserLockoutStore<User>

        Task<int> IUserLockoutStore<User>.GetAccessFailedCountAsync(User user, CancellationToken cancellationToken) {
            return Task.FromResult(user.AccessFailedCount);
        }

        Task<bool> IUserLockoutStore<User>.GetLockoutEnabledAsync(User user, CancellationToken cancellationToken) {
            bool enabled = DateTimeOffset.UtcNow < user.LockoutUntil;
            return Task.FromResult(enabled);
        }

        Task<DateTimeOffset?> IUserLockoutStore<User>.GetLockoutEndDateAsync(User user, CancellationToken cancellationToken) {
            return Task.FromResult(user.LockoutUntil);
        }

        async Task<int> IUserLockoutStore<User>.IncrementAccessFailedCountAsync(User user, CancellationToken cancellationToken) {
            int count = user.AccessFailedCount++;
            await Context.SaveChangesAsync(cancellationToken);
            return count;
        }

        async Task IUserLockoutStore<User>.ResetAccessFailedCountAsync(User user, CancellationToken cancellationToken) {
            user.AccessFailedCount = 0;
            await Context.SaveChangesAsync(cancellationToken);
        }

        async Task IUserLockoutStore<User>.SetLockoutEnabledAsync(User user, bool enabled, CancellationToken cancellationToken) {
            user.LockoutUntil = enabled ? DateTime.MaxValue : (DateTime?)null;
            await Context.SaveChangesAsync(cancellationToken);
        }

        async Task IUserLockoutStore<User>.SetLockoutEndDateAsync(User user, DateTimeOffset? lockoutEnd, CancellationToken cancellationToken) {
            user.LockoutUntil = lockoutEnd;
            await Context.SaveChangesAsync(cancellationToken);
        }

        #endregion IUserLockoutStore<User>


        #region IUserRoleStore<User>

        async Task IUserRoleStore<User>.AddToRoleAsync(User user, string roleName, CancellationToken cancellationToken) {
            var role = Role.Find(roleName);
            if (role == null)
                throw new ArgumentException($"role '{roleName}' not found", nameof(roleName));

            if (user.UserRoles.Any(r => r.Role.Id == roleName)) {
                return;
            }

            user.UserRoles.Add(new UserRole { User = user, UserId = user.Id, Role = role });
            await Context.SaveChangesAsync(cancellationToken);
        }

        Task<IList<string>> IUserRoleStore<User>.GetRolesAsync(User user, CancellationToken cancellationToken) {
            IList<string> roles = user.Roles.Select(r => r.Id).ToList();
            return Task.FromResult(roles);
        }

        async Task<IList<User>> IUserRoleStore<User>.GetUsersInRoleAsync(string roleName, CancellationToken cancellationToken) {
            IList<User> users = await Context.Users
                .Include(u => u.UserRoles)
                .Include(u => u.Volunteer).ThenInclude(v => v!.Zip)
                .Include(u => u.Volunteer).ThenInclude(v => v!.LinkedInstitutions).ThenInclude(i => i.Institution)
                .Include(u => u.Volunteer).ThenInclude(v => v!.Experiences).ThenInclude(e => e.Tag)
                .Include(u => u.Institution).ThenInclude(i => i!.Zip)
                .Where(u => u.Roles.Any(r => r.Id == roleName)).ToListAsync(cancellationToken);
            return users;
        }

        Task<bool> IUserRoleStore<User>.IsInRoleAsync(User user, string roleName, CancellationToken cancellationToken) {
            bool isInRole = user.Roles.Any(r => r.Id == roleName);
            return Task.FromResult(isInRole);
        }

        async Task IUserRoleStore<User>.RemoveFromRoleAsync(User user, string roleName, CancellationToken cancellationToken) {
            var link = user.UserRoles.SingleOrDefault(r => r.Role.Id == roleName);
            if (link == null) {
                return;
            }

            user.UserRoles.Remove(link);
            await Context.SaveChangesAsync(cancellationToken);
        }

        #endregion IUserRoleStore<User>


        void IDisposable.Dispose() =>
            Context.Dispose();

    }
}
