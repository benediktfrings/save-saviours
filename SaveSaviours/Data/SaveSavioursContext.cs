namespace SaveSaviours.Data {
    using System;
    using System.Linq;
    using Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
    using Microsoft.Extensions.Options;

    public sealed class SaveSavioursContext : DbContext {
        private readonly AppSettings _settings;

        public SaveSavioursContext(DbContextOptions<SaveSavioursContext> cfg, IOptions<AppSettings> options)
            : base(cfg) => _settings = options.Value;

        public DbSet<User> Users { get; private set; } = null!;
        public DbSet<Volunteer> Volunteers { get; private set; } = null!;
        public DbSet<Institution> Institutions { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
            optionsBuilder.UseSqlServer(_settings.Database);

        private static ValueConverter<DateTime, DateTime> UtcDateTimeConverter { get; }
            = new ValueConverter<DateTime, DateTime>(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        private void UtcDateTime(ModelBuilder modelBuilder) =>
            modelBuilder.Model.GetEntityTypes()
                .SelectMany(t => t.GetProperties())
                .Where(t => t.ClrType == typeof(DateTime) || t.ClrType == typeof(DateTime?))
                .ForEach(t => t.SetValueConverter(UtcDateTimeConverter));

        protected override void OnModelCreating(ModelBuilder modelBuilder) =>
            modelBuilder
                .Use(UtcDateTime)
                .Entity<User>(e => {
                    e.HasKey(t => t.Id);

                    e.HasMany(t => t.UserRoles).WithOne(t => t.User);
                    e.HasOne(t => t.Volunteer!).WithOne(t => t.User);
                    e.HasOne(t => t.Institution!).WithOne(t => t.User);
                })
                .Entity<UserRole>(e => {
                    e.HasKey(t => new { t.UserId, t.Role });
                    e.Property(t => t.Role).HasConversion(r => r.Id, r => Role.Get(r));
                })
                .Ignore<Role>()
                .Entity<Volunteer>(e => {
                    e.HasKey(t => t.UserId);

                    e.HasMany(t => t.Experiences).WithOne(t => t.Volunteer);
                    e.HasMany(t => t.LinkedInstitutions).WithOne(t => t.Volunteer);
                })
                .Entity<VolunteerTag>(e => {
                    e.HasKey(t => new { t.VolunteerId, t.TagValue });
                })
                .Entity<VolunteerLink>(e => {
                    e.HasKey(t => new { t.VolunteerId, t.InstitutionId });
                })
                .Entity<Institution>(e => {
                    e.HasKey(t => t.UserId);

                    e.HasMany(t => t.LinkedVolunteers).WithOne(t => t.Institution);
                })
                .Entity<Tag>(e => {
                    e.HasKey(t => t.Value);
                    e.Property(t => t.Value).ValueGeneratedOnAdd();

                    e.HasMany(t => t.TaggedVolunteers).WithOne(t => t.Tag);
                })
                ;
    }
}
