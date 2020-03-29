namespace SaveSaviours.Entities {
    using System;

    public class VolunteerTag {
        public Guid VolunteerId { get; set; }
        public Volunteer Volunteer { get; set; } = null!;

        public int TagValue { get; set; }
        public Tag Tag { get; set; } = null!;
    }
}
