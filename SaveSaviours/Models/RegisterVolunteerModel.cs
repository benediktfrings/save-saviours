namespace SaveSaviours.Models {
    using System;

    public class RegisterVolunteerModel {
        public string Email { get; set; } = String.Empty;
        public string Name { get; set; } = String.Empty;
        public string ZipCode { get; set; } = String.Empty;
        public string PrimaryPhoneNumber { get; set; } = String.Empty;
        public string? SecondaryPhoneNumber { get; set; }
        public string Bio { get; set; } = String.Empty;
        public string[] Experiences { get; set; } = new string[0];
        public string? Password { get; set; }
    }
}
