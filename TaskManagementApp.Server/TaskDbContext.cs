using AspNetBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AspNetBackend
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options) { }

        public DbSet<TaskModel> Task { get; set; }
        public DbSet<TagModel> Tag { get; set; }
        public DbSet<StatusModel> Status { get; set; }
    }
}