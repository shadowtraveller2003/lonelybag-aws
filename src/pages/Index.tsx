
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Users, TrendingUp, Heart, Recycle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const Index = () => {
  const features = [
    {
      icon: Leaf,
      title: "Go-Green Initiative",
      description: "We are the sole go-green initiative on scale trying to make eating more sustainable and planet more green",
      color: "text-green-600"
    },
    {
      icon: Heart,
      title: "Bringing Happiness to the world",
      description: "Ensuring everyone gets a plate full of food at pocket friendly cost. Feeling hungry? We got you!",
      color: "text-red-500"
    },
    {
      icon: Recycle,
      title: "Solving Problem of Food Wastage",
      description: "Food waste is responsible for 8-10% of global greenhouse gas emissions, equivalent to 3.3 billion tons of CO2 released annually.",
      color: "text-blue-600"
    }
  ];

  const stats = [
    { value: "8-10%", label: "Global GHG Emissions", icon: Globe },
    { value: "3.3B", label: "Tons of CO2 Annually", icon: TrendingUp },
    { value: "100K+", label: "Happy Users", icon: Users },
    { value: "50M+", label: "Meals Saved", icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="float-animation inline-block">
              <div className="bg-gradient-to-br from-green-400 to-green-600 p-8 rounded-3xl shadow-2xl">
                <div className="bg-white p-6 rounded-2xl relative">
                  <div className="bg-green-500 w-16 h-20 rounded-lg mx-auto relative">
                    <div className="absolute top-1 left-1 right-1 bg-green-400 h-2 rounded-sm"></div>
                    <div className="absolute top-4 left-2 w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute top-4 right-2 w-3 h-3 bg-white rounded-full"></div>
                    <div className="absolute top-8 left-3 right-3 h-1 bg-white rounded-full"></div>
                  </div>
                  <div className="bg-red-500 w-12 h-3 rounded-full mx-auto mt-2"></div>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-green-800 slide-up">
              Innovation in <span className="text-green-600">Food Tech</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-green-700 max-w-3xl mx-auto slide-up">
              Where the food selects you - Creating an altogether innovative platform to make food tech industry more competitive
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center slide-up">
              <Link to="/dashboard">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/tracker">
                <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg">
                  Track Food Waste
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-16">
            Our Mission & Impact
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className={`mx-auto p-4 rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mb-4`}>
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-green-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 gradient-green-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-16">
            Impact by Numbers
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Icon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-800 mb-2">{stat.value}</div>
                    <div className="text-green-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Join The Movement</h2>
          <p className="text-xl text-green-100">
            Be part of the solution. Help us reduce food waste and create a more sustainable future for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/community">
              <Button size="lg" variant="secondary" className="bg-white text-green-800 hover:bg-gray-100 px-8 py-4">
                Join Community
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-700 px-8 py-4">
                Start Tracking
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
