using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Contexts;


namespace Infrastructure.Factories
{
    internal class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            optionsBuilder.UseSqlServer("Server=tcp:bookstorelear.database.windows.net,1433;Initial Catalog=bookstorelear;Persist Security Info=False;User ID=lear;Password=!Andalucia;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");


            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
