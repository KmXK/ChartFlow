using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CF.Web.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePlanNames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "1 month");

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Cost", "Name" },
                values: new object[] { 99.99m, "12 months" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Ежемесячная");

            migrationBuilder.UpdateData(
                table: "SubscriptionPlans",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Cost", "Name" },
                values: new object[] { 99.9m, "Ежегодная" });
        }
    }
}
