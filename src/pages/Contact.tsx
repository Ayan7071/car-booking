import { motion } from "motion/react";
import { Phone, Mail, MapPin, MessageCircle, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Get In Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Have questions? We're here to help you plan your perfect journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6"
            >
              <div className="bg-primary/10 p-4 rounded-2xl">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">Call Us</h4>
                <p className="text-gray-500 text-sm mb-2">Available 24/7 for bookings</p>
                <a href="tel:+919960099233" className="text-xl font-bold text-black hover:text-primary transition-colors">
                  +91 99600 99233
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6"
            >
              <div className="bg-green-100 p-4 rounded-2xl">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">WhatsApp</h4>
                <p className="text-gray-500 text-sm mb-2">Instant chat & booking</p>
                <a href="https://wa.me/919960099233" className="text-xl font-bold text-black hover:text-primary transition-colors">
                  +91 99600 99233
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-start gap-6"
            >
              <div className="bg-blue-100 p-4 rounded-2xl">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold mb-1">Email Us</h4>
                <p className="text-gray-500 text-sm mb-2">For corporate & long tours</p>
                <a href="mailto:info@loksevatours.com" className="text-xl font-bold text-black hover:text-primary transition-colors">
                  info@loksevatours.com
                </a>
              </div>
            </motion.div>
          </div>

          {/* Map & Socials */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 h-[400px] overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120358.558278784!2d74.6726294866333!3d19.096465499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcb05d46788921%3A0x6677e92c1151d82!2sAhmednagar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1711620000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black text-white p-8 rounded-3xl">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" /> Business Hours
                </h4>
                <div className="space-y-2 text-gray-400">
                  <div className="flex justify-between">
                    <span>Monday - Sunday</span>
                    <span className="text-white">24 Hours</span>
                  </div>
                  <p className="text-xs mt-4">We are operational 365 days a year, including public holidays.</p>
                </div>
              </div>

              <div className="bg-primary p-8 rounded-3xl flex flex-col justify-between">
                <h4 className="text-xl font-bold mb-4 text-black">Follow Us</h4>
                <div className="flex gap-6">
                  <a href="#" className="bg-black text-white p-3 rounded-xl hover:scale-110 transition-transform">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="bg-black text-white p-3 rounded-xl hover:scale-110 transition-transform">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="bg-black text-white p-3 rounded-xl hover:scale-110 transition-transform">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
