namespace SaveSaviours.Entities {
    using System;

    public abstract class UserExtension {
        public Guid UserId { get; internal set; }
        public User User { get; internal set; } = null!;

    }
}
