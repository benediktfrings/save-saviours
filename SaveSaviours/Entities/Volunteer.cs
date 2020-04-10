namespace SaveSaviours.Entities {
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Volunteer : UserExtension {

        [Required]
        public string Name { get; set; } = String.Empty;

        [Required]
        public string PrimaryPhoneNumber { get; set; } = String.Empty;

        public string? SecondaryPhoneNumber { get; set; }

        [Required, RegularExpression(@"\d{5}")]
        public int ZipCode { get; set; }

        [Required]
        public string Bio { get; set; } = String.Empty;

        public bool IsActive { get; set; }


        public Zip Zip { get; set; } = null!;

        public ICollection<VolunteerTag> Experiences { get; set; } = null!;

        public ICollection<VolunteerLink> LinkedInstitutions { get; set; } = null!;

    }
}
