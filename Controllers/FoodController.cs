using frontend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace frontend.Controllers
{
    public class FoodController : Controller
    {
        
        //[HttpGet]
        //[Route("FoodMenu")]
        public async Task<HttpResponseMessage> GetFood()
        {
            Console.WriteLine("Inside index");
            List<FoodModel> foods = new List<FoodModel>();
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                HttpClientHandler clientHandler = new HttpClientHandler();
                // clientHandler.ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => { return true; };

                HttpClient client = new HttpClient(clientHandler);
                response = await client.GetAsync("https://localhost:3000/Food");

                response.EnsureSuccessStatusCode();
                return response;
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
            }

            return response;

        }
        
    }
}
