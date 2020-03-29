namespace SaveSaviours {
    using System;
    using System.Collections.Generic;
    using SaveSaviours.Models;

    public class VolunteerProfileModel {
        public string Name { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string ZipCode { get; set; } = String.Empty;
        public string PrimaryPhoneNumber { get; set; } = String.Empty;
        public string? SecondaryPhoneNumber { get; set; }
        public bool IsActive { get; set; }
        public string Bio { get; set; } = String.Empty;
        public string[] Tags { get; set; } = new string[0];
        public IEnumerable<InstitutionModel> Institutions { get; set; }
    }

}
