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
                    Institution = null,
                    Volunteer = null,
                }
            };
    }
}