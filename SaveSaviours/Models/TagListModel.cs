namespace SaveSaviours.Models {
    public class TagModel {
        public TagModel(int value, string label) {
            Value = value;
            Label = label;
        }

        public int Value { get; }
        public string Label { get; }
    }

}
