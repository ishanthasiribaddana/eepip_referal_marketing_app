interface RoleBadgeProps {
  role: 'AI_ENGINEER' | 'AGENT' | 'BANK_ADMIN' | 'SYSTEM_ADMIN';
}

const roleConfig = {
  AI_ENGINEER: {
    label: 'AI Engineer',
    color: 'bg-blue-100 text-blue-800',
  },
  AGENT: {
    label: 'Agent',
    color: 'bg-purple-100 text-purple-800',
  },
  BANK_ADMIN: {
    label: 'Bank Admin',
    color: 'bg-green-100 text-green-800',
  },
  SYSTEM_ADMIN: {
    label: 'System Admin',
    color: 'bg-red-100 text-red-800',
  },
};

export default function RoleBadge({ role }: RoleBadgeProps) {
  const config = roleConfig[role];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}
