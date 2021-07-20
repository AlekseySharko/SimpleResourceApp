using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SimpleResourceAppModels;

namespace SimpleResourceAppAsp.Repository
{
    public class ResourceRepository : IResourceRepository
    {
        private static List<Resource> Resources { get; } = new List<Resource>
        {
            new Resource {ResourceId = 1, Value = "foo"},
            new Resource {ResourceId = 2, Value = "boo"},
            new Resource {ResourceId = 3, Value = "too"},
            new Resource {ResourceId = 4, Value = "eoo"},
            new Resource {ResourceId = 5, Value = "noo"},
            new Resource {ResourceId = 6, Value = "moo"},
            new Resource {ResourceId = 7, Value = "coo"},
            new Resource {ResourceId = 8, Value = "too"},
            new Resource {ResourceId = 14, Value = "goo"},
            new Resource {ResourceId = 15, Value = "loo"},
            new Resource {ResourceId = 16, Value = "koo"},
            new Resource {ResourceId = 17, Value = "poo"},
        };

        public Task<IEnumerable<Resource>> GetResourcesAsync()
        {
            return Task.Run(() => Resources.Select(r => r.Clone()));
        }

        public Task<OperationResult> AddResource(Resource resource)
        {
            if (Resources.FirstOrDefault(r => r.ResourceId == resource.ResourceId) != null)
            {
                return ReturnResultAsTask(OperationResult.Failed("A resource with this id already exists or the provided id is invalid"));
            }

            resource.ResourceId = Resources.Select(r => r.ResourceId).Max() + 1;
            Resources.Add(resource);
            return ReturnResultAsTask(OperationResult.Successful());
        }

        public Task<OperationResult> EditResource(Resource resource)
        {
            Resource resourceToEdit = Resources.FirstOrDefault(r => r.ResourceId == resource.ResourceId);
            if (resourceToEdit == null)
            {
                return ReturnResultAsTask(OperationResult.Failed("There's no resource with such id"));
            }

            resourceToEdit.Value = resource.Value;
            return ReturnResultAsTask(OperationResult.Successful());
        }

        public Task<OperationResult> DeleteResource(Resource resource)
        {
            Resource resourceToDelete = Resources.FirstOrDefault(r => r.ResourceId == resource.ResourceId);
            if (resourceToDelete == null || !Resources.Remove(resourceToDelete))
            {
                return ReturnResultAsTask(OperationResult.Failed("There's no resource with such id"));
            }

            return ReturnResultAsTask(OperationResult.Successful());
        }

        private Task<OperationResult> ReturnResultAsTask(OperationResult operationResult)
        {
            return Task.Run(() => operationResult);
        }
    }
}
