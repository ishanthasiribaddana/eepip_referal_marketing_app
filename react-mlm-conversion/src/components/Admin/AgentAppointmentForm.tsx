import { useState, useEffect } from 'react';
import { Agent } from '../../data/mockData';

interface AgentAppointmentFormProps {
  agent: Agent | null;
  users: Array<{ id: number; fullName: string; role: string }>;
  onClose: () => void;
  onSave: (agentData: Agent) => void;
}

export default function AgentAppointmentForm({ agent, users, onClose, onSave }: AgentAppointmentFormProps) {
  const [formData, setFormData] = useState<Omit<Agent, 'id'>>({
    userId: 0,
    userName: '',
    appointmentDate: new Date().toISOString().split('T')[0],
    status: 'ACTIVE',
    isDualRole: false,
    educationExempt: false,
  });

  useEffect(() => {
    if (agent) {
      setFormData(agent);
    }
  }, [agent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Agent);
  };

  // Filter users who can become agents (AI_ENGINEER or existing users)
  const eligibleUsers = users.filter(u => u.role === 'AI_ENGINEER' || u.role === 'AGENT');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {agent ? 'Edit Agent' : 'Appoint New Agent'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Select a user to appoint as an agent. Agents earn 5% commission on referrals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select User *
            </label>
            <select
              required
              value={formData.userId || ''}
              onChange={(e) => {
                const userId = parseInt(e.target.value);
                const selectedUser = users.find(u => u.id === userId);
                setFormData({
                  ...formData,
                  userId,
                  userName: selectedUser?.fullName || '',
                });
              }}
              disabled={!!agent}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select a user</option>
              {eligibleUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName} ({user.role})
                </option>
              ))}
            </select>
            {agent && (
              <p className="text-xs text-gray-500 mt-1">
                User cannot be changed after appointment
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Date *
            </label>
            <input
              type="date"
              required
              value={formData.appointmentDate || ''}
              onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status *
            </label>
            <select
              required
              value={formData.status || 'ACTIVE'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDualRole"
                checked={formData.isDualRole || false}
                onChange={(e) => setFormData({ ...formData, isDualRole: e.target.checked })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isDualRole" className="ml-2 text-sm text-gray-700">
                Dual Role (Agent + AI Engineer)
              </label>
            </div>
            <p className="text-xs text-gray-500 ml-6">
              User can simultaneously be both an Agent and an AI Engineer
            </p>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="educationExempt"
                checked={formData.educationExempt || false}
                onChange={(e) => setFormData({ ...formData, educationExempt: e.target.checked })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="educationExempt" className="ml-2 text-sm text-gray-700">
                Education Exempt
              </label>
            </div>
            <p className="text-xs text-gray-500 ml-6">
              Commissions run forever without student nomination requirement
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Agent Commission Structure</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• 5% of investment as separate budget</li>
              <li>• 2% direct referral commission</li>
              <li>• 3% binary pool commission</li>
              <li>• 2 pairs/month cap (Rs. 108,000 max)</li>
              <li>• Must introduce at least 1 AI Engineer to activate</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              {agent ? 'Update' : 'Appoint'} Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
