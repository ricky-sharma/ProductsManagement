namespace SQLDataEntity.Models
{
    public class Product
    {
        public Guid ID { get; set; }
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public string? Type { get; set; }
        public bool Active { get; set; }
    }
}
