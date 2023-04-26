using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace multipla_escolha_api.Migrations
{
    /// <inheritdoc />
    public partial class M03 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Turmas_Usuarios_ProfessorId",
                table: "Turmas");

            migrationBuilder.DropForeignKey(
                name: "FK_TurmasAlunos_Turmas_TurmaId",
                table: "TurmasAlunos");

            migrationBuilder.DropForeignKey(
                name: "FK_TurmasAlunos_Usuarios_AlunoId",
                table: "TurmasAlunos");

            migrationBuilder.AddForeignKey(
                name: "FK_Turmas_Usuarios_ProfessorId",
                table: "Turmas",
                column: "ProfessorId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TurmasAlunos_Turmas_TurmaId",
                table: "TurmasAlunos",
                column: "TurmaId",
                principalTable: "Turmas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TurmasAlunos_Usuarios_AlunoId",
                table: "TurmasAlunos",
                column: "AlunoId",
                principalTable: "Usuarios",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Turmas_Usuarios_ProfessorId",
                table: "Turmas");

            migrationBuilder.DropForeignKey(
                name: "FK_TurmasAlunos_Turmas_TurmaId",
                table: "TurmasAlunos");

            migrationBuilder.DropForeignKey(
                name: "FK_TurmasAlunos_Usuarios_AlunoId",
                table: "TurmasAlunos");

            migrationBuilder.AddForeignKey(
                name: "FK_Turmas_Usuarios_ProfessorId",
                table: "Turmas",
                column: "ProfessorId",
                principalTable: "Usuarios",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TurmasAlunos_Turmas_TurmaId",
                table: "TurmasAlunos",
                column: "TurmaId",
                principalTable: "Turmas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TurmasAlunos_Usuarios_AlunoId",
                table: "TurmasAlunos",
                column: "AlunoId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
