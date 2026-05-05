// AI Engineer Dashboard Component
const { useState, useEffect } = React;

const Dashboard = ({ user, onNavigate }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading dashboard data
        setTimeout(() => {
            setDashboardData(mockData.dashboardData);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="container">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </div>
        );
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="container">
            <div style={{ padding: '40px 0' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '30px' }}>
                    Welcome back, {user.name}!
                </h1>
                
                {/* Stats Grid */}
                <div className="dashboard-grid">
                    <div className="stat-card">
                        <div className="stat-value">{dashboardData.currentRank}</div>
                        <div className="stat-label">Current Rank</div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-value">{dashboardData.totalTeamSize}</div>
                        <div className="stat-label">Team Size</div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-value">{formatCurrency(dashboardData.totalEarnings)}</div>
                        <div className="stat-label">Total Earnings</div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-value">{dashboardData.activePairs}</div>
                        <div className="stat-label">Active Pairs</div>
                    </div>
                </div>

                {/* Investment Status */}
                <div className="card">
                    <h2 className="card-title">Investment Status</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <div>
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Investment</div>
                            <div style={{ fontSize: '24px', fontWeight: '600', color: '#333' }}>
                                {formatCurrency(dashboardData.investment.total)}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Monthly Interest</div>
                            <div style={{ fontSize: '24px', fontWeight: '600', color: '#28a745' }}>
                                {formatCurrency(dashboardData.investment.monthlyInterest)}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Student Status</div>
                            <div style={{ fontSize: '24px', fontWeight: '600', color: '#667eea' }}>
                                {dashboardData.investment.studentStatus}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Program Progress</div>
                            <div style={{ fontSize: '24px', fontWeight: '600', color: '#764ba2' }}>
                                {dashboardData.investment.programProgress}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Commissions */}
                <div className="card">
                    <h2 className="card-title">Recent Commissions</h2>
                    <table className="commission-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentCommissions.map((commission, index) => (
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
                                    <td className="amount">{formatCurrency(commission.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Rank Progress */}
                <div className="card">
                    <h2 className="card-title">Rank Progress</h2>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Progress to {dashboardData.nextRank.name}</span>
                            <span>{dashboardData.nextRank.progress}%</span>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '20px',
                            backgroundColor: '#e1e5e9',
                            borderRadius: '10px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${dashboardData.nextRank.progress}%`,
                                height: '100%',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                transition: 'width 1s ease-in-out'
                            }}></div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                        <div>
                            <div style={{ fontSize: '12px', color: '#666' }}>Direct Recruits</div>
                            <div style={{ fontSize: '16px', fontWeight: '600' }}>
                                {dashboardData.nextRank.current.directRecruits} / {dashboardData.nextRank.required.directRecruits}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#666' }}>Team Enrollments</div>
                            <div style={{ fontSize: '16px', fontWeight: '600' }}>
                                {dashboardData.nextRank.current.teamEnrollments} / {dashboardData.nextRank.required.teamEnrollments}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#666' }}>Left Balance</div>
                            <div style={{ fontSize: '16px', fontWeight: '600' }}>
                                {dashboardData.nextRank.current.leftBalance} / {dashboardData.nextRank.required.leftBalance}
                            </div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#666' }}>Right Balance</div>
                            <div style={{ fontSize: '16px', fontWeight: '600' }}>
                                {dashboardData.nextRank.current.rightBalance} / {dashboardData.nextRank.required.rightBalance}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                    <h2 className="card-title">Quick Actions</h2>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => onNavigate('enrollment')}>
                            Enroll New AI Engineer
                        </button>
                        <button className="btn btn-secondary" onClick={() => onNavigate('tree')}>
                            View My Tree
                        </button>
                        <button className="btn btn-secondary" onClick={() => onNavigate('commissions')}>
                            Commission Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
