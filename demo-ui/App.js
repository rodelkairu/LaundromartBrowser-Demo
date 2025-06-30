import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation"; // ✅ Correct import

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./components/AboutUs";
import Branches from "./components/Branches";
import SchedulePickupsDropOffs from "./components/SchedulePickupsDropOffs";
import TrackProgress from "./components/TrackProgress";
import RealtimeNotifications from "./components/RealtimeNotifications";
import Customization from "./components/Customization";
import CategorySearch from "./components/CategorySearch";
import PaymentIntegration from "./components/PaymentIntegration";
import CartSaving from "./components/CartSaving";
import NotificationContacts from "./components/NotificationContacts";
import PaymentServices from "./services/PaymentServices";
import ServiceDetails from "./components/ServiceDetails";
import DryCleaning from "./pages/DryCleaning";
import GarmentRepair from "./pages/GarmentRepair";
import ExpressWashing from "./pages/ExpressWashingService";
import HouseCleaning from "./pages/HouseCleaningService";
import CarWash from "./pages/CarWashService";
import CleaningCompanyService from "./pages/CleaningCompanyService";
import CoutureService from "./pages/CoutureService";
import FabricCareSpecialist from "./pages/FabricCareSpeacialist";
import IroningService from "./pages/IroningService";
import PremiumDryCleaningService from "./pages/PremiumDryCleaningService";
import PressingService from "./pages/PressingService";
import RepairandAlteration from "./pages/RepairandAlteration";
import SofaSetCleaningService from "./pages/SofaSetCleaningService";
import StorageService from "./pages/StorageService";
import FAQPage from "./components/FAQPage";
import BookingPage from "./pages/BookingPage";
import PricingPage from "./pages/PricingPage";
import FeedbackForm from "./components/FeedbackForm";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import ScheduledList from "./components/ScheduledList";

import "./App.css";

const stripePromise = loadStripe("pk_test_51Qt3H0LObl9MyWByKyro4aGKpDXZubVJO11nFpEPRXHvMk5G8TL3Y3WS7ZuFnDaACIAd4AOcU6n4FMvmcXglh7Sa00kF83oGsA");

const AppContent = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { user } = useAuth();

  // WebSocket State
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  let ws;

  useEffect(() => {
    ws = new WebSocket("ws://localhost:3000");

    ws.onopen = () => console.log("Connected to WebSocket server");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "history") {
        setMessages(data.messages);
      } else if (data.type === "newMessage") {
        setMessages((prev) => [...prev, data.message]);
      }
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket disconnected");

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ text: input }));
      setInput("");
    }
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Router>
        <Header />
        <Navigation />
        <button onClick={toggleTheme} className="toggle-dark-mode">
          Toggle Dark Mode
        </button>

        {/* WebSocket Chat Section */}
        <div className="chat-container">
          <h2>Live Chat</h2>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <p key={index}>{msg.text}</p>
            ))}
          </div>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/payment-services" element={<PaymentServices />} />
          <Route path="/schedule-pickups-dropoffs" element={<SchedulePickupsDropOffs />} />
          <Route path="/faqpage" element={<FAQPage />} />
          <Route path="/track-progress" element={<TrackProgress />} />
          <Route path="/realtime-notifications" element={<RealtimeNotifications />} />
          <Route path="/customization" element={<Customization />} />
          <Route path="/category-search" element={<CategorySearch />} />
          <Route path="/payment-integration" element={<PaymentIntegration />} />
          <Route path="/cart-saving" element={<CartSaving />} />
          <Route path="/notification-contacts" element={<NotificationContacts />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/services/express-washing" element={<ExpressWashing />} />
          <Route path="/services/house-cleaning" element={<HouseCleaning />} />
          <Route path="/services/car-wash" element={<CarWash />} />
          <Route path="/services/cleaning-company" element={<CleaningCompanyService />} />
          <Route path="/services/couture" element={<CoutureService />} />
          <Route path="/services/fabric-care" element={<FabricCareSpecialist />} />
          <Route path="/services/ironing" element={<IroningService />} />
          <Route path="/services/premium-dry-cleaning" element={<PremiumDryCleaningService />} />
          <Route path="/services/pressing" element={<PressingService />} />
          <Route path="/services/repair-alteration" element={<RepairandAlteration />} />
          <Route path="/services/sofa-cleaning" element={<SofaSetCleaningService />} />
          <Route path="/services/storage" element={<StorageService />} />
          <Route path="/premiumservices/dry-cleaning" element={<DryCleaning />} />
          <Route path="/premiumservices/garment-repair" element={<GarmentRepair />} />
          <Route path="/pages/:id/book" element={<BookingPage />} />
          <Route path="/pages/:id/pricing" element={<PricingPage />} />
        </Routes>

        <SchedulePickupsDropOffs />
        <ScheduledList />
        <Footer />
      </Router>
    </div>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <AppContent />
  </Elements>
);

export default App;
