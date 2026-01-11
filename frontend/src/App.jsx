// src/App.jsx
import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AllRoutes from './router/Routes';


const App = () => {
  return (
    <>
      <Navbar />
      <Toaster position="top-right" />
      <main className="min-h-[80vh] px-4 py-6">
        <AllRoutes />
      </main>
      <Footer />
    </>
  );
};

export default App;
