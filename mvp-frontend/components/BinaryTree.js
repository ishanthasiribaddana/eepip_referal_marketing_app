// Binary Tree Visualization Component
const { useState, useEffect } = React;

const BinaryTree = ({ user, onNavigate }) => {
    const [treeData, setTreeData] = useState(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading tree data
        setTimeout(() => {
            setTreeData(mockData.binaryTreeData);
            setLoading(false);
        }, 1000);
    }, []);

    const handleNodeClick = (node) => {
        setSelectedNode(node);
    };

    const renderTreeNode = (node, level = 0) => {
        if (!node) return null;

        const getNodeClass = () => {
            if (node.status === 'active') return 'node-active';
            if (node.status === 'pending') return 'node-pending';
            return 'node-inactive';
        };

        return (
            <div key={node.id} className="tree-node" style={{ marginLeft: `${level * 140}px` }}>
                <div 
                    className={`node-content ${getNodeClass()}`}
                    onClick={() => handleNodeClick(node)}
                    style={{ cursor: 'pointer' }}
                >
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>{node.name}</div>
                    <div style={{ fontSize: '10px', marginTop: '4px' }}>{node.rank}</div>
                </div>
                <div className="node-name">{node.name}</div>
                <div className="node-rank">{node.rank}</div>
                
                {/* Render children */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    {node.left && renderTreeNode(node.left, level + 1)}
                    {node.right && renderTreeNode(node.right, level + 1)}
                </div>
            </div>
        );
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 0
        }).format(amount);
    };

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
                    My Binary Tree
                </h1>

                {/* Tree Statistics */}
                <div className="dashboard-grid">
                    <div className="stat-card">
                        <div className="stat-value">{treeData.stats.totalNodes}</div>
                        <div className="stat-label">Total Team Members</div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-value">{treeData.stats.activeNodes}</div>
                        <div className="stat-label">Active Members</div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-value">{treeData.stats.leftBV}</div>
                        <div className="stat-label">Left BV</div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-value">{treeData.stats.rightBV}</div>
                        <div className="stat-label">Right BV</div>
                    </div>
                </div>

                {/* Tree Controls */}
                <div className="card">
                    <h2 className="card-title">Tree Controls</h2>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <button className="btn btn-secondary">
                            Expand All
                        </button>
                        <button className="btn btn-secondary">
                            Collapse All
                        </button>
                        <button className="btn btn-secondary">
                            Reset View
                        </button>
                        <button className="btn btn-primary" onClick={() => onNavigate('enrollment')}>
                            Add New Member
                        </button>
                    </div>
                </div>

                {/* Binary Tree Visualization */}
                <div className="binary-tree">
                    <h2 className="card-title">Network Structure</h2>
                    <div style={{ textAlign: 'center', padding: '20px', overflowX: 'auto' }}>
                        {renderTreeNode(treeData.rootNode)}
                    </div>
                </div>

                {/* Selected Node Details */}
                {selectedNode && (
                    <div className="card">
                        <h2 className="card-title">Member Details: {selectedNode.name}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                            <div>
                                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Member ID</div>
                                <div style={{ fontSize: '16px', fontWeight: '600' }}>{selectedNode.id}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Rank</div>
                                <div style={{ fontSize: '16px', fontWeight: '600' }}>{selectedNode.rank}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Status</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', textTransform: 'capitalize' }}>
                                    {selectedNode.status}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Join Date</div>
                                <div style={{ fontSize: '16px', fontWeight: '600' }}>{selectedNode.joinDate}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Team Size</div>
                                <div style={{ fontSize: '16px', fontWeight: '600' }}>{selectedNode.teamSize}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Total Earnings</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: '#28a745' }}>
                                    {formatCurrency(selectedNode.totalEarnings)}
                                </div>
                            </div>
                        </div>
                        
                        {/* Student Info */}
                        {selectedNode.student && (
                            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>Student Information</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#666' }}>Student Name</div>
                                        <div style={{ fontSize: '14px', fontWeight: '500' }}>{selectedNode.student.name}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#666' }}>Program</div>
                                        <div style={{ fontSize: '14px', fontWeight: '500' }}>{selectedNode.student.program}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '12px', color: '#666' }}>Progress</div>
                                        <div style={{ fontSize: '14px', fontWeight: '500' }}>{selectedNode.student.progress}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Legend */}
                <div className="card">
                    <h2 className="card-title">Tree Legend</h2>
                    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' }}></div>
                            <span style={{ fontSize: '14px' }}>Active Member</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)' }}></div>
                            <span style={{ fontSize: '14px' }}>Pending Activation</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)' }}></div>
                            <span style={{ fontSize: '14px' }}>Inactive</span>
                        </div>
                    </div>
                </div>

                {/* Tree Actions */}
                <div className="card">
                    <h2 className="card-title">Tree Actions</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        <div className="tooltip">
                            <button className="btn btn-secondary" style={{ width: '100%' }}>
                                Download Tree Report
                            </button>
                            <span className="tooltiptext">Export your complete tree structure as PDF</span>
                        </div>
                        <div className="tooltip">
                            <button className="btn btn-secondary" style={{ width: '100%' }}>
                                View Commission Flow
                            </button>
                            <span className="tooltiptext">See how commissions flow through your tree</span>
                        </div>
                        <div className="tooltip">
                            <button className="btn btn-secondary" style={{ width: '100%' }}>
                                Team Performance
                            </button>
                            <span className="tooltiptext">Analyze team growth and performance metrics</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
