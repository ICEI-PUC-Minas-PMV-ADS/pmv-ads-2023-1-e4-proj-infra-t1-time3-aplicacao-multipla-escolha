using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace multipla_escolha_api.Migrations
{
    /// <inheritdoc />
    public partial class M14 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Turmas_Usuarios_ProfessorId",
                table: "Turmas");

            migrationBuilder.AddForeignKey(
                name: "FK_Turmas_Usuarios_ProfessorId",
                table: "Turmas",
                column: "ProfessorId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Turmas_Usuarios_ProfessorId",
                table: "Turmas");

            migrationBuilder.AddForeignKey(
                name: "FK_Turmas_Usuarios_ProfessorId",
                table: "Turmas",
                column: "ProfessorId",
                principalTable: "Usuarios",
                principalColumn: "Id");
        }
    }
}
