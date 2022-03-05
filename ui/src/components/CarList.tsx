import React, { useState, useEffect, ChangeEvent } from "react";
import CarService from "../services/CarService";
import ICarData from "../types/Car";

const CarList: React.FC = () => {
    const [cars, setCars] = useState<Array<ICarData>>([]);
    useEffect(() => {
        retrieveCars();
    }, []);
    const retrieveCars = () => {
        CarService.getAll()
            .then((response: any) => {
            setCars(response.data);
            console.log(response.data);
        })
            .catch((e: Error) => {
                console.log(e);
            })
    }
    return(
        <div>
            <table className="table table-dark">
                <thead>
                <tr>
                    <th>Location</th>
                    <th>Model</th>
                    <th>Price</th>
                    <th>Make</th>
                    <th>Date Added</th>
                    <th>Warehouse</th>
                </tr>
                </thead>
                <tbody>
                {cars.map((car, idx) => (
                <tr>
                    <td>{car.Location}</td>
                    <td>{car.Model}</td>
                    <td>{car.Price}</td>
                    <td>{car.Make}</td>
                    <td>{car.DateAdded}</td>
                    <td>{car.WarehouseName}</td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default CarList;