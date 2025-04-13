
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, Bookmark } from 'lucide-react';

interface JobCardProps {
  job: {
    JobId: string;
    Title: string;
    Role: string;
    Duration: string;
    Interests: string[];
    ProfessorId?: string;
    ProfessorName?: string;
  };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-gray-900">{job.Title}</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-research-600">
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
        <CardDescription className="flex items-center text-sm text-gray-500">
          {job.ProfessorName && (
            <>
              <User className="mr-1 h-4 w-4" />
              <Link 
                to={`/professors/${job.ProfessorId}`} 
                className="text-research-600 hover:underline"
              >
                {job.ProfessorName}
              </Link>
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="mr-1 h-4 w-4" />
          <span>{job.Duration}</span>
        </div>
        
        <div className="space-y-2">
          <div className="font-medium text-sm text-gray-700">Role</div>
          <p className="text-sm text-gray-600">{job.Role}</p>
        </div>
        
        <div className="mt-4">
          <div className="font-medium text-sm text-gray-700 mb-2">Research Interests</div>
          <div className="flex flex-wrap gap-2">
            {job.Interests && job.Interests.map((interest, i) => (
              <Badge key={i} variant="secondary" className="bg-research-100 text-research-700 hover:bg-research-200">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Link to={`/jobs/${job.JobId}`} className="w-full">
          <Button variant="outline" className="w-full border-research-300 text-research-700 hover:bg-research-50">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
