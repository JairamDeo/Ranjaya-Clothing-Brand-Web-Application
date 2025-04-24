import './App.css'
import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to top when the route changes
  }, [location]);

  return null;
}

import Header from './components/Header';
import Footer from './components/Footer';
import ContactForm from './Pages/Contact/ContactForm';

// Lazy-loaded screens
const AuthPage = lazy(() => import('./Authentication/AuthPage'));
const Home = lazy(() => import('./Pages/Home/Home'));
const NewArrivals = lazy(() => import('./Pages/New-Arrivals/NewArrivals'));
const BestSeller = lazy(() => import('./Pages/Best-Sellers/BestSeller'));
const Clearance = lazy(() => import('./Pages/Clearance-Sale/Clearance'));
const AboutUs = lazy(() => import('./Pages/AboutUs'));

function App() {

  return (
    <Router>
      <div >
      <ScrollToTop /> {/* Scroll to top on route change */}
        <Header/>
        <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/new-arrivals' element={<NewArrivals />} />
            <Route exact path='/best-sellers' element={<BestSeller />} />
            <Route exact path='/clearance-sale' element={<Clearance />} />
            <Route exact path='/about-us' element={<AboutUs />} />


            <Route exact path='/account' element={<AuthPage/>} />
            <Route exact path='/contact-us' element={<ContactForm/>} />
          </Routes>
        </Suspense>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
