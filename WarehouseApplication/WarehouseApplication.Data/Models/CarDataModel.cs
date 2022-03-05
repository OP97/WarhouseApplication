using System.Collections.Generic;

namespace WarehouseApplication.Data.Models
{
    public class CarDataModel
    {
        public CarDataModel(string location, List<VehicleDataModel> vehicles)
        {
            Location = location;
            Vehicles = vehicles;
        }

        public string Location { get; }
        public List<VehicleDataModel> Vehicles { get; private set; }

    }
}