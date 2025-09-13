import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import FeedbackPage from './pages/FeedbackPage';
import ContactPage from './pages/ContactPage';
import EventRegistrationPage from './pages/EventRegistrationPage'; 
import CalendarPage from './pages/CalendarPage'; 

// 👇 ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0,0); // change 'instant' to 'smooth' if you want animation
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      {/* 👇 This ensures scrolling to top on every route change */}
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/calendar" element={<CalendarPage />} /> 
            <Route path="/register/:eventId" element={<EventRegistrationPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
