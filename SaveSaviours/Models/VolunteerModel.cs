namespace SaveSaviours {
    using System;

    public class VolunteerModel {
        public Guid Id { get; set; }
        public string Bio { get; set; } = String.Empty;
        public int[] Tags { get; set; } = new int[0];
    }

}
