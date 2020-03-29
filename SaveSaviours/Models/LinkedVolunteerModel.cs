namespace SaveSaviours {
    using System;

    public class LinkedVolunteerModel : VolunteerModel {
        public string Name { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string ZipCode { get; set; } = String.Empty;
        public string PrimaryPhoneNumber { get; set; } = String.Empty;
        public string? SecondaryPhoneNumber { get; set; }
    }

}
