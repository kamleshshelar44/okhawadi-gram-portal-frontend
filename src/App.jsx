import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import History from './pages/History';
import Culture from './pages/Culture';
import Festivals from './pages/Festivals';
import MapLocation from './pages/MapLocation';
import Projects from './pages/Projects';
import Departments from './pages/Departments';
import Infrastructure from './pages/Infrastructure';
import Schemes from './pages/Schemes';
import Budget from './pages/Budget';
import Services from './pages/Services';
import Forms from './pages/Forms';
import RTI from './pages/RTI';
import Complaints from './pages/Complaints';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Videos from './pages/Videos';
import Statistics from './pages/Statistics';
import VillageMap from './pages/VillageMap';
import ContactUs from './pages/ContactUs';
import Contact from './pages/contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminVillageInfo from './pages/admin/AdminVillageInfo';
import AdminNews from './pages/admin/AdminNews';
import AdminProjects from './pages/admin/AdminProjects';
import AdminGallery from './pages/admin/AdminGallery';
import AdminContacts from './pages/admin/AdminContacts';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSchemes from './pages/admin/AdminSchemes';
import AdminAwards from './pages/admin/AdminAwards';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const { i18n } = useTranslation();

  return (
    <ThemeProvider>
      <div className={`min-h-screen ${i18n.language === 'mr' ? 'font-marathi' : ''}`}>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="history" element={<History />} />
            <Route path="culture" element={<Culture />} />
            <Route path="festivals" element={<Festivals />} />
            <Route path="map-location" element={<MapLocation />} />
            <Route path="projects" element={<Projects />} />
            <Route path="departments" element={<Departments />} />
            <Route path="infrastructure" element={<Infrastructure />} />
            <Route path="schemes" element={<Schemes />} />
            <Route path="contact" element={<Contact />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="budget" element={<Budget />} />
            <Route path="services" element={<Services />} />
            <Route path="forms" element={<Forms />} />
            <Route path="rti" element={<RTI />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="news" element={<News />} />
            <Route path="news/:id" element={<NewsDetail />} />
            <Route path="events" element={<Events />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="videos" element={<Videos />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="village-map" element={<VillageMap />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="village-info" element={<AdminVillageInfo />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="schemes" element={<AdminSchemes />} />
            <Route path="awards" element={<AdminAwards />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </ThemeProvider>
  );
}

export default App;