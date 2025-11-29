import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Join from './pages/Join';
import Dashboard from './pages/Dashboard';
import Mentorship from './pages/Mentorship';
import Resources from './pages/Resources';
import Events from './pages/Events';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import MentorProfile from './pages/MentorProfile';
import MentorshipRequest from './pages/MentorshipRequest';
import Visibility from './pages/Visibility';
import LeaderProfile from './pages/LeaderProfile';
import Contact from './pages/Contact';
import Stories from './pages/Stories';
import HarassmentReport from './pages/HarassmentReport';
import About from './pages/About';

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/mentorship/profile/:id" element={<MentorProfile />} />
          <Route path="/mentorship/request" element={<MentorshipRequest />} />
          <Route path="/report-harassment" element={<HarassmentReport />} />
          <Route path="/visibility" element={<Visibility />} />
          <Route path="/about" element={<About />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leaders/:slug" element={<LeaderProfile />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/events" element={<Events />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
