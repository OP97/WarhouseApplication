import http from "../common"
import {ICarData} from "../types/Car";

const getAll = () => {
    return http.get<Array<ICarData>>("/car");
}

const CarService = {
    getAll
};

export default CarService;