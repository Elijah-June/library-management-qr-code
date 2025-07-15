import React from 'react';

const Overdue = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Overdue Books & Students</h1>
      {/* List of overdue books/students will go here */}
      <div className="text-gray-500">No overdue books or students.</div>
    </div>
  );
};

export default Overdue;