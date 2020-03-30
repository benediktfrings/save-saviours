namespace SaveSaviours.Entities {
    using System;
    using System.Collections.Generic;

    public class Institution : UserExtension {
        public string Name { get; set; } = String.Empty;
        public string ContactName { get; set; } = String.Empty;
        public string ZipCode { get; set; } = String.Empty;
        public string PrimaryPhoneNumber { get; set; } = String.Empty;
        public string? SecondaryPhoneNumber { get; set; }
        public bool Vetted { get; set; }

        public ICollection<VolunteerLink> LinkedVolunteers { get; set; } = null!;
    }
}
