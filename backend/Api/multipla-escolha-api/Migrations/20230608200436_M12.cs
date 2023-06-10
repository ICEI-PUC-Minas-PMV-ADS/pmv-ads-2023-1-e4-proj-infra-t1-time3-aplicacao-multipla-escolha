using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace multipla_escolha_api.Migrations
{
    /// <inheritdoc />
    public partial class M12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TurmasAlunos_Turmas_TurmaId",
                table: "TurmasAlunos");

            migrationBuilder.AddForeignKey(
                name: "FK_TurmasAlunos_Turmas_TurmaId",
                table: "TurmasAlunos",
                column: "TurmaId",
                principalTable: "Turmas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TurmasAlunos_Turmas_TurmaId",
                table: "TurmasAlunos");

            migrationBuilder.AddForeignKey(
                name: "FK_TurmasAlunos_Turmas_TurmaId",
                table: "TurmasAlunos",
                column: "TurmaId",
                principalTable: "Turmas",
                principalColumn: "Id");
        }
    }
}
