namespace SaveSaviours.Entities {
    using System;
    using System.Collections.Generic;

    public class Tag {
        public int Value { get; set; }
        public string Label { get; set; } = String.Empty;

        public ICollection<VolunteerTag> TaggedVolunteers { get; set; } = null!;
    }
}
