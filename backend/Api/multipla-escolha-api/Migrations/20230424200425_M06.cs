using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace multipla_escolha_api.Migrations
{
    /// <inheritdoc />
    public partial class M06 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Valor",
                table: "Atividades",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Valor",
                table: "Atividades");
        }
    }
}
