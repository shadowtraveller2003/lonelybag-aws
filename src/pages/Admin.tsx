
import React, { useState } from 'react';
import { Users, Settings, BarChart3, Bell, Shield, Database, Activity, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';

const Admin = () => {
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    emailNotifications: true,
    dataBackup: true,
    analyticsTracking: true,
    communityModeration: true
  });

  const systemStats = {
    totalUsers: 12543,
    activeUsers: 8921,
    totalFoodSaved: 15420.5,
    activeCommunities: 156,
    systemUptime: 99.9,
    apiCalls: 145892,
    dataStorage: 78.5,
    errorRate: 0.1
  };

  const recentActivities = [
    { id: 1, type: 'user_registration', message: 'New user registered: john.doe@email.com', time: '5 min ago', severity: 'info' },
    { id: 2, type: 'system_alert', message: 'High memory usage detected on server 2', time: '15 min ago', severity: 'warning' },
    { id: 3, type: 'data_backup', message: 'Daily backup completed successfully', time: '1 hour ago', severity: 'success' },
    { id: 4, type: 'api_error', message: 'API rate limit exceeded for user ID 4521', time: '2 hours ago', severity: 'error' },
    { id: 5, type: 'feature_usage', message: 'Food tracker feature accessed 1,250 times today', time: '3 hours ago', severity: 'info' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'success': return 'text-green-600 bg-green-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'success': return Shield;
      default: return Activity;
    }
  };

  const StatCard = ({ title, value, unit, icon: Icon, description }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}{unit}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">System monitoring and configuration panel</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Database className="h-4 w-4 mr-2" />
              Backup Now
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="system">System Health</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* System Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Users"
                value={systemStats.totalUsers}
                unit=""
                icon={Users}
                description="Registered platform users"
              />
              <StatCard
                title="Active Users"
                value={systemStats.activeUsers}
                unit=""
                icon={Activity}
                description="Users active in last 30 days"
              />
              <StatCard
                title="Food Saved"
                value={systemStats.totalFoodSaved}
                unit="kg"
                icon={BarChart3}
                description="Total food waste prevented"
              />
              <StatCard
                title="Communities"
                value={systemStats.activeCommunities}
                unit=""
                icon={Users}
                description="Active community groups"
              />
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Recent System Activities</CardTitle>
                <CardDescription>Latest events and system notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map(activity => {
                    const Icon = getSeverityIcon(activity.severity);
                    return (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-green-800">User Analytics</CardTitle>
                  <CardDescription>User engagement and growth metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>User Engagement</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Feature Adoption</span>
                        <span>72%</span>
                      </div>
                      <Progress value={72} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Community Participation</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">User Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    View All Users
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Notification
                  </Button>
                  <Button className="w-full" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Health Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="System Uptime"
                value={systemStats.systemUptime}
                unit="%"
                icon={Activity}
                description="Last 30 days availability"
              />
              <StatCard
                title="API Calls"
                value={systemStats.apiCalls}
                unit=""
                icon={Database}
                description="Total API requests today"
              />
              <StatCard
                title="Storage Used"
                value={systemStats.dataStorage}
                unit="%"
                icon={Database}
                description="Database storage utilization"
              />
              <StatCard
                title="Error Rate"
                value={systemStats.errorRate}
                unit="%"
                icon={AlertTriangle}
                description="System error rate"
              />
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">System Performance</CardTitle>
                <CardDescription>Real-time system health monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>CPU Usage</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Memory Usage</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Network I/O</span>
                        <span>32%</span>
                      </div>
                      <Progress value={32} className="mt-2" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Database Performance</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Cache Hit Rate</span>
                        <span>88%</span>
                      </div>
                      <Progress value={88} className="mt-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Response Time</span>
                        <span>156ms avg</span>
                      </div>
                      <Progress value={85} className="mt-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">System Configuration</CardTitle>
                <CardDescription>Manage system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance">Maintenance Mode</Label>
                      <p className="text-sm text-gray-500">Enable maintenance mode for system updates</p>
                    </div>
                    <Switch
                      id="maintenance"
                      checked={systemSettings.maintenanceMode}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, maintenanceMode: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Send system notifications via email</p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={systemSettings.emailNotifications}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, emailNotifications: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="backup">Automatic Data Backup</Label>
                      <p className="text-sm text-gray-500">Enable daily automated backups</p>
                    </div>
                    <Switch
                      id="backup"
                      checked={systemSettings.dataBackup}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, dataBackup: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="analytics">Analytics Tracking</Label>
                      <p className="text-sm text-gray-500">Track user interactions for insights</p>
                    </div>
                    <Switch
                      id="analytics"
                      checked={systemSettings.analyticsTracking}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, analyticsTracking: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="moderation">Community Moderation</Label>
                      <p className="text-sm text-gray-500">Enable automatic content moderation</p>
                    </div>
                    <Switch
                      id="moderation"
                      checked={systemSettings.communityModeration}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, communityModeration: checked})}
                    />
                  </div>
                </div>
                
                <div className="pt-6 border-t">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Save Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
