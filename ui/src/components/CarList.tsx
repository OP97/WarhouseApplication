import React, {useState, useEffect} from "react";
import CarService from "../services/CarService";
import {ICarData, ModalInfoData} from "../types/Car";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator"
import {Button, ListGroup, ListGroupItem, Modal} from "react-bootstrap";

const CarList = () => {
    const [cars, setCars] = useState<Array<ICarData>>([]);
    const [modalInfo, setModalInfo] = useState<ModalInfoData>({Location: "", Price: 0, Make: "", Model: "", WarehouseName: ""});
    const [sum, setSum] = useState<number>(0);
    const [cardItemCounter, setCardItemCounter] = useState<number>(0);
    const [showCardModal, setShowCardModal] = useState(false);
    const [cardItemList, setCardItemList] = useState<Array<ModalInfoData>>([]);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const handleCloseCardModal = () => setShowCardModal(false);
    const handleShowCardModal = () => setShowCardModal(true);
    const handleCloseDetailModal = () => setShowDetailModal(false);
    const handleShowDetailModal = () => setShowDetailModal(true);

    useEffect(() => {
        retrieveCars();
    }, []);
    const retrieveCars = () => {
        CarService.getAll()
            .then((response: any) => {
                setCars(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    const licenseCellFormatter = (cell: any) => {
        return cell ? "Yes" : "No";
    }

    const columns = [
        {dataField: "Model", text: "Model"},
        {dataField: "Make", text: "Make"},
        {dataField: "Price", text: "Price"},
        {dataField: "YearModel", text: "Year Model"},
        {dataField: "Licensed", text: "Licensed", formatter: licenseCellFormatter}
    ];

    const rowEvents = {
        onClick: (e: any, row: any) => {
            if (row.Licensed) {
                setModalInfo(row);
                updateDetailModalVisibility();
            }
        }
    }

    const handleAddToCard = () => {
        setSum(sum + modalInfo.Price);
        setCardItemCounter(cardItemCounter + 1);
        setCardItemList(oldList => [...oldList, modalInfo]);
        handleCloseDetailModal();
    }

    const handleEmptyCard = () => {
        setSum(0);
        setCardItemCounter(0);
        setCardItemList([]);
    }

    const updateDetailModalVisibility = () => {
        handleShowDetailModal();
    }

    const updateCardModalVisibility = () => {
        handleShowCardModal()
    }

    const ModalCardContent = () => {
        return (
            <Modal show={showCardModal} onHide={handleCloseCardModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {cardItemList.map(item => (
                            <ListGroupItem>
                                Model: {item.Model} <br/>
                                Make: {item.Make} <br/>
                                Location: {item.Location} <br/>
                                Warehouse: {item.WarehouseName} <br/>
                                Price: ${item.Price} <br/>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                    <div>Total: ${sum}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleEmptyCard}>
                        Empty Card
                    </Button>
                    <Button variant="secondary" onClick={handleCloseCardModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    const ModalDetailContent = (e: any, row: any) => {
        return (
            <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <ol>Location: {modalInfo.Location}</ol>
                        <ol>Warehouse: {modalInfo.WarehouseName}</ol>
                        <ol>Price: ${modalInfo.Price}</ol>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleAddToCard}>
                        Add to card
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDetailModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };
    return (
        <div>
            <Button className="mt-3 mb-3" onClick={updateCardModalVisibility}>
                <div>Card ({cardItemCounter})</div>
            </Button>
            <BootstrapTable
                keyField="idx"
                data={cars}
                columns={columns}
                pagination={paginationFactory({custom: false})}
                rowEvents={rowEvents}
            />
            {showDetailModal ? <ModalDetailContent/> : undefined}
            {showCardModal ? <ModalCardContent/> : undefined}
        </div>

    )
};

export default CarList;