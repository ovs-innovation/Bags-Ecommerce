import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, Users, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

const TIMELINE = [
  {
    year: '2018',
    title: 'The Atelier Opens',
    desc: 'Three master leather artisans establish an independent workshop in Old Delhi, combining generational saddle techniques with modern urban silhouettes.',
  },
  {
    year: '2020',
    title: 'Avya Store Launches',
    desc: 'The brand debuts online with its inaugural Drop 01, bridging artisanal Indian tanneries with discerning youth across the nation.',
  },
  {
    year: '2022',
    title: '100% Veg-Tan Partnership',
    desc: 'A permanent partnership with a heritage vegetable tannery guarantees zero chrome chemicals and exclusive access to India’s densest full-grain hides.',
  },
  {
    year: '2024',
    title: 'The New Gen-Z Era',
    desc: 'Over 18,000 style curators choose Avya Store, championing the conviction that authentic drip outlasts fast fashion hype.',
  },
];

const TEAM = [
  {
    name: 'Rajesh Verma',
    role: 'Master Leather Artisan',
    avatar: 'https://i.pravatar.cc/200?img=52',
    bio: '30+ years of bench craftsmanship. Trained in Rajasthani saddle-making traditions and hand edge-burnishing.',
  },
  {
    name: 'Sunita Pillai',
    role: 'Creative Director',
    avatar: 'https://i.pravatar.cc/200?img=43',
    bio: 'NID alumna with a decade of luxury accessory design across Mumbai and London fashion circuits.',
  },
  {
    name: 'Arjun Mehrotra',
    role: 'Tannery & Materials Lead',
    avatar: 'https://i.pravatar.cc/200?img=68',
    bio: 'Sources ethically from historic tanneries, ensuring strictly organic tree bark extracts and zero synthetic fillers.',
  },
];

export const AboutPage = () => (
  <div className="min-h-screen bg-fog text-ink">

    {/* ── HERO ── */}
    <section className="relative bg-ink py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-white/10">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="badge-new text-[9px] mb-4 inline-block">Our Manifesto</span>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white uppercase tracking-tight leading-none mb-6">
          WHERE CRAFT MEETS<br />
          <span className="text-accent">CONSCIENCE.</span>
        </h1>
        <p className="font-serif italic text-base sm:text-xl text-fog/80 max-w-2xl mx-auto leading-relaxed mb-6">
          "Trends Today • Trends Tomorrow • Old Is Gold"
        </p>
        <p className="text-xs sm:text-sm text-fog/60 max-w-2xl mx-auto leading-relaxed font-light">
          Avya Store was founded on a simple conviction: genuinely beautiful accessories should be made with genuine care — for the artisan, for the material, and for the generation who carries it.
        </p>
      </div>
    </section>

    {/* ── VALUES ── */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-12">
        <p className="section-label mb-2">✦ Non-Negotiable Standards</p>
        <h2 className="font-display text-4xl sm:text-5xl text-ink uppercase tracking-tight">
          Our Three Pillars
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
        {[
          {
            icon: <Leaf className="w-8 h-8" />,
            title: '100% Vegetable-Tanned',
            desc: 'We exclusively select hides tanned with organic tree barks and plant tannins. Free from toxic heavy metals and chrome. It takes 40 days longer to process, but ages into a golden heirloom patina.',
          },
          {
            icon: <Award className="w-8 h-8" />,
            title: 'Bench-Made Precision',
            desc: 'Every bag passes through a single artisan’s hands from hide inspection to continuous hand saddle-stitching. Zero assembly lines. Zero compromise on thread tension.',
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: 'Ethical Guild Wages',
            desc: 'Our partner workshops pay artisan compensation 40% above national averages and provide complete healthcare coverage for craftspeople and their households.',
          },
        ].map((v) => (
          <div
            key={v.title}
            className="p-8 bg-paper border border-border rounded-xs shadow-subtle hover:border-ink/30 transition-all text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-xs bg-fog border border-border flex items-center justify-center text-accent-mid mb-5 shadow-xs">
              {v.icon}
            </div>
            <h3 className="font-sans text-lg font-extrabold text-ink mb-3">{v.title}</h3>
            <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-light">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── STORY TIMELINE ── */}
    <section className="bg-paper border-y border-border py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="section-label mb-2">Chronicle of Growth</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink uppercase tracking-tight">
            From Atelier to Wardrobe
          </h2>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {TIMELINE.map((t, i) => (
            <div key={t.year} className="flex gap-4 sm:gap-6 items-start group">
              <div className="flex-shrink-0 w-14 sm:w-20 text-right">
                <span className="font-display text-2xl sm:text-3xl text-ink group-hover:text-accent-mid transition-colors">
                  {t.year}
                </span>
              </div>
              <div className="flex flex-col items-center gap-0 mx-1.5 sm:mx-2">
                <div className="w-3.5 h-3.5 rounded-full bg-ink border-2 border-accent mt-1.5 flex-shrink-0" />
                {i < TIMELINE.length - 1 && <div className="w-px h-16 sm:h-20 bg-border mt-1" />}
              </div>
              <div className="pb-4 flex-1">
                <h3 className="font-sans text-base sm:text-lg font-extrabold text-ink mb-1">{t.title}</h3>
                <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-light">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── TEAM ── */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="text-center mb-12 sm:mb-16">
        <p className="section-label mb-2">The Artisans</p>
        <h2 className="font-display text-4xl sm:text-5xl text-ink uppercase tracking-tight">
          Faces Behind The Stitch
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        {TEAM.map((m) => (
          <div
            key={m.name}
            className="p-6 sm:p-8 bg-paper border border-border rounded-xs shadow-subtle text-center flex flex-col items-center"
          >
            <img
              src={m.avatar}
              alt={m.name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-border shadow-xs"
            />
            <h3 className="font-sans text-base sm:text-lg font-extrabold text-ink">{m.name}</h3>
            <p className="text-[10px] uppercase tracking-widest text-accent-mid font-black mb-3">{m.role}</p>
            <p className="text-xs sm:text-sm text-ink/70 leading-relaxed font-light">{m.bio}</p>
          </div>
        ))}
      </div>
    </section>

    {/* ── BOTTOM CTA ── */}
    <section className="bg-ink text-fog py-16 text-center border-t border-white/10">
      <div className="max-w-xl mx-auto px-4">
        <span className="badge-new text-[9px] mb-3 inline-block">Curated Drops</span>
        <h2 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-tight mb-4">
          Experience Authentic Drip
        </h2>
        <p className="text-xs sm:text-sm text-fog/70 mb-8 leading-relaxed font-light">
          Browse our active capsule collections and elevate your everyday carry with timeless leather craft.
        </p>
        <Link
          to="/products"
          className="btn-accent px-8 py-4 text-xs font-black tracking-widest"
        >
          <span>EXPLORE THE VAULT</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>

  </div>
);

export default AboutPage;
