namespace SaveSaviours.Models {
    using System;
    using System.ComponentModel.DataAnnotations;

    public class CredentialsModel {
        [Required]
        public string Username { get; set; } = String.Empty;

        [Required]
        public string Password { get; set; } = String.Empty;
    }
}
