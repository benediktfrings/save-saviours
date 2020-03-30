namespace SaveSaviours.Models {
    using System;

    public class ChangePasswordModel {
        public string OldPassword { get; set; } = String.Empty;
        public string NewPassword { get; set; } = String.Empty;
    }
}
