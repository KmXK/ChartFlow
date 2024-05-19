using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CF.Web.Migrations
{
    /// <inheritdoc />
    public partial class AddPlans : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "SubscriptionPlans",
                columns: new[] { "Id", "Cost", "EndTime", "Name", "PeriodInDays", "StartTime" },
                values: new object[,]
                {
                    { 1, 9.99m, new DateTime(2030, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ежемесячная", (short)30, new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) },
                    { 2, 99.9m, new DateTime(2030, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Ежегодная", (short)365, new DateTime(2020, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
