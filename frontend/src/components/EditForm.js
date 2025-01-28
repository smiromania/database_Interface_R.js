import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditForm() {
  const { endpoint, id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/${endpoint}/${id}`);
      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Eroare la preluarea datelor:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne reîncărcarea paginii
    try {
      // Trimitere cerere PUT către backend
      await axios.put(`http://localhost:5000/${endpoint}/${id}`, formData);
      alert('Datele au fost actualizate cu succes!');
      navigate('/editare'); // Navighează înapoi la lista de editare
    } catch (error) {
      console.error('Eroare la actualizarea datelor:', error);
    }
  };
  

  if (loading) {
    return <p>Se încarcă datele...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Editare {endpoint}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        {endpoint === 'stiluri' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="Nume">
                Nume
              </label>
              <input
                type="text"
                id="Nume"
                name="Nume"
                value={formData.Nume || ''}
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
                value={formData.Descriere || ''}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              ></textarea>
            </div>
          </>
        )}
        {endpoint === 'muzicieni' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="Nume">
                Nume
              </label>
              <input
                type="text"
                id="Nume"
                name="Nume"
                value={formData.Nume || ''}
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
                value={formData.Prenume || ''}
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
                value={formData.NumeDeScena || ''}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
          </>
        )}
        {endpoint === 'concerte' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="DataCantarii">
                Data
              </label>
              <input
                type="date"
                id="DataCantarii"
                name="DataCantarii"
                value={formData.DataCantarii || ''}
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
                value={formData.Scena || ''}
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
                value={formData.Ora || ''}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
          </>
        )}
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

export default EditForm;
