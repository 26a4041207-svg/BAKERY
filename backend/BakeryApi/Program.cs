using System.Text;
using BakeryApi.Data;
using BakeryApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure SQL Server Database Context
builder.Services.AddDbContext<BakeryDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Configure Dependency Injection Services
builder.Services.AddScoped<ITokenService, TokenService>();

// Configure JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? "BakerySecretKey_SuperSecureKeyForJwtTokens_Honeyque_2026";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "BakeryApi";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "BakeryClient";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

// Configure CORS for Next.js Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJsClient", policy =>
    {
        policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost" || new Uri(origin).Host == "127.0.0.1")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Configure Swagger/OpenAPI with JWT Bearer support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "HONEYQUE Bakery API",
        Version = "v1",
        Description = "ASP.NET Core Web API cho hệ thống Bakery HONEYQUE lưu trữ trên SQL Server"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Nhập token JWT theo định dạng: Bearer {token}",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Auto create SQL Server database and seed data if not present
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<BakeryDbContext>();
        await DbInitializer.SeedAsync(context, app.Environment);
        Console.WriteLine("--> [Database] SQL Server initialized & seeded successfully!");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"--> [Database Error] Error initializing database: {ex.Message}");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || true)
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "HONEYQUE Bakery API v1");
        c.RoutePrefix = string.Empty; // Swagger at root http://localhost:5000/
    });
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("AllowNextJsClient");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
