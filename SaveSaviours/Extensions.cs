namespace SaveSaviours {
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Entities;
    using Microsoft.IdentityModel.Tokens;

    public static class Extensions {

        public static SecurityKey GetKey(this AppSettings settings) =>
            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(settings.Secret));

        public static string GenerateToken(this AppSettings settings, User user, int expires = 90) {
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor {
                SigningCredentials = new SigningCredentials(settings.GetKey(), SecurityAlgorithms.HmacSha256Signature),
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(expires),
            });
            return tokenHandler.WriteToken(token);
        }

        public static TResult Map<TValue, TResult>([NotNull]this TValue value, [NotNull]Func<TValue, TResult> map) =>
            map(value);

        public static T Use<T>([NotNull]this T value, [NotNull]Action<T> use) {
            use(value);
            return value;
        }

        public static void ForEach<T>([NotNull]this IEnumerable<T> source, [NotNull]Action<T> apply) {
            foreach (var item in source) apply(item);
        }

        public static Guid ToGuid(this string? value) =>
            Guid.TryParse(value, out var result) ? result : Guid.Empty;

    }
}
