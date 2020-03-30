namespace SaveSaviours {
    using System;
    using System.Collections.Generic;

    public class VolunteerModel {
        public Guid Id { get; set; }
        public string Bio { get; set; } = String.Empty;
        public IEnumerable<int> Tags { get; set; } = new int[0];
    }

}
