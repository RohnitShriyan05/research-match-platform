
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProfileCard from '@/components/profiles/ProfileCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { professorService } from '@/api';
import { Search } from 'lucide-react';

interface Professor {
  _id: string;
  Username: string;
  Email: string;
  Role: 'Professor';
  Interests: string[];
}

const Professors = () => {
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const data = await professorService.getAllProfessors();
        setProfessors(data);
      } catch (err) {
        console.error('Error fetching professors:', err);
        setError('Failed to load professors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfessors();
  }, []);

  // Filter professors based on search term
  const filteredProfessors = professors.filter(professor => {
    const matchesSearch = 
      professor.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.Interests.some(interest => 
        interest.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-research-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Research Professors</h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Connect with professors doing cutting-edge research in various academic fields.
            </p>
          </div>
        </section>
        
        {/* Search */}
        <section className="bg-white py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by name or research interests..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm('')}
                className="w-full md:w-auto"
              >
                Clear Search
              </Button>
            </div>
          </div>
        </section>
        
        {/* Professors List */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-research-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Loading professors...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            ) : filteredProfessors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfessors.map((professor) => (
                  <ProfileCard key={professor._id} user={professor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No professors found matching your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSearchTerm('')}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Professors;
