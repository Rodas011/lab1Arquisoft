package com.udea.vuelo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.udea.vuelo.model.Flight;

import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public abstract class FlightService {
    // Ruta del archivo
    private final String filePath = "flights.json";

    // Método privado para la lógica común de búsqueda de vuelos
    private List<List<Flight>> searchFlightsByCriteria(Predicate<Flight> criteria) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream(filePath);

            if (inputStream != null) {
                Flight[] flights = objectMapper.readValue(inputStream, Flight[].class);
                return Arrays.asList(
                        Arrays.stream(flights)
                                .filter(criteria)
                                .collect(Collectors.toList()));
            } else {
                return null;
            }

        } catch (IOException e) {
            throw new RuntimeException("Error leyendo el archivo JSON", e);
        }
    }

    // Método abstracto para que las clases hijas proporcionen el criterio de búsqueda específico
    protected abstract Predicate<Flight> getCriteria(String value);

    // Método público que delega la llamada al método privado de búsqueda usando el método getCriteria que definen las clases hijas
    public List<List<Flight>> searchFlights(String value) {
        return searchFlightsByCriteria(getCriteria(value));
    }
}

