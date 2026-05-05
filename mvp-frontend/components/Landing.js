// Public Landing Page Component
const { useState } = React;

const Landing = ({ onNavigate }) => {
    const [showCalculator, setShowCalculator] = useState(false);
    const [calculatorData, setCalculatorData] = useState({
        investment: 1800000,
        monthlyReturn: 24000,
        totalEducation: 1800000,
        commissionPotential: 0
    });

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const handleInvestmentChange = (value) => {
        const investment = parseInt(value) || 0;
        const monthlyReturn = Math.round(investment * 0.16 / 12);
        const commissionPotential = Math.round(investment * 0.10 * 3);
        
        setCalculatorData({
            investment,
            monthlyReturn,
            totalEducation: investment,
            commissionPotential
        });
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title">EEPIP</h1>
                    <h2 style={{ fontSize: '28px', fontWeight: '500', marginBottom: '20px' }}>
                        Education Easy-Pay Investment Plan
                    </h2>
                    <p className="hero-subtitle">
                        Invest in Education. Build Your Future with Monthly Educational Credits (MECs)
                    </p>
                    <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px', fontSize: '16px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                        A structured education financing solution designed to make world-class higher education accessible, sustainable, and performance-driven.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => onNavigate('enrollment')}>
                            Join Now
                        </button>
                        <button className="btn btn-secondary" onClick={() => setShowCalculator(!showCalculator)}>
                            Calculate Your Plan
                        </button>
                    </div>
                </div>
            </section>

            {/* Investment Calculator */}
            {showCalculator && (
                <section style={{ padding: '40px 20px', backgroundColor: 'white' }}>
                    <div className="container">
                        <div className="card">
                            <h2 className="card-title">Investment Calculator</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                <div>
                                    <label className="form-label">Investment Amount (LKR)</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        value={calculatorData.investment}
                                        onChange={(e) => handleInvestmentChange(e.target.value)}
                                        min="1000000"
                                        max="5000000"
                                        step="100000"
                                    />
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Monthly Interest (16% p.a.)</div>
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#28a745' }}>
                                        {formatCurrency(calculatorData.monthlyReturn)}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Education Value</div>
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#667eea' }}>
                                        {formatCurrency(calculatorData.totalEducation)}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>MEC Potential (Est.)</div>
                                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#764ba2' }}>
                                        {formatCurrency(calculatorData.commissionPotential)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Why Choose EEPIP */}
            <section className="features">
                <div className="container">
                    <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '20px', color: '#333' }}>
                        Why Choose EEPIP?
                    </h2>
                    <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px', fontSize: '18px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                        A modern approach to higher education that combines structured financing with performance-based benefits.
                    </p>
                    
                    <div className="feature-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎓</div>
                            <h3 className="feature-title">Globally Recognized Education</h3>
                            <p className="feature-description">
                                Follow industry-aligned degree pathways in Software Engineering and AI through accredited academic partnerships.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">💳</div>
                            <h3 className="feature-title">Monthly Educational Credits (MECs)</h3>
                            <p className="feature-description">
                                A structured credit mechanism designed to support your monthly education payments.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">🏆</div>
                            <h3 className="feature-title">Performance-Based Rewards</h3>
                            <p className="feature-description">
                                Earn incentives by helping others access the same education opportunity through a structured referral network.
                            </p>
                        </div>
                        
                        <div className="feature-card">
                            <div className="feature-icon">🔄</div>
                            <h3 className="feature-title">Sustainable Model</h3>
                            <p className="feature-description">
                                Built on real education delivery, transparent allocation, and long-term academic value.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How EEPIP Works */}
            <section style={{ padding: '60px 20px', backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#333' }}>
                        How EEPIP Works
                    </h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        <div className="card" style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '48px', marginBottom: '20px', textAlign: 'center' }}>1️⃣</div>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#0336FF', textAlign: 'center' }}>
                                Secure Your Education Plan
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                Enroll through a structured financial arrangement facilitated via TEMCO Bank, ensuring security and transparency.
                            </p>
                        </div>
                        
                        <div className="card" style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '48px', marginBottom: '20px', textAlign: 'center' }}>2️⃣</div>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#0336FF', textAlign: 'center' }}>
                                Access World-Class Education
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                Nominate yourself or a student to follow a comprehensive Software Engineering and AI-focused academic pathway.
                            </p>
                        </div>
                        
                        <div className="card" style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '48px', marginBottom: '20px', textAlign: 'center' }}>3️⃣</div>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#0336FF', textAlign: 'center' }}>
                                Activate Monthly Educational Credits (MECs)
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                MECs are generated through the program structure and applied toward your monthly tuition obligations.
                            </p>
                        </div>
                        
                        <div className="card" style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '48px', marginBottom: '20px', textAlign: 'center' }}>4️⃣</div>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', color: '#0336FF', textAlign: 'center' }}>
                                Expand Access, Earn Benefits
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                Introduce others to the program and receive performance-based incentives through a structured network model.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Features */}
            <section style={{ padding: '60px 20px', backgroundColor: 'white' }}>
                <div className="container">
                    <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#333' }}>
                        Program Features
                    </h2>
                    
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '25px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: '#0336FF' }}>
                                Education-Focused Financial Structuring
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                Designed to align funding with actual learning progress
                            </p>
                        </div>
                        
                        <div style={{ marginBottom: '25px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: '#0336FF' }}>
                                Transparent Credit Allocation
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                MECs are systematically applied toward tuition payments
                            </p>
                        </div>
                        
                        <div style={{ marginBottom: '25px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: '#0336FF' }}>
                                Multiple Incentive Streams
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                Rewarding individuals who contribute to expanding access to education
                            </p>
                        </div>
                        
                        <div style={{ marginBottom: '25px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px', color: '#0336FF' }}>
                                Scalable Network Model (Internal System)
                            </h3>
                            <p style={{ color: '#666', lineHeight: '1.6' }}>
                                Efficient structure to manage growth and reward distribution
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Monthly Educational Credits (MECs) */}
            <section style={{ padding: '60px 20px', backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#333' }}>
                        Monthly Educational Credits (MECs)
                    </h2>
                    
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px', lineHeight: '1.8' }}>
                            MECs are not cash payouts, but structured educational credits designed to:
                        </p>
                        
                        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
                            <li style={{ marginBottom: '15px', color: '#666', fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '0', color: '#0336FF' }}>✓</span>
                                Support monthly tuition payments
                            </li>
                            <li style={{ marginBottom: '15px', color: '#666', fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '0', color: '#0336FF' }}>✓</span>
                                Reduce the financial burden on students
                            </li>
                            <li style={{ marginBottom: '15px', color: '#666', fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: '0', color: '#0336FF' }}>✓</span>
                                Align benefits with actual participation in education
                            </li>
                        </ul>
                        
                        <p style={{ fontSize: '16px', color: '#666', marginTop: '30px', fontStyle: 'italic', fontWeight: '500' }}>
                            This ensures that the focus remains on learning, progression, and long-term career outcomes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Who Can Join */}
            <section style={{ padding: '60px 20px', backgroundColor: 'white' }}>
                <div className="container">
                    <h2 style={{ fontSize: '36px', fontWeight: '700', textAlign: 'center', marginBottom: '40px', color: '#333' }}>
                        Who Can Join?
                    </h2>
                    
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '20px', padding: '25px', backgroundColor: '#f8f9fa', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ fontSize: '32px' }}>👨‍🎓</div>
                            <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>
                                Students seeking flexible access to higher education
                            </p>
                        </div>
                        
                        <div style={{ marginBottom: '20px', padding: '25px', backgroundColor: '#f8f9fa', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ fontSize: '32px' }}>👥</div>
                            <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>
                                Individuals looking to support others in education pathways
                            </p>
                        </div>
                        
                        <div style={{ marginBottom: '20px', padding: '25px', backgroundColor: '#f8f9fa', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ fontSize: '32px' }}>🤝</div>
                            <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>
                                Independent education advisors and recruiters
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section style={{ padding: '60px 20px', background: 'linear-gradient(135deg, #0336FF 0%, #FF0266 100%)', color: 'white' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '20px' }}>
                        Start Your Education Journey Today
                    </h2>
                    <p style={{ fontSize: '18px', marginBottom: '40px', opacity: 0.9, maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
                        Join a new generation of learners benefiting from structured education financing and performance-based rewards.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" style={{ backgroundColor: 'white', color: '#0336FF' }} onClick={() => onNavigate('enrollment')}>
                            Join Now
                        </button>
                        <button className="btn btn-secondary" style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid white' }}>
                            Speak to an Advisor
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ backgroundColor: '#333', color: 'white', padding: '40px 20px 20px' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '30px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>EEPIP</h3>
                            <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '14px' }}>
                                Education Easy-Pay Investment Plan - A partnership between TEMCO Bank and Java Institute Holdings
                            </p>
                        </div>
                        
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Quick Links</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</a></li>
                                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>How It Works</a></li>
                                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>MEC Structure</a></li>
                                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Contact</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Contact</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#ccc', fontSize: '14px' }}>
                                <li style={{ marginBottom: '10px' }}>📧 info@eepip.lk</li>
                                <li style={{ marginBottom: '10px' }}>📞 +94 11 234 5678</li>
                                <li style={{ marginBottom: '10px' }}>📍 Colombo, Sri Lanka</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #555', color: '#ccc', fontSize: '12px' }}>
                        <p>&copy; 2026 EEPIP - Demo Version for Presentation Purposes Only</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};
