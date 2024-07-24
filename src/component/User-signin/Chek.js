import React, { useState } from 'react';

const Chek = () => {
  // Step 1: Set up state for selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Step 2: Create a data structure for available seats (an array of objects)
  const availableSeats = [
    { id: 1, seatNumber: 'A1', status: 'available' },
    { id: 2, seatNumber: 'A2', status: 'available' },
    { id: 3, seatNumber: 'A3', status: 'available' },
    // Add more seats here
  ];

  // Step 3: Render the seats
  const renderSeats = () => {
    return availableSeats.map((seat) => (
      <div
        key={seat.id}
        className={`seat ${seat.status} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
        onClick={() => handleSeatClick(seat.id)}
      >
        {seat.seatNumber}
      </div>
    ));
  };

  // Step 4: Click handler to select/deselect seats
  const handleSeatClick = (seatId) => {
    // Check if the seat is already selected
    if (selectedSeats.includes(seatId)) {
      // Deselect the seat by removing it from the selectedSeats array
      setSelectedSeats((prevSelectedSeats) => prevSelectedSeats.filter((id) => id !== seatId));
    } else {
      // Select the seat by adding it to the selectedSeats array
      setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatId]);
    }
  };

  // Step 5: Render the seat selection component
  return (
    <div className="seat-selection">
      <h2>Select Your Seats</h2>
      <div className="seat-grid">{renderSeats()}</div>
      <p>Selected Seats: {selectedSeats.join(', ')}</p>
      {/* Step 6: You can add pricing and confirmation buttons here */}
    </div>
  );
};

export default Chek;
