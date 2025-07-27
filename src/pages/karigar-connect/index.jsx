import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import { useCart } from '../../contexts/CartContext';

const KarigarConnect = () => {
  const { cartCount } = useCart();
  const [activeTab, setActiveTab] = useState('gigs');
  const [showKarigarModal, setShowKarigarModal] = useState(false);
  const [showGigModal, setShowGigModal] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showKarigarProfileModal, setShowKarigarProfileModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedKarigar, setSelectedKarigar] = useState(null);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showApplicationSuccess, setShowApplicationSuccess] = useState(false);

  // Mock data for available gigs
  const [availableGigs, setAvailableGigs] = useState([
    {
      id: 1,
      title: "Emergency Juice Stall Cover",
      vendor: "Rajesh Juice Corner",
      vendorPhone: "+91 98765 43210",
      vendorRating: 4.8,
      vendorLocation: "Dadar Station West",
      gigType: "emergency",
      skills: ["Juice Making", "Cash Handling", "Customer Service"],
      description: "Need someone to run my juice stall for the evening rush. Must know how to operate juicer and handle cash transactions.",
      date: "Today",
      time: "5:00 PM - 10:00 PM",
      duration: "5 hours",
      rate: 150,
      totalPay: 750,
      urgency: "high",
      distance: "200m away",
      applicants: 3,
      status: "open",
      postedAt: "2 hours ago",
      foodImage: "/assets/images/orange.jpeg"
    },
    {
      id: 2,
      title: "Bulk Vegetable Chopping Help",
      vendor: "Mumbai Chinese Corner",
      vendorPhone: "+91 98765 43211",
      vendorRating: 4.6,
      vendorLocation: "Bandra Market",
      gigType: "prep",
      skills: ["Vegetable Chopping", "Bulk Prep", "Kitchen Organization"],
      description: "Need help with bulk chopping for my Chinese stall. Task: 20kg vegetables (onions, carrots, cabbage).",
      date: "Tomorrow",
      time: "8:00 AM - 10:00 AM",
      duration: "2 hours",
      rate: 120,
      totalPay: 240,
      urgency: "medium",
      distance: "500m away",
      applicants: 5,
      status: "open",
      postedAt: "4 hours ago",
      foodImage: "/assets/images/onions.jpeg"
    },
    {
      id: 3,
      title: "Dosa Master Training Session",
      vendor: "Pav Bhaji King",
      vendorPhone: "+91 98765 43212",
      vendorRating: 4.9,
      vendorLocation: "Andheri Station",
      gigType: "training",
      skills: ["Dosa Making", "Tawa Handling", "Batter Preparation"],
      description: "Need a 'Dosa Master' to train me on my new tawa. Want to add dosas to my menu. Premium skill training required.",
      date: "Tuesday",
      time: "3:00 PM - 5:00 PM",
      duration: "2 hours",
      rate: 600,
      totalPay: 1200,
      urgency: "low",
      distance: "300m away",
      applicants: 1,
      status: "open",
      postedAt: "1 day ago",
      foodImage: "/assets/images/idly_batter.jpeg"
    },
    {
      id: 4,
      title: "Chaat Assembly Expert Needed",
      vendor: "Delhi Chaat House",
      vendorPhone: "+91 98765 43213",
      vendorRating: 4.7,
      vendorLocation: "Dadar Station West",
      gigType: "prep",
      skills: ["Chaat Assembly", "Garnish Work", "Speed Service"],
      description: "Need an expert in chaat assembly for festival rush. Must be fast and maintain quality standards.",
      date: "Saturday",
      time: "6:00 PM - 11:00 PM",
      duration: "5 hours",
      rate: 200,
      totalPay: 1000,
      urgency: "high",
      distance: "150m away",
      applicants: 7,
      status: "open",
      postedAt: "3 hours ago",
      foodImage: "/assets/images/rekha_chaat.jpeg"
    },
    {
      id: 5,
      title: "Chinese Wok Master for Peak Hours",
      vendor: "Spice Garden",
      vendorPhone: "+91 98765 43214",
      vendorRating: 4.5,
      vendorLocation: "Bandra Market",
      gigType: "emergency",
      skills: ["Wok Cooking", "Chinese Cuisine", "High Heat Cooking"],
      description: "Need a wok master for evening rush. Must know Chinese cooking techniques and handle high heat.",
      date: "Today",
      time: "7:00 PM - 10:00 PM",
      duration: "3 hours",
      rate: 300,
      totalPay: 900,
      urgency: "high",
      distance: "400m away",
      applicants: 2,
      status: "open",
      postedAt: "1 hour ago",
      foodImage: "/assets/images/schezwan_chutney.jpeg"
    }
  ]);

  // Mock data for available karigars
  const [availableKarigars, setAvailableKarigars] = useState([
    {
      id: 1,
      name: "Amit Kumar",
      age: 28,
      location: "Dadar Station West",
      rating: 4.9,
      totalGigs: 47,
      skills: ["Dosa Making", "Tawa Handling", "Batter Prep"],
      verifiedSkills: ["Dosa Master"],
      hourlyRate: 400,
      availability: "Flexible",
      bio: "Expert dosa maker with 8 years experience. Trained under South Indian masters.",
      image: "/assets/images/amit_kumar.jpeg",
      skillImage: "/assets/images/idly_batter.jpeg",
      distance: "150m away",
      online: true
    },
    {
      id: 2,
      name: "Priya Sharma",
      age: 24,
      location: "Bandra Market",
      rating: 4.7,
      totalGigs: 32,
      skills: ["Vegetable Chopping", "Bulk Prep", "Kitchen Organization"],
      verifiedSkills: ["Speed Chopper"],
      hourlyRate: 150,
      availability: "Morning & Evening",
      bio: "Fast and efficient vegetable chopper. Can handle bulk prep for any cuisine.",
      image: "/assets/images/priya_sharma.jpeg",
      skillImage: "/assets/images/onions.jpeg",
      distance: "300m away",
      online: true
    },
    {
      id: 3,
      name: "Rajesh Patel",
      age: 35,
      location: "Andheri Station",
      rating: 4.8,
      totalGigs: 89,
      skills: ["Chinese Wok", "High Heat Cooking", "Stir Fry"],
      verifiedSkills: ["Wok Master"],
      hourlyRate: 350,
      availability: "Evening Only",
      bio: "Chinese cuisine specialist with 12 years experience. Expert in wok cooking.",
      image: "/assets/images/Rajesh_patel.jpeg",
      skillImage: "/assets/images/schezwan_chutney.jpeg",
      distance: "200m away",
      online: false
    },
    {
      id: 4,
      name: "Sunita Devi",
      age: 42,
      location: "Dadar Station West",
      rating: 4.6,
      totalGigs: 56,
      skills: ["Chaat Assembly", "Garnish Work", "Customer Service"],
      verifiedSkills: ["Chaat Expert"],
      hourlyRate: 180,
      availability: "Afternoon & Evening",
      bio: "Chaat specialist with perfect assembly skills. Known for beautiful garnishes.",
      image: "/assets/images/Sunita_devi.jpeg",
      skillImage: "/assets/images/rekha_chaat.jpeg",
      distance: "100m away",
      online: true
    },
    {
      id: 5,
      name: "Vikram Singh",
      age: 31,
      location: "Bandra Market",
      rating: 4.9,
      totalGigs: 73,
      skills: ["Juice Making", "Cash Handling", "Equipment Operation"],
      verifiedSkills: ["Juice Master"],
      hourlyRate: 200,
      availability: "All Day",
      bio: "Juice stall expert with equipment knowledge. Great with customers and cash.",
      image: "/assets/images/Vikram_singh.jpeg",
      skillImage: "/assets/images/orange.jpeg",
      distance: "250m away",
      online: true
    }
  ]);

  const handleKarigarSubmit = (formData) => {
    const newKarigar = {
      id: Date.now(),
      ...formData,
      totalGigs: 0,
      rating: 5.0,
      online: true
    };
    setAvailableKarigars(prev => [newKarigar, ...prev]);
    setShowKarigarModal(false);
  };

  const handleGigSubmit = (formData) => {
    const newGig = {
      id: Date.now(),
      ...formData,
      applicants: 0,
      status: "open",
      postedAt: "Just now"
    };
    setAvailableGigs(prev => [newGig, ...prev]);
    setShowGigModal(false);
  };

  const handleApplyForGig = (gig) => {
    const application = {
      id: Date.now(),
      gigId: gig.id,
      gigTitle: gig.title,
      vendor: gig.vendor,
      appliedAt: new Date().toLocaleString(),
      status: 'pending',
      totalPay: gig.totalPay,
      date: gig.date,
      time: gig.time
    };
    
    setApplications(prev => [application, ...prev]);
    
    // Update gig applicants count
    setAvailableGigs(prev => 
      prev.map(g => 
        g.id === gig.id 
          ? { ...g, applicants: g.applicants + 1 }
          : g
      )
    );
    
    setShowApplicationSuccess(true);
    setTimeout(() => setShowApplicationSuccess(false), 3000);
  };

  const handleSendMessage = (karigar, message) => {
    const newMessage = {
      id: Date.now(),
      karigarId: karigar.id,
      karigarName: karigar.name,
      message: message,
      sentAt: new Date().toLocaleString(),
      status: 'sent'
    };
    
    setMessages(prev => [newMessage, ...prev]);
    setShowMessageModal(false);
  };

  const filteredGigs = () => {
    return availableGigs.filter(gig => {
      const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           gig.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           gig.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = filterType === 'all' || gig.gigType === filterType;
      return matchesSearch && matchesFilter;
    });
  };

  const filteredKarigars = () => {
    return availableKarigars.filter(karigar => {
      const matchesSearch = karigar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           karigar.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Karigar Connect - Artisan Connect | Apna Mandi</title>
        <meta name="description" content="On-demand skilled kitchen help for street vendors. Connect with verified karigars for emergency cover, prep help, and skill training." />
      </Helmet>

      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/deals" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
                <Icon name="Home" size={20} />
                <span className="font-semibold">Home</span>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <div>
                <h1 className="text-xl font-bold text-card-foreground">🔧 Karigar Connect</h1>
                <p className="text-sm text-muted-foreground">Artisan Connect</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-1">
                <Icon name="ShoppingCart" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-card-foreground">{cartCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-8 mb-8 text-white">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">🔧 Karigar Connect: Artisan Connect</h2>
            <p className="text-lg mb-6 opacity-90">
              On-demand, hyper-local platform for skilled kitchen help. Think "Uber for Kitchen Staff" - 
              connecting vendors who need temporary help with verified karigars who have specific kitchen skills.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setShowKarigarModal(true)}
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                <Icon name="UserPlus" size={16} className="mr-2" />
                Join as Karigar
              </Button>
              <Button 
                onClick={() => setShowGigModal(true)}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
              >
                <Icon name="Briefcase" size={16} className="mr-2" />
                Post a Gig
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-card rounded-lg border border-border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search gigs, skills, or karigars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-48">
              <Select
                value={filterType}
                onChange={setFilterType}
                options={[
                  { value: 'all', label: 'All Types' },
                  { value: 'emergency', label: 'Emergency Cover' },
                  { value: 'prep', label: 'Prep Help' },
                  { value: 'training', label: 'Skill Training' }
                ]}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-card rounded-lg border border-border mb-6">
          <div className="flex space-x-1 p-1">
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'gigs'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-card-foreground hover:bg-muted'
              }`}
              onClick={() => setActiveTab('gigs')}
            >
              <div className="flex flex-col items-center">
                <span>Available Gigs ({availableGigs.length})</span>
                <span className="text-xs opacity-75 mt-1">Find work opportunities</span>
              </div>
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'karigars'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-card-foreground hover:bg-muted'
              }`}
              onClick={() => setActiveTab('karigars')}
            >
              <div className="flex flex-col items-center">
                <span>Available Karigars ({availableKarigars.length})</span>
                <span className="text-xs opacity-75 mt-1">Find skilled workers</span>
              </div>
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'applications'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-card-foreground hover:bg-muted'
              }`}
              onClick={() => setActiveTab('applications')}
            >
              <div className="flex flex-col items-center">
                <span className="flex items-center">
                  My Applications 
                  {applications.length > 0 && (
                    <span className="ml-2 bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                      {applications.length}
                    </span>
                  )}
                </span>
                <span className="text-xs opacity-75 mt-1">Track your applications</span>
              </div>
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'messages'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-card-foreground hover:bg-muted'
              }`}
              onClick={() => setActiveTab('messages')}
            >
              <div className="flex flex-col items-center">
                <span className="flex items-center">
                  Messages 
                  {messages.length > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                      {messages.length}
                    </span>
                  )}
                </span>
                <span className="text-xs opacity-75 mt-1">Chat with karigars</span>
              </div>
            </button>
          </div>
        </div>

        {/* Gigs Grid */}
        {activeTab === 'gigs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGigs().map((gig) => (
              <div key={gig.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
                {/* Food Image Header */}
                <div className="relative h-48 bg-muted">
                  <img
                    src={gig.foodImage}
                    alt={gig.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {gig.gigType.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className={`w-3 h-3 rounded-full ${
                      gig.urgency === 'high' ? 'bg-red-500' : 
                      gig.urgency === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                  </div>
                </div>

                {/* Gig Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        gig.urgency === 'high' ? 'bg-red-500' : 
                        gig.urgency === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></div>
                      <span className="text-xs font-medium text-muted-foreground uppercase">{gig.gigType}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{gig.distance}</p>
                      <p className="text-xs text-muted-foreground">{gig.postedAt}</p>
                    </div>
                  </div>
                  <h3 className="font-semibold text-card-foreground text-lg mb-1">{gig.title}</h3>
                  <p className="text-sm text-muted-foreground">{gig.description}</p>
                </div>

                {/* Vendor Info */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Icon name="Store" size={16} className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{gig.vendor}</p>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                          <span className="text-xs text-muted-foreground">{gig.vendorRating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{gig.vendorLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Gig Details */}
                <div className="p-4">
                  {/* Skills */}
                  <div className="mb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Required Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {gig.skills.map((skill, index) => (
                        <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Time & Pay */}
                  <div className="bg-muted rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{gig.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium">{gig.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">{gig.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Rate:</span>
                      <span className="font-bold text-orange-600">₹{gig.rate}/hour</span>
                    </div>
                  </div>

                  {/* Total Pay & Applicants */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-green-600">₹{gig.totalPay}</div>
                      <div className="text-xs text-muted-foreground">Total Pay</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-card-foreground">{gig.applicants}</div>
                      <div className="text-xs text-muted-foreground">Applicants</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedGig(gig);
                        setShowDetailsModal(true);
                      }}
                      className="flex-1"
                    >
                      <Icon name="Eye" size={14} className="mr-1" />
                      View Details
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleApplyForGig(gig)}
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                    >
                      <Icon name="Check" size={14} className="mr-1" />
                      Apply Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Karigars Grid */}
        {activeTab === 'karigars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredKarigars().map((karigar) => (
              <div key={karigar.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
                {/* Karigar Image */}
                <div className="relative h-48 bg-muted">
                  <img
                    src={karigar.image}
                    alt={karigar.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                      KARIGAR
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className={`w-4 h-4 rounded-full ${karigar.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  </div>
                  {/* Skill Image Overlay */}
                  <div className="absolute bottom-3 right-3">
                    <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src={karigar.skillImage}
                        alt="Skill"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Karigar Details */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-card-foreground text-lg mb-1">{karigar.name}</h3>
                    <p className="text-sm text-muted-foreground">{karigar.age} years • {karigar.location}</p>
                  </div>

                  {/* Rating & Stats */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                        <span className="text-xs text-muted-foreground">{karigar.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{karigar.totalGigs} gigs</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{karigar.distance}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {karigar.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {karigar.skills.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{karigar.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Verified Skills */}
                  {karigar.verifiedSkills.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Verified:</p>
                      <div className="flex flex-wrap gap-1">
                        {karigar.verifiedSkills.map((skill, index) => (
                          <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs flex items-center">
                            <Icon name="Check" size={10} className="mr-1" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rate & Availability */}
                  <div className="bg-muted rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Rate:</span>
                      <span className="font-bold text-orange-600">₹{karigar.hourlyRate}/hour</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Available:</span>
                      <span className="font-medium">{karigar.availability}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedKarigar(karigar);
                        setShowKarigarProfileModal(true);
                      }}
                      className="flex-1"
                    >
                      <Icon name="Eye" size={14} className="mr-1" />
                      View Profile
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => {
                        setSelectedKarigar(karigar);
                        setShowMessageModal(true);
                      }}
                      className="flex-1 bg-orange-600 hover:bg-orange-700"
                    >
                      <Icon name="MessageSquare" size={14} className="mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredGigs().length === 0 && activeTab === 'gigs' && (
          <div className="text-center py-12">
            <Icon name="Briefcase" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No gigs found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button onClick={() => setShowGigModal(true)}>
              <Icon name="Plus" size={16} className="mr-2" />
              Post a Gig
            </Button>
          </div>
        )}

        {filteredKarigars().length === 0 && activeTab === 'karigars' && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No karigars found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search</p>
            <Button onClick={() => setShowKarigarModal(true)}>
              <Icon name="UserPlus" size={16} className="mr-2" />
              Join as Karigar
            </Button>
          </div>
        )}

        {/* Success Notification */}
        {showApplicationSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} />
            <span>Application submitted successfully!</span>
          </div>
        )}
      </div>

      {/* Karigar Modal */}
      {showKarigarModal && (
        <KarigarModal
          onClose={() => setShowKarigarModal(false)}
          onSubmit={handleKarigarSubmit}
        />
      )}

      {/* Gig Modal */}
      {showGigModal && (
        <GigModal
          onClose={() => setShowGigModal(false)}
          onSubmit={handleGigSubmit}
        />
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedGig && (
        <DetailsModal
          gig={selectedGig}
          onClose={() => setShowDetailsModal(false)}
          onApply={handleApplyForGig}
        />
      )}

      {/* Karigar Profile Modal */}
      {showKarigarProfileModal && selectedKarigar && (
        <KarigarProfileModal
          karigar={selectedKarigar}
          onClose={() => setShowKarigarProfileModal(false)}
        />
      )}

      {/* Message Modal */}
      {showMessageModal && selectedKarigar && (
        <MessageModal
          karigar={selectedKarigar}
          onClose={() => setShowMessageModal(false)}
          onSend={handleSendMessage}
        />
      )}

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <ApplicationsTab applications={applications} />
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <MessagesTab messages={messages} />
      )}
    </div>
  );
};

// Modal Components
const KarigarModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    skills: '',
    verifiedSkills: '',
    hourlyRate: '',
    availability: 'Flexible',
    bio: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      verifiedSkills: formData.verifiedSkills.split(',').map(skill => skill.trim()).filter(skill => skill)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-card-foreground">🔧 Join as Karigar</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Full Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Age</label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                placeholder="25"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Dadar Station West"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Skills (comma separated)</label>
            <Input
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
              placeholder="Dosa Making, Vegetable Chopping, Wok Cooking"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Verified Skills (optional)</label>
            <Input
              value={formData.verifiedSkills}
              onChange={(e) => setFormData({...formData, verifiedSkills: e.target.value})}
              placeholder="Dosa Master, Speed Chopper"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Hourly Rate (₹)</label>
              <Input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                placeholder="200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Availability</label>
              <Select
                value={formData.availability}
                onChange={(value) => setFormData({...formData, availability: value})}
                options={[
                  { value: 'Flexible', label: 'Flexible' },
                  { value: 'Morning Only', label: 'Morning Only' },
                  { value: 'Evening Only', label: 'Evening Only' },
                  { value: 'All Day', label: 'All Day' }
                ]}
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Tell us about your experience and expertise..."
              className="w-full p-3 border border-border rounded-lg bg-background text-card-foreground resize-none"
              rows={3}
              required
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
              <Icon name="UserPlus" size={16} className="mr-2" />
              Join as Karigar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GigModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    gigType: 'emergency',
    skills: '',
    date: 'Today',
    time: '',
    duration: '',
    rate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      vendor: "Your Stall",
      vendorPhone: "+91 98765 43217",
      vendorRating: 4.5,
      vendorLocation: "Your Location",
      urgency: formData.gigType === 'emergency' ? 'high' : 'medium',
      distance: "0m away",
      applicants: 0,
      status: "open",
      postedAt: "Just now",
      totalPay: parseInt(formData.rate) * parseInt(formData.duration)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-card-foreground">📋 Post a Gig</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Gig Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Emergency Juice Stall Cover"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe what you need help with..."
              className="w-full p-3 border border-border rounded-lg bg-background text-card-foreground resize-none"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Gig Type</label>
            <Select
              value={formData.gigType}
              onChange={(value) => setFormData({...formData, gigType: value})}
              options={[
                { value: 'emergency', label: 'Emergency Cover' },
                { value: 'prep', label: 'Prep Help' },
                { value: 'training', label: 'Skill Training' }
              ]}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Required Skills (comma separated)</label>
            <Input
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
              placeholder="Juice Making, Cash Handling, Customer Service"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Date</label>
              <Select
                value={formData.date}
                onChange={(value) => setFormData({...formData, date: value})}
                options={[
                  { value: 'Today', label: 'Today' },
                  { value: 'Tomorrow', label: 'Tomorrow' },
                  { value: 'This Week', label: 'This Week' },
                  { value: 'Next Week', label: 'Next Week' }
                ]}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Time</label>
              <Input
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                placeholder="5:00 PM - 10:00 PM"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Duration (hours)</label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                placeholder="5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Hourly Rate (₹)</label>
              <Input
                type="number"
                value={formData.rate}
                onChange={(e) => setFormData({...formData, rate: e.target.value})}
                placeholder="150"
                required
              />
            </div>
          </div>
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
              <Icon name="Briefcase" size={16} className="mr-2" />
              Post Gig
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DetailsModal = ({ gig, onClose, onApply }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-card-foreground">{gig.title}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-card-foreground mb-3">Gig Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm text-card-foreground">{gig.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Required Skills</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {gig.skills.map((skill, index) => (
                      <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="text-sm font-medium">{gig.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="text-sm font-medium">{gig.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium">{gig.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rate</p>
                    <p className="text-sm font-bold text-orange-600">₹{gig.rate}/hour</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-3">Vendor Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Icon name="Store" size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{gig.vendor}</p>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                      <span className="text-xs text-muted-foreground">{gig.vendorRating}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="text-sm font-medium">{gig.vendorLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{gig.vendorPhone}</p>
                </div>
              </div>
              <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-green-600">₹{gig.totalPay}</p>
                    <p className="text-sm text-muted-foreground">Total Pay</p>
                  </div>
                  <Button 
                    onClick={() => {
                      onApply(gig);
                      onClose();
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Icon name="Check" size={16} className="mr-2" />
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Karigar Profile Modal
const KarigarProfileModal = ({ karigar, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-card-foreground">👨‍🍳 {karigar.name}'s Profile</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={karigar.image}
                alt={karigar.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  KARIGAR
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <div className={`w-4 h-4 rounded-full ${karigar.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-card-foreground mb-1">{karigar.name}</h3>
                <p className="text-muted-foreground">{karigar.age} years • {karigar.location}</p>
              </div>

              {/* Rating & Stats */}
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
                    <span className="font-semibold">{karigar.rating}</span>
                    <span className="text-muted-foreground">({karigar.totalGigs} gigs completed)</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{karigar.distance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Hourly Rate:</span>
                  <span className="font-bold text-orange-600 text-lg">₹{karigar.hourlyRate}/hour</span>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {karigar.skills.map((skill, index) => (
                    <span key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Skills */}
              {karigar.verifiedSkills.length > 0 && (
                <div>
                  <h4 className="font-semibold text-card-foreground mb-2">Verified Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {karigar.verifiedSkills.map((skill, index) => (
                      <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                        <Icon name="Check" size={12} className="mr-1" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Availability */}
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">Availability</h4>
                <p className="text-muted-foreground">{karigar.availability}</p>
              </div>

              {/* Bio */}
              <div>
                <h4 className="font-semibold text-card-foreground mb-2">About</h4>
                <p className="text-muted-foreground">{karigar.bio}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6 pt-6 border-t border-border">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Message Modal
const MessageModal = ({ karigar, onClose, onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(karigar, message);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-card-foreground">💬 Message {karigar.name}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-card-foreground mb-2">Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! I'm interested in your services. Can you tell me more about your availability and rates?"
              className="w-full p-3 border border-border rounded-lg bg-background text-card-foreground resize-none"
              rows={4}
            />
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSend}
              disabled={!message.trim()}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
            >
              <Icon name="Send" size={16} className="mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Applications Tab Component
const ApplicationsTab = ({ applications }) => {
  return (
    <div className="space-y-4">
      {applications.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Briefcase" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">No applications yet</h3>
          <p className="text-muted-foreground">Your applications will appear here</p>
        </div>
      ) : (
        applications.map((app) => (
          <div key={app.id} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-card-foreground">{app.gigTitle}</h4>
                <p className="text-sm text-muted-foreground">{app.vendor}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">₹{app.totalPay}</div>
                <div className="text-xs text-muted-foreground">{app.appliedAt}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {app.date} • {app.time}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Messages Tab Component
const MessagesTab = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-card-foreground mb-2">No messages yet</h3>
          <p className="text-muted-foreground">Your messages will appear here</p>
        </div>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{msg.karigarName}</p>
                  <p className="text-xs text-muted-foreground">{msg.sentAt}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{msg.status}</span>
            </div>
            <p className="text-sm text-card-foreground">{msg.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default KarigarConnect; 
