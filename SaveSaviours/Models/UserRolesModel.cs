namespace SaveSaviours.Models {
    public class UserRolesModel {
        public bool Administrator { get; set; }
        public VolunteerModel? Volunteer { get; set; }
        public InstitutionModel? Institution { get; set; }
    }
}
