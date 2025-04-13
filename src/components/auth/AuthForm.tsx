
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';
import { authService } from '@/api';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    Username: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Role: 'Student',
    Interests: [],
    ResumeLink: '',
    termsAccepted: false,
  });

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await authService.login(loginData.email, loginData.password);
      
      if (response.found) {
        // Store user data in localStorage or state management
        localStorage.setItem('isLoggedIn', 'true');
        
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate passwords match
    if (registerData.Password !== registerData.ConfirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate terms
    if (!registerData.termsAccepted) {
      toast.error('Please accept the terms and conditions');
      setIsLoading(false);
      return;
    }
    
    try {
      // Check if email exists
      const emailCheck = await authService.checkEmail(registerData.Email);
      
      if (emailCheck.exists) {
        toast.error(emailCheck.err || 'Email already exists');
        setIsLoading(false);
        return;
      }
      
      // Prepare data for registration
      const userData = {
        Username: registerData.Username,
        Email: registerData.Email,
        Password: registerData.Password,
        Role: registerData.Role,
        Interests: registerData.Interests,
        ResumeLink: registerData.ResumeLink || undefined,
      };
      
      await authService.register(userData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle interest input
  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interests = e.target.value.split(',').map(item => item.trim());
    setRegisterData({ ...registerData, Interests: interests });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border p-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        {type === 'login' ? 'Sign in to your account' : 'Create an account'}
      </h2>
      
      {type === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your.email@example.com" 
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-research-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>
          
          <Button type="submit" className="w-full bg-research-600 hover:bg-research-700" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input 
              id="username" 
              type="text" 
              placeholder="johndoe" 
              value={registerData.Username}
              onChange={(e) => setRegisterData({ ...registerData, Username: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your.email@example.com" 
              value={registerData.Email}
              onChange={(e) => setRegisterData({ ...registerData, Email: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={registerData.Password}
              onChange={(e) => setRegisterData({ ...registerData, Password: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              placeholder="••••••••" 
              value={registerData.ConfirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, ConfirmPassword: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>I am a</Label>
            <RadioGroup 
              value={registerData.Role}
              onValueChange={(value) => setRegisterData({ ...registerData, Role: value })}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Professor" id="professor" />
                <Label htmlFor="professor">Professor</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="interests">Research Interests (comma separated)</Label>
            <Input 
              id="interests" 
              type="text" 
              placeholder="Machine Learning, Computer Vision, NLP" 
              onChange={handleInterestChange}
              required
            />
          </div>
          
          {registerData.Role === 'Student' && (
            <div className="space-y-2">
              <Label htmlFor="resumeLink">Resume Link (optional)</Label>
              <Input 
                id="resumeLink" 
                type="url" 
                placeholder="https://your-portfolio-site.com/resume" 
                value={registerData.ResumeLink}
                onChange={(e) => setRegisterData({ ...registerData, ResumeLink: e.target.value })}
              />
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={registerData.termsAccepted}
              onCheckedChange={(checked) => 
                setRegisterData({ ...registerData, termsAccepted: checked as boolean })
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <a href="#" className="text-research-600 hover:underline">
                terms and conditions
              </a>
            </label>
          </div>
          
          <Button type="submit" className="w-full bg-research-600 hover:bg-research-700" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      )}
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          {type === 'login' ? "Don't have an account?" : "Already have an account?"}{" "}
          <a 
            href={type === 'login' ? '/register' : '/login'} 
            className="text-research-600 font-medium hover:underline"
          >
            {type === 'login' ? 'Sign up' : 'Sign in'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
