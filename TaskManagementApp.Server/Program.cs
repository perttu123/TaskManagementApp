using Microsoft.EntityFrameworkCore;

namespace AspNetBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
   
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Configure DbContext with SQL Server
            builder.Services.AddDbContext<TaskDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("TaskDBBB")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            });
            builder.Services.AddMemoryCache();

            var app = builder.Build();
            var buildSqlFilePath = Path.Combine(Directory.GetCurrentDirectory(), "SQL_files/build.sql");
            var insertStatusSqlFilePath = Path.Combine(Directory.GetCurrentDirectory(), "SQL_files/InsertStatus.sql");
            var insertTagSqlFilePath = Path.Combine(Directory.GetCurrentDirectory(), "SQL_files/InsertTag.sql");

            // Run SQL script to create database and tables
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<TaskDbContext>();
                context.Database.EnsureCreated(); // Ensure that the database exists

                try
                {
                    // Execute build.sql script
                    string buildScript = File.ReadAllText(buildSqlFilePath);
                    context.Database.ExecuteSqlRaw(buildScript);

                    Console.WriteLine("SQL scripts executed successfully.");
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while executing SQL scripts.");
                }
            }
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<TaskDbContext>();

                try
                {
                    // Execute InsertStatus.sql script
                    string insertStatusScript = File.ReadAllText(insertStatusSqlFilePath);
                    context.Database.ExecuteSqlRaw(insertStatusScript);

                    Console.WriteLine("InsertStatus script executed successfully.");

                    // Execute InsertTag.sql script
                    string insertTagScript = File.ReadAllText(insertTagSqlFilePath);
                    context.Database.ExecuteSqlRaw(insertTagScript);

                    Console.WriteLine("InsertTag script executed successfully.");
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while executing insertion scripts.");
                }
            }
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("AllowAll");
            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}

