namespace SaveSaviours.Models {
    using System;
    using System.Collections.Generic;

    public class VolunteerModel {
        public Guid Id { get; set; }
        public string Bio { get; set; } = String.Empty;
        public double Distance { get; set; }
        public IEnumerable<int> Tags { get; set; } = new int[0];
    }

}
