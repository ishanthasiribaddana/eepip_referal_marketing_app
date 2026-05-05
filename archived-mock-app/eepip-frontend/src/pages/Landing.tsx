import { useNavigate } from 'react-router-dom'
import { GraduationCap, TrendingUp, Users, Shield } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <GraduationCap size={32} className="text-amber-400" />
          <div>
            <h1 className="text-xl font-bold">EEPIP</h1>
            <p className="text-xs text-blue-200">by TEMCO Bank &amp; Java Institute</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Login
        </button>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-8 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6 leading-tight">
          Education Easy-Pay<br />
          <span className="text-amber-400">Investment Plan</span>
        </h2>
        <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
          Invest Rs. 1,800,000 in education. Earn 16% p.a. interest. 
          Build a team of AI Engineers and earn MLM commissions.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/enrollment')}
            className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold px-8 py-3 rounded-lg text-lg transition-colors"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="border border-white/30 hover:bg-white/10 font-semibold px-8 py-3 rounded-lg text-lg transition-colors"
          >
            View Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <TrendingUp size={28} className="text-amber-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2">16% Annual Returns</h3>
            <p className="text-blue-200 text-sm">
              Rs. 24,000/month interest covers BSc tuition automatically.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <Users size={28} className="text-amber-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Binary MLM Network</h3>
            <p className="text-blue-200 text-sm">
              Earn up to 10% in commissions: Direct Sponsor, Binary Pairing, Matching Bonus.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <Shield size={28} className="text-amber-400 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Bank-Secured</h3>
            <p className="text-blue-200 text-sm">
              Investments held by TEMCO Bank with full KYC and tri-party agreement.
            </p>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="max-w-5xl mx-auto px-8 pb-20">
        <h3 className="text-2xl font-bold text-center mb-8">Commission Structure</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Direct Sponsor', pct: '2%', amount: 'Rs. 36,000' },
            { label: 'Binary Pairing', pct: '5%', amount: 'Rs. 90,000' },
            { label: 'Matching Bonus', pct: '1.5%', amount: 'Rs. 27,000' },
            { label: 'Leadership Pool', pct: '1.5%', amount: 'Rs. 27,000' },
          ].map((c) => (
            <div key={c.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center border border-white/10">
              <div className="text-3xl font-bold text-amber-400">{c.pct}</div>
              <div className="text-sm font-medium mt-1">{c.label}</div>
              <div className="text-xs text-blue-200 mt-1">{c.amount}/enrollment</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-blue-300 text-sm border-t border-white/10">
        © 2026 TEMCO Bank &amp; Java Institute Holdings. All rights reserved.
      </footer>
    </div>
  )
}
