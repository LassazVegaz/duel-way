using DuelWay.Models;
using Microsoft.EntityFrameworkCore;

namespace DuelWay.Data;

public class DuelWayContext(DbContextOptions<DuelWayContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>().HasKey(u => u.Name);

        base.OnModelCreating(builder);
    }
}
