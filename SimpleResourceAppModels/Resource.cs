namespace SimpleResourceAppModels
{
    public class Resource
    {
        public long ResourceId { get; set; }
        public string Value { get; set; }

        public Resource Clone()
        {
            return new Resource
            {
                ResourceId = ResourceId,
                Value = Value
            };
        }
    }
}
