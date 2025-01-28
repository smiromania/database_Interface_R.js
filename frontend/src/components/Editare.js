import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Editare() {
  const [stiluri, setStiluri] = useState([]);
  const [muzicieni, setMuzicieni] = useState([]);
  const [concerte, setConcerte] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [stiluriRes, muzicieniRes, concerteRes] = await Promise.all([
        axios.get('http://localhost:5000/stiluri'),
        axios.get('http://localhost:5000/muzicieni'),
        axios.get('http://localhost:5000/concerte'),
      ]);
      setStiluri(stiluriRes.data);
      setMuzicieni(muzicieniRes.data);
      setConcerte(concerteRes.data);
    } catch (error) {
      console.error('Eroare la preluarea datelor:', error);
    }
  };

  const deleteItem = async (endpoint, id) => {
    try {
      await axios.delete(`http://localhost:5000/${endpoint}/${id}`);
      fetchData();
    } catch (error) {
      console.error(`Eroare la ștergere:`, error);
    }
  };

  const editItem = (endpoint, id) => {
    navigate(`/editare/${endpoint}/${id}`);
  };

  const addItem = (endpoint) => {
    navigate(`/adaugare/${endpoint}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit</h2>

      <div className="mb-8">
        <h3 className="font-bold mb-2">Stiluri Muzicale</h3>
        <button
          onClick={() => addItem('stiluri')}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Adaugă Stil Muzical
        </button>
        <table className="table-auto w-full border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nume</th>
              <th className="border px-4 py-2">Descriere</th>
              <th className="border px-4 py-2">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {stiluri.map((stil) => (
              <tr key={stil.idStil}>
                <td className="border px-4 py-2">{stil.idStil}</td>
                <td className="border px-4 py-2">{stil.Nume}</td>
                <td className="border px-4 py-2">{stil.Descriere}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => editItem('stiluri', stil.idStil)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Modifică
                  </button>
                  <button
                    onClick={() => deleteItem('stiluri', stil.idStil)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Șterge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="font-bold mb-2">Muzicieni</h3>
        <button
          onClick={() => addItem('muzicieni')}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Adaugă Muzician
        </button>
        <table className="table-auto w-full border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nume</th>
              <th className="border px-4 py-2">Prenume</th>
              <th className="border px-4 py-2">Nume de Scenă</th>
              <th className="border px-4 py-2">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {muzicieni.map((muzician) => (
              <tr key={muzician.idMuzician}>
                <td className="border px-4 py-2">{muzician.idMuzician}</td>
                <td className="border px-4 py-2">{muzician.Nume}</td>
                <td className="border px-4 py-2">{muzician.Prenume}</td>
                <td className="border px-4 py-2">{muzician.NumeDeScena}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => editItem('muzicieni', muzician.idMuzician)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Modifică
                  </button>
                  <button
                    onClick={() => deleteItem('muzicieni', muzician.idMuzician)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Șterge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="font-bold mb-2">Concerte</h3>
        <button
          onClick={() => addItem('concerte')}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Adaugă Concert
        </button>
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Data</th>
              <th className="border px-4 py-2">Scena</th>
              <th className="border px-4 py-2">Ora</th>
              <th className="border px-4 py-2">Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {concerte.map((concert) => (
              <tr key={concert.idConcert}>
                <td className="border px-4 py-2">{concert.idConcert}</td>
                <td className="border px-4 py-2">{concert.DataCantarii}</td>
                <td className="border px-4 py-2">{concert.Scena}</td>
                <td className="border px-4 py-2">{concert.Ora}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => editItem('concerte', concert.idConcert)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Modifică
                  </button>
                  <button
                    onClick={() => deleteItem('concerte', concert.idConcert)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Șterge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Editare;