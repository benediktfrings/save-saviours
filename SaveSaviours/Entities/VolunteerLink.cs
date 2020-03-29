namespace SaveSaviours.Entities {
    using System;

    public class VolunteerLink {
        public Guid VolunteerId { get; set; }
        public Volunteer Volunteer { get; set; } = null!;

        public Guid InstitutionId { get; set; }
        public Institution Institution { get; set; } = null!;
    }
}
