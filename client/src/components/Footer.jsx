import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">

      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-500" />

      {/* Decorative blurred orb */}
      <div className="absolute -top-16 right-1/4 w-64 h-64 rounded-full bg-purple-800/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-52 h-52 rounded-full bg-indigo-700/20 blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-6 pt-14 pb-8">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-extrabold mb-3 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              GadgetHub
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your one-stop destination for premium gadgets and electronics. Quality you can trust, delivered fast.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {[
                { icon: <FaFacebookF />, href: '#' },
                { icon: <FaTwitter />, href: '#' },
                { icon: <FaInstagram />, href: '#' },
                { icon: <FaYoutube />, href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 flex items-center justify-center rounded-full
                             bg-white/10 hover:bg-purple-500/30 hover:text-purple-300
                             border border-white/10 hover:border-purple-400/40
                             text-slate-400 text-sm transition-all duration-300 hover:scale-110"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300 mb-4">Shop</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {['All Products', 'New Arrivals', 'Best Sellers', 'Deals & Offers'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300 mb-4">Support</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {['Help Center', 'Track Order', 'Returns & Refunds', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:text-purple-300 transition-colors duration-200 hover:translate-x-1 inline-block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-300 mb-4">Stay Updated</h3>
            <p className="text-slate-400 text-sm mb-4">Get the latest deals straight to your inbox.</p>
            <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:border-purple-500/50 transition-colors duration-300">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 bg-white/5 text-white placeholder-slate-500 text-sm px-4 py-2.5 outline-none"
              />
              <button className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white text-sm font-semibold transition-all duration-300">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2024 GadgetHub. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookie Policy</a>
          </div>
          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-8 h-8 flex items-center justify-center rounded-full
                       bg-white/10 hover:bg-purple-500/30 border border-white/10 hover:border-purple-400/40
                       text-slate-400 hover:text-purple-300 text-sm transition-all duration-300 hover:scale-110"
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
