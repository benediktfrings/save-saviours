namespace SaveSaviours {
    using System.Collections;
    using System.Collections.Generic;
    using System.Diagnostics.CodeAnalysis;

    public class TagListModel : IReadOnlyDictionary<int, string> {
        private Dictionary<int, string> _tags;
        public TagListModel(Dictionary<int, string> tags) =>
            _tags = tags;

        public string this[int key] => _tags[key];
        public IEnumerable<int> Keys => _tags.Keys;
        public IEnumerable<string> Values => _tags.Values;
        public int Count => _tags.Count;
        public bool ContainsKey(int key) => _tags.ContainsKey(key);
        public IEnumerator<KeyValuePair<int, string>> GetEnumerator() => _tags.GetEnumerator();
        public bool TryGetValue(int key, [MaybeNullWhen(false)] out string value) => _tags.TryGetValue(key, out value);
        IEnumerator IEnumerable.GetEnumerator() => _tags.GetEnumerator();
    }

}
