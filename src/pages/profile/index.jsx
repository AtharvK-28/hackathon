import React from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container-responsive py-10">
        <div className="max-w-lg mx-auto bg-card rounded-lg shadow-elevation-2 p-8">
          <h2 className="text-2xl font-bold mb-4 text-card-foreground">My Profile</h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Name</div>
              <div className="font-medium text-lg">Rajesh Kumar</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Email</div>
              <div className="font-medium text-lg">rajesh@example.com</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Phone</div>
              <div className="font-medium text-lg">+91 9876543210</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 