import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  School, 
  Globe, 
  Shield, 
  Bell,
  Eye,
  EyeOff,
  Save,
  LogOut,
  Trash2,
  Settings,
  Heart,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    college: '',
    language: 'English',
    year: '',
    major: ''
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    dataSharing: false,
    notifications: true,
    analytics: true
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePrivacyChange = (setting: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleLogout = () => {
    signOut();
    navigate('/');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const handleDeleteAccount = () => {
    // In a real app, this would show a confirmation dialog
    toast({
      title: "Account deletion",
      description: "This feature would show a confirmation dialog in a real app.",
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-8"
      >
        {/* Cover Section */}
        <div className="h-40 bg-gradient-to-r from-primary via-primary-light to-secondary rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent h-20"></div>
        </div>
        
        {/* Profile Picture and Info */}
        <div className="relative -mt-16 px-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full border-4 border-background shadow-xl flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Edit className="w-4 h-4 text-white" />
              </button>
            </motion.div>
            
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {user?.name || 'Welcome'}
              </h1>
              <p className="text-xl text-muted-foreground mb-1">
                Student at {profileData.college || 'Your Institution'}
              </p>
              <p className="text-muted-foreground flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4" />
                {user?.email}
              </p>
            </div>
            
            <div className="md:ml-auto">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 mb-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>
                <p className="text-muted-foreground">Update your profile details and academic information</p>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={profileData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="pl-12 h-12 bg-background/50 border-border/50 focus:border-primary"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="pl-12 h-12 bg-background/50 border-border/50 focus:border-primary"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="college" className="text-sm font-medium text-gray-700 mb-2 block">
                    College/University
                  </Label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="college"
                      name="college"
                      type="text"
                      value={profileData.college}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="pl-12 h-12"
                      placeholder="Your institution"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="language" className="text-sm font-medium text-gray-700 mb-2 block">
                    Preferred Language
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      id="language"
                      name="language"
                      value={profileData.language}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full h-12 pl-12 pr-3 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white disabled:bg-gray-50"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="year" className="text-sm font-medium text-gray-700 mb-2 block">
                    Academic Year
                  </Label>
                  <select
                    id="year"
                    name="year"
                    value={profileData.year}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white disabled:bg-gray-50"
                  >
                    <option value="">Select year</option>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                    <option value="graduate">Graduate</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="major" className="text-sm font-medium text-gray-700 mb-2 block">
                    Major/Field of Study
                  </Label>
                  <Input
                    id="major"
                    name="major"
                    type="text"
                    value={profileData.major}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="h-12"
                    placeholder="Your major"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-6 border-t border-border/30">
                  <Button type="submit" className="flex-1 h-12">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="flex-1 h-12"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Privacy & Settings */}
        <div className="space-y-6">
          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-6">
              <Shield className="w-5 h-5 text-primary mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">Privacy & Security</h3>
                <p className="text-sm text-muted-foreground">Manage your privacy preferences</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {Object.entries(privacySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {key === 'profileVisible' && 'Profile Visibility'}
                      {key === 'dataSharing' && 'Anonymous Data Sharing'}
                      {key === 'notifications' && 'Email Notifications'}
                      {key === 'analytics' && 'Usage Analytics'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {key === 'profileVisible' && 'Make your profile visible to other users'}
                      {key === 'dataSharing' && 'Help improve Mitra with anonymous usage data'}
                      {key === 'notifications' && 'Receive updates and wellness tips'}
                      {key === 'analytics' && 'Allow collection of anonymous usage statistics'}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange(key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Account Actions</h3>
            </div>
            
            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full justify-start"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteAccount}
                className="w-full justify-start"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center mb-4">
              <Heart className="w-5 h-5 text-primary mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              If you're struggling or need someone to talk to, we're here for you.
            </p>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => toast({
                  title: "Contact Support",
                  description: "Support contact feature will be available in the full version.",
                })}
              >
                Contact Support
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => toast({
                  title: "Crisis Resources",
                  description: "Crisis resources will be available in the full version.",
                })}
              >
                Crisis Resources
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;