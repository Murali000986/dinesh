import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Utensils, 
  ShieldCheck, 
  Heart, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  Star, 
  ArrowRight,
  MessageCircle,
  ChevronRight
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'about' | 'food' | 'gallery' | 'contact';

// --- Components ---

const BusinessLogo = ({ className = "w-10 h-10", light = false }: { className?: string, light?: boolean }) => {
  const primary = light ? "#FFFFFF" : "#2F6F3E";
  const secondary = light ? "rgba(255,255,255,0.8)" : "#689F38";
  
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House Outline */}
      <path 
        d="M20 45 L50 20 L80 45 V75 C80 83 73 90 65 90 H35 C27 90 20 83 20 75 V45 Z" 
        stroke={primary} 
        strokeWidth="7" 
        strokeLinejoin="round"
      />
      {/* Main Leaf */}
      <path 
        d="M35 80 C35 80 25 68 25 55 C25 45 35 40 40 50 C45 40 55 45 55 55 C55 68 45 80 35 80 Z" 
        fill={primary}
      />
      {/* Secondary Leaf */}
      <path 
        d="M55 75 C55 75 48 65 48 55 C48 48 55 45 58 52 C61 45 68 48 68 55 C68 65 55 75 55 75 Z" 
        fill={secondary}
      />
      {/* Field Detail */}
      <path 
        d="M60 90 Q75 82 80 90" 
        stroke={primary} 
        strokeWidth="5" 
        strokeLinecap="round"
      />
    </svg>
  );
};

const Navbar = ({ activePage, setPage }: { activePage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About', value: 'about' },
    { label: 'Food & Services', value: 'food' },
    { label: 'Gallery', value: 'gallery' },
    { label: 'Contact', value: 'contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setPage('home')}
        >
          <BusinessLogo 
            className="w-10 h-10 transition-all duration-300" 
            light={!isScrolled && activePage === 'home'} 
          />
          <div className="flex flex-col">
            <span className={`font-serif font-bold text-xl leading-none ${!isScrolled && activePage === 'home' ? 'text-white' : 'text-primary'}`}>
              Kannadathi
            </span>
            <span className={`text-[10px] uppercase tracking-widest font-medium ${!isScrolled && activePage === 'home' ? 'text-white/80' : 'text-accent'}`}>
              Organic Mane
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.value}
              onClick={() => setPage(link.value)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activePage === link.value 
                  ? 'text-primary' 
                  : (!isScrolled && activePage === 'home' ? 'text-white' : 'text-gray-600')
              }`}
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => setPage('contact')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
              !isScrolled && activePage === 'home' 
                ? 'bg-white text-primary hover:bg-secondary' 
                : 'bg-primary text-white hover:bg-primary/90'
            }`}
          >
            Visit Us
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className={!isScrolled && activePage === 'home' ? 'text-white' : 'text-primary'} />
          ) : (
            <Menu className={!isScrolled && activePage === 'home' ? 'text-white' : 'text-primary'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  setPage(link.value);
                  setIsMenuOpen(false);
                }}
                className={`text-left text-lg font-medium py-2 border-b border-gray-50 ${
                  activePage === link.value ? 'text-primary' : 'text-gray-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Dynamic Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2400" 
          alt="Lush Organic Farm Landscape" 
          className="w-full h-full object-cover scale-105 transition-transform duration-[10000ms] ease-out hover:scale-100"
          referrerPolicy="no-referrer"
        />
        {/* Multi-layered overlay for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-emerald-900/20 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-tight drop-shadow-2xl font-serif">
            Kannadathi <br />
            <span className="text-emerald-400 italic">Organic Mane</span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-50 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg tracking-wide">
            Rooted in Tradition, Grown with Nature. Bringing the authentic taste of Karnataka's farms to your home.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onExplore}
              className="group relative px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold text-lg transition-all hover:bg-emerald-500 hover:scale-105 active:scale-95 shadow-xl shadow-emerald-900/20 overflow-hidden flex items-center gap-2"
            >
              <span className="relative z-10">Explore Our Food</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-white/20 to-emerald-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-semibold text-lg transition-all hover:bg-white/20 hover:border-white/50">
              Our Story
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Leaf className="w-10 h-10" />,
      title: "Fresh Organic Ingredients",
      desc: "Sourced directly from certified organic farms to ensure the highest quality and nutrition."
    },
    {
      icon: <Utensils className="w-10 h-10" />,
      title: "Traditional Home Cooking",
      desc: "Recipes passed down through generations, prepared with love and traditional methods."
    },
    {
      icon: <ShieldCheck className="w-10 h-10" />,
      title: "Healthy & Hygienic Food",
      desc: "Strict hygiene standards and zero artificial preservatives or additives in our kitchen."
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: "Authentic Karnataka Taste",
      desc: "Experience the true flavors of Karnataka's rich culinary heritage in every bite."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="section-padding bg-secondary organic-pattern">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-primary mb-4 font-serif">Why Choose Us?</h2>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center group transition-shadow hover:shadow-xl"
            >
              <div className="text-primary mb-6 bg-secondary p-4 rounded-full group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedFood = () => {
  const meals = [
    {
      title: "Traditional North Karnataka Meal",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800",
      price: "Premium"
    },
    {
      title: "Organic Veggie Thali",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
      price: "Healthy"
    },
    {
      title: "Homemade Ragi Mudde",
      image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800",
      price: "Authentic"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl text-primary mb-4 font-serif">Featured Meals</h2>
            <p className="text-gray-600 max-w-md">Our most loved traditional dishes, prepared with fresh organic ingredients daily.</p>
          </div>
          <button className="btn-outline group">
            View Full Menu <ArrowRight size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {meals.map((meal, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4 shadow-md group-hover:shadow-xl transition-shadow duration-500">
                <img 
                  src={meal.image} 
                  alt={meal.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
                  {meal.price}
                </div>
              </div>
              <h3 className="text-2xl font-serif text-gray-800 group-hover:text-primary transition-colors duration-300">{meal.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutPreview = ({ onReadMore }: { onReadMore: () => void }) => {
  return (
    <section className="section-padding bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1000" 
              alt="Traditional Organic Mane" 
              className="w-full h-full object-cover transition-transform duration-[20000ms] hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-2xl text-white hidden md:block max-w-[240px] shadow-2xl"
          >
            <p className="text-3xl font-serif mb-2">100%</p>
            <p className="text-sm font-light opacity-80 uppercase tracking-widest">Organic & Homemade Philosophy</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-accent font-semibold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl text-primary mb-6 leading-tight font-serif">Celebrating the Spirit of the Land</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            At Kannadathi Organic Mane, we celebrate the spirit of the land by bringing natural, chemical-free, and farm-fresh foods to your home. Every product reflects our promise of clean eating, ethical sourcing, and sustainable farming—rooted in tradition and inspired by nature.
          </p>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-primary font-serif italic mb-8 text-xl"
          >
            ಕನ್ನಡತಿ ಆರ್ಗ್ಯಾನಿಕ್ ಮನೆ – ನೈಸರ್ಗಿಕ ಆಹಾರ, ನಮ್ಮ ನೆಲದ ಪರಂಪರೆ.
          </motion.p>
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div className="p-4 rounded-xl bg-white/50 border border-white shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">Our Mission</h4>
              <p className="text-sm text-gray-600">To preserve traditional recipes while promoting a healthy, organic lifestyle.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/50 border border-white shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">Our Vision</h4>
              <p className="text-sm text-gray-600">To be the most trusted name for authentic homemade organic food in Bangalore.</p>
            </div>
          </div>
          <button onClick={onReadMore} className="btn-primary group">
            Learn More About Us <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const GalleryPreview = () => {
  const images = [
    "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&q=80&w=600"
  ];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-primary mb-4 font-serif">Our Gallery</h2>
          <p className="text-gray-600">A glimpse into our kitchen and the organic goodness we serve.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 0.98 }}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-lg transition-all"
            >
              <img 
                src={img} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <div className="bg-white/90 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <ChevronRight className="text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "Priya Sharma",
      role: "Regular Customer",
      text: "The taste of Ragi Mudde here takes me back to my grandmother's village. Truly authentic and healthy!",
      rating: 5
    },
    {
      name: "Rahul Verma",
      role: "Food Enthusiast",
      text: "It's hard to find places that use real organic ingredients. Kannadathi Organic Mane is a gem in Bangalore.",
      rating: 5
    },
    {
      name: "Anjali Rao",
      role: "Local Resident",
      text: "Clean, hygienic, and delicious. My go-to place for healthy homemade meals every weekend.",
      rating: 5
    }
  ];

  return (
    <section className="section-padding bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full -ml-32 -mb-32 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 font-serif">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-secondary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl hover:bg-white/15 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star key={idx} size={16} className="fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-lg italic mb-6 text-white/90 leading-relaxed">"{r.text}"</p>
              <div>
                <p className="font-bold text-secondary">{r.name}</p>
                <p className="text-xs text-white/60 uppercase tracking-widest">{r.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TodaysSpecial = () => {
  return (
    <section className="section-padding bg-secondary">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row"
      >
        <div className="lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
          <motion.img 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1000" 
            alt="Today's Special" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-8 left-8 bg-accent text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm shadow-lg">
            Today's Special
          </div>
        </div>
        <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl text-primary mb-6 font-serif">Organic Jolada Rotti Thali</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Experience the rustic flavors of North Karnataka with our handmade Jolada Rotti, served with Yennegai (Brinjal curry), Shenga chutney, and fresh organic curd.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Freshly ground organic jowar flour",
                "Traditional wood-fired cooking",
                "Served with farm-fresh vegetables"
              ].map((item, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + (idx * 0.1) }}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <button className="btn-primary w-fit group">
              Order for Takeaway <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

const CallToAction = ({ onVisit }: { onVisit: () => void }) => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0 opacity-30">
        <motion.img 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 10, ease: "linear" }}
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2000" 
          alt="Kitchen Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl text-white mb-8 font-serif">Ready to Taste the Tradition?</h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-light">
            Visit us today at BTM Layout and experience the warmth of homemade organic food.
          </p>
          <button 
            onClick={onVisit} 
            className="group bg-secondary text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-all shadow-2xl flex items-center gap-2 mx-auto"
          >
            Visit Us Today <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <BusinessLogo className="w-12 h-12" />
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl leading-none text-primary">Kannadathi</span>
              <span className="text-[10px] uppercase tracking-widest font-medium text-accent">Organic Mane</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Traditional homemade meals and organic food house in the heart of Bangalore. Dedicated to health, tradition, and taste.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/kannadathi_ootadamane" target="_blank" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-xl text-primary mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'About', 'Food & Services', 'Gallery', 'Contact'].map((item) => (
              <li key={item}>
                <button 
                  onClick={() => setPage(item.toLowerCase().split(' ')[0] as Page)}
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl text-primary mb-6">Contact Info</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm text-gray-500">
              <MapPin size={18} className="text-accent shrink-0" />
              <span>#58, 39th Main, 4th Cross, KAS Officers Colony, BTM Layout 2nd Stage, Bangalore – 560068</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-500">
              <Phone size={18} className="text-accent shrink-0" />
              <span>+91 97437 77597 / 76763 93093</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-500">
              <Mail size={18} className="text-accent shrink-0" />
              <span>kannadathiootadamane@gmail.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl text-primary mb-6">Opening Hours</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="flex justify-between">
              <span>Mon - Fri</span>
              <span className="font-medium text-gray-800">11:00 AM - 10:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span>
              <span className="font-medium text-gray-800">10:00 AM - 11:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="font-medium text-gray-800">10:00 AM - 10:00 PM</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-10 border-t border-gray-50 text-center">
        <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Kannadathi Organic Mane. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

const FloatingWhatsApp = () => {
  return (
    <motion.a 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5, type: "spring" }}
      href="https://wa.me/919743777597" 
      target="_blank"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center justify-center"
    >
      <MessageCircle size={32} />
    </motion.a>
  );
};

// --- Page Views ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <>
    <Hero onExplore={() => setPage('food')} />
    <WhyChooseUs />
    <FeaturedFood />
    <AboutPreview onReadMore={() => setPage('about')} />
    <GalleryPreview />
    <Testimonials />
    <TodaysSpecial />
    <CallToAction onVisit={() => setPage('contact')} />
  </>
);

const AboutPage = () => (
  <div className="pt-32">
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-accent font-semibold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-7xl text-primary mb-8 font-serif">Tradition in Every Grain</h1>
          <div className="w-24 h-1 bg-accent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-lg text-gray-600 leading-relaxed"
          >
            <p>
              At Kannadathi Organic Mane, we celebrate the spirit of the land by bringing natural, chemical-free, and farm-fresh foods to your home. From native millets and pulses to pure honey, dairy, and rice, every product reflects our promise of clean eating, ethical sourcing, and sustainable farming—rooted in tradition and inspired by nature.
            </p>
            <p className="text-primary font-serif text-2xl italic">
              ಕನ್ನಡತಿ ಆರ್ಗ್ಯಾನಿಕ್ ಮನೆ – ನೈಸರ್ಗಿಕ ಆಹಾರ, ನಮ್ಮ ನೆಲದ ಪರಂಪರೆ.
            </p>
            <div className="pt-8 border-t border-gray-100">
              <h3 className="text-2xl text-primary mb-6 font-serif">What's in our Name?</h3>
              <div className="space-y-4">
                {[
                  { name: 'Kannadathi', desc: 'Represents Karnataka culture, heritage, and the authenticity of our roots.' },
                  { name: 'Organic', desc: 'Our commitment to healthy, chemical-free, and natural food for your well-being.' },
                  { name: 'Mane', desc: "Translates to 'Home'—symbolizing trust, comfort, and the warmth of homemade goodness." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex gap-4"
                  >
                    <div className="font-serif text-accent font-bold text-xl w-32 shrink-0">{item.name}</div>
                    <div className="text-sm">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
          >
            <img 
              src="https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&q=80&w=1000" 
              alt="Traditional Kitchen" 
              className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Heart size={32} />, title: 'Our Values', desc: 'Integrity, authenticity, and health are at the core of everything we do.' },
            { icon: <Leaf size={32} />, title: 'Organic First', desc: "We prioritize organic produce to support both our customers' health and the environment." },
            { icon: <Utensils size={32} />, title: 'Traditional Art', desc: 'Cooking is an art form for us, preserved through time-tested recipes.' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-secondary p-10 rounded-3xl text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="text-2xl text-primary mb-4 font-serif">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const FoodPage = () => (
  <div className="pt-32">
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl text-primary mb-8 font-serif">Our Services</h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto font-light">From daily traditional meals to premium organic ingredients, we offer the best of nature's bounty.</p>
        </motion.div>

        <div className="space-y-32">
          {/* Service 1 */}
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1000" 
                  alt="Traditional Meals" 
                  className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl text-primary mb-6 font-serif">Traditional Home Meals</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our signature service. We provide wholesome, balanced, and authentic Karnataka meals prepared just like they are at home. No soda, no artificial colors, and no compromise on taste.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['North Karnataka Thali', 'South Karnataka Meals', 'Ragi Mudde Special', 'Jolada Rotti Special'].map((item, i) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <ChevronRight size={16} className="text-accent" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Organic Ingredients" 
                  className="w-full h-full object-cover transition-transform duration-[10000ms] hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl text-primary mb-6 font-serif">Organic Ingredients & Staples</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We don't just cook with organic ingredients; we also provide them to you. From native millets and pulses to pure honey, dairy, and rice, every product reflects our promise of clean eating.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['Native Millets', 'Pure Honey & Dairy', 'Unpolished Rice', 'Organic Pulses'].map((item, i) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <ChevronRight size={16} className="text-accent" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const GalleryPage = () => {
  const images = [
    { url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800", title: "Traditional Thali" },
    { url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800", title: "Healthy Salad" },
    { url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800", title: "Organic Veggies" },
    { url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800", title: "Ragi Mudde" },
    { url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800", title: "Jolada Rotti" },
    { url: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=800", title: "Cooking Process" },
    { url: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800", title: "Organic Store" },
    { url: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&q=80&w=1000", title: "Our Kitchen" },
    { url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800", title: "Fresh Produce" }
  ];

  return (
    <div className="pt-32">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl text-primary mb-8">Visual Journey</h1>
            <p className="text-gray-600 text-xl">Explore the colors and textures of our traditional organic world.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative h-[400px] rounded-3xl overflow-hidden shadow-lg"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <h3 className="text-white text-2xl font-serif">{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-32">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl text-primary mb-8">Get In Touch</h1>
            <p className="text-gray-600 text-xl">We'd love to hear from you. Visit us or send a message.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <div className="bg-secondary p-10 md:p-16 rounded-3xl">
              <h2 className="text-3xl text-primary mb-8">Send a Message</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-6 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-6 py-4 rounded-xl bg-white border-none focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="How can we help you?"></textarea>
                </div>
                <button className="btn-primary w-full py-5 text-lg">Send Message</button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="flex flex-col gap-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-primary uppercase tracking-widest text-xs">Address</h4>
                  <p className="text-gray-600">#58, 39th Main, 4th Cross, KAS Officers Colony, BTM Layout 2nd Stage, Bangalore – 560068</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-primary uppercase tracking-widest text-xs">Phone</h4>
                  <p className="text-gray-600">+91 97437 77597<br />+91 76763 93093</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-primary uppercase tracking-widest text-xs">Email</h4>
                  <p className="text-gray-600">kannadathiootadamane@gmail.com</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold text-primary uppercase tracking-widest text-xs">Instagram</h4>
                  <a href="https://www.instagram.com/kannadathi_ootadamane" target="_blank" className="text-accent hover:text-primary transition-colors">@kannadathi_ootadamane</a>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-xl h-[400px] grayscale hover:grayscale-0 transition-all duration-700">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.941924614216!2d77.6086!3d12.9114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzQxLjAiTiA3N8KwMzYnMzEuMCJF!5e0!3m2!1sen!2sin!4v1625648493021!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activePage={page} setPage={setPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomePage setPage={setPage} />
            </motion.div>
          )}
          {page === 'about' && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AboutPage />
            </motion.div>
          )}
          {page === 'food' && (
            <motion.div key="food" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <FoodPage />
            </motion.div>
          )}
          {page === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GalleryPage />
            </motion.div>
          )}
          {page === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />
      <FloatingWhatsApp />
    </div>
  );
}
