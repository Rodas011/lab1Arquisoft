package com.udea.vuelo.service;

import com.udea.vuelo.model.Flight;
import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class FlightServiceAirline extends FlightService {
    @Override
    // Implementación de método abstracto con lógica propia para la búsqueda por "airline"
    protected Predicate<Flight> getCriteria(String value) {
        return flight -> flight.getAirline().equals(value);
    }
}