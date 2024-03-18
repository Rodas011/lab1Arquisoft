package com.udea.vuelo.controller;

import java.util.List;
import com.udea.vuelo.model.Flight;
import com.udea.vuelo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/flights")
public class FlightController {
    @Autowired
    private FlightServiceDeparture flightServiceDeparture;
    @Autowired
    private FlightServiceArrival flightServiceArrival;
    @Autowired
    private FlightServiceAirline flightServiceAirline;
    @Autowired
    private FlightServiceDestination flightServiceDestination;
    @Autowired
    private FlightServiceOrigin flightServiceOrigin;
    @Autowired
    private FlightServicePrice flightServicePrice;

    @GetMapping("/search")
    public List<List<Flight>> searchFlights(
            @RequestParam(name ="type") String type, // Parámetro para especificar el tipo de búsqueda
            @RequestParam(required = false, name ="startDate") String startDate, // Parámetro opcional para la fecha de inicio
            @RequestParam(required = false, name="endDate") String endDate, // Parámetro opcional para la fecha de fin
            @RequestParam(required = false, name="value") String value) { // Parámetro opcional para el valor de búsqueda

        // Switch para determinar el tipo de búsqueda y llamar al servicio correspondiente
        switch (type) {
            case "departure":
                return flightServiceDeparture.searchFlights(startDate + "," + endDate); // Llama al servicio de búsqueda por salida
            case "arrival":
                return flightServiceArrival.searchFlights(startDate + "," + endDate); // Llama al servicio de búsqueda por llegada
            case "airline":
                return flightServiceAirline.searchFlights(value); // Llama al servicio de búsqueda por aerolínea
            case "destination":
                return flightServiceDestination.searchFlights(value); // Llama al servicio de búsqueda por destino
            case "origin":
                return flightServiceOrigin.searchFlights(value); // Llama al servicio de búsqueda por origen
            case "price":
                return flightServicePrice.searchFlights(value); // Llama al servicio de búsqueda por precio
            default:
                throw new IllegalArgumentException("Tipo de búsqueda no válido: " + type); // Lanza una excepción si el tipo de búsqueda no es válido
        }
    }
}
