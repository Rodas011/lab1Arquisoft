import React, { useState } from "react";
import axios from "axios";

function FlightSearch({ type, label, inputType }) {
    const [value, setValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            let response;
            if(inputType === 'date') {
                response = await axios.get(`http://localhost:8080/flights/search?type=${type}&startDate=${startDate}&endDate=${endDate}`);
            }
            else {
                response = await axios.get(`http://localhost:8080/flights/search?type=${type}&value=${value}`);
            }
            setFlights(response.data);
            console.log(response.data);
        } catch (error) {
            console.log('Error en la carga de datos de vuelos:', error);
        }
        setLoading(false);
    };

    if(inputType === 'date'){

    }

    return (
        <div className="buscarContainer">
            <div className="buscarPor">
                <h2>Buscar por</h2>
                
                {inputType === 'date' ? (
                    <>
                        <div>
                            <label >Fecha de Inicio:</label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>

                        <div>
                            <label>Fecha Fin:</label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </>
                ) : (
                    <div>
                        <label>{label}:</label>
                        <input type={inputType} value={value} onChange={(e) => setValue(e.target.value)} />
                    </div>
                )}

                <button className="botonAccion" onClick={handleSearch}>Buscar </button>
            </div>

            {loading && <p>Cargando....</p>}

            <h2>Resultados de la busqueda</h2>
            
            <div className="innerContainer">
                {flights.length > 0 ? (
                    <ul className="lista">
                        {flights.map((flight, index) => (
                        <li key={index}>
                            {Object.keys(flight).map(key => (
                            flight.hasOwnProperty(key) && <div key={key}>
                                {`${key}: ${typeof flight[key] === 'object' ? JSON.stringify(flight[key], null, 2) : flight[key]}`}
                            </div>
                            ))}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No se encontraron vuelos</p>
                )}
            </div>
        </div>
    );
}

export default FlightSearch;