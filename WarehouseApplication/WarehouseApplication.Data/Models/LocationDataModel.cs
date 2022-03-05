namespace WarehouseApplication.Data.Models
{
    public class LocationDataModel
    {
        public LocationDataModel(decimal lat, decimal @long)
        {
            Latitude = lat;
            Longitude = @long;
        }
        
        public decimal Latitude { get; private set; }
        public decimal Longitude { get; private set; }

    }
}