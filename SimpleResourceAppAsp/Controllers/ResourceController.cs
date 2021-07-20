using System;
using System.Linq;
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

        [HttpPost]
        public async Task<IActionResult> PostResource([FromBody] Resource resource)
        {
            return GetResultFromOperationResult(await ResourceRepository.AddResource(resource));
        }

        [HttpPut]
        public async Task<IActionResult> PutResource([FromBody] Resource resource)
        {
            return GetResultFromOperationResult(await ResourceRepository.EditResource(resource));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResource(long id)
        {
            return GetResultFromOperationResult(await ResourceRepository.DeleteResource(new Resource{ResourceId = id}));
        }

        private IActionResult GetResultFromOperationResult(OperationResult operationResult)
        {
            if (operationResult.Success)
            {
                return Ok();
            }

            return BadRequest(operationResult.Message);
        }
    }
}
