import React from 'react';

const PrintButton = () => {
  const handlePrint = () => {
    window.print(); // Yeh function print dialog open karta hai
  };

  return (
    <button
      onClick={handlePrint}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Print Receipt
    </button>
  );
};

export default PrintButton;
