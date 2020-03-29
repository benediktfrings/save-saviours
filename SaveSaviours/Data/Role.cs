namespace SaveSaviours.Data {
    using System.Collections.Generic;
    using System.Linq;

    public class Role {
        public string Id { get; }
        private Role(string id) => Id = id;
        public override string ToString() => Id;

        public static implicit operator string(Role role) => role.Id;

        public static Role Administrator = new Role(Names.ADMINISTRATOR);
        public static Role Volunteer = new Role(Names.VOLUNTEER);
        public static Role Institution = new Role(Names.INSTITUTION);

        public static IEnumerable<Role> All {
            get {
                yield return Administrator;
                yield return Volunteer;
                yield return Institution;
            }
        }

        public static class Names { // use kebab-case for names
            public const string ADMINISTRATOR = nameof(ADMINISTRATOR);
            public const string VOLUNTEER = nameof(VOLUNTEER);
            public const string INSTITUTION = nameof(INSTITUTION);
        }

        public static Role? Find(string name) =>
            All.SingleOrDefault(r => r.Id == name.ToUpperInvariant());

        public static Role Get(string name) =>
            All.Single(r => r.Id == name.ToUpperInvariant());

    }
}
