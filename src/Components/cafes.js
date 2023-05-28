import { useState, useEffect } from "react";
import { Row, Col, Table, Image } from "react-bootstrap";
import "../styles/Cafes.css";
import { FormattedMessage, FormattedDate } from "react-intl";

function Cafes() {
    const [cafes, setCafes] = useState([]);
    const [selectedCafe, setSelectedCafe] = useState(null);
    const url = 'http://localhost:3001';
    
    useEffect(() => {
        fetch(url+'/cafes').then((response) =>  response.json()).then((data) => {
            setCafes(data);
            console.log(data);
        })
    }, []);

    const handleClick = async (id) => {
        console.log("Click en el cafe con id: "+id);
        try {
            const response = await fetch(`${url}/cafes/${id}`, {
                mode: 'cors',
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setSelectedCafe(data);
            }
        } catch (error) {
            console.error("Error fetching coffee details:", error);
        }
    }
    
    return (
        <Row className="justify-content-md-around">
            <Col md={8}>
                <Table >
                  <thead className="table-dark">
                        <tr>
                        <th scope="col">
                            <FormattedMessage id="Id" />
                        </th>
                        <th scope="col">
                            <FormattedMessage id="Name" />
                        </th>
                        <th scope="col">
                            <FormattedMessage id="Type" />
                        </th>
                        <th scope="col">
                            <FormattedMessage id="Region" />
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {cafes.map((cafe) => (
                        <tr onClick={() => handleClick(cafe.id)}>
                        <th scope="row">{cafe.id}</th>
                        <td>{cafe.nombre}</td>
                        <td>{cafe.tipo}</td>
                        <td>{cafe.region}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Col>
            <Col md={3}>
                    {selectedCafe ? (
                        <div className="CafeDetail-box">
                            <h1 className="CafeDetail-title">{selectedCafe.nombre.toUpperCase()}</h1>
                            <p>
                                <FormattedDate value={selectedCafe.fecha_cultivo} year='numeric' month='numeric' day='numeric'/>
                            </p>
                            <Image className="CafeDetail-image" src={selectedCafe.imagen} alt="Cafe" />
                            <p className="CafeDetail-text">
                                <FormattedMessage id="Notes" />
                            </p>
                            <p className="CafeDetail-text">{selectedCafe.notas}</p>
                            <p className="CafeDetail-height">
                                <FormattedMessage id="GrownMsg" /> {selectedCafe.altura} <FormattedMessage id="GrownMeasure" />
                            </p>
                            
                        </div>
                        ) : (
                            <p>
                                <FormattedMessage id="ClickToView" />
                            </p>
                        )}
                        
                </Col>
            </Row>


    );
}

export default Cafes;