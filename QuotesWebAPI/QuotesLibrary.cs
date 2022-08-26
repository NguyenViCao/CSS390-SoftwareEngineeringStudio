using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Linq;

namespace Quotes
{
    public sealed class QuotesLibrary
    {
        public List<Quote> quotes;

        // Singleton: No public constructor
        private QuotesLibrary()
        {
            string jsonQuotesText = System.IO.File.ReadAllText("QuotesText.json");
            quotes = JsonSerializer.Deserialize<List<Quote>>(jsonQuotesText);
        }
        public static QuotesLibrary Instance { get { return NestedQuotesLibrary.instance; } }

        // Added nested class used for lazy load signleton pattern.  Will only instantiate when first used - not eager load.
        private class NestedQuotesLibrary
        {
            static NestedQuotesLibrary() {}
            internal static readonly QuotesLibrary instance = new QuotesLibrary();
        }

        public Quote GetByID(Guid guid)
        {
            // Using Linq
            return quotes.FirstOrDefault(quote => quote.Id == guid);
        }

        public List<Quote> GetByAuthor(string author)
        {   
            // Linq Example
            // return quotes.FindAll(quote => quote.Author.ToLowerInvariant() == author.ToLowerInvariant());

            // Standard Example
            List<Quote> retList = new List<Quote>();
            foreach (Quote quote in quotes)
            {
                if (quote.Author.ToLowerInvariant().Trim() == author.ToLowerInvariant().Trim())
                {
                    retList.Add(quote);
                }
            }
            return retList.Count > 0 ? retList : null;
        }

        // Leftover tools code.  Use for example to create a new quote object by code and serialize to a flat file.
        private static void createSampleQuotes()
        {
            Quote myQuote = new Quote();
            myQuote.Author = "lala";
            myQuote.Id = Guid.NewGuid();
            myQuote.CreatedDate = DateTime.Today;
            myQuote.Text = "Wah Wah.";

            Quote myQuote1 = new Quote();
            myQuote1.Author = "shauns";
            myQuote1.Id = Guid.NewGuid();
            myQuote1.CreatedDate = DateTime.Today;
            myQuote1.Text = "Ha Ha.";
            
            List<Quote> myQuotes = new List<Quote>();
            myQuotes.Add(myQuote);
            myQuotes.Add(myQuote1);

            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(myQuotes, options);

            System.IO.File.WriteAllText("QuotesText.Json", jsonString);
        }
    }
}