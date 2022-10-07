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
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                DotNetEnv.Env.Load();
                string environment = Environment.GetEnvironmentVariable("CURRENT_ENV") == "PRODUCTION" ? "PRODUCTION" : "DEVELOPMENT";
                string url = Environment.GetEnvironmentVariable(environment) + "/Problem";
                Console.WriteLine(url);

                HttpClient client = new HttpClient();

                response = await client.GetAsync(url);
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }

            return response;
        }
    }
}
