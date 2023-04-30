using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using multipla_escolha_api.Models;
using multipla_escolha_api.Models.Config;
using multipla_escolha_api.Models.MongoDb;
using multipla_escolha_api.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()
    .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);

// Permite acesso as configurações JWT pelas classes da aplicação.
builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection("Jwt"));

// Permite acesso as configurações MongoDb pelas classes da aplicação.
builder.Services.Configure<MongoDbDatabaseConfig>(builder.Configuration.GetSection("MongoDbDatabaseConfig"));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddSingleton<AtividadeMongoDbService>();

builder.Services.AddScoped<UsuariosService, UsuariosService>();

builder.Services.AddScoped<TurmasService, TurmasService>();

builder.Services.AddScoped<AtividadesService, AtividadesService>();

builder.Services.AddScoped<ResultadosService, ResultadosService>();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    // Adding Jwt Bearer
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateIssuer = true,
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adiciona o CORS
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Use(async (context, next) =>
{
    if (context.Request.Cookies["jwtToken"] != null)
    {
        Console.WriteLine("Not null");
        var token = context.Request.Cookies["jwtToken"];
        context.Request.Headers.Add("Authorization", "bearer " + token);
    }

    await next();
});

app.UseCors(x => x.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod().AllowCredentials());

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
