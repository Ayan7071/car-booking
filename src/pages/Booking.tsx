import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { User, Phone, MapPin, Calendar, Clock, Car, Send, CheckCircle2, Navigation } from "lucide-react";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    date: "",
    time: "",
    tripType: "One-way",
    carType: "Maruti Suzuki Eeco"
  });

  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [locating, setLocating] = useState(false);

  const getCurrentLocation = () => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationCoords({ lat: latitude, lng: longitude });
          setFormData(prev => ({ ...prev, pickup: `Ahilyanagar, My Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})` }));
          setLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please enter it manually.");
          setLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLocating(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const locationLink = locationCoords ? `%0A*Location Link:* https://www.google.com/maps?q=${locationCoords.lat},${locationCoords.lng}` : "";
    const message = `*New Booking Request*%0A
*Name:* ${formData.name}%0A
*Phone:* ${formData.phone}%0A
*Pickup:* ${formData.pickup}%0A
*Drop:* ${formData.drop}%0A
*Date:* ${formData.date}%0A
*Time:* ${formData.time}%0A
*Trip Type:* ${formData.tripType}%0A
*Car:* ${formData.carType}${locationLink}`;

    window.open(`https://wa.me/919960099233?text=${message}`, "_blank");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gray-50 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-md w-full"
        >
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Booking Sent!</h2>
          <p className="text-gray-600 mb-8">Your booking request has been sent via WhatsApp. We will contact you shortly to confirm.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-primary w-full py-4"
          >
            Book Another Ride
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Book Your Ride</h1>
          <p className="text-gray-600">Fill in the details below and we'll get back to you instantly.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-5"
        >
          {/* Left Sidebar Info */}
          <div className="md:col-span-2 bg-black text-white p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Why Book With Us?</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="bg-primary/20 p-2 rounded-lg h-fit">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold">Instant Confirmation</h5>
                    <p className="text-gray-400 text-sm">Get booking details on WhatsApp</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/20 p-2 rounded-lg h-fit">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold">No Hidden Costs</h5>
                    <p className="text-gray-400 text-sm">Transparent pricing for all trips</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary/20 p-2 rounded-lg h-fit">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-bold">24/7 Support</h5>
                    <p className="text-gray-400 text-sm">We are always here to help you</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Based In</p>
              <p className="text-lg font-bold text-white mb-4">Ahilyanagar (Ahmednagar)</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Need Help?</p>
              <p className="text-xl font-bold text-primary">+91 99600 99233</p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3 p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" /> Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Pickup Location
                  </label>
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={locating}
                    className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                  >
                    <Navigation className="w-3 h-3" /> {locating ? "Locating..." : "Get My Location"}
                  </button>
                </div>
                <input
                  required
                  type="text"
                  value={formData.pickup}
                  onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
                  placeholder="Enter pickup address"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                />
                {locationCoords && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-gray-200 h-32">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src={`https://maps.google.com/maps?q=${locationCoords.lat},${locationCoords.lng}&z=15&output=embed`}
                    ></iframe>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Drop Location
                </label>
                <input
                  required
                  type="text"
                  value={formData.drop}
                  onChange={(e) => setFormData({ ...formData, drop: e.target.value })}
                  placeholder="Enter destination address"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Date
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Time
                  </label>
                  <input
                    required
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    Trip Type
                  </label>
                  <select
                    value={formData.tripType}
                    onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option>One-way</option>
                    <option>Round trip</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    Vehicle Type
                  </label>
                  <select
                    value={formData.carType}
                    onChange={(e) => setFormData({ ...formData, carType: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option>Maruti Suzuki Eeco</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full btn-primary py-4 text-lg mt-4">
                Confirm Booking on WhatsApp <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;
