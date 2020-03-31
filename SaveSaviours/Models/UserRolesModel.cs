namespace SaveSaviours.Models {
    public class UserRolesModel {
        public bool Administrator { get; set; }
        public VolunteerProfileModel? Volunteer { get; set; }
        public InstitutionProfileModel? Institution { get; set; }
    }
}
