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
    public class GameController : Controller
    {
        // public IActionResult Index()
        [HttpGet]
        [Route("Game/{b?}/{h?}")]
        #nullable enable
        public async Task<ActionResult> Index(string? b, string? h)
        {
            //b = bank balance, h = hunger bar width
            if (b != null)
                ViewData["bank"] = b;
            else
                ViewData["bank"] = "0";

            if (h != null)
                ViewData["hunger"] = h;
            else
                ViewData["hunger"] = "100%";

            Console.WriteLine(b);

            //User selects start button

            //Get food data
            FoodController foodController = new FoodController();
            HttpResponseMessage response = await foodController.GetFood();
            string responseContent = await response.Content.ReadAsStringAsync();

            List<FoodModel> foods = JsonConvert.DeserializeObject<List<FoodModel>>(responseContent);
            ViewData["foodList"] = foods;

            //Get Problem data          
            ProblemController problemController = new ProblemController();
            response = await problemController.GetProblem();
            responseContent = await response.Content.ReadAsStringAsync();
            ProblemModel problem = JsonConvert.DeserializeObject<ProblemModel>(responseContent);
            ViewData["problem"] = problem;

            

            return View("Game");
        }

        [HttpGet]
        [Route("NewProblem")]
        public async Task<ProblemModel> NewProblem()
        {
            ProblemController problemController = new ProblemController();
            HttpResponseMessage response = await problemController.GetProblem();
            string responseContent = await response.Content.ReadAsStringAsync();
            ProblemModel problem = JsonConvert.DeserializeObject<ProblemModel>(responseContent);
            return problem;

        }
    }
}
