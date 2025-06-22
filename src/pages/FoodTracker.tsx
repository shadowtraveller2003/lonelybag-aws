
import React, { useState } from 'react';
import { Plus, Trash2, Camera, Save, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const FoodTracker = () => {
  const { toast } = useToast();
  const [foodItems, setFoodItems] = useState([
    { id: 1, name: 'Apples', category: 'Fruits', quantity: '2kg', expiryDate: '2024-06-30', status: 'fresh' },
    { id: 2, name: 'Bread', category: 'Grains', quantity: '1 loaf', expiryDate: '2024-06-25', status: 'expiring' },
    { id: 3, name: 'Milk', category: 'Dairy', quantity: '1L', expiryDate: '2024-06-28', status: 'fresh' }
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: '',
    expiryDate: ''
  });

  const categories = ['Fruits', 'Vegetables', 'Dairy', 'Grains', 'Meat', 'Others'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fresh': return 'text-green-600 bg-green-100';
      case 'expiring': return 'text-yellow-600 bg-yellow-100';
      case 'expired': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusFromDate = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'expired';
    if (diffDays <= 2) return 'expiring';
    return 'fresh';
  };

  const addFoodItem = () => {
    if (!newItem.name || !newItem.category || !newItem.quantity || !newItem.expiryDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add a food item.",
        variant: "destructive"
      });
      return;
    }

    const status = getStatusFromDate(newItem.expiryDate);
    const item = {
      id: Date.now(),
      ...newItem,
      status
    };

    setFoodItems([...foodItems, item]);
    setNewItem({ name: '', category: '', quantity: '', expiryDate: '' });
    
    toast({
      title: "Food Item Added",
      description: `${newItem.name} has been added to your tracker.`,
    });
  };

  const removeFoodItem = (id: number) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Food item has been removed from your tracker.",
    });
  };

  const saveData = () => {
    // Simulate saving data
    toast({
      title: "Data Saved",
      description: "Your food tracking data has been saved successfully.",
    });
  };

  const expiringItems = foodItems.filter(item => item.status === 'expiring' || item.status === 'expired');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Food Waste Tracker</h1>
            <p className="text-gray-600 mt-2">Monitor your food inventory and reduce waste</p>
          </div>
          <Button onClick={saveData} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save Data
          </Button>
        </div>

        {/* Alert for expiring items */}
        {expiringItems.length > 0 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Items Expiring Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {expiringItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-yellow-700">Expires: {item.expiryDate}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add New Item */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-green-800">Add New Food Item</CardTitle>
              <CardDescription>Track your food inventory to prevent waste</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Food Name</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  placeholder="e.g., Apples"
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                  placeholder="e.g., 2kg, 1 loaf"
                />
              </div>
              
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  type="date"
                  value={newItem.expiryDate}
                  onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                />
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={addFoodItem} className="flex-1 bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
                <Button variant="outline" size="icon">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Food Inventory */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-green-800">Your Food Inventory</CardTitle>
              <CardDescription>Current items in your tracker</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {foodItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {item.category} • {item.quantity} • Expires: {item.expiryDate}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFoodItem(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                {foodItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No food items tracked yet.</p>
                    <p className="text-sm">Add your first item to get started!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{foodItems.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Items Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {foodItems.filter(item => item.status === 'expiring').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-gray-600">Fresh Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {foodItems.filter(item => item.status === 'fresh').length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FoodTracker;
