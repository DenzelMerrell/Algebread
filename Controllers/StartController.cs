using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using frontend.Models;
using System.Text.Json;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

using System.Net.Http;

namespace frontend.Controllers
{
    public class StartController : Controller
    {
        private readonly ILogger<StartController> _logger;

        public StartController(ILogger<StartController> logger)
        {
            _logger = logger;
        }

        // public IActionResult Index()
        [HttpGet]
        [Route("/")]
        public IActionResult Index()
        {
            return View("Start");
        }
    }
}
