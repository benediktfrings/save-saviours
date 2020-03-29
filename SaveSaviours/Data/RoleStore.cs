namespace SaveSaviours.Data {
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Identity;

    internal sealed class RoleStore : IRoleStore<Role> {

        public Task<Role> FindByIdAsync(string roleId, CancellationToken cancellationToken) =>
            Task.FromResult(Role.Get(roleId));

        Task<Role> IRoleStore<Role>.FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken) =>
            Task.FromResult(Role.Get(normalizedRoleName));

        Task<string> IRoleStore<Role>.GetNormalizedRoleNameAsync(Role role, CancellationToken cancellationToken) =>
            Task.FromResult(role.Id);

        Task<string> IRoleStore<Role>.GetRoleIdAsync(Role role, CancellationToken cancellationToken) =>
            Task.FromResult(role.Id);

        Task<string> IRoleStore<Role>.GetRoleNameAsync(Role role, CancellationToken cancellationToken) =>
            Task.FromResult(role.Id);

        // no role editing
        Task<IdentityResult> IRoleStore<Role>.CreateAsync(Role role, CancellationToken cancellationToken) =>
            throw new NotSupportedException();
        Task<IdentityResult> IRoleStore<Role>.DeleteAsync(Role role, CancellationToken cancellationToken) =>
            throw new NotSupportedException();
        Task IRoleStore<Role>.SetNormalizedRoleNameAsync(Role role, string normalizedName, CancellationToken cancellationToken) =>
            throw new NotSupportedException();
        Task IRoleStore<Role>.SetRoleNameAsync(Role role, string roleName, CancellationToken cancellationToken) =>
            throw new NotSupportedException();
        Task<IdentityResult> IRoleStore<Role>.UpdateAsync(Role role, CancellationToken cancellationToken) =>
            throw new NotSupportedException();

        void IDisposable.Dispose() { }

    }
}
