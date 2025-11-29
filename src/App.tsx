import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Join from './pages/Join';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add routes for Mentorship, Visibility, Safety, Resources, News, Community, Dashboard, About, Shop */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
