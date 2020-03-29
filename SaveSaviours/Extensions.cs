namespace SaveSaviours {
    using System;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;
    using System.Text;
    using Microsoft.IdentityModel.Tokens;

    public static class Extensions {

        public static SecurityKey GetKey(this AppSettings settings) =>
            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(settings.Secret));

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
