using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SimpleResourceAppModels;

namespace SimpleResourceAppAsp.Controllers
{
    [Route("api/resources")]
    public class ResourceController : Controller
    {
        private IResourceRepository ResourceRepository { get; }
        public ResourceController(IResourceRepository resourceRepository) => ResourceRepository = resourceRepository;

        [HttpGet]
        public async Task<IActionResult> GetResources()
        {
            return Ok(await ResourceRepository.GetResourcesAsync());
        }
    }
}
