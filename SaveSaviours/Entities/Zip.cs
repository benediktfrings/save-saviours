namespace SaveSaviours.Entities {
    using System;
    using System.Collections.Generic;

    public class Zip {
        public int Code { get; private set; }
        public float Latitude { get; private set; }
        public float Longitude { get; private set; }

        public ICollection<Institution> Institutions { get; set; } = new List<Institution>();
        public ICollection<Volunteer> Volunteers { get; set; } = new List<Volunteer>();

        private double Lat => Latitude * Math.PI / 180;
        private double Lon => Longitude * Math.PI / 180;
        public double DistanceTo(Zip target) => DistanceTo(this, target);
        public static double DistanceTo(Zip a, Zip b) =>
            Math.Acos(
                Math.Sin(a.Lat) * Math.Sin(b.Lat)
                + Math.Cos(a.Lat) * Math.Cos(b.Lat) * Math.Cos(b.Lon - a.Lon)
            ) * 6380;

    }
}
