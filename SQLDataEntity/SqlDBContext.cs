using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SQLDataEntity.Models;

namespace SQLDataEntity
{
    public class SqlDBContext : DbContext
    {
        public SqlDBContext(DbContextOptions<SqlDBContext> options) : base(options)
        {
        }

        public virtual DbSet<Product>? Products { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(p => p.Price).HasColumnType("decimal(18,2)");
            });
        }
    }
}
