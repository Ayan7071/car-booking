import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Car, MapPin, Calendar, Star, MessageCircle, ChevronRight, CheckCircle2, Facebook, Instagram, Twitter } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
    { name: "Fleet", path: "/fleet" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-black text-white py-3 shadow-xl" : "bg-transparent text-white py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Car className="text-black w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tighter">LOKSEVA TOURS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium hover:text-primary transition-colors ${location.pathname === link.path ? "text-primary" : ""}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/booking" className="btn-primary py-2 px-5 text-sm">
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-white hover:text-primary border-b border-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/booking"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-primary text-black font-bold py-4 rounded-lg mt-4"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => (
  <footer className="bg-black text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Car className="text-black w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter">LOKSEVA TOURS</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted travel partner in India. Providing safe, reliable, and affordable transportation services for all your needs.
          </p>
          <div className="flex gap-4">
            <Facebook className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-primary cursor-pointer" />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/pricing" className="hover:text-primary">Pricing</Link></li>
            <li><Link to="/fleet" className="hover:text-primary">Our Fleet</Link></li>
            <li><Link to="/booking" className="hover:text-primary">Book a Ride</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Services</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>Local Travel</li>
            <li>Outstation Trips</li>
            <li>Airport Pickup/Drop</li>
            <li>Tour Packages</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>Ahilyanagar (Ahmednagar), Maharashtra, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>+91 99600 99233</span>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-primary shrink-0" />
              <span>WhatsApp: +91 99600 99233</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Lokseva Tours. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export const WhatsAppButton = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <a
      href="tel:+919960099233"
      className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform md:hidden"
    >
      <Phone className="w-6 h-6" />
    </a>
    <a
      href="https://wa.me/919960099233?text=Hi Lokseva Tours, I want to book a ride."
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  </div>
);
