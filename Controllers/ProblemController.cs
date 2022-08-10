using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;

using frontend.Models;
using Newtonsoft.Json;

namespace frontend.Controllers
{
    public class ProblemController : Controller
    {
        //[Route("problem")]
        public async Task<HttpResponseMessage> GetProblem()
        {
            string url = "https://localhost:3000/Problem";

            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(url);

            return response;
        }
    }
}
