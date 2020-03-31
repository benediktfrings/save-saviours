namespace SaveSaviours.Models {
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using Data;
    using Entities;

    public class UserModel {
        public Guid Id { get; set; }

        [Required]
        public string Email { get; set; } = String.Empty;

        public UserRolesModel Roles { get; private set; } = new UserRolesModel();

        public static UserModel FromUser(User user) =>
            new UserModel {
                Id = user.Id,
                Email = user.Email,
                Roles = new UserRolesModel {
                    Administrator = user.Roles.Contains(Role.Administrator),
                    Institution = user.Institution?.Map(i => new InstitutionProfileModel {
                        Name = i.Name,
                        ContactName = i.ContactName,
                        PrimaryPhoneNumber = i.PrimaryPhoneNumber,
                        SecondaryPhoneNumber = i.SecondaryPhoneNumber,
                        ZipCode = i.ZipCode.ToString("00000"),
                        Vetted = i.Vetted,
                    }),
                    Volunteer = user.Volunteer?.Map(v => new VolunteerProfileModel {
                        Name = v.Name,
                        PrimaryPhoneNumber = v.PrimaryPhoneNumber,
                        SecondaryPhoneNumber = v.SecondaryPhoneNumber,
                        ZipCode = v.ZipCode.ToString("00000"),
                        Bio = v.Bio,
                        IsActive = v.IsActive,
                        Experiences = v.Experiences.Select(e => e.Tag.Label),
                        Institutions = v.LinkedInstitutions.Select(i => new InstitutionModel {
                            Id = i.Institution.UserId,
                            Name = i.Institution.Name,
                            ContactName = i.Institution.ContactName,
                        })
                    }),
                }
            };
    }
}