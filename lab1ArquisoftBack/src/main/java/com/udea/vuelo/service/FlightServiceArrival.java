package com.udea.vuelo.service;

import com.udea.vuelo.model.Flight;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.function.Predicate;

@Service
public class FlightServiceArrival extends FlightService {

    @Override
    // Implementación de método abstracto con lógica propia para la búsqueda de "departure" usando un rango de fechas
    protected Predicate<Flight> getCriteria(String value) {
        // Separar las fechas de inicio y fin de la cadena value
        String[] dates = value.split(",");
        LocalDate startDate = LocalDate.parse(dates[0]);
        LocalDate endDate = LocalDate.parse(dates[1]);

        // Devolver el predicado que filtra por fecha de salida en el rango especificado
        return flight -> isDateInRange(flight.getArrivalDate(), startDate, endDate);
    }

    // Verificar si la fecha está en el rango correcto
    private boolean isDateInRange(LocalDate dateToCheck, LocalDate startDate, LocalDate endDate) {
        return !dateToCheck.isBefore(startDate) && !dateToCheck.isAfter(endDate);
    }
}
