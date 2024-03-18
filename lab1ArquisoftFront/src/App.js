import React, { useState } from 'react';
import FlightSearchGeneral from './FlightSearchGeneral';

function App() {
  //Inicializamos el estado activo para abrir o cerrar dependiendo del boton que se presione
  const [activeSearch, setActiveSearch] = useState(null);

  const handleClick = (type) => {
    if (activeSearch === type) {
      setActiveSearch(null);
    } else {
      setActiveSearch(type);
    }
  }

  //Creamos la estructura de la pagina
  return (
    <div className='bigContainer'>
      <h1 className='titulo'>Buscador de Vuelos</h1>
      <h2 className='titulo'>Seleccione el tipo de búsqueda</h2>

      {/* Botones para seleccionar el tipo de busqueda */}
      <div className='botones'>
        <button onClick={() => handleClick('arrival')}>Llegada</button>
        <button onClick={() => handleClick('departure')}>Salida</button>
        <button onClick={() => handleClick('airline')}>Aerolínea</button>
        <button onClick={() => handleClick('destination')}>Destino</button>
        <button onClick={() => handleClick('origin')}>Origen</button>
        <button onClick={() => handleClick('price')}>Precio</button>
      </div>

      {/* Dependiendo del boton que se presione, se mostrara el componente FlightSearchGeneral con los parametros que le definamos*/}
      <div className='buscador'>
        {activeSearch === 'arrival' && <FlightSearchGeneral type="arrival" label="Llegada" inputType="date" />}
        {activeSearch === 'departure' && <FlightSearchGeneral type="departure" label="Salida" inputType="date" />}
        {activeSearch === 'airline' && <FlightSearchGeneral type="airline" label="Aerolínea" inputType="text"/>}
        {activeSearch === 'destination' && <FlightSearchGeneral type="destination" label="Destino" inputType="text" />}
        {activeSearch === 'origin' && <FlightSearchGeneral type="origin" label="Origen" inputType="text"/>}
        {activeSearch === 'price' && <FlightSearchGeneral type="price" label="Precio" inputType="int"/>}
      </div>
    </div>
  );
}

export default App;