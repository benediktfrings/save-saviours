namespace SaveSaviours.Entities {
    using System;

    public abstract class UserExtension {
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
