namespace SaveSaviours.Entities {
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Volunteer : UserExtension {
        [Required]
        public string Name { get; set; } = String.Empty;
        [Required]
        public string ZipCode { get; set; } = String.Empty;
        [Required]
        public string PrimaryPhoneNumber { get; set; } = String.Empty;
        public string? SecondaryPhoneNumber { get; set; }
        public string Bio { get; set; } = String.Empty;
        public bool IsActive { get; set; }

        public ICollection<VolunteerTag> Experiences { get; set; } = null!;
        public ICollection<VolunteerLink> LinkedInstitutions { get; set; } = null!;
    }
}
