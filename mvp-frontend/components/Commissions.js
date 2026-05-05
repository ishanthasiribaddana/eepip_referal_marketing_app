// Commission Reports Component
const { useState, useEffect } = React;

const Commissions = ({ user, onNavigate }) => {
    const [commissionData, setCommissionData] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState('current');
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading commission data
        setTimeout(() => {
            setCommissionData(mockData.commissionData);
            setLoading(false);
        }, 1000);
    }, [selectedPeriod]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const renderOverview = () => (
        <div>
            {/* Commission Summary Cards */}
            <div className="dashboard-grid">
                <div className="stat-card">
                    <div className="stat-value">{formatCurrency(commissionData.overview.totalEarnings)}</div>
                    <div className="stat-label">Total Earnings</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-value">{formatCurrency(commissionData.overview.thisMonth)}</div>
                    <div className="stat-label">This Month</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-value">{formatCurrency(commissionData.overview.lastMonth)}</div>
                    <div className="stat-label">Last Month</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-value">{commissionData.overview.activePairs}</div>
                    <div className="stat-label">Active Pairs</div>
                </div>
            </div>

            {/* Commission Breakdown */}
            <div className="card">
                <h2 className="card-title">Commission Breakdown</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    {commissionData.overview.breakdown.map((item, index) => (
                        <div key={index} style={{ 
                            padding: '20px', 
                            backgroundColor: '#f8f9fa', 
                            borderRadius: '12px',
                            border: `2px solid ${item.color}`
                        }}>
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>{item.type}</div>
                            <div style={{ fontSize: '24px', fontWeight: '600', color: item.color, marginBottom: '8px' }}>
                                {formatCurrency(item.amount)}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                                {item.percentage}% of total • {item.transactions} transactions
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Monthly Trend Chart Placeholder */}
            <div className="card">
                <h2 className="card-title">Monthly Earnings Trend</h2>
                <div style={{ 
                    height: '300px', 
                    backgroundColor: '#f8f9fa', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#666'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', marginBottom: '10px' }}>📊</div>
                        <div>Chart visualization would be implemented here</div>
                        <div style={{ fontSize: '12px', marginTop: '5px' }}>Monthly earnings over last 12 months</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDetailed = () => (
        <div>
            {/* Period Selector */}
            <div className="card">
                <h2 className="card-title">Commission Period</h2>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {['current', 'last-month', 'last-3-months', 'last-6-months', 'this-year'].map(period => (
                        <button
                            key={period}
                            className={`btn ${selectedPeriod === period ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setSelectedPeriod(period)}
                        >
                            {period.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </button>
                    ))}
                </div>
            </div>

            {/* Detailed Commission Table */}
            <div className="card">
                <h2 className="card-title">Detailed Commission History</h2>
                <table className="commission-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>From Member</th>
                            <th>BV</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissionData.detailed.map((commission, index) => (
                            <tr key={index}>
                                <td>{commission.date}</td>
                                <td>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        backgroundColor: 
                                            commission.type === 'Direct Sponsor' ? '#d4edda' :
                                            commission.type === 'Binary' ? '#d1ecf1' :
                                            commission.type === 'Matching' ? '#fff3cd' : '#f8d7da',
                                        color: 
                                            commission.type === 'Direct Sponsor' ? '#155724' :
                                            commission.type === 'Binary' ? '#0c5460' :
                                            commission.type === 'Matching' ? '#856404' : '#721c24'
                                    }}>
                                        {commission.type}
                                    </span>
                                </td>
                                <td>{commission.description}</td>
                                <td>{commission.fromMember}</td>
                                <td>{commission.bv}</td>
                                <td className="amount">{formatCurrency(commission.amount)}</td>
                                <td>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        backgroundColor: commission.status === 'Paid' ? '#d4edda' : '#fff3cd',
                                        color: commission.status === 'Paid' ? '#155724' : '#856404'
                                    }}>
                                        {commission.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderBinary = () => (
        <div>
            {/* Binary Statistics */}
            <div className="dashboard-grid">
                <div className="stat-card">
                    <div className="stat-value">{commissionData.binary.leftBV}</div>
                    <div className="stat-label">Left BV</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-value">{commissionData.binary.rightBV}</div>
                    <div className="stat-label">Right BV</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-value">{commissionData.binary.pairedBV}</div>
                    <div className="stat-label">Paired BV</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-value">{commissionData.binary.carryForward}</div>
                    <div className="stat-label">Carry Forward</div>
                </div>
            </div>

            {/* Binary Pairing Details */}
            <div className="card">
                <h2 className="card-title">Binary Pairing Details</h2>
                <table className="commission-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Left BV</th>
                            <th>Right BV</th>
                            <th>Pairs Formed</th>
                            <th>Payout Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissionData.binary.pairingDetails.map((pairing, index) => (
                            <tr key={index}>
                                <td>{pairing.date}</td>
                                <td>{pairing.leftBV}</td>
                                <td>{pairing.rightBV}</td>
                                <td>{pairing.pairs}</td>
                                <td>{pairing.rate}%</td>
                                <td className="amount">{formatCurrency(pairing.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Binary Pool Status */}
            <div className="card">
                <h2 className="card-title">Binary Pool Status</h2>
                <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                        <div>
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Monthly Pool</div>
                            <div style={{ fontSize: '20px', fontWeight: '600', color: '#667eea' }}>
                                {formatCurrency(commissionData.binary.poolStatus.monthlyPool)}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Claims</div>
                            <div style={{ fontSize: '20px', fontWeight: '600', color: '#dc3545' }}>
                                {formatCurrency(commissionData.binary.poolStatus.totalClaims)}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Available</div>
                            <div style={{ fontSize: '20px', fontWeight: '600', color: '#28a745' }}>
                                {formatCurrency(commissionData.binary.poolStatus.available)}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Utilization</div>
                            <div style={{ fontSize: '20px', fontWeight: '600', color: '#ffc107' }}>
                                {commissionData.binary.poolStatus.utilization}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMatching = () => (
        <div>
            {/* Matching Bonus Overview */}
            <div className="dashboard-grid">
                <div className="stat-card">
                    <div className="stat-value">{commissionData.matching.totalMatching}</div>
                    <div className="stat-label">Total Matching Bonus</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-value">{commissionData.matching.gen1Count}</div>
                    <div className="stat-label">Gen 1 Recruits</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-value">{commissionData.matching.gen2Count}</div>
                    <div className="stat-label">Gen 2 Recruits</div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-value">{commissionData.matching.gen3Count}</div>
                    <div className="stat-label">Gen 3 Recruits</div>
                </div>
            </div>

            {/* Generation Breakdown */}
            <div className="card">
                <h2 className="card-title">Generation Breakdown</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    {commissionData.matching.generations.map((gen, index) => (
                        <div key={index} style={{ 
                            padding: '20px', 
                            backgroundColor: '#f8f9fa', 
                            borderRadius: '12px',
                            border: `2px solid ${gen.color}`
                        }}>
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                                Generation {gen.level} ({gen.rate}%)
                            </div>
                            <div style={{ fontSize: '24px', fontWeight: '600', color: gen.color, marginBottom: '8px' }}>
                                {formatCurrency(gen.earnings)}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                                From {gen.members} members • {gen.active} active
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Matching Bonus Details */}
            <div className="card">
                <h2 className="card-title">Matching Bonus Details</h2>
                <table className="commission-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Generation</th>
                            <th>From Member</th>
                            <th>Member Rank</th>
                            <th>Binary Earnings</th>
                            <th>Matching %</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commissionData.matching.details.map((matching, index) => (
                            <tr key={index}>
                                <td>{matching.date}</td>
                                <td>Gen {matching.generation}</td>
                                <td>{matching.fromMember}</td>
                                <td>{matching.memberRank}</td>
                                <td>{formatCurrency(matching.binaryEarnings)}</td>
                                <td>{matching.rate}%</td>
                                <td className="amount">{formatCurrency(matching.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="container">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div style={{ padding: '40px 0' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '30px' }}>
                    Commission Reports
                </h1>

                {/* Tab Navigation */}
                <div className="card">
                    <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid #e1e5e9', marginBottom: '20px' }}>
                        {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'detailed', label: 'Detailed History' },
                            { id: 'binary', label: 'Binary Pairing' },
                            { id: 'matching', label: 'Matching Bonus' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setActiveTab(tab.id)}
                                style={{ 
                                    borderRadius: '8px 8px 0 0',
                                    borderBottom: activeTab === tab.id ? '2px solid #667eea' : 'none'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'detailed' && renderDetailed()}
                {activeTab === 'binary' && renderBinary()}
                {activeTab === 'matching' && renderMatching()}

                {/* Export Options */}
                <div className="card">
                    <h2 className="card-title">Export Options</h2>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <button className="btn btn-secondary">
                            📄 Download PDF Report
                        </button>
                        <button className="btn btn-secondary">
                            📊 Export to Excel
                        </button>
                        <button className="btn btn-secondary">
                            📧 Email Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
