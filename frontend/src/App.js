import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Concerte from './components/Concerte';
import Editare from './components/Editare';
import "tailwindcss";
import './index.css';
import EditForm from './components/EditForm';
import AddForm from './components/AddForm';

function App() {
  return (
    <Router>
      <div className="p-4">
      <nav className="bg-blue-500 text-white p-4 shadow-md mb-6 w-full fixed top-0 left-0">
  <div className="container mx-auto flex justify-between">
    <Link to="/" className="text-2xl font-bold hover:underline">
      BD Please
    </Link>
    <div>
      <Link to="/concerte" className="mr-4 hover:underline">
        Concerte
      </Link>
      <Link to="/editare" className="hover:underline">
        Editare
      </Link>
    </div>
  </div>
</nav>
<div className="mt-16"></div> <div className="main-content">
        
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex items-center justify-center min-h-screen bg-transparent">
                <h2 className="text-6xl font-extrabold text-blue-600">BD Please</h2>
              </div>
            }
          />
          <Route path="/concerte" element={<Concerte />} />
          <Route path="/editare/:endpoint/:id" element={<EditForm />} />
          <Route path="/editare" element={<Editare />} />
          <Route path="/adaugare/:endpoint" element={<AddForm />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
