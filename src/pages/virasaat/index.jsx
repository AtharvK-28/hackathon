import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import { useCart } from '../../contexts/CartContext';

const Virasaat = () => {
  const { cartCount } = useCart();
  const [activeTab, setActiveTab] = useState('browse');
  const [showLicensorModal, setShowLicensorModal] = useState(false);
  const [showSubscriberModal, setShowSubscriberModal] = useState(false);
  const [selectedLegacy, setSelectedLegacy] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);

  // Success Stories Data
  const successStories = [
    {
      id: 1,
      vendor: "Rekha Bhen",
      title: "The Chaat Queen of Surat",
      location: "Surat, Gujarat",
      story: "Rekha was famous in her Surat neighborhood for her fiery imli masala used in her tangy chaat. But her street cart had limited reach. After joining Virasaat, her signature imli masala got listed online with beautiful packaging and storytelling. Within 6 months, she started shipping across Gujarat and even got featured in a local food vlog. Her son now manages logistics while she experiments with new spice blends.",
      topSeller: "Rekha's Khatta-Meetha Imli Masala",
      earnings: "10x increase in revenue",
      subscribers: 156,
      image: "/assets/images/rekha_chaat.jpeg",
      icon: "🛍️"
    },
    {
      id: 2,
      vendor: "Abdul Bhai",
      title: "The Nihari Whisperer of Lucknow",
      location: "Lucknow, Uttar Pradesh",
      story: "Abdul ran a humble nihari stall in old Lucknow, passed down from his father. But what made it legendary was his garam masala — a deep, earthy blend of 17 slow-roasted spices. He was skeptical of selling it outside. But Virasaat helped him brand it as 'Abdul Bhai ka Raaz', and gave him QR code-based packaging with a short video of his cooking story. Orders came in from expats craving home flavors. Now he's a weekend YouTube chef and a proud business owner.",
      topSeller: "Abdul Bhai ka Raaz – Nihari Masala",
      earnings: "International orders from expats",
      subscribers: 89,
      image: "/assets/images/garam_masala_abdul.jpeg",
      icon: "📦"
    },
    {
      id: 3,
      vendor: "Sita & Gita",
      title: "The Spice Sisters of Kolhapur",
      location: "Kolhapur, Maharashtra",
      story: "Twins Sita and Gita inherited their grandmother's fiery Kolhapuri chutney masala recipe. They sold it in plastic packets outside a temple, barely earning ₹300/day. After joining Virasaat, they were guided to make cleaner labels, use eco-friendly jars, and tell their grandma's story on the label. The masala went viral on Instagram, and now they earn 10x more, collaborating with home chefs and even supplying to a Maharashtrian restaurant in Singapore.",
      topSeller: "Aaji's Teekhat Kolhapuri Masala",
      earnings: "10x increase in daily earnings",
      subscribers: 234,
      image: "/assets/images/kolhapuri_chutney_sitagita.jpeg",
      icon: "🌶️"
    },
    {
      id: 4,
      vendor: "Kashi Yadav",
      title: "The Train Pantry Legend of Varanasi",
      location: "Varanasi, Uttar Pradesh",
      story: "Kashi sold poha and chai on trains. But regulars kept asking about the chaat masala he sprinkled — it had a unique citrusy punch. He joined Virasaat through a vendor drive and started bottling his spice under the name 'TrainWale Chaat Masale'. Travelers recognized the branding, and demand exploded online. He's no longer on platforms but runs a full spice unit with his cousin and dreams of opening a railway-themed café.",
      topSeller: "TrainWale Chaat Masale – Tang with a Twist",
      earnings: "Full spice unit business",
      subscribers: 67,
      image: "/assets/images/chaatmasala_kashi.jpeg",
      icon: "🧂"
    },
    {
      id: 5,
      vendor: "Meenakshi Amma",
      title: "The Sambhar Sage of Madurai",
      location: "Madurai, Tamil Nadu",
      story: "Meenakshi Amma's sambhar stall was popular in Madurai's flower market, but her signature sambhar podi had no label, no name — just legacy. After a college student helped her onboard Virasaat, she named it 'Thatha's Sambhar Secret' in honor of her late husband. With support from the platform, she included handwritten recipes in each package. Now, she receives thank-you letters from Tamil families abroad, and her granddaughter manages their growing orders.",
      topSeller: "Thatha's Sambhar Secret – Madurai Blend",
      earnings: "International recognition",
      subscribers: 123,
      image: "/assets/images/sambhar_podi_meenakshi.jpeg",
      icon: "🍲"
    }
  ];

  // Mock data for legendary ingredients
  const [legacyIngredients, setLegacyIngredients] = useState([
    {
      id: 1,
      name: "Aunty's Schezwan Chutney",
      masterVendor: "Aunty's Chinese Corner",
      masterVendorPhone: "+91 98765 43210",
      masterVendorRating: 4.9,
      masterVendorStory: "30 years of perfecting the authentic Schezwan taste. Started as a small stall in Dadar, now famous across Mumbai for the most authentic Chinese street food.",
      ingredient: "Schezwan Chutney",
      packageSize: "500ml Bottle",
      yield: "Makes 200 Schezwan Dosas",
      originalPrice: 800,
      licensePrice: 600,
      subscriptionPrice: 450,
      category: "chutneys",
      location: "Dadar Station West",
      distance: "200m away",
      image: "/assets/images/schezwan_chutney.jpeg",
      description: "The secret blend of 15 spices that made Aunty's Chinese Corner legendary. Perfect balance of heat, tang, and umami. Used by 50+ vendors across Mumbai.",
      ingredients: ["Red Chillies", "Garlic", "Ginger", "Soy Sauce", "Vinegar", "Secret Spice Blend"],
      usage: "2-3 tbsp per dosa, mix with regular chutney for authentic taste",
      testimonials: [
        { vendor: "Mumbai Dosa King", rating: 5, comment: "My dosa sales increased by 300% after using Aunty's chutney!" },
        { vendor: "Street Food Express", rating: 5, comment: "Customers keep coming back asking for 'that special chutney'" },
        { vendor: "Quick Bites", rating: 4, comment: "Authentic taste that's hard to replicate. Worth every penny." }
      ],
      subscribers: 47,
      postedAt: "2 years ago",
      status: "active"
    },
    {
      id: 2,
      name: "Ram's Kolhapuri Vada Pav Masala",
      masterVendor: "Ram's Vada Pav Empire",
      masterVendorPhone: "+91 98765 43211",
      masterVendorRating: 4.8,
      masterVendorStory: "Started with a single stall in 1995. Now has 15 outlets across Mumbai. The secret masala recipe has been passed down for 3 generations.",
      ingredient: "Kolhapuri Masala Powder",
      packageSize: "1kg Pack",
      yield: "Makes 500 Vada Pavs",
      originalPrice: 1200,
      licensePrice: 900,
      subscriptionPrice: 750,
      category: "masalas",
      location: "Bandra Market",
      distance: "500m away",
      image: "/assets/images/vada_pav_masala.jpeg",
      description: "The legendary masala that made Ram's vada pav famous. Perfect blend of 12 spices including rare Kolhapuri chillies. Instant upgrade for any vada pav stall.",
      ingredients: ["Kolhapuri Red Chillies", "Coriander", "Cumin", "Black Pepper", "Garlic Powder", "Secret Spice Mix"],
      usage: "1 tsp per vada, mix with potato filling for authentic Kolhapuri taste",
      testimonials: [
        { vendor: "Vada Pav Junction", rating: 5, comment: "My stall went from 50 to 200 vada pavs per day!" },
        { vendor: "Street Snacks", rating: 5, comment: "Customers say it tastes exactly like Ram's original" },
        { vendor: "Quick Bites Corner", rating: 4, comment: "Best investment for my business. ROI in 2 weeks." }
      ],
      subscribers: 89,
      postedAt: "3 years ago",
      status: "active"
    },
    {
      id: 3,
      name: "Gupta's Pani Puri Ka Paani",
      masterVendor: "Gupta's Pani Puri Paradise",
      masterVendorPhone: "+91 98765 43212",
      masterVendorRating: 4.7,
      masterVendorStory: "The Gupta family has been serving the most refreshing pani puri for 25 years. Their secret paani recipe is the talk of the town.",
      ingredient: "Pani Puri Concentrate",
      packageSize: "2L Bottle",
      yield: "Makes 300 Pani Puri Servings",
      originalPrice: 600,
      licensePrice: 450,
      subscriptionPrice: 350,
      category: "concentrates",
      location: "Andheri Station",
      distance: "300m away",
      image: "/assets/images/pani_puri_paani.jpeg",
      description: "The secret paani that made Gupta's pani puri legendary. Perfect balance of sweet, sour, and spicy. Just dilute with water and serve.",
      ingredients: ["Tamarind", "Mint", "Coriander", "Green Chillies", "Rock Salt", "Secret Herbs"],
      usage: "Dilute 1:3 with water, add chopped mint and coriander before serving",
      testimonials: [
        { vendor: "Pani Puri Express", rating: 5, comment: "My pani puri sales doubled in the first week!" },
        { vendor: "Street Food Hub", rating: 5, comment: "Customers love the authentic taste. Best paani in the area." },
        { vendor: "Quick Snacks", rating: 4, comment: "Easy to use and consistent quality. Great value for money." }
      ],
      subscribers: 34,
      postedAt: "1 year ago",
      status: "active"
    },
    {
      id: 4,
      name: "Mama's Pav Bhaji Masala",
      masterVendor: "Mama's Pav Bhaji Corner",
      masterVendorPhone: "+91 98765 43213",
      masterVendorRating: 4.6,
      masterVendorStory: "Mama started her stall in 1988. Her pav bhaji became so famous that people would travel from other cities just to taste it.",
      ingredient: "Pav Bhaji Masala",
      packageSize: "500g Pack",
      yield: "Makes 100 Pav Bhaji Servings",
      originalPrice: 400,
      licensePrice: 300,
      subscriptionPrice: 250,
      category: "masalas",
      location: "Dadar Station West",
      distance: "150m away",
      image: "/assets/images/pav_bhaji_masala.jpeg",
      description: "The secret masala that made Mama's pav bhaji legendary. Perfect blend of spices that brings out the best in any vegetable mix.",
      ingredients: ["Cumin", "Coriander", "Red Chilli Powder", "Garam Masala", "Amchur", "Secret Spice Blend"],
      usage: "2 tbsp per kg of vegetables, add while cooking for authentic taste",
      testimonials: [
        { vendor: "Pav Bhaji King", rating: 5, comment: "My pav bhaji now tastes exactly like Mama's original!" },
        { vendor: "Street Food Delight", rating: 5, comment: "Customers can't believe it's not Mama's stall" },
        { vendor: "Quick Meals", rating: 4, comment: "Consistent quality and authentic taste. Highly recommended." }
      ],
      subscribers: 56,
      postedAt: "2 years ago",
      status: "active"
    }
  ]);

  const handleLicensorSubmit = (formData) => {
    const newLegacy = {
      id: Date.now(),
      ...formData,
      masterVendor: "Your Stall",
      masterVendorPhone: "+91 98765 43217",
      masterVendorRating: 4.5,
      subscribers: 0,
      postedAt: "Just now",
      status: "pending"
    };
    setLegacyIngredients(prev => [newLegacy, ...prev]);
    setShowLicensorModal(false);
  };

  const handleSubscriberSubmit = (formData) => {
    // Handle subscription logic
    alert(`Subscription request sent to ${formData.masterVendor}! They will contact you within 24 hours.`);
    setShowSubscriberModal(false);
  };

  const filteredLegacies = () => {
    return legacyIngredients.filter(legacy => {
      const matchesSearch = legacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           legacy.masterVendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           legacy.ingredient.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'all' || legacy.category === filterType;
      return matchesSearch && matchesFilter;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Virasaat - Flavours Passed Down. Stories Sealed In | Apna Mandi</title>
        <meta name="description" content="License legendary street food secrets and scale your business with authentic ingredients from master vendors" />
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
                <h1 className="text-xl font-bold text-card-foreground">🏛️ Virasaat</h1>
                <p className="text-sm text-muted-foreground">Flavours Passed Down. Stories Sealed In</p>
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
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 mb-8 text-white">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">🏛️ Virasaat: Flavours Passed Down. Stories Sealed In</h2>
            <p className="text-lg mb-6 opacity-90">
              License legendary street food secrets and scale your business with authentic ingredients from master vendors. 
              Turn your signature taste into a legacy that lives across the city.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => setShowLicensorModal(true)}
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                <Icon name="Crown" size={16} className="mr-2" />
                Become a Master Vendor
              </Button>
              <Button 
                onClick={() => setShowSubscriberModal(true)}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                <Icon name="Star" size={16} className="mr-2" />
                Subscribe to a Legacy
              </Button>
              <Button 
                onClick={() => setActiveTab('stories')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                <Icon name="BookOpen" size={16} className="mr-2" />
                Success Stories
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        {activeTab === 'browse' && (
          <div className="bg-card rounded-lg border border-border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search legendary ingredients, master vendors, or categories..."
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
                    { value: 'all', label: 'All Categories' },
                    { value: 'chutneys', label: 'Chutneys & Sauces' },
                    { value: 'masalas', label: 'Masalas & Spices' },
                    { value: 'concentrates', label: 'Concentrates' },
                    { value: 'doughs', label: 'Doughs & Batters' }
                  ]}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-card rounded-lg border border-border mb-6">
          <div className="flex space-x-1 p-1">
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'browse'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-card-foreground hover:bg-muted'
              }`}
              onClick={() => setActiveTab('browse')}
            >
              <div className="flex flex-col items-center">
                <span>Browse Legacies ({legacyIngredients.length})</span>
                <span className="text-xs opacity-75 mt-1">Discover legendary ingredients</span>
              </div>
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'stories'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-card-foreground hover:bg-muted'
              }`}
              onClick={() => setActiveTab('stories')}
            >
              <div className="flex flex-col items-center">
                <span>Success Stories</span>
                <span className="text-xs opacity-75 mt-1">Vendors who transformed their business</span>
              </div>
            </button>
          </div>
        </div>

        {/* Legacy Ingredients Grid */}
        {activeTab === 'browse' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLegacies().map((legacy) => (
              <div key={legacy.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
                {/* Legacy Image */}
                <div className="relative h-48 bg-muted">
                  <img
                    src={legacy.image}
                    alt={legacy.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      LEGENDARY
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {legacy.subscribers} subscribers
                    </div>
                  </div>
                </div>

                {/* Legacy Details */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-card-foreground text-lg mb-1">{legacy.name}</h3>
                    <p className="text-sm text-muted-foreground">{legacy.ingredient}</p>
                  </div>

                  {/* Master Vendor Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Icon name="Crown" size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-card-foreground">{legacy.masterVendor}</p>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                          <span className="text-xs text-muted-foreground">{legacy.masterVendorRating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{legacy.location}</p>
                      <p className="text-xs text-muted-foreground">{legacy.postedAt}</p>
                    </div>
                  </div>

                  {/* Package Info */}
                  <div className="bg-muted rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Package:</span>
                      <span className="font-medium">{legacy.packageSize}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Yield:</span>
                      <span className="font-medium">{legacy.yield}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-purple-600">₹{legacy.subscriptionPrice}</div>
                      <div className="text-sm text-muted-foreground line-through">₹{legacy.originalPrice}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">License: ₹{legacy.licensePrice}</div>
                      <div className="text-xs text-muted-foreground">Monthly: ₹{legacy.subscriptionPrice}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setSelectedLegacy(legacy);
                        setShowDetailsModal(true);
                      }}
                      className="flex-1"
                    >
                      <Icon name="Eye" size={14} className="mr-1" />
                      View Details
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => {
                        setSelectedLegacy(legacy);
                        setShowSubscriberModal(true);
                      }}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      <Icon name="Star" size={14} className="mr-1" />
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Success Stories Section */}
        {activeTab === 'stories' && (
          <div className="space-y-8">
            {/* Hero Section for Success Stories */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-4">🌟 Success Stories</h2>
                <p className="text-lg mb-6 opacity-90">
                  Discover how legendary vendors transformed their street food secrets into thriving businesses. 
                  These are real stories of passion, tradition, and entrepreneurial success.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm opacity-90">Vendors Transformed</div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">₹50M+</div>
                    <div className="text-sm opacity-90">Revenue Generated</div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <div className="text-2xl font-bold">25+</div>
                    <div className="text-sm opacity-90">Cities Covered</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Stories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {successStories.map((story) => (
                <div key={story.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Story Image */}
                  <div className="relative h-48 bg-muted">
                    <img
                      src={story.image}
                      alt={story.vendor}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        SUCCESS STORY
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-black/50 text-white px-2 py-1 rounded text-xs">
                        {story.subscribers} subscribers
                      </div>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-3xl">{story.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-card-foreground">{story.vendor}</h3>
                        <p className="text-sm text-muted-foreground">{story.title}</p>
                        <p className="text-xs text-muted-foreground">{story.location}</p>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {story.story}
                    </p>

                    <div className="bg-muted rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-card-foreground">Top Seller:</span>
                        <span className="text-sm text-purple-600 font-semibold">{story.topSeller}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-card-foreground">Achievement:</span>
                        <span className="text-sm text-green-600 font-semibold">{story.earnings}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Users" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{story.subscribers} vendors using this legacy</span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-purple-500 text-purple-600 hover:bg-purple-50"
                        onClick={() => {
                          setSelectedStory(story);
                          setShowStoryModal(true);
                        }}
                      >
                        <Icon name="BookOpen" size={14} className="mr-1" />
                        Read Full Story
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Create Your Success Story?</h3>
              <p className="text-lg mb-6 opacity-90">
                Join hundreds of vendors who have transformed their street food secrets into thriving businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setShowLicensorModal(true)}
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  <Icon name="Crown" size={16} className="mr-2" />
                  List Your Legacy
                </Button>
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                >
                  <Icon name="BookOpen" size={16} className="mr-2" />
                  Read More Stories
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredLegacies().length === 0 && activeTab === 'browse' && (
          <div className="text-center py-12">
            <Icon name="Crown" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No legendary ingredients found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button onClick={() => setShowLicensorModal(true)}>
              <Icon name="Plus" size={16} className="mr-2" />
              List Your Legacy
            </Button>
          </div>
        )}
      </div>

      {/* Licensor Modal */}
      {showLicensorModal && (
        <LicensorModal
          onClose={() => setShowLicensorModal(false)}
          onSubmit={handleLicensorSubmit}
        />
      )}

      {/* Subscriber Modal */}
      {showSubscriberModal && (
        <SubscriberModal
          onClose={() => setShowSubscriberModal(false)}
          onSubmit={handleSubscriberSubmit}
          selectedLegacy={selectedLegacy}
        />
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedLegacy && (
        <DetailsModal
          legacy={selectedLegacy}
          onClose={() => setShowDetailsModal(false)}
          onSubscribe={() => {
            setShowDetailsModal(false);
            setShowSubscriberModal(true);
          }}
        />
      )}

      {/* Story Modal */}
      {showStoryModal && selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{selectedStory.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-card-foreground">{selectedStory.vendor}</h2>
                    <p className="text-muted-foreground">{selectedStory.title}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowStoryModal(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Image and Stats */}
                <div>
                  <div className="relative h-64 bg-muted rounded-lg mb-4">
                    <img
                      src={selectedStory.image}
                      alt={selectedStory.vendor}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        SUCCESS STORY
                      </span>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-card-foreground mb-3">Achievement Highlights</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{selectedStory.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subscribers:</span>
                        <span className="font-medium">{selectedStory.subscribers} vendors</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Achievement:</span>
                        <span className="font-medium text-green-600">{selectedStory.earnings}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h3 className="font-semibold text-purple-800 mb-2">Top Selling Product</h3>
                    <p className="text-purple-700 font-medium">{selectedStory.topSeller}</p>
                  </div>
                </div>

                {/* Right Column - Story */}
                <div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-card-foreground mb-3">The Journey</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedStory.story}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-card-foreground mb-3">Impact on Virasaat</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Icon name="TrendingUp" size={16} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-card-foreground">Revenue Growth</p>
                          <p className="text-xs text-muted-foreground">Significant increase in earnings</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Icon name="Users" size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-card-foreground">Vendor Network</p>
                          <p className="text-xs text-muted-foreground">{selectedStory.subscribers} vendors using this legacy</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Icon name="Globe" size={16} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-card-foreground">Geographic Reach</p>
                          <p className="text-xs text-muted-foreground">Expanded beyond local market</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-4 text-white">
                    <h3 className="font-semibold mb-2">Inspired by this story?</h3>
                    <p className="text-sm opacity-90 mb-3">
                      Join Virasaat and create your own success story. Transform your street food secrets into a thriving business.
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm"
                        onClick={() => {
                          setShowStoryModal(false);
                          setShowLicensorModal(true);
                        }}
                        className="bg-white text-green-600 hover:bg-gray-100"
                      >
                        <Icon name="Crown" size={14} className="mr-1" />
                        List Your Legacy
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-green-600"
                      >
                        <Icon name="Star" size={14} className="mr-1" />
                        Subscribe to Legacy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal Components
const LicensorModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    ingredient: '',
    packageSize: '',
    yield: '',
    originalPrice: '',
    licensePrice: '',
    subscriptionPrice: '',
    category: 'masalas',
    description: '',
    masterVendorStory: '',
    ingredients: '',
    usage: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-card-foreground">🏛️ List Your Legacy</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Legacy Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Aunty's Schezwan Chutney"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Ingredient Type</label>
              <Input
                value={formData.ingredient}
                onChange={(e) => setFormData({...formData, ingredient: e.target.value})}
                placeholder="e.g., Schezwan Chutney"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Package Size</label>
              <Input
                value={formData.packageSize}
                onChange={(e) => setFormData({...formData, packageSize: e.target.value})}
                placeholder="e.g., 500ml Bottle"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Yield</label>
              <Input
                value={formData.yield}
                onChange={(e) => setFormData({...formData, yield: e.target.value})}
                placeholder="e.g., Makes 200 Dosas"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Original Price</label>
              <Input
                type="number"
                value={formData.originalPrice}
                onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                placeholder="₹800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">License Price</label>
              <Input
                type="number"
                value={formData.licensePrice}
                onChange={(e) => setFormData({...formData, licensePrice: e.target.value})}
                placeholder="₹600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Subscription Price</label>
              <Input
                type="number"
                value={formData.subscriptionPrice}
                onChange={(e) => setFormData({...formData, subscriptionPrice: e.target.value})}
                placeholder="₹450"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Category</label>
            <Select
              value={formData.category}
              onChange={(value) => setFormData({...formData, category: value})}
              options={[
                { value: 'chutneys', label: 'Chutneys & Sauces' },
                { value: 'masalas', label: 'Masalas & Spices' },
                { value: 'concentrates', label: 'Concentrates' },
                { value: 'doughs', label: 'Doughs & Batters' }
              ]}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Your Story</label>
            <textarea
              value={formData.masterVendorStory}
              onChange={(e) => setFormData({...formData, masterVendorStory: e.target.value})}
              placeholder="Tell the story of how you perfected this recipe..."
              className="w-full p-3 border border-border rounded-lg bg-background text-card-foreground resize-none"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe what makes your ingredient special..."
              className="w-full p-3 border border-border rounded-lg bg-background text-card-foreground resize-none"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Key Ingredients</label>
              <textarea
                value={formData.ingredients}
                onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                placeholder="List main ingredients (don't reveal secrets!)"
                className="w-full p-3 border border-border rounded-lg bg-background text-card-foreground resize-none"
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Usage Instructions</label>
              <textarea
                value={formData.usage}
                onChange={(e) => setFormData({...formData, usage: e.target.value})}
                placeholder="How should vendors use your ingredient?"
                className="w-full p-3 border border-border rounded-lg bg-background text-card-foreground resize-none"
                rows={2}
                required
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
              <Icon name="Crown" size={16} className="mr-2" />
              List My Legacy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SubscriberModal = ({ onClose, onSubmit, selectedLegacy }) => {
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorPhone: '',
    vendorLocation: '',
    subscriptionType: 'monthly',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, masterVendor: selectedLegacy?.masterVendor || 'Selected Vendor' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-card-foreground">⭐ Subscribe to Legacy</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
          {selectedLegacy && (
            <p className="text-sm text-muted-foreground mt-2">
              Subscribe to {selectedLegacy.name} by {selectedLegacy.masterVendor}
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Your Stall Name</label>
            <Input
              value={formData.vendorName}
              onChange={(e) => setFormData({...formData, vendorName: e.target.value})}
              placeholder="e.g., My Dosa Corner"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Phone Number</label>
            <Input
              value={formData.vendorPhone}
              onChange={(e) => setFormData({...formData, vendorPhone: e.target.value})}
              placeholder="+91 98765 43210"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Location</label>
            <Input
              value={formData.vendorLocation}
              onChange={(e) => setFormData({...formData, vendorLocation: e.target.value})}
              placeholder="e.g., Dadar Station West"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Subscription Type</label>
            <Select
              value={formData.subscriptionType}
              onChange={(value) => setFormData({...formData, subscriptionType: value})}
              options={[
                { value: 'monthly', label: 'Monthly Subscription' },
                { value: 'quarterly', label: 'Quarterly Subscription' },
                { value: 'one-time', label: 'One-time License' }
              ]}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Message (Optional)</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tell the master vendor about your business..."
              className="w-full p-3 border border-border rounded-lg bg-background text-card-foreground resize-none"
              rows={3}
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
              <Icon name="Star" size={16} className="mr-2" />
              Subscribe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DetailsModal = ({ legacy, onClose, onSubscribe }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-card-foreground">🏛️ {legacy.name}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <div className="relative h-64 bg-muted rounded-lg mb-4">
                <img
                  src={legacy.image}
                  alt={legacy.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    LEGENDARY
                  </span>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-card-foreground mb-2">Package Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Package Size:</span>
                    <span className="font-medium">{legacy.packageSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Yield:</span>
                    <span className="font-medium">{legacy.yield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subscribers:</span>
                    <span className="font-medium">{legacy.subscribers} vendors</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold text-card-foreground mb-2">Pricing</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Original Price:</span>
                    <span className="line-through">₹{legacy.originalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License Price:</span>
                    <span className="font-medium">₹{legacy.licensePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Subscription:</span>
                    <span className="font-bold text-purple-600">₹{legacy.subscriptionPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-6">
                <h3 className="font-semibold text-card-foreground mb-2">Master Vendor Story</h3>
                <p className="text-sm text-muted-foreground">{legacy.masterVendorStory}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-card-foreground mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{legacy.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-card-foreground mb-2">Key Ingredients</h3>
                <p className="text-sm text-muted-foreground">{legacy.ingredients}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-card-foreground mb-2">Usage Instructions</h3>
                <p className="text-sm text-muted-foreground">{legacy.usage}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-card-foreground mb-2">Vendor Testimonials</h3>
                <div className="space-y-3">
                  {legacy.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-muted rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-card-foreground">{testimonial.vendor}</span>
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                          <span className="text-xs text-muted-foreground">{testimonial.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{testimonial.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={onSubscribe} className="w-full bg-purple-600 hover:bg-purple-700">
                <Icon name="Star" size={16} className="mr-2" />
                Subscribe to This Legacy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Virasaat; 
