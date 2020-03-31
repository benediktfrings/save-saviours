namespace SaveSaviours.Entities {
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Institution : UserExtension {

        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public string ContactName { get; set; } = String.Empty;

        [Required]
        public string PrimaryPhoneNumber { get; set; } = String.Empty;

        public string? SecondaryPhoneNumber { get; set; }

        [Required]
        public int ZipCode { get; set; }

        public bool Vetted { get; set; }


        public ICollection<VolunteerLink> LinkedVolunteers { get; set; } = null!;

    }
}
