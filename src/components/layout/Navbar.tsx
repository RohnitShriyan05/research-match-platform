
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen, LogIn } from 'lucide-react';

interface NavbarProps {
  isLoggedIn?: boolean;
  userRole?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false, userRole = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-research-600" />
          <span className="text-xl font-bold text-gray-900">ResearchMatch</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/jobs" className="text-gray-700 hover:text-research-600 transition-colors">
            Research Opportunities
          </Link>
          <Link to="/professors" className="text-gray-700 hover:text-research-600 transition-colors">
            Professors
          </Link>
          <Link to="/students" className="text-gray-700 hover:text-research-600 transition-colors">
            Students
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-research-600 transition-colors">
                Dashboard
              </Link>
              <Button variant="outline" onClick={() => console.log('logout')}>
                Sign Out
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline" className="flex items-center space-x-1">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-research-600 hover:bg-research-700">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden px-4 py-3 space-y-3 bg-white border-t">
          <Link 
            to="/jobs" 
            className="block py-2 text-gray-700 hover:text-research-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Research Opportunities
          </Link>
          <Link 
            to="/professors" 
            className="block py-2 text-gray-700 hover:text-research-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Professors
          </Link>
          <Link 
            to="/students" 
            className="block py-2 text-gray-700 hover:text-research-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Students
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link 
                to="/dashboard" 
                className="block py-2 text-gray-700 hover:text-research-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  console.log('logout');
                  setIsOpen(false);
                }}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <div className="space-y-2">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full flex items-center justify-center space-x-1">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-research-600 hover:bg-research-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
