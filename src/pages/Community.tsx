
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Users, MapPin, Calendar, Trophy, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'Sarah Green', avatar: '', role: 'Eco Warrior' },
      content: 'Just saved 5kg of vegetables from going to waste by sharing with neighbors! 🌱',
      likes: 24,
      comments: 8,
      time: '2 hours ago',
      image: '',
      tags: ['vegetables', 'sharing', 'community']
    },
    {
      id: 2,
      user: { name: 'Mike Johnson', avatar: '', role: 'Food Hero' },
      content: 'Started a community garden in our neighborhood. Anyone interested in joining? 🌿',
      likes: 45,
      comments: 15,
      time: '4 hours ago',
      image: '',
      tags: ['garden', 'community', 'sustainability']
    }
  ]);

  const challenges = [
    {
      id: 1,
      title: 'Zero Waste Week',
      description: 'Challenge yourself to produce zero food waste for a whole week',
      participants: 89,
      daysLeft: 3,
      reward: '100 points',
      difficulty: 'Medium'
    },
    {
      id: 2,
      title: 'Share & Care',
      description: 'Share surplus food with 5 different neighbors',
      participants: 156,
      daysLeft: 10,
      reward: '150 points',
      difficulty: 'Easy'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Emma Wilson', points: 2450, avatar: '', badge: 'Sustainability Champion' },
    { rank: 2, name: 'David Chen', points: 2280, avatar: '', badge: 'Green Guardian' },
    { rank: 3, name: 'Lisa Park', points: 2150, avatar: '', badge: 'Eco Warrior' },
    { rank: 4, name: 'John Smith', points: 1980, avatar: '', badge: 'Food Hero' },
    { rank: 5, name: 'Maria Garcia', points: 1850, avatar: '', badge: 'Waste Reducer' }
  ];

  const events = [
    {
      id: 1,
      title: 'Community Food Drive',
      date: '2024-07-15',
      time: '10:00 AM',
      location: 'Central Park',
      attendees: 45,
      type: 'Volunteer'
    },
    {
      id: 2,
      title: 'Sustainable Cooking Workshop',
      date: '2024-07-20',
      time: '2:00 PM',
      location: 'Community Center',
      attendees: 28,
      type: 'Educational'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800">Community Hub</h1>
          <p className="text-gray-600 mt-2">Connect with fellow food waste warriors and make an impact together</p>
        </div>

        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          {/* Community Feed */}
          <TabsContent value="feed" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {posts.map(post => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={post.user.avatar} />
                          <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{post.user.name}</h3>
                            <Badge variant="secondary" className="text-xs">{post.user.role}</Badge>
                          </div>
                          <p className="text-sm text-gray-500">{post.time}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">{post.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-green-600 border-green-200">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800 flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Community Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Members</span>
                      <span className="font-semibold text-green-800">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Food Saved Today</span>
                      <span className="font-semibold text-green-800">156kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Challenges</span>
                      <span className="font-semibold text-green-800">8</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-800">Top Contributors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leaderboard.slice(0, 3).map(user => (
                        <div key={user.rank} className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                            {user.rank}
                          </div>
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.points} points</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Challenges */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {challenges.map(challenge => (
                <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-green-800">{challenge.title}</CardTitle>
                        <CardDescription className="mt-2">{challenge.description}</CardDescription>
                      </div>
                      <Badge variant={challenge.difficulty === 'Easy' ? 'default' : challenge.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Participants:</span>
                        <p className="font-semibold text-green-800">{challenge.participants}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Days left:</span>
                        <p className="font-semibold text-green-800">{challenge.daysLeft}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{challenge.reward}</span>
                      </div>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Join Challenge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Leaderboard */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Top Food Waste Warriors
                </CardTitle>
                <CardDescription>Community members making the biggest impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map(user => (
                    <div key={user.rank} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${
                        user.rank === 1 ? 'bg-yellow-500' : user.rank === 2 ? 'bg-gray-400' : user.rank === 3 ? 'bg-orange-500' : 'bg-green-600'
                      }`}>
                        {user.rank}
                      </div>
                      <Avatar>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.badge}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-800">{user.points}</p>
                        <p className="text-sm text-gray-500">points</p>
                      </div>
                      {user.rank <= 3 && (
                        <Star className={`h-5 w-5 ${user.rank === 1 ? 'text-yellow-500' : 'text-gray-400'}`} fill="currentColor" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map(event => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-green-800">{event.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant={event.type === 'Volunteer' ? 'default' : 'secondary'}>
                        {event.type}
                      </Badge>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Join Event
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
