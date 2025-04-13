
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail } from 'lucide-react';

interface ProfileCardProps {
  user: {
    _id: string;
    Username: string;
    Email: string;
    Role: 'Student' | 'Professor';
    Interests: string[];
    ResumeLink?: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-col items-center text-center pb-2">
        <Avatar className="h-20 w-20 mb-3">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.Username}`} alt={user.Username} />
          <AvatarFallback>{getInitials(user.Username)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-medium text-gray-900">{user.Username}</h3>
          <p className="text-sm text-gray-500">{user.Role}</p>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Research Interests</h4>
            <div className="flex flex-wrap gap-2">
              {user.Interests.map((interest, i) => (
                <Badge key={i} variant="secondary" className="bg-research-100 text-research-700 hover:bg-research-200">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
          
          {user.Role === 'Student' && user.ResumeLink && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Resume</h4>
              <a 
                href={user.ResumeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-research-600 hover:underline"
              >
                View Resume
              </a>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t flex justify-between space-x-2">
        <Button 
          variant="outline" 
          className="w-1/2 border-research-300 text-research-700 hover:bg-research-50"
          onClick={() => window.location.href = `mailto:${user.Email}`}
        >
          <Mail className="mr-2 h-4 w-4" />
          Contact
        </Button>
        
        <Link to={`/${user.Role.toLowerCase()}s/${user._id}`} className="w-1/2">
          <Button className="w-full bg-research-600 hover:bg-research-700">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
