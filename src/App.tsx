import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhatWeDone from './pages/WhatWeDone';
import UpcomingEvents from './pages/UpcomingEvents';
import Team from './pages/Team';
import JoinForm from './pages/JoinForm';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black overflow-x-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/what-we-done" element={<WhatWeDone />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/join" element={<JoinForm />} />
          <Route path="/team" element={<Team />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
