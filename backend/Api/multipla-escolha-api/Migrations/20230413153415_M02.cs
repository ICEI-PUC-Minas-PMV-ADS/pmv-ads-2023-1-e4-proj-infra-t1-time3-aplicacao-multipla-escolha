using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace multipla_escolha_api.Migrations
{
    /// <inheritdoc />
    public partial class M02 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TurmasAlunos_Turmas_TurmaId",
                table: "TurmasAlunos");

            migrationBuilder.DropForeignKey(
                name: "FK_TurmasAlunos_Usuarios_AlunoId",
                table: "TurmasAlunos");

            migrationBuilder.AlterColumn<string>(
                name: "NomeDeUsuario",
                table: "Usuarios",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Usuarios",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_Email",
                table: "Usuarios",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_NomeDeUsuario",
                table: "Usuarios",
                column: "NomeDeUsuario",
                unique: true);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TurmasAlunos_Turmas_TurmaId",
                table: "TurmasAlunos");

            migrationBuilder.DropForeignKey(
                name: "FK_TurmasAlunos_Usuarios_AlunoId",
                table: "TurmasAlunos");

            migrationBuilder.DropIndex(
                name: "IX_Usuarios_Email",
                table: "Usuarios");

            migrationBuilder.DropIndex(
                name: "IX_Usuarios_NomeDeUsuario",
                table: "Usuarios");

            migrationBuilder.AlterColumn<string>(
                name: "NomeDeUsuario",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

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
    }
}
