namespace SaveSaviours {
    using System.Linq;
    using System.Security.Claims;
    using System.Text.Json;
    using System.Text.Json.Serialization;
    using Data;
    using Entities;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.IdentityModel.Tokens;

    public class Startup {
        public Startup(IConfiguration configuration) =>
            Configuration = configuration;

        private IConfiguration Configuration { get; }

        private AppSettings Settings =>
            Configuration
                .GetSection("AppSettings")
                .Get<AppSettings>();

        public static void ApplyJsonOptions(JsonSerializerOptions options) {
            options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.Converters.Add(new JsonStringEnumConverter());
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) => services
            .Configure<AppSettings>(Configuration.GetSection("AppSettings"))
            .AddControllers() // starts IMvcBuilder
            .AddJsonOptions(o => ApplyJsonOptions(o.JsonSerializerOptions))
            .Services // unwrap IMvcBuilder
            .AddDbContext<SaveSavioursContext>()
            .AddTransient<IUserStore<User>, UserStore>()
            .AddTransient<IRoleStore<Role>, RoleStore>()
            .AddIdentity<User, Role>(cfg => {
                cfg.Password.RequireDigit = false;
                cfg.Password.RequiredLength = 6;
                cfg.Password.RequiredUniqueChars = 3;
                cfg.Password.RequireLowercase = false;
                cfg.Password.RequireNonAlphanumeric = false;
                cfg.Password.RequireUppercase = false;

                cfg.Lockout.AllowedForNewUsers = false;

                cfg.User.AllowedUserNameCharacters =
                    "abcdefghijklmnopqrstuvwxyz" +
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                    "0123456789_-+.@";
            }) // starts IdentityBuilder
            .AddDefaultTokenProviders()
            .Services // unwrap IdentityBuilder
            .AddAuthentication(cfg => {
                cfg.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                cfg.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(cfg => {
                cfg.Events = new JwtBearerEvents {
                    OnTokenValidated = async ctx => {
                        var manager = ctx.HttpContext.RequestServices.GetRequiredService<UserManager<User>>();
                        var user = await manager.FindByIdAsync(ctx.Principal.Identity.Name);
                        if (user == null) {
                            ctx.Fail("Unauthorized");
                            return;
                        }
                        var roles = user.Roles.Select(r => new Claim(ClaimTypes.Role, r.Id));
                        ctx.Principal.AddIdentity(new ClaimsIdentity(roles)); // update roles
                    },
                };
                cfg.TokenValidationParameters = new TokenValidationParameters {
                    IssuerSigningKey = Settings.GetKey(),
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                };
            }) // starts AuthenticationBuilder
            .Services // unwrap AuthenticationBuilder
            .AddSwaggerDocument(cfg => cfg.PostProcess = doc => {
                doc.Info.Version = "v1";
                doc.Info.Title = "JobCamp API";
            })
            .AddSpaStaticFiles(configuration => {
                configuration.RootPath = "ClientApp/build";
            })
            ;

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseHttpsRedirection();

            if (!env.IsProduction()) {
                app.UseDeveloperExceptionPage();
                app.UseOpenApi();
                app.UseSwaggerUi3(cfg => cfg.Path = "/api");
                app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().WithMethods("GET", "POST", "OPTIONS"));
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(b => b.MapControllers());

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseSpa(spa => {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment()) {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

    }
}
