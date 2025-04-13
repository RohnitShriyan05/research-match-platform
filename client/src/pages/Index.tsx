
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, BookOpen, Users, Lightbulb, GraduationCap } from 'lucide-react';

const Index = () => {
  // Mock data for statistics
  const stats = [
    { label: 'Professors', value: '500+' },
    { label: 'Students', value: '10,000+' },
    { label: 'Research Opportunities', value: '1,200+' },
    { label: 'Fields of Study', value: '50+' },
  ];

  // Mock data for testimonials
  const testimonials = [
    {
      quote: "AcadBond helped me find the perfect research assistant for my project on climate change modeling.",
      author: "Dr. Sarah Chen",
      role: "Professor of Environmental Science"
    },
    {
      quote: "I was able to find a research opportunity that perfectly aligned with my interests in machine learning.",
      author: "Michael Rodriguez",
      role: "Computer Science Student"
    },
    {
      quote: "The platform streamlined my search for research collaborators and helped me build a diverse team.",
      author: "Dr. James Wilson",
      role: "Professor of Sociology"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="hero-section bg-gradient-to-br from-research-50 to-research-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-up">
                <h1 className="heading-1">
                  <span className="gradient-text">Connect</span> & <span className="gradient-text">Collaborate</span> in Academic Research
                </h1>
                <p className="text-xl text-gray-700">
                  Bridging the gap between talented students and innovative professors to advance research together.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                  <Link to="/register">
                    <Button className="w-full sm:w-auto bg-research-600 hover:bg-research-700 text-lg px-8 py-6">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/jobs">
                    <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-6">
                      Browse Opportunities
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative hidden md:block animate-fade-in">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-research-200 rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-research-300 rounded-full opacity-40"></div>
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Students and professors collaborating on research" 
                  className="rounded-lg shadow-xl relative z-10 max-h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* How it Works Section */}
        <section className="section bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-2 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">
                Our platform simplifies the process of finding the perfect research match
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 bg-white shadow-sm">
                <div className="w-16 h-16 bg-research-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-research-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Create Your Profile</h3>
                <p className="text-gray-600">
                  Sign up and create your academic profile, highlighting your research interests and experience.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 bg-white shadow-sm">
                <div className="w-16 h-16 bg-research-100 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="h-8 w-8 text-research-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Discover Opportunities</h3>
                <p className="text-gray-600">
                  Browse and search for research opportunities or talented students that match your interests.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 bg-white shadow-sm">
                <div className="w-16 h-16 bg-research-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-research-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Connect & Collaborate</h3>
                <p className="text-gray-600">
                  Reach out to potential research partners and start working together on exciting projects.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="section bg-research-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-research-600 mb-2">
                    {stat.value}
                  </p>
                  <p className="text-lg text-gray-700">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="section bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-2 mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-600">
                Success stories from professors and students using AcadBond
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm"
                >
                  <div className="mb-4">
                    <BookOpen className="h-8 w-8 text-research-500" />
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section bg-research-700 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Advance Your Research Journey?
              </h2>
              <p className="text-xl text-research-100 mb-8">
                Join AcadBond today and connect with the perfect research partner.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
                <Link to="/register">
                  <Button className="w-full sm:w-auto bg-white text-research-700 hover:bg-gray-100 text-lg px-8 py-6">
                    Sign Up Now
                  </Button>
                </Link>
                <Link to="/jobs">
                  <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-research-600 text-lg px-8 py-6">
                    Browse Opportunities
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
