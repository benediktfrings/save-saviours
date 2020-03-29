namespace SaveSaviours.Migrations {
    using System;
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class Initial : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.CreateTable(
                name: "Tag",
                columns: table => new {
                    Value = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Label = table.Column<string>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Tag", x => x.Value);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new {
                    Id = table.Column<Guid>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    LockoutUntil = table.Column<DateTimeOffset>(nullable: true)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Institutions",
                columns: table => new {
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Institutions", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Institutions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRole",
                columns: table => new {
                    UserId = table.Column<Guid>(nullable: false),
                    Role = table.Column<string>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_UserRole", x => new { x.UserId, x.Role });
                    table.ForeignKey(
                        name: "FK_UserRole_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Volunteers",
                columns: table => new {
                    UserId = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    ZipCode = table.Column<string>(nullable: false),
                    PrimaryPhoneNumber = table.Column<string>(nullable: false),
                    SecondaryPhoneNumber = table.Column<string>(nullable: true),
                    Bio = table.Column<string>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Volunteers", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Volunteers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VolunteerLink",
                columns: table => new {
                    VolunteerId = table.Column<Guid>(nullable: false),
                    InstitutionId = table.Column<Guid>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_VolunteerLink", x => new { x.VolunteerId, x.InstitutionId });
                    table.ForeignKey(
                        name: "FK_VolunteerLink_Institutions_InstitutionId",
                        column: x => x.InstitutionId,
                        principalTable: "Institutions",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VolunteerLink_Volunteers_VolunteerId",
                        column: x => x.VolunteerId,
                        principalTable: "Volunteers",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "VolunteerTag",
                columns: table => new {
                    VolunteerId = table.Column<Guid>(nullable: false),
                    TagValue = table.Column<int>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_VolunteerTag", x => new { x.VolunteerId, x.TagValue });
                    table.ForeignKey(
                        name: "FK_VolunteerTag_Tag_TagValue",
                        column: x => x.TagValue,
                        principalTable: "Tag",
                        principalColumn: "Value",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_VolunteerTag_Volunteers_VolunteerId",
                        column: x => x.VolunteerId,
                        principalTable: "Volunteers",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VolunteerLink_InstitutionId",
                table: "VolunteerLink",
                column: "InstitutionId");

            migrationBuilder.CreateIndex(
                name: "IX_VolunteerTag_TagValue",
                table: "VolunteerTag",
                column: "TagValue");
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "UserRole");

            migrationBuilder.DropTable(
                name: "VolunteerLink");

            migrationBuilder.DropTable(
                name: "VolunteerTag");

            migrationBuilder.DropTable(
                name: "Institutions");

            migrationBuilder.DropTable(
                name: "Tag");

            migrationBuilder.DropTable(
                name: "Volunteers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
