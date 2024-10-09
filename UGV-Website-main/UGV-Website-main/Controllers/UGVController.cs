using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using UGV.Models;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace UGV.Controllers
{
    [ApiController]
    public class UGVController : ControllerBase
    {
        protected UgvdbContext _context;
        private readonly HttpClient _httpClient;
        public UGVController(UgvdbContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpPost("api/ugv/submitContact/")]
        public IActionResult SubmitContactForm(JObject formData)
        {
#pragma warning disable CS8604, CS8600 // Possible null reference argument.
            string name = formData["name"].Value<string>();
            string email = formData["email"].Value<string>();
            string message = formData["message"].Value<string>();
#pragma warning restore CS8604, CS8602 // Possible null reference argument.

            /* Save the user query to the database */
            
            return Ok();
        }

        [HttpGet("api/ugv/getStream/{vehicleId}")]
        public async Task<IActionResult> proxy(string vehicleId)
        {
            // Fetch the HTTP content using HttpClient
            var httpContent = await _httpClient.GetStringAsync("http://http://172.20.10.13:8000/index.html");

            // Create an HTTPS content by replacing the URLs with HTTPS URLs
            var httpsContent = httpContent.Replace("http://", "https://");

            // Return the HTTPS content
            return Content(httpsContent, "text/html");
        }

        [HttpGet("api/ugv/getMissions/{vehicleId}")]
        [Authorize]
        public IActionResult GetMissions(int vehicleId)
        {
            // sample return format
            List<JObject> missions = new()
            {
                new JObject
                {
                    new JProperty("missionId", 1234),
                    new JProperty("missionName", "mission 1"),
                    new JProperty("noOfSurvivors", 5),
                    new JProperty("locationOfSurvivors", new List<JObject>
                    {
                        new JObject
                        {
                            new JProperty("lat", 1234),
                            new JProperty("long", 26)
                        }
                    })
                }
            };
            return Ok(missions);
        }

        [HttpPost("api/ugv/addMissions/")]
        [Authorize]
        public IActionResult AddMissions(JObject missionData)
        {
#pragma warning disable CS8604, CS8600 // Possible null reference argument.
            int ugvId = missionData["ugvId"].Value<int>();
            string missionName = missionData["missionName"].Value<string>();
            int numberOfSurvivors = missionData["numberOfSuvivors"].Value<int>();
#pragma warning restore CS8604, CS8602 // Possible null reference argument.

            /* add mission to UGV */

            return Ok();
        }



        [HttpGet("api/ugv/getLocation/{vehicleId}")]
        [Authorize]
        public IActionResult GetLocation(int vehicleId)
        {
            int latitude = 0;
            int longitude = 0;
            return Ok(new JObject
            {
                new JProperty("lat", latitude),
                new JProperty("long", longitude)
            });
        }
    }
}
