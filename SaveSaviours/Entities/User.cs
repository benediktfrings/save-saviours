namespace SaveSaviours.Entities {
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using Data;

    public class User {
        public Guid Id { get; internal set; }

        public User(Guid id, string email) {
            Id = id;
            Email = email;
        }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; } = null!;

        public int AccessFailedCount { get; set; }
        public DateTimeOffset? LockoutUntil { get; set; }
        public bool IsLockedOut => DateTimeOffset.UtcNow < LockoutUntil;

        internal ICollection<UserRole> UserRoles { get; } = new List<UserRole>();
        public IEnumerable<Role> Roles => UserRoles.Select(r => r.Role);

    }
}
