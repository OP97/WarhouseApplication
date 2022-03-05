using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using WarehouseApplication.Data.Entities;

namespace WarehouseApplication.Data
{
    public class WarhouseContext
    {
        public class WarehouseContext : DbContext
        {
            public WarehouseContext(DbContextOptions<WarehouseContext> options) : base(options)
            {
            }

            public DbSet<Warehouse> Warehouse { get; set; }
            public DbSet<Car> Car { get; set; }

            public class DesignTimeContextFactory : IDesignTimeDbContextFactory<WarehouseContext>
            {
                public WarehouseContext CreateDbContext(string[] args)
                {
                    var configuration = new ConfigurationBuilder()
                        .AddJsonFile("db.json")
                        .Build();
            
                    var optionsBuilder = new DbContextOptionsBuilder<WarehouseContext>();
                    optionsBuilder.UseSqlite(configuration.GetConnectionString("WarehouseContext"));
                    return new WarehouseContext(optionsBuilder.Options);
                }
            }
        }

    }
}