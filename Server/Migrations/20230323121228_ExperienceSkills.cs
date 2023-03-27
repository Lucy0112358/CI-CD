using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ExperienceSkills : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Experience_Skill_SkillId",
                table: "Experience");

            migrationBuilder.DropIndex(
                name: "IX_Experience_SkillId",
                table: "Experience");

            migrationBuilder.DropColumn(
                name: "SkillId",
                table: "Experience");

            migrationBuilder.CreateTable(
                name: "ExperienceSkills",
                columns: table => new
                {
                    ExperienceId = table.Column<int>(type: "int", nullable: false),
                    SkillsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExperienceSkills", x => new { x.ExperienceId, x.SkillsId });
                    table.ForeignKey(
                        name: "FK_ExperienceSkills_Experience_ExperienceId",
                        column: x => x.ExperienceId,
                        principalTable: "Experience",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExperienceSkills_Skill_SkillsId",
                        column: x => x.SkillsId,
                        principalTable: "Skill",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExperienceSkills_SkillsId",
                table: "ExperienceSkills",
                column: "SkillsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExperienceSkills");

            migrationBuilder.AddColumn<int>(
                name: "SkillId",
                table: "Experience",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Experience_SkillId",
                table: "Experience",
                column: "SkillId");

            migrationBuilder.AddForeignKey(
                name: "FK_Experience_Skill_SkillId",
                table: "Experience",
                column: "SkillId",
                principalTable: "Skill",
                principalColumn: "Id");
        }
    }
}
