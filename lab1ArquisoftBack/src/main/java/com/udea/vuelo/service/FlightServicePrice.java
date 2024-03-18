package com.udea.vuelo.service;

import com.udea.vuelo.model.Flight;
import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class FlightServicePrice extends FlightService {
    @Override
    protected Predicate<Flight> getCriteria(String value) {
        return flight -> String.valueOf(flight.getPrice()).equals(value);
    }
}