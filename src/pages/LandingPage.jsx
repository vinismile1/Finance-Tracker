import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  PieChart, 
  Clock, 
  PiggyBank, 
  CheckCircle2, 
  Wallet,
  Receipt,
  BellRing
} from 'lucide-react';
import { Logo } from '../components/Logo';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F4F1E8] text-[#1D2722] font-sans selection:bg-[#B69A6A] selection:text-[#18352C]">
      {/* Public Header */}
      <header className="sticky top-0 z-50 bg-[#DDE3D8]/90 backdrop-blur-md border-b border-[#18352C]/20 px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link to="/">
          <Logo size="md" variant="full" darkText={true} />
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            to="/login" 
            className="text-sm font-semibold text-[#18352C]/80 hover:text-[#18352C] transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="px-5 py-2.5 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-sm shadow-md transition-all hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-6 lg:px-12 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DDE3D8] border border-[#18352C]/30 text-[#18352C] text-xs font-semibold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Sparkles className="w-3.5 h-3.5 text-[#18352C]" />
          Inspired by High-End Financial Architecture
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-['Playfair_Display'] text-[#1D2722] leading-tight max-w-4xl mx-auto mb-6">
          Take control of your money. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#18352C] via-[#8A6A4A] to-[#B69A6A]">
            Build a better financial future.
          </span>
        </h1>

        <p className="text-lg lg:text-xl text-[#18352C]/70 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Track your spending, understand your financial habits, monitor your savings, and never miss an important payment — all framed in a warm, luxury experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            to="/register" 
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-base shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <span>Start Saving Smarter</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a 
            href="#why-vsave" 
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#DDE3D8] border border-[#18352C]/30 hover:border-[#18352C] text-[#1D2722] font-semibold text-base transition-all"
          >
            Explore V.SAVE
          </a>
        </div>

        {/* Dashboard Preview Glass Card */}
        <div className="relative mx-auto max-w-5xl rounded-3xl p-3 bg-[#DDE3D8] border border-[#18352C]/20 shadow-2xl">
          <div className="bg-[#F4F1E8] rounded-2xl p-6 border border-[#18352C]/20 text-left grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#DDE3D8] p-5 rounded-2xl border border-[#18352C]/20">
              <span className="text-xs uppercase tracking-wider text-[#18352C]/70">Total Balance</span>
              <h3 className="text-2xl font-bold font-['Cinzel'] text-[#1D2722] mt-1">₹1,84,500.00</h3>
              <div className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12.4% vs last month
              </div>
            </div>

            <div className="bg-[#DDE3D8] p-5 rounded-2xl border border-[#18352C]/20">
              <span className="text-xs uppercase tracking-wider text-[#18352C]/70">Monthly Income</span>
              <h3 className="text-2xl font-bold font-['Cinzel'] text-[#18352C] mt-1">₹1,21,500.00</h3>
              <div className="mt-2 text-xs text-[#18352C]/70">3 Income Sources</div>
            </div>

            <div className="bg-[#DDE3D8] p-5 rounded-2xl border border-[#18352C]/20">
              <span className="text-xs uppercase tracking-wider text-[#18352C]/70">Monthly Expenses</span>
              <h3 className="text-2xl font-bold font-['Cinzel'] text-amber-800 mt-1">₹41,498.00</h3>
              <div className="mt-2 text-xs text-emerald-700 font-medium flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> -8.1% lower spending
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why V.SAVE Section */}
      <section id="why-vsave" className="py-20 bg-[#DDE3D8] border-y border-[#18352C]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#18352C]">The Financial Clarity You Need</span>
            <h2 className="text-3xl lg:text-4xl font-bold font-['Playfair_Display'] text-[#1D2722] mt-2">
              Why Choose V.SAVE?
            </h2>
            <p className="text-[#18352C]/70 text-sm lg:text-base mt-3">
              Traditional banking apps leave you guessing. V.SAVE brings absolute transparency and foresight to your daily financial habits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Where Does Money Go?",
                desc: "Never wonder at the end of the month. Real-time categorization tracks every rupee with complete precision.",
                icon: Wallet
              },
              {
                title: "Stop Micro-Bleeding",
                desc: "Small daily coffee, snacks, and subscriptions add up fast. We surface hidden spending patterns effortlessly.",
                icon: Receipt
              },
              {
                title: "Never Miss a Payment",
                desc: "Late fees are history. Smart color-coded reminders keep rent, electricity, and loan dates crystal clear.",
                icon: BellRing
              },
              {
                title: "Visual Spending Analytics",
                desc: "Rich interactive charts display category distributions and month-over-month trend analysis.",
                icon: PieChart
              },
              {
                title: "Targeted Savings Goals",
                desc: "Create dedicated pots for emergencies, new devices, or vacations with active progress bars.",
                icon: PiggyBank
              },
              {
                title: "Privacy & Data Security",
                desc: "Your financial health is your private business. Encrypted storage and local control over your data.",
                icon: ShieldCheck
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-[#F4F1E8] p-8 rounded-2xl border border-[#18352C]/20 hover:border-[#18352C] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#DDE3D8] border border-[#18352C]/20 flex items-center justify-center text-[#18352C] mb-6 group-hover:scale-110 group-hover:bg-[#18352C] group-hover:text-[#F4F1E8] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1D2722] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#18352C]/70 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#18352C]">Designed for Modern Lifestyles</span>
          <h2 className="text-3xl lg:text-4xl font-bold font-['Playfair_Display'] text-[#1D2722] mt-2">
            Powerful Features for Every Need
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#DDE3D8] p-8 rounded-2xl border border-[#18352C]/20 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#18352C] uppercase tracking-wider">01 / Expenses</span>
              <h3 className="text-2xl font-bold text-[#1D2722] mt-2 mb-3">Seamless Expense Tracking</h3>
              <p className="text-sm text-[#18352C]/70 leading-relaxed mb-6">
                Log expenses in seconds with payment methods, categories, custom descriptions, and instant filterable search.
              </p>
            </div>
            <div className="bg-[#F4F1E8] p-4 rounded-xl border border-[#18352C]/20 space-y-2">
              <div className="flex justify-between text-xs text-[#1D2722]">
                <span>Artisanal Coffee</span>
                <span className="font-bold text-[#18352C]">₹450.00</span>
              </div>
              <div className="flex justify-between text-xs text-[#18352C]/70">
                <span>Food & Dining • UPI</span>
                <span>Today</span>
              </div>
            </div>
          </div>

          <div className="bg-[#DDE3D8] p-8 rounded-2xl border border-[#18352C]/20 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#18352C] uppercase tracking-wider">02 / Analytics</span>
              <h3 className="text-2xl font-bold text-[#1D2722] mt-2 mb-3">Deep Spending Insights</h3>
              <p className="text-sm text-[#18352C]/70 leading-relaxed mb-6">
                Uncover spending proportions across Food, Housing, Utilities, and Entertainment with interactive Recharts visuals.
              </p>
            </div>
            <div className="bg-[#F4F1E8] p-4 rounded-xl border border-[#18352C]/20 flex items-center justify-between">
              <span className="text-xs text-[#18352C]/70">Food Spending Ratio</span>
              <div className="w-1/2 bg-[#DDE3D8] h-3 rounded-full overflow-hidden">
                <div className="bg-[#18352C] h-full w-[30%]"></div>
              </div>
              <span className="text-xs font-bold text-[#18352C]">30%</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#DDE3D8] border-t border-[#18352C]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#18352C]">Simple 3-Step Process</span>
          <h2 className="text-3xl lg:text-4xl font-bold font-['Playfair_Display'] text-[#1D2722] mt-2 mb-16">
            How V.SAVE Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              { step: "01", title: "Track Your Expenses", desc: "Easily log daily purchases, bills, and income streams." },
              { step: "02", title: "Understand Spending", desc: "View real-time visual charts and automated financial insights." },
              { step: "03", title: "Achieve Goals", desc: "Build savings momentum and clear debts with total peace of mind." }
            ].map((s, i) => (
              <div key={i} className="bg-[#F4F1E8] p-8 rounded-2xl border border-[#18352C]/20 relative">
                <span className="text-4xl font-bold font-['Cinzel'] text-[#18352C]/40 block mb-4">{s.step}</span>
                <h3 className="text-xl font-bold text-[#1D2722] mb-2">{s.title}</h3>
                <p className="text-sm text-[#18352C]/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center">
        <div className="bg-[#DDE3D8] border border-[#18352C]/30 rounded-3xl p-10 lg:p-16 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-bold font-['Playfair_Display'] text-[#1D2722] mb-4">
            Ready to elevate your personal finances?
          </h2>
          <p className="text-[#18352C]/70 text-base max-w-xl mx-auto mb-8">
            Join thousands of users who have transformed their spending habits with V.SAVE.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#18352C] hover:bg-[#8A6A4A] text-[#F4F1E8] font-bold text-base shadow-xl transition-all hover:scale-105"
          >
            <span>Create Your Free Account</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#18352C]/20 text-center text-xs text-[#18352C]/70 bg-[#F4F1E8]">
        <p>© 2026 V.SAVE | Crafted with dedication for intelligent personal finance management.</p>
      </footer>
    </div>
  );
};
