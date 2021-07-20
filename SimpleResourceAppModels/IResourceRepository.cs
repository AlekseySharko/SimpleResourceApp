using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimpleResourceAppModels
{
    public interface IResourceRepository
    {
        public Task<IEnumerable<Resource>> GetResourcesAsync();
        public Task<OperationResult> AddResource(Resource resource);
        public Task<OperationResult> EditResource(Resource resource);
        public Task<OperationResult> DeleteResource(Resource resource);
    }
}
