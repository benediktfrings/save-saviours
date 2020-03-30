namespace SaveSaviours.Models {
    using System;

    public class RegisterInstitutionModel {
        public string Email { get; set; } = String.Empty;
        public string Name { get; set; } = String.Empty;
        public string ContactName { get; set; } = String.Empty;
        public string ZipCode { get; set; } = String.Empty;
        public string PrimaryPhoneNumber { get; set; } = String.Empty;
        public string? SecondaryPhoneNumber { get; set; }
        public string? Password { get; set; }
    }
}
