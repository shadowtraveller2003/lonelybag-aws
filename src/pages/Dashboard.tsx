
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Users, Leaf, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 12543,
    foodSaved: 892.5,
    co2Reduced: 2.1,
    activeCommunities: 156
  });

  const wasteData = [
    { month: 'Jan', saved: 65, wasted: 35 },
    { month: 'Feb', saved: 72, wasted: 28 },
    { month: 'Mar', saved: 78, wasted: 22 },
    { month: 'Apr', saved: 85, wasted: 15 },
    { month: 'May', saved: 89, wasted: 11 },
    { month: 'Jun', saved: 95, wasted: 5 }
  ];

  const categoryData = [
    { name: 'Vegetables', value: 35, color: '#10b981' },
    { name: 'Fruits', value: 25, color: '#34d399' },
    { name: 'Dairy', value: 20, color: '#6ee7b7' },
    { name: 'Grains', value: 15, color: '#059669' },
    { name: 'Others', value: 5, color: '#047857' }
  ];

  const impactData = [
    { week: 'W1', impact: 12 },
    { week: 'W2', impact: 18 },
    { week: 'W3', impact: 25 },
    { week: 'W4', impact: 32 },
    { week: 'W5', impact: 28 },
    { week: 'W6', impact: 35 }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 5),
        foodSaved: prev.foodSaved + Math.random() * 2,
        co2Reduced: prev.co2Reduced + Math.random() * 0.1
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ title, value, unit, icon: Icon, trend, color }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-800">
          {typeof value === 'number' ? value.toLocaleString() : value}
          <span className="text-sm text-gray-500 ml-1">{unit}</span>
        </div>
        {trend && (
          <div className={`flex items-center text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
            {Math.abs(trend)}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Sustainability Dashboard</h1>
            <p className="text-gray-600 mt-2">Track your impact on reducing food waste and environmental footprint</p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700">
            <Leaf className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Users"
            value={metrics.totalUsers}
            unit=""
            icon={Users}
            trend={12}
            color="text-blue-600"
          />
          <MetricCard
            title="Food Saved"
            value={metrics.foodSaved.toFixed(1)}
            unit="kg"
            icon={Leaf}
            trend={8}
            color="text-green-600"
          />
          <MetricCard
            title="CO2 Reduced"
            value={metrics.co2Reduced.toFixed(2)}
            unit="tons"
            icon={TrendingDown}
            trend={15}
            color="text-emerald-600"
          />
          <MetricCard
            title="Active Communities"
            value={metrics.activeCommunities}
            unit=""
            icon={CheckCircle}
            trend={6}
            color="text-purple-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Food Waste Reduction Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Food Waste Reduction Trend</CardTitle>
              <CardDescription>Monthly comparison of food saved vs wasted</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={wasteData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="saved" fill="#10b981" name="Food Saved (%)" />
                  <Bar dataKey="wasted" fill="#ef4444" name="Food Wasted (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Food Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Food Category Distribution</CardTitle>
              <CardDescription>Breakdown by food type saved</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">Environmental Impact Over Time</CardTitle>
            <CardDescription>Weekly environmental impact score based on food waste reduction</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="impact" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-800">Recent Activity</CardTitle>
            <CardDescription>Latest updates from your community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "John Doe", action: "saved 2.5kg of vegetables", time: "2 minutes ago", icon: CheckCircle, color: "text-green-600" },
                { user: "Sarah Smith", action: "joined Green Initiative", time: "5 minutes ago", icon: Users, color: "text-blue-600" },
                { user: "Mike Johnson", action: "reported food waste alert", time: "10 minutes ago", icon: AlertCircle, color: "text-yellow-600" },
                { user: "Emma Wilson", action: "completed sustainability challenge", time: "15 minutes ago", icon: TrendingUp, color: "text-purple-600" }
              ].map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Icon className={`h-5 w-5 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium text-green-800">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
