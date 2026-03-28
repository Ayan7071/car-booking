import { motion } from "motion/react";
import { MapPin, Car, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Local Travel",
      price: "Contact",
      unit: " for best rates",
      icon: MapPin,
      features: ["Ahilyanagar District Coverage", "Driver Allowance Included", "Clean & Sanitized Car", "Professional Driver"],
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Outstation",
      price: "Contact",
      unit: " for best rates",
      icon: Car,
      features: ["All Maharashtra Coverage", "One-way or Round Trip", "Inter-state Permits", "Comfortable Seating"],
      color: "bg-primary/10 text-primary",
      popular: true
    },
    {
      title: "All Districts",
      price: "Contact",
      unit: " for best rates",
      icon: MapPin,
      features: ["Inter-District Travel", "No Hidden Charges", "Punctual Service", "Reliable Performance"],
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Get a Quote</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Contact us for the best and most honest pricing for your travel needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 ${plan.popular ? "border-primary" : "border-transparent"}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className={`${plan.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8`}>
                <plan.icon className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-gray-500 font-medium">{plan.unit}</span>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-gray-600 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to="/booking" className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${plan.popular ? "bg-primary text-black hover:scale-105" : "bg-gray-100 text-black hover:bg-gray-200"}`}>
                Book Now
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 bg-black text-white rounded-3xl p-10 md:p-16 overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Important Information</h2>
              <ul className="space-y-4 text-gray-400">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                  <span>Toll taxes, state permits, and parking charges are extra as per actuals.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                  <span>Night charges applicable for travel between 10 PM to 6 AM (₹250/night).</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                  <span>Driver food allowance included in outstation daily minimums.</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <h4 className="text-xl font-bold mb-4 text-primary">Need Help?</h4>
              <p className="text-gray-400 mb-6">Planning a long tour or need a car for multiple days? Contact us for a customized quote.</p>
              <a href="https://wa.me/919960099233" className="btn-primary w-full text-center py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                Get Custom Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
