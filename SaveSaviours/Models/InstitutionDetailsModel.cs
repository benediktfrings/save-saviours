namespace SaveSaviours.Models {
    using System;

    public class InstitutionDetailsModel : InstitutionModel {
        public string Email { get; set; } = String.Empty;
        public string PrimaryPhoneNumber { get; set; } = String.Empty;
        public string? SecondaryPhoneNumber { get; set; }
        public string ZipCode { get; set; } = String.Empty;
    }
}
