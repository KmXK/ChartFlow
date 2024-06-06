using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CF.Web.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SubscriptionPlans",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    PeriodInDays = table.Column<short>(type: "smallint", nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(8,2)", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionPlans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Login = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PasswordSaltedHash = table.Column<byte[]>(type: "binary(32)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "binary(16)", nullable: false),
                    LastOnlineTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    RefreshToken = table.Column<string>(type: "varchar(1000)", unicode: false, maxLength: 1000, nullable: true),
                    RefreshTokenExpiryTime = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Extensions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsRemoved = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Extensions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Extensions_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PlanId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subscriptions_SubscriptionPlans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "SubscriptionPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Subscriptions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExtensionComments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExtensionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ModifiedTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExtensionComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExtensionComments_Extensions_ExtensionId",
                        column: x => x.ExtensionId,
                        principalTable: "Extensions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ExtensionComments_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ExtensionUsings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExtensionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivationTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    DeactivationTime = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExtensionUsings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExtensionUsings_Extensions_ExtensionId",
                        column: x => x.ExtensionId,
                        principalTable: "Extensions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ExtensionUsings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "SubscriptionPlans",
                columns: new[] { "Id", "Cost", "EndTime", "Name", "PeriodInDays", "StartTime" },
                values: new object[,]
                {
                    { 1, 9.99m, new DateTime(2030, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "1 month", (short)30, new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, 99.99m, new DateTime(2030, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "12 months", (short)365, new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "LastOnlineTime", "Login", "PasswordSalt", "PasswordSaltedHash", "RefreshToken", "RefreshTokenExpiryTime" },
                values: new object[] { new Guid("396f400a-2c1a-4cd0-9323-df2d02770833"), "chartflow@yandex.by", new DateTime(2024, 6, 6, 17, 15, 41, 126, DateTimeKind.Utc).AddTicks(1797), "chartflow", new byte[] { 243, 26, 189, 39, 251, 178, 246, 149, 214, 83, 121, 42, 235, 71, 130, 158 }, new byte[] { 66, 136, 181, 162, 70, 68, 2, 124, 32, 239, 172, 229, 110, 235, 58, 155, 75, 235, 56, 103, 169, 36, 225, 192, 31, 157, 74, 91, 47, 126, 213, 143 }, null, null });

            migrationBuilder.InsertData(
                table: "Extensions",
                columns: new[] { "Id", "AuthorId", "CreationTime", "Description", "IsRemoved", "Name" },
                values: new object[,]
                {
                    { new Guid("6bdf8ce8-0761-4553-8a6e-0e24779ae097"), new Guid("396f400a-2c1a-4cd0-9323-df2d02770833"), new DateTime(2024, 6, 6, 17, 15, 41, 40, DateTimeKind.Utc).AddTicks(8966), "Gost is a simple, fast and reliable charting library.", false, "Gost" },
                    { new Guid("a9345d74-67f1-4a29-afc8-6950cd28b9d5"), new Guid("396f400a-2c1a-4cd0-9323-df2d02770833"), new DateTime(2024, 6, 6, 17, 15, 41, 40, DateTimeKind.Utc).AddTicks(8972), "Use case diagram with actor and actions.", false, "Use Case" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ExtensionComments_ExtensionId",
                table: "ExtensionComments",
                column: "ExtensionId");

            migrationBuilder.CreateIndex(
                name: "IX_ExtensionComments_UserId",
                table: "ExtensionComments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Extensions_AuthorId",
                table: "Extensions",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_ExtensionUsings_ExtensionId",
                table: "ExtensionUsings",
                column: "ExtensionId");

            migrationBuilder.CreateIndex(
                name: "IX_ExtensionUsings_UserId",
                table: "ExtensionUsings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_PlanId",
                table: "Subscriptions",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_UserId",
                table: "Subscriptions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_Login",
                table: "Users",
                column: "Login",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExtensionComments");

            migrationBuilder.DropTable(
                name: "ExtensionUsings");

            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropTable(
                name: "Extensions");

            migrationBuilder.DropTable(
                name: "SubscriptionPlans");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
