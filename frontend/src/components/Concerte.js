import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Concerte() {
  const [concerte, setConcerte] = useState([]);

  useEffect(() => {
    fetchConcerte();
  }, []);

  const fetchConcerte = async () => {
    try {
      const response = await axios.get('http://localhost:5000/concerte');
      setConcerte(response.data);
    } catch (error) {
      console.error('Eroare la preluarea concertelor:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      
      <div className="bg-white rounded shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">LINE-UP</h2>
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Gen Muzical</th>
              <th className="border px-4 py-2">Nume de Scenă</th>
              <th className="border px-4 py-2">Data</th>
              <th className="border px-4 py-2">Scena</th>
              <th className="border px-4 py-2">Ora</th>
            </tr>
          </thead>
          <tbody>
            {concerte.map((concert) => (
              <tr key={concert.idConcert} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-center">{concert.idConcert}</td>
                <td className="border px-4 py-2 text-center">{concert.GenMuzical}</td>
                <td className="border px-4 py-2 text-center">{concert.NumeDeScena}</td>
                <td className="border px-4 py-2 text-center">{concert.DataCantarii}</td>
                <td className="border px-4 py-2 text-center">{concert.Scena}</td>
                <td className="border px-4 py-2 text-center">{concert.Ora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Concerte;
