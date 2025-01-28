import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddForm() {
  const { endpoint } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [stiluri, setStiluri] = useState([]);
  const [muzicieni, setMuzicieni] = useState([]);

  useEffect(() => {
    if (endpoint === 'concerte') {
      fetchDropdownData();
    }
  }, [endpoint]);

  const fetchDropdownData = async () => {
    try {
      const [stiluriRes, muzicieniRes] = await Promise.all([
        axios.get('http://localhost:5000/stiluri'),
        axios.get('http://localhost:5000/muzicieni'),
      ]);
      setStiluri(stiluriRes.data);
      setMuzicieni(muzicieniRes.data);
    } catch (error) {
      console.error('Eroare la preluarea datelor pentru dropdown-uri:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/adaugare/${endpoint}`, formData);
      alert('Element adăugat cu succes!');
      navigate('/editare');
    } catch (error) {
      console.error('Eroare la adăugarea elementului:', error);
    }
  };

  const renderFormFields = () => {
    if (endpoint === 'stiluri') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="Nume">
              Nume
            </label>
            <input
              type="text"
              id="Nume"
              name="Nume"
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="Descriere">
              Descriere
            </label>
            <textarea
              id="Descriere"
              name="Descriere"
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            ></textarea>
          </div>
        </>
      );
    } else if (endpoint === 'muzicieni') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="Nume">
              Nume
            </label>
            <input
              type="text"
              id="Nume"
              name="Nume"
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="Prenume">
              Prenume
            </label>
            <input
              type="text"
              id="Prenume"
              name="Prenume"
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="NumeDeScena">
              Nume de Scenă
            </label>
            <input
              type="text"
              id="NumeDeScena"
              name="NumeDeScena"
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
        </>
      );
    } else if (endpoint === 'concerte') {
      return (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="DataCantarii">
              Data
            </label>
            <input
              type="date"
              id="DataCantarii"
              name="DataCantarii"
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="Scena">
              Scena
            </label>
            <input
              type="text"
              id="Scena"
              name="Scena"
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="Ora">
              Ora
            </label>
            <input
              type="time"
              id="Ora"
              name="Ora"
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="idStil">
              Stil Muzical
            </label>
            <select
              id="idStil"
              name="idStil"
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Selectează un stil</option>
              {stiluri.map((stil) => (
                <option key={stil.idStil} value={stil.idStil}>
                  {stil.Nume}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="idMuzician">
              Muzician
            </label>
            <select
              id="idMuzician"
              name="idMuzician"
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="">Selectează un muzician</option>
              {muzicieni.map((muzician) => (
                <option key={muzician.idMuzician} value={muzician.idMuzician}>
                  {muzician.NumeDeScena}
                </option>
              ))}
            </select>
          </div>
        </>
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Adaugă {endpoint}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        {renderFormFields()}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Salvează
        </button>
      </form>
    </div>
  );
}

export default AddForm;
