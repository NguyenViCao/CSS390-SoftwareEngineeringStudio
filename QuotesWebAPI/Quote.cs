using System;
using System.Text.Json.Serialization;

namespace Quotes
{
    public class Quote
    {
        [JsonInclude]
        public Guid Id { get; set; }

        [JsonInclude]
        public string Text { get; set; }

        [JsonInclude]
        public string Author { get; set; }

        [JsonInclude]
        public DateTime CreatedDate { get; set; }
    }
}
