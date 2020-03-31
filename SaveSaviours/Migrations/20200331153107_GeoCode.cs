namespace SaveSaviours.Migrations {
    using Microsoft.EntityFrameworkCore.Migrations;

    public partial class GeoCode : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AlterColumn<int>(
                name: "ZipCode",
                table: "Volunteers",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "ZipCode",
                table: "Institutions",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "Distance",
                columns: table => new {
                    ZipCodeA = table.Column<int>(nullable: false),
                    ZipCodeB = table.Column<int>(nullable: false),
                    Distance = table.Column<float>(nullable: false)
                },
                constraints: table => {
                    table.PrimaryKey("PK_Distance", x => new { x.ZipCodeA, x.ZipCodeB });
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropTable(
                name: "Distance");

            migrationBuilder.AlterColumn<string>(
                name: "ZipCode",
                table: "Volunteers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "ZipCode",
                table: "Institutions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
