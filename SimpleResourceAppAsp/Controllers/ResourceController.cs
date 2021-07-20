using Microsoft.AspNetCore.Mvc;

namespace SimpleResourceAppAsp.Controllers
{
    [Route("api/resources")]
    public class ResourceController : Controller
    {
        [HttpGet]
        public IActionResult GetResources()
        {
            return BadRequest();
        }
    }
}
