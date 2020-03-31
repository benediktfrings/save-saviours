namespace SaveSaviours.Models {
    using System;
    using System.Collections.Generic;

    public class VolunteerProfileModel {
        public string Name { get; set; } = String.Empty;
        public string PrimaryPhoneNumber { get; set; } = String.Empty;
        public string? SecondaryPhoneNumber { get; set; }
        public string ZipCode { get; set; } = String.Empty;
        public bool IsActive { get; set; }
        public string Bio { get; set; } = String.Empty;

        public IEnumerable<string> Experiences { get; set; } = new string[0];
        public IEnumerable<InstitutionModel> Institutions { get; set; } = new InstitutionModel[0];
    }

}
