import { useState, useEffect, FormEvent } from "react";
import { motion } from "motion/react";
import { Car, Shield, Clock, IndianRupee, MapPin, Calendar, Phone, Star, ChevronRight, Send, User } from "lucide-react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, Timestamp } from "firebase/firestore";

interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  createdAt: Timestamp;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

const Home = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
      },
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    setError("Something went wrong with the database. Please try again later.");
  };

  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(reviewsData);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, "reviews");
    });

    return () => unsubscribe();
  }, []);

  const handleSubmitReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.message) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await addDoc(collection(db, "reviews"), {
        ...newReview,
        createdAt: serverTimestamp(),
        uid: auth.currentUser?.uid || null
      });
      setNewReview({ name: "", rating: 5, message: "" });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "reviews");
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) 
    : "0.0";

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1920"
            alt="Car Background"
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-bold border border-primary/30 mb-6 inline-block">
                Trusted Travel Partner
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                Your Journey, <br />
                <span className="text-primary italic">Our Priority.</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-lg">
                Experience premium travel across India with Lokseva Tours. Safe, reliable, and affordable rides at your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/booking" className="btn-primary text-lg py-4">
                  Book Your Ride Now <ChevronRight className="w-5 h-5" />
                </Link>
                <a href="tel:+919960099233" className="btn-outline text-white border-white hover:bg-white hover:text-black text-lg py-4">
                  Call Now
                </a>
              </div>
            </motion.div>

            {/* Quick Booking Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-auto lg:ml-auto"
            >
              <h3 className="text-2xl font-bold text-black mb-6">Quick Booking</h3>
              <form className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Pickup Location"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Drop Location"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>
                <Link to="/booking" className="w-full btn-primary py-4 mt-2">
                  Continue Booking
                </Link>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 text-white">
              <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Safe Ride</h4>
                <p className="text-gray-400 text-sm">Verified drivers & sanitized cars</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg">On Time</h4>
                <p className="text-gray-400 text-sm">Punctuality is our promise</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white">
              <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                <IndianRupee className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Affordable</h4>
                <p className="text-gray-400 text-sm">Best rates in the market</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We offer a wide range of transportation services tailored to your specific travel needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Local Travel", desc: "Perfect for city rides and daily commutes.", icon: MapPin },
              { title: "Outstation", desc: "Comfortable long-distance trips across states.", icon: Car },
              { title: "Airport Transfer", desc: "Reliable pickup and drop to all major airports.", icon: Clock },
              { title: "Tour Packages", desc: "Customized sightseeing tours for families.", icon: Star },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-6">{service.desc}</p>
                <Link to="/booking" className="text-primary font-bold flex items-center justify-center gap-1 hover:gap-2 transition-all">
                  Book Now <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-2">Customer Reviews</h2>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-black">{averageRating}</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star 
                      key={s} 
                      className={`w-5 h-5 ${s <= Math.round(Number(averageRating)) ? "fill-primary text-primary" : "text-gray-300"}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-sm">Based on {reviews.length} reviews</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-8 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
              {reviews.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                  <p className="text-gray-500 italic">No reviews yet. Be the first to leave one!</p>
                </div>
              ) : (
                reviews.map((review) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={review.id} 
                    className="bg-gray-50 p-8 rounded-2xl border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-black">
                          {review.name[0].toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-black block">{review.name}</span>
                          <span className="text-xs text-gray-400">
                            {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'Just now'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{review.message}"</p>
                  </motion.div>
                ))
              )}
            </div>

            {/* Review Form */}
            <div className="bg-black text-white p-8 rounded-3xl shadow-xl h-fit">
              <h3 className="text-2xl font-bold mb-6">Leave a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 flex items-center gap-2">
                    <User className="w-4 h-4" /> Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`w-6 h-6 ${star <= newReview.rating ? "fill-primary text-primary" : "text-gray-600"}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.message}
                    onChange={(e) => setNewReview({ ...newReview, message: e.target.value })}
                    placeholder="Tell us about your experience..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none text-white resize-none"
                  />
                </div>

                {error && <p className="text-red-500 text-xs">{error}</p>}

                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full btn-primary py-4 text-black font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"} <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-black mb-6">Ready to Start Your Journey?</h2>
          <p className="text-black/70 text-xl mb-10 max-w-2xl mx-auto">Book your ride in seconds and enjoy a comfortable travel experience with us.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking" className="bg-black text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              Book Now
            </Link>
            <a href="https://wa.me/919960099233" className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-2">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
