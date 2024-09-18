using OpenLayers_Project_Backend.Connections;
using OpenLayers_Project_Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IPolygonService, PolygonService>();
builder.Services.Configure<ConnectionStrings>(builder.Configuration.GetSection("ConnectionStrings"));

var app = builder.Build();

if (bool.TryParse(Environment.GetEnvironmentVariable("DEACTIVATE_CORS") ?? "false", out var deactivateCors) && !deactivateCors)
{
    app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
