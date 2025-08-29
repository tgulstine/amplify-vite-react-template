import React from 'react';

const MyTable = ({ data }) => {
  // Assuming 'data' is an array of objects, e.g., [{ id: 1, name: 'John', age: 30 }]
  const columns = Object.keys(data[0] || {}); // Extract column headers from the first data object

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id || JSON.stringify(row)}> {/* Use a unique key for each row */}
            {columns.map((col) => (
              <td key={`${row.id || JSON.stringify(row)}-${col}`}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyTable;