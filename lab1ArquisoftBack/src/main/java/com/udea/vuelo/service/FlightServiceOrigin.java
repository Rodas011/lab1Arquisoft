package com.udea.vuelo.service;

import com.udea.vuelo.model.Flight;
import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class FlightServiceOrigin extends FlightService {
    @Override
    protected Predicate<Flight> getCriteria(String value) {
        return flight -> flight.getOrigin().equals(value);
    }
}