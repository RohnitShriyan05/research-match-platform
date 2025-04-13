
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { jobsService } from '@/api';
import { User, Edit, PlusCircle, Bookmark, BookOpen } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import JobCard from '@/components/jobs/JobCard';

const Dashboard = () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // Mock user data (in a real app, this would come from your auth state)
  const [userData, setUserData] = useState({
    _id: '123',
    Username: 'John Doe',
    Email: 'john.doe@example.com',
    Role: 'Professor', // or 'Student'
    Interests: ['Machine Learning', 'Computer Vision', 'Natural Language Processing'],
    ResumeLink: 'https://example.com/resume',
  });
  
  // Mock jobs data
  const [userJobs, setUserJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  
  // New job form state
  const [newJobForm, setNewJobForm] = useState({
    Title: '',
    Role: '',
    Duration: '',
    Interests: '',
  });
  
  // Mock loading states
  const [isLoading, setIsLoading] = useState(false);
  
  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Format interests array
      const interestsArray = newJobForm.Interests.split(',').map(interest => interest.trim());
      
      // Create job data
      const jobData = {
        ProfessorId: userData._id,
        JobId: `job_${Date.now()}`, // Generate a unique ID
        Title: newJobForm.Title,
        Role: newJobForm.Role,
        Duration: newJobForm.Duration,
        Interests: interestsArray,
      };
      
      // Send to API
      await jobsService.createJob(jobData);
      
      // Reset form
      setNewJobForm({
        Title: '',
        Role: '',
        Duration: '',
        Interests: '',
      });
      
      toast.success('Research opportunity posted successfully!');
      
      // In a real app, you would refresh the jobs list here
      
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Failed to post research opportunity. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewJobForm(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={true} userRole={userData.Role} />
      
      <main className="flex-grow bg-gray-50">
        <section className="bg-research-600 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${userData.Username}`} alt={userData.Username} />
                <AvatarFallback>
                  {userData.Username.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{userData.Username}</h1>
                <p className="text-research-100 mb-4">{userData.Role}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {userData.Interests.map((interest, i) => (
                    <Badge key={i} variant="secondary" className="bg-research-700 text-white">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                {userData.Role === 'Professor' ? (
                  <TabsTrigger value="my-listings">My Listings</TabsTrigger>
                ) : (
                  <TabsTrigger value="saved-jobs">Saved Opportunities</TabsTrigger>
                )}
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Welcome, {userData.Username}</CardTitle>
                      <CardDescription>
                        Here's a summary of your research activity
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                            <p className="text-3xl font-bold text-research-600">
                              {userData.Role === 'Professor' ? userJobs.length : savedJobs.length}
                            </p>
                            <p className="text-sm text-gray-500">
                              {userData.Role === 'Professor' ? 'Research Listings' : 'Saved Opportunities'}
                            </p>
                          </div>
                          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg">
                            <p className="text-3xl font-bold text-research-600">
                              {userData.Interests.length}
                            </p>
                            <p className="text-sm text-gray-500">Research Interests</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Research Interests</h3>
                          <div className="flex flex-wrap gap-2">
                            {userData.Interests.map((interest, i) => (
                              <Badge key={i} className="bg-research-100 text-research-700 hover:bg-research-200">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                      {userData.Role === 'Professor' && (
                        <Button className="w-full bg-research-600 hover:bg-research-700 justify-start">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Create Research Listing
                        </Button>
                      )}
                      <Button variant="outline" className="w-full justify-start">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Browse Opportunities
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {userData.Role === 'Professor' ? (
                <TabsContent value="my-listings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <CardTitle>My Research Listings</CardTitle>
                          <CardDescription>
                            Manage your research opportunities
                          </CardDescription>
                        </div>
                        <Button className="bg-research-600 hover:bg-research-700">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Create New Listing
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <form onSubmit={handleCreateJob} className="border rounded-lg p-6 bg-gray-50">
                          <h3 className="text-lg font-semibold mb-4">Post a New Research Opportunity</h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="Title">Title</Label>
                              <Input 
                                id="Title" 
                                name="Title" 
                                placeholder="e.g., Research Assistant for ML Project" 
                                value={newJobForm.Title}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="Role">Role Description</Label>
                              <Textarea 
                                id="Role" 
                                name="Role" 
                                placeholder="Describe the responsibilities and expectations" 
                                value={newJobForm.Role}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="Duration">Duration</Label>
                              <Input 
                                id="Duration" 
                                name="Duration" 
                                placeholder="e.g., Summer 2023, Fall Semester, 1 Year" 
                                value={newJobForm.Duration}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="Interests">Research Interests (comma separated)</Label>
                              <Input 
                                id="Interests" 
                                name="Interests" 
                                placeholder="e.g., Machine Learning, Computer Vision, NLP" 
                                value={newJobForm.Interests}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <Button 
                              type="submit" 
                              className="w-full bg-research-600 hover:bg-research-700"
                              disabled={isLoading}
                            >
                              {isLoading ? 'Posting...' : 'Post Research Opportunity'}
                            </Button>
                          </div>
                        </form>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Your Active Listings</h3>
                          {userJobs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Map through user's job listings here */}
                            </div>
                          ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                              <p className="mt-4 text-gray-600">You don't have any active research listings yet.</p>
                              <p className="text-gray-500">Create your first listing using the form above.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ) : (
                <TabsContent value="saved-jobs" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Research Opportunities</CardTitle>
                      <CardDescription>
                        Research opportunities you've saved for later
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {savedJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Map through saved job opportunities here */}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                          <Bookmark className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-4 text-gray-600">You haven't saved any research opportunities yet.</p>
                          <p className="text-gray-500">Browse opportunities and bookmark the ones you're interested in.</p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => window.location.href = '/jobs'}>
                        Browse All Opportunities
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              )}
              
              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle>Your Profile</CardTitle>
                        <CardDescription>
                          Manage your personal information and research interests
                        </CardDescription>
                      </div>
                      <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Username</h3>
                            <p className="text-lg">{userData.Username}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Role</h3>
                            <p className="text-lg">{userData.Role}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Email</h3>
                            <p className="text-lg">{userData.Email}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Research Interests</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {userData.Interests.map((interest, i) => (
                                <Badge key={i} className="bg-research-100 text-research-700 hover:bg-research-200">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {userData.Role === 'Student' && userData.ResumeLink && (
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Resume</h3>
                              <a 
                                href={userData.ResumeLink}
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="text-research-600 hover:underline"
                              >
                                View Resume
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
