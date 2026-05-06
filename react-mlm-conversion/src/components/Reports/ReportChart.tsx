import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportChartProps {
  type: 'line' | 'bar' | 'horizontal-bar';
  data: any[];
  xKey: string;
  yKey: string;
  title: string;
  color?: string;
}

export default function ReportChart({ type, data, xKey, yKey, title, color = '#6366f1' }: ReportChartProps) {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={yKey} fill={color} />
          </BarChart>
        );
      case 'horizontal-bar':
        return (
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey={xKey} type="category" width={100} />
            <Tooltip />
            <Legend />
            <Bar dataKey={yKey} fill={color} />
          </BarChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
