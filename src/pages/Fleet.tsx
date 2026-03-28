import { motion } from "motion/react";
import { Users, Briefcase, Wind, ShieldCheck, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Fleet = () => {
  const cars = [
    {
      name: "Maruti Suzuki Eeco",
      type: "MUV / Van",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800", // Using a placeholder van-like image
      passengers: 7,
      luggage: 3,
      features: ["Air Conditioned", "Spacious Seating", "Comfortable for Families", "Reliable Performance"],
      price: "₹12/km"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Our Premium Fleet</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Choose from our range of well-maintained vehicles for a comfortable and safe journey.</p>
        </div>

        <div className="space-y-12">
          {cars.map((car, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-primary font-bold text-sm uppercase tracking-widest">{car.type}</span>
                    <h3 className="text-3xl font-bold text-black mt-1">{car.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 text-sm">Starts from</span>
                    <p className="text-2xl font-bold text-black">{car.price}</p>
                  </div>
                </div>

                <div className="flex gap-6 mb-8 py-4 border-y border-gray-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium">{car.passengers} Passengers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium">{car.luggage} Bags</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium">AC</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {car.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-sm text-gray-600">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Link to="/booking" className="btn-primary w-full md:w-fit py-4 px-12">
                  Book This Car <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fleet Quality Promise */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Quality Standards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Regular Maintenance", desc: "Every car undergoes weekly safety checks." },
              { title: "Sanitized Vehicles", desc: "Cars are cleaned after every single trip." },
              { title: "GPS Tracking", desc: "Real-time tracking for your safety." },
              { title: "Comfort First", desc: "Premium interiors for a relaxed journey." },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fleet;
