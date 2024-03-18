import React, { useState } from "react";
import axios from "axios";

function FlightSearch({ type, label, inputType }) {
    //Inicializamos las variables para guardar los estados 
    const [value, setValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);

    //Funcion para buscar los vuelos dependiendo del tipo de busqueda
    const handleSearch = async () => {
        setLoading(true);
        try {
            let response;
            //Si el tipo de busqueda es por fecha
            if(inputType === 'date') {
                response = await axios.get(`http://localhost:8080/flights/search?type=${type}&startDate=${startDate}&endDate=${endDate}`);
            }
            //Para el resto, aerolinea, destino, origen, precio
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


    
    return (
        <div className="buscarContainer">
            <div className="buscarPor">
                <h2>Buscar por</h2>
                {/*Dependiendo del tipo de busqueda, se mostrara un input de tipo date. Sino se muestra un input tipo text o int dependiendo del value */}
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
                {/* Boton para buscar */}
                <button className="botonAccion" onClick={handleSearch}>Buscar </button>
            </div>

            {loading && <p>Cargando....</p>}

            <h2>Resultados de la busqueda</h2>
            
            <div className="innerContainer">
            {/*Si hay vuelos, se muestran en una lista y personalizamos el formato de la lista para que se acomode en el contenedor */}
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