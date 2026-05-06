import React from 'react';

interface StatsCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon: React.JSX.Element;
  color: string;
  bgColor: string;
}

export default function StatsCard({ label, value, subtitle, icon, color, bgColor }: StatsCardProps) {
  return (
    <div className="card flex items-start gap-4">
      <div className={`w-11 h-11 rounded-lg ${bgColor} flex items-center justify-center shrink-0`}>
        <span className={color}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className={`text-xl font-bold mt-0.5 ${color}`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
