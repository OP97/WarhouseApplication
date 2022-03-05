namespace WarehouseApplication.Data.Models
{
    public class WarehouseDataModel
    {
        public WarehouseDataModel(int _id, string name, LocationDataModel location, CarDataModel cars)
        {
            Id = _id;
            Name = name;
            Location = location;
            Car = cars;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public LocationDataModel Location { get; set; }
        public CarDataModel Car { get; set; }

    }
}