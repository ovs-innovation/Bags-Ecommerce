import React from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf, Award, Users, Clock, MapPin, Mail, Phone, ArrowRight,
} from 'lucide-react';
import { BRAND_CONFIG } from '../../constants/config';

const TIMELINE = [
  { year: '2018', title: 'The Workshop Opens', desc: 'Three master leather artisans start a small workshop in Old Delhi, combining techniques passed down through four generations.' },
  { year: '2020', title: 'KOSHA is Born', desc: 'The brand launches online, bringing Jaipur tanneries and Delhi craftsmanship to customers across India.' },
  { year: '2022', title: 'Heritage Tannery Partnership', desc: 'A landmark partnership with a 150-year-old vegetable tannery ensures access to India\'s finest full-grain hides.' },
  { year: '2024', title: '2,000+ Happy Customers', desc: 'KOSHA crosses 2,000 customers across 28 states, with a 4.8-star average rating and zero-compromise quality.' },
];

const TEAM = [
  { name: 'Rajesh Verma', role: 'Master Leather Artisan', avatar: 'https://i.pravatar.cc/200?img=52', bio: '30+ years of bench craftsmanship. Trained in Jaipur saddle-making traditions.' },
  { name: 'Sunita Pillai', role: 'Creative Director', avatar: 'https://i.pravatar.cc/200?img=43', bio: 'NID alumna with a decade of luxury fashion design across Mumbai and London.' },
  { name: 'Arjun Mehrotra', role: 'Tannery & Materials Lead', avatar: 'https://i.pravatar.cc/200?img=68', bio: 'Sources ethically from five heritage tanneries with zero chrome-tanning.' },
];

export const AboutPage = () => (
  <div className="min-h-screen bg-[#FAF8F5]">

    {/* ── HERO ── */}
    <section className="relative bg-[#1A1715] py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, #9B784E 0%, transparent 55%), radial-gradient(circle at 80% 20%, #4C351E 0%, transparent 50%)' }}
      />
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-bold mb-4">Our Heritage</p>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Where Craft Meets<br />
          <span className="italic text-gold-400">Conscience.</span>
        </h1>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
          KOSHA was founded on a single conviction: that genuinely beautiful objects should be made with genuine care — for the artisan, for the material, and for the person who carries it.
        </p>
      </div>
    </section>

    {/* ── VALUES ── */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { icon: <Leaf className="w-8 h-8" />, title: 'Vegetable-Tanned Only', desc: 'We exclusively use leather tanned with tree barks and natural salts — free from heavy metals and chemicals. Takes longer, costs more, lasts a lifetime.' },
        { icon: <Award className="w-8 h-8" />, title: 'Bench-Made Always', desc: 'Each bag passes through a single artisan\'s hands from cutting to edge-finishing. No assembly lines. No compromise on stitching tension or thread grade.' },
        { icon: <Users className="w-8 h-8" />, title: 'Fair-Wage Workshops', desc: 'Our three partner workshops pay wages 40% above local average and provide health insurance for every artisan and their family.' },
      ].map((v) => (
        <div key={v.title} className="text-center p-8 bg-white shadow-subtle hover:shadow-card transition-shadow">
          <div className="text-brand-700 mb-5 flex justify-center">{v.icon}</div>
          <h3 className="font-serif text-xl font-bold text-[#1A1715] mb-3">{v.title}</h3>
          <p className="text-sm text-stone-600 leading-relaxed">{v.desc}</p>
        </div>
      ))}
    </section>

    {/* ── STORY TIMELINE ── */}
    <section className="bg-cream-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="section-label justify-center mb-3">
            <span className="w-6 h-px bg-brand-500" /> Our Journey <span className="w-6 h-px bg-brand-500" />
          </p>
          <h2 className="section-heading">From Workshop<br />to Your Wardrobe</h2>
        </div>
        <div className="space-y-8">
          {TIMELINE.map((t, i) => (
            <div key={t.year} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 text-right">
                <span className="font-serif text-2xl font-bold text-brand-700">{t.year}</span>
              </div>
              <div className="flex flex-col items-center gap-0 mx-2">
                <div className="w-3 h-3 rounded-full bg-brand-800 border-2 border-brand-300 mt-1.5" />
                {i < TIMELINE.length - 1 && <div className="w-0.5 h-16 bg-brand-200 mt-1" />}
              </div>
              <div className="pb-8">
                <h3 className="font-serif text-lg font-bold text-[#1A1715] mb-1">{t.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── TEAM ── */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <p className="section-label justify-center mb-3">
          <span className="w-6 h-px bg-brand-500" /> The Makers <span className="w-6 h-px bg-brand-500" />
        </p>
        <h2 className="section-heading">Faces Behind the Craft</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TEAM.map((m) => (
          <div key={m.name} className="text-center">
            <img
              src={m.avatar}
              alt={m.name}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-brand-200"
            />
            <h3 className="font-serif text-lg font-bold text-[#1A1715]">{m.name}</h3>
            <p className="text-xs uppercase tracking-widest text-brand-700 font-bold mb-3">{m.role}</p>
            <p className="text-sm text-stone-600 leading-relaxed">{m.bio}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="bg-[#1A1715] py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Own a Piece of Heritage?
        </h2>
        <p className="text-sm text-white/60 mb-8">Explore our full collection of handcrafted leather bags and accessories.</p>
        <Link to="/products" className="btn-gold px-10 py-4 text-base">
          Shop Collections <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  </div>
);

export default AboutPage;
