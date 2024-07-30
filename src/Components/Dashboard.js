import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get('http://api.aviationstack.com/v1/flights', {
          params: {
            access_key: '19ffa78ceba6b270fc4bdbdd461be967',
          },
        });
        console.log(response);  // Debugging: Log the full response
        setFlights(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flight data:', error.response || error.message);
        setLoading(false);
      }
    };

    fetchFlightData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Flight Status Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Flight</th>
            <th>Airline</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Status</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.flight.iata}>
              <td>{flight.flight.iata}</td>
              <td>{flight.airline.name}</td>
              <td>{`${flight.departure.airport} (${flight.departure.iata})`}</td>
              <td>{`${flight.arrival.airport} (${flight.arrival.iata})`}</td>
              <td>{flight.flight_status}</td>
              <td>{new Date(flight.departure.scheduled).toLocaleString()}</td>
              <td>{flight.arrival.scheduled ? new Date(flight.arrival.scheduled).toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
