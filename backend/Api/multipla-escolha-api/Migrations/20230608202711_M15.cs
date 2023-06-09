using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace multipla_escolha_api.Migrations
{
    /// <inheritdoc />
    public partial class M15 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resultados_Usuarios_AlunoId",
                table: "Resultados");

            migrationBuilder.AddForeignKey(
                name: "FK_Resultados_Usuarios_AlunoId",
                table: "Resultados",
                column: "AlunoId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resultados_Usuarios_AlunoId",
                table: "Resultados");

            migrationBuilder.AddForeignKey(
                name: "FK_Resultados_Usuarios_AlunoId",
                table: "Resultados",
                column: "AlunoId",
                principalTable: "Usuarios",
                principalColumn: "Id");
        }
    }
}
