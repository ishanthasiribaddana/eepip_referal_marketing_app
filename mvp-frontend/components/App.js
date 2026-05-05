// Main App Component - EEPIP MVP
const { useState, useEffect } = React;

const App = () => {
    const [currentPage, setCurrentPage] = useState('landing');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if user is logged in (for demo, auto-login after 2 seconds)
        // DISABLED: Commented out to show landing page to general public
        // const timer = setTimeout(() => {
        //     setUser(mockData.currentUser);
        //     setCurrentPage('dashboard');
        // }, 2000);
        // 
        // return () => clearTimeout(timer);
    }, []);

    const handleNavigation = (page) => {
        setCurrentPage(page);
    };

    const handleLogout = () => {
        setUser(null);
        setCurrentPage('landing');
    };

    const renderPage = () => {
        if (loading) {
            return (
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            );
        }

        switch (currentPage) {
            case 'landing':
                return <Landing onNavigate={handleNavigation} />;
            case 'dashboard':
                return <Dashboard user={user} onNavigate={handleNavigation} />;
            case 'tree':
                return <BinaryTree user={user} onNavigate={handleNavigation} />;
            case 'enrollment':
                return <Enrollment user={user} onNavigate={handleNavigation} />;
            case 'commissions':
                return <Commissions user={user} onNavigate={handleNavigation} />;
            default:
                return <Landing onNavigate={handleNavigation} />;
        }
    };

    return (
        <div className="app">
            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <img src="logo.png" alt="TEMCO Logo" style={{ height: '40px', width: 'auto' }} />
                        </div>
                        <nav className="nav-links">
                            {user ? (
                                <>
                                    <a 
                                        className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                                        onClick={() => handleNavigation('dashboard')}
                                    >
                                        Dashboard
                                    </a>
                                    <a 
                                        className={`nav-link ${currentPage === 'tree' ? 'active' : ''}`}
                                        onClick={() => handleNavigation('tree')}
                                    >
                                        My Tree
                                    </a>
                                    <a 
                                        className={`nav-link ${currentPage === 'commissions' ? 'active' : ''}`}
                                        onClick={() => handleNavigation('commissions')}
                                    >
                                        Commissions
                                    </a>
                                    <a 
                                        className={`nav-link ${currentPage === 'enrollment' ? 'active' : ''}`}
                                        onClick={() => handleNavigation('enrollment')}
                                    >
                                        Enroll
                                    </a>
                                    <a className="nav-link" onClick={handleLogout}>
                                        Logout
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a 
                                        className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`}
                                        onClick={() => handleNavigation('landing')}
                                    >
                                        Home
                                    </a>
                                    <a 
                                        className={`nav-link ${currentPage === 'enrollment' ? 'active' : ''}`}
                                        onClick={() => handleNavigation('enrollment')}
                                    >
                                        Join Now
                                    </a>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                {renderPage()}
            </main>

            {/* Footer */}
            <footer style={{ 
                background: 'rgba(255, 255, 255, 0.95)', 
                padding: '20px', 
                textAlign: 'center',
                marginTop: '40px'
            }}>
                <p>&copy; 2026 EEPIP - Partnership with TEMCO Bank & Java Institute Holdings</p>
                <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                    Demo Version - For Presentation Purposes Only
                </p>
            </footer>
        </div>
    );
};
