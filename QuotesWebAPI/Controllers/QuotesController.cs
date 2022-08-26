using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace Quotes.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuotesController : ControllerBase
    {
        private readonly ILogger<QuotesController> _logger;
        private readonly QuotesLibrary library;
        public QuotesController(ILogger<QuotesController> logger)
        {
            _logger = logger;
            library = QuotesLibrary.Instance;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(library.quotes);
        }

        [HttpGet("{id:guid}")]
        public IActionResult Get(Guid id)
        {
            Quote result = library.GetByID(id);
            return (result==null) ? NotFound(id) : Ok(result);
        }

        [HttpGet("Author/{author}")]
        public IActionResult Get(string author)
        {
            List<Quote> result = library.GetByAuthor(author);
            return (result==null) ? NotFound(author) : Ok(result);
        }
    }
}