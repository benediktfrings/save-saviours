namespace SaveSaviours.Entities {
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public class Tag {
        public int Value { get; set; }

        [Required]
        public string Label { get; set; } = String.Empty;

        public ICollection<VolunteerTag> TaggedVolunteers { get; set; } = null!;
    }
}
