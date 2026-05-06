import { useState } from 'react';
import UserTable from '../components/Admin/UserTable';
import UserForm from '../components/Admin/UserForm';
import AgentAppointmentForm from '../components/Admin/AgentAppointmentForm';
import ProductTable from '../components/Admin/ProductTable';
import ProductForm from '../components/Admin/ProductForm';
import ConfigForm from '../components/Admin/ConfigForm';
import AuditLogTable from '../components/Admin/AuditLogTable';
import EPINGenerator from '../components/Admin/EPINGenerator';
import { mockUsers, AdminUser, mockAgents, Agent, mockProducts, Product, mockSystemConfig, SystemConfig, mockAuditLogs } from '../data/mockData';

type AdminTab = 'users' | 'agents' | 'products' | 'config' | 'logs' | 'epin';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);

  // Agent state
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [agents, setAgents] = useState<Agent[]>(mockAgents);

  // Product state
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);

  // Config state
  const [config, setConfig] = useState<SystemConfig>(mockSystemConfig);

  const tabs: { id: AdminTab; label: string }[] = [
    { id: 'users', label: 'User Management' },
    { id: 'agents', label: 'Agent Appointment' },
    { id: 'products', label: 'Product Management' },
    { id: 'config', label: 'System Config' },
    { id: 'logs', label: 'Audit Logs' },
    { id: 'epin', label: 'EPIN Generation' },
  ];

  const handleAddUser = () => {
    setEditingUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user: typeof mockUsers[0]) => {
    setEditingUser(user);
    setShowUserForm(true);
  };

  const handleSaveUser = (userData: any) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
    } else {
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...userData,
        joinDate: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, newUser]);
    }
    setShowUserForm(false);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleBulkAction = (action: 'activate' | 'deactivate', selectedIds: number[]) => {
    setUsers(users.map(u => 
      selectedIds.includes(u.id) 
        ? { ...u, status: action === 'activate' ? 'ACTIVE' : 'INACTIVE' }
        : u
    ));
  };

  // Agent handlers
  const handleAddAgent = () => {
    setEditingAgent(null);
    setShowAgentForm(true);
  };

  const handleEditAgent = (agent: Agent) => {
    setEditingAgent(agent);
    setShowAgentForm(true);
  };

  const handleSaveAgent = (agentData: Agent) => {
    if (editingAgent) {
      setAgents(agents.map(a => a.id === editingAgent.id ? agentData : a));
    } else {
      const newAgent: Agent = {
        ...agentData,
        id: Math.max(...agents.map(a => a.id), 0) + 1,
      };
      setAgents([...agents, newAgent]);
    }
    setShowAgentForm(false);
  };

  const handleDeleteAgent = (agentId: number) => {
    if (confirm('Are you sure you want to remove this agent appointment?')) {
      setAgents(agents.filter(a => a.id !== agentId));
    }
  };

  // Product handlers
  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleSaveProduct = (productData: Product) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      const newProduct: Product = {
        ...productData,
        id: Math.max(...products.map(p => p.id), 0) + 1,
      };
      setProducts([...products, newProduct]);
    }
    setShowProductForm(false);
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleSaveConfig = (newConfig: SystemConfig) => {
    setConfig(newConfig);
    alert('Configuration saved successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-1">Manage users, agents, products, and system settings</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'users' && (
          <UserTable
            users={users}
            onAdd={handleAddUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onBulkAction={handleBulkAction}
          />
        )}
        {activeTab === 'agents' && (
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Agent Appointments</h2>
                <p className="text-sm text-gray-600">Manage agent appointments and settings</p>
              </div>
              <button
                onClick={handleAddAgent}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Appoint Agent
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Appointment Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dual Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Education Exempt</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {agents.map((agent) => (
                    <tr key={agent.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{agent.userName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{new Date(agent.appointmentDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          agent.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {agent.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          agent.isDualRole ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {agent.isDualRole ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          agent.educationExempt ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {agent.educationExempt ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditAgent(agent)}
                            className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteAgent(agent.id)}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {agents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No agents appointed yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
        {activeTab === 'products' && (
          <ProductTable
            products={products}
            onAdd={handleAddProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}
        {activeTab === 'config' && (
          <ConfigForm config={config} onSave={handleSaveConfig} />
        )}
        {activeTab === 'logs' && (
          <AuditLogTable logs={mockAuditLogs} />
        )}
        {activeTab === 'epin' && (
          <EPINGenerator products={products} />
        )}
      </div>

      {/* User Form Modal */}
      {showUserForm && (
        <UserForm
          user={editingUser}
          onClose={() => setShowUserForm(false)}
          onSave={handleSaveUser}
        />
      )}

      {/* Agent Form Modal */}
      {showAgentForm && (
        <AgentAppointmentForm
          agent={editingAgent}
          users={users}
          onClose={() => setShowAgentForm(false)}
          onSave={handleSaveAgent}
        />
      )}

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => setShowProductForm(false)}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}
