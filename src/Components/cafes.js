import { useState, useEffect } from "react";

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
        <div classname="container">
            <div className="row">
                <div className="col-md-8">
                <table class="table table-striped">
                  <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Region</th>
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
                </table>
                <div className="col-md-4">
                    {selectedCafe ? (
                        <div>
                            <h1>Cafe Details - ID: {selectedCafe.id}</h1>
                            <p>Nombre: {selectedCafe.nombre}</p>
                            <p>Tipo: {selectedCafe.tipo}</p>
                            <p>Región: {selectedCafe.region}</p>
                            <p>Notas: {selectedCafe.notas}</p>
                            <p>Fecha de Cultivo: {selectedCafe.fecha_cultivo}</p>
                            <p>Altura: {selectedCafe.altura}</p>
                            <img src={selectedCafe.imagen} alt="Cafe" />
                        </div>
                        ) : (
                            <p>Click on a coffee to see details</p>
                        )}
                        
                </div>
            </div>
            </div>
        </div>


    );
}

export default Cafes;