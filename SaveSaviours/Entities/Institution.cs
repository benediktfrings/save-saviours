namespace SaveSaviours.Entities {
    using System;
    using System.Collections.Generic;

    public class Institution : UserExtension {

        public ICollection<VolunteerLink> LinkedVolunteers { get; set; } = null!;
    }
}
