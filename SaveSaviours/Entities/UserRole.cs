namespace SaveSaviours.Entities {
    using System;
    using Data;

    internal class UserRole {
        public Guid UserId { get; set; }
        public Role Role { get; set; } = null!;

        public User User { get; set; } = null!;
    }
}
