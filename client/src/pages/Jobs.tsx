
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { jobsService, professorService } from '@/api';
import { Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Job {
  JobId: string;
  Title: string;
  Role: string;
  Duration: string;
  Interests: string[];
  ProfessorId: string;
  ProfessorName?: string;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [professors, setProfessors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [durationFilter, setDurationFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch professors first
        const profsData = await professorService.getAllProfessors();
        setProfessors(profsData);
        
        // Then fetch jobs
        const jobsData = await jobsService.getAllJobs();
        
        // Map through the jobs to add professor names
        const enhancedJobs = jobsData.flatMap((jobItem: any) => {
          const professor = profsData.find((prof: any) => prof._id === jobItem.ProfessorId);
          
          return jobItem.Jobs.map((job: any) => ({
            ...job,
            ProfessorId: jobItem.ProfessorId,
            ProfessorName: professor ? professor.Username : 'Unknown Professor',
          }));
        });
        
        setJobs(enhancedJobs);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter jobs based on search term and duration
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.Role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.ProfessorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.Interests.some(interest => 
        interest.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesDuration = 
      durationFilter === '' || 
      job.Duration.toLowerCase().includes(durationFilter.toLowerCase());
    
    return matchesSearch && matchesDuration;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-research-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Research Opportunities</h1>
            <p className="text-lg text-gray-700 max-w-3xl">
              Discover open research positions and projects across various academic disciplines.
            </p>
          </div>
        </section>
        
        {/* Search and Filters */}
        <section className="bg-white py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by title, role, or interests..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-auto">
                  <Select value={durationFilter} onValueChange={setDurationFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <div className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Duration" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Durations</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                      <SelectItem value="semester">Semester</SelectItem>
                      <SelectItem value="year">Full Year</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setDurationFilter('');
                }}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Jobs List */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-research-600 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Loading research opportunities...</p>
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
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.JobId} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No research opportunities found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setDurationFilter('');
                  }}
                >
                  Clear Filters
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

export default Jobs;
