
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-research-600" />
              <span className="text-lg font-bold text-gray-900">ResearchMatch</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Connecting students and professors to advance academic research together.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/jobs" className="text-sm text-gray-600 hover:text-research-600 transition-colors">
                  Research Opportunities
                </Link>
              </li>
              <li>
                <Link to="/professors" className="text-sm text-gray-600 hover:text-research-600 transition-colors">
                  Professors
                </Link>
              </li>
              <li>
                <Link to="/students" className="text-sm text-gray-600 hover:text-research-600 transition-colors">
                  Students
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Account</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/register" className="text-sm text-gray-600 hover:text-research-600 transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-research-600 transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-gray-600 hover:text-research-600 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <a href="mailto:contact@researchmatch.com" className="text-sm text-gray-600 hover:text-research-600 transition-colors">
                  contact@researchmatch.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Github className="h-4 w-4 text-gray-500" />
                <a href="#" className="text-sm text-gray-600 hover:text-research-600 transition-colors">
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} ResearchMatch. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-xs text-gray-500 hover:text-research-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-gray-500 hover:text-research-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
