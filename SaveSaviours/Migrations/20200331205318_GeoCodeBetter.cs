namespace SaveSaviours.Migrations {
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class GeoCodeBetter : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "Distance");

            migrationBuilder.CreateTable(
                name: "Zip",
                columns: table => new {
                    Code = table.Column<int>(nullable: false),
                    Latitude = table.Column<float>(nullable: false),
                    Longitude = table.Column<float>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Zip", x => x.Code);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Volunteers_ZipCode",
                table: "Volunteers",
                column: "ZipCode");

            migrationBuilder.CreateIndex(
                name: "IX_Institutions_ZipCode",
                table: "Institutions",
                column: "ZipCode");

            migrationBuilder.AddForeignKey(
                name: "FK_Institutions_Zip_ZipCode",
                table: "Institutions",
                column: "ZipCode",
                principalTable: "Zip",
                principalColumn: "Code",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Volunteers_Zip_ZipCode",
                table: "Volunteers",
                column: "ZipCode",
                principalTable: "Zip",
                principalColumn: "Code",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropForeignKey(
                name: "FK_Institutions_Zip_ZipCode",
                table: "Institutions");

            migrationBuilder.DropForeignKey(
                name: "FK_Volunteers_Zip_ZipCode",
                table: "Volunteers");

            migrationBuilder.DropTable(
                name: "Zip");

            migrationBuilder.DropIndex(
                name: "IX_Volunteers_ZipCode",
                table: "Volunteers");

            migrationBuilder.DropIndex(
                name: "IX_Institutions_ZipCode",
                table: "Institutions");

            migrationBuilder.CreateTable(
                name: "Distance",
                columns: table => new {
                    ZipCodeA = table.Column<int>(type: "int", nullable: false),
                    ZipCodeB = table.Column<int>(type: "int", nullable: false),
                    Distance = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Distance", x => new { x.ZipCodeA, x.ZipCodeB });
                });
        }
    }
}
