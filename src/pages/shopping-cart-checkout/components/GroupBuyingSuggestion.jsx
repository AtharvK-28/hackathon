import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GroupBuyingSuggestion = ({ cartItems, onJoinGroup, onCreateGroup }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [timeLeft, setTimeLeft] = useState('2h 30m');
  const [isJoining, setIsJoining] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupLink, setGroupLink] = useState('');
  const [joinedGroupIds, setJoinedGroupIds] = useState(new Set());
  const expandedRef = useRef(null);

  // Simulate countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const [hours, minutes] = prev.split('h ');
        const mins = parseInt(minutes);
        if (mins > 0) {
          return `${hours}h ${mins - 1}m`;
        } else if (parseInt(hours) > 0) {
          return `${parseInt(hours) - 1}h 59m`;
        }
        return '0h 0m';
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Generate meaningful group buying suggestions
  const generateSuggestions = () => {
    if (!cartItems || Object.keys(cartItems).length === 0) {
      return [];
    }

    // Group items by supplier
    const supplierGroups = {};
    Object.values(cartItems).forEach(item => {
      const supplierName = item.supplierName || 'Unknown Supplier';
      if (!supplierGroups[supplierName]) {
        supplierGroups[supplierName] = [];
      }
      supplierGroups[supplierName].push(item);
    });

    // Create meaningful suggestions
    const suggestions = [];
    Object.entries(supplierGroups).forEach(([supplierName, items]) => {
      const totalValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      if (totalValue >= 200) { // Show for orders above ₹200
        const discount = totalValue >= 500 ? 20 : totalValue >= 300 ? 15 : 10;
        const requiredMembers = 5; // Fixed to 5 for all groups
        const currentMembers = 4; // Fixed to 4, so joining completes the group
        
        // Use stable, realistic order counts based on supplier name
        const getOrderCount = (name) => {
          const hash = name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
          const baseCount = (hash % 100) + 50; // Between 50-150 orders
          return baseCount;
        };
        
        suggestions.push({
          id: `group-${supplierName}`,
          supplierName,
          discount,
          currentMembers,
          requiredMembers,
          timeLeft,
          commonItems: items.slice(0, 3).map(item => item.name),
          totalValue,
          potentialSavings: totalValue * (discount / 100),
          deliveryFee: 60,
          items: items,
          location: 'Mumbai Central',
          rating: 4.2,
          ordersCompleted: getOrderCount(supplierName)
        });
      }
    });

    return suggestions;
  };

  const suggestions = generateSuggestions();

  // Create meaningful demo suggestions when no cart items
  const demoSuggestions = suggestions.length === 0 ? [
    {
      id: 'demo-fresh-harvest',
      supplierName: 'Fresh Harvest Co.',
      discount: 20,
      currentMembers: 4,
      requiredMembers: 5,
      timeLeft,
      commonItems: ['Organic Tomatoes', 'Bell Peppers', 'Fresh Onions'],
      totalValue: 650,
      potentialSavings: 130,
      deliveryFee: 60,
      items: [],
      location: 'Mumbai Central',
      rating: 4.5,
      ordersCompleted: 127,
      isDemo: true
    },
    {
      id: 'demo-daily-veggies',
      supplierName: 'Daily Veggies Market',
      discount: 15,
      currentMembers: 4,
      requiredMembers: 5,
      timeLeft,
      commonItems: ['Carrots', 'Potatoes', 'Green Beans'],
      totalValue: 420,
      potentialSavings: 63,
      deliveryFee: 60,
      items: [],
      location: 'Andheri West',
      rating: 4.3,
      ordersCompleted: 89,
      isDemo: true
    }
  ] : suggestions;

  if (demoSuggestions.length === 0) return null;

  const handleJoinGroup = (suggestion) => {
    setSelectedGroup(suggestion);
    setIsExpanded(true);
    
    // Smooth scroll to the expanded section after a short delay
    setTimeout(() => {
      if (expandedRef.current) {
        expandedRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
    
    if (onJoinGroup) {
      onJoinGroup(suggestion);
    }
  };

  const handleCreateGroup = () => {
    setShowCreateGroup(true);
    // Generate a unique group link
    const uniqueId = Math.random().toString(36).substr(2, 9);
    const link = `${window.location.origin}/join-group/${uniqueId}`;
    setGroupLink(link);
  };

  const handleConfirmJoin = async () => {
    setIsJoining(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsJoining(false);
    
    // Mark this group as joined
    setJoinedGroupIds(prev => new Set([...prev, selectedGroup.id]));
    
    // Call the onJoinGroup callback to update the parent component
    if (onJoinGroup) {
      onJoinGroup(selectedGroup);
    }
    
    alert(`🎉 Successfully joined group for ${selectedGroup.supplierName}! Group is now complete and your discount has been applied!`);
    setIsExpanded(false);
  };

  const copyGroupLink = () => {
    navigator.clipboard.writeText(groupLink);
    alert('Group link copied to clipboard! Share this with other vendors to join your group.');
  };

  const isGroupJoined = (groupId) => joinedGroupIds.has(groupId);

  const joinedGroupsCount = joinedGroupIds.size;
  const availableGroupsCount = demoSuggestions.filter(s => !isGroupJoined(s.id)).length;

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-xl shadow-sm mb-6">
      {/* Dropdown Header */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full p-6 flex items-center justify-between hover:bg-blue-100/50 transition-colors duration-200 rounded-xl"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon name="Users" size={24} className="text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-800">🚀 Group Buying Opportunities</h3>
            <p className="text-sm text-gray-600">
              {joinedGroupsCount > 0 
                ? `You've joined ${joinedGroupsCount} group${joinedGroupsCount > 1 ? 's' : ''} • ${availableGroupsCount} more available`
                : `${availableGroupsCount} groups available • Join to unlock bulk discounts`
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {joinedGroupsCount > 0 && (
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              +{joinedGroupsCount} joined
            </div>
          )}
          <div className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
            <Icon name="ChevronDown" size={20} className="text-gray-500" />
          </div>
        </div>
      </button>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div className="px-6 pb-6 border-t border-blue-200">
          <div className="space-y-4 mt-4">
            {demoSuggestions.map((suggestion) => {
              const isJoined = isGroupJoined(suggestion.id);
              const isCompleted = isJoined || suggestion.currentMembers >= suggestion.requiredMembers;
              
              return (
                <div key={suggestion.id} className={`border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  isCompleted ? 'bg-gray-50 opacity-75' : 'bg-white'
                }`}>
                  {suggestion.isDemo && (
                    <div className="mb-3">
                      <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium border border-yellow-200">
                        🎯 Demo - Add items to cart to see real suggestions
                      </span>
                    </div>
                  )}
                  
                  {isJoined && (
                    <div className="mb-3">
                      <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium border border-green-200">
                        ✅ Joined - Discount Applied
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div>
                          <h4 className={`text-lg font-semibold ${isCompleted ? 'text-gray-500' : 'text-gray-800'}`}>
                            {suggestion.supplierName}
                          </h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Icon name="MapPin" size={12} />
                            <span>{suggestion.location}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Icon name="Star" size={12} className="text-yellow-500" />
                              <span>{suggestion.rating}</span>
                            </div>
                            <span>•</span>
                            <span>{suggestion.ordersCompleted} orders</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 mb-3">
                        <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm px-3 py-1 rounded-full font-semibold border border-green-200">
                          {suggestion.discount}% OFF
                        </span>
                        <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm px-3 py-1 rounded-full font-semibold border border-blue-200">
                          Save ₹{suggestion.potentialSavings.toFixed(0)}
                        </span>
                        <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm px-3 py-1 rounded-full font-semibold border border-purple-200">
                          Split Delivery
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-2">
                          <Icon name="Users" size={14} className="text-blue-500" />
                          <span>{isCompleted ? suggestion.requiredMembers : suggestion.currentMembers}/{suggestion.requiredMembers} vendors</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Clock" size={14} className="text-orange-500" />
                          <span>{suggestion.timeLeft} left</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Truck" size={14} className="text-green-500" />
                          <span>₹{suggestion.deliveryFee} delivery</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="Package" size={14} className="text-purple-500" />
                          <span>{suggestion.commonItems.length} items</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-3">
                        <strong>Common items:</strong> {suggestion.commonItems.join(', ')}
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-500 mb-1">
                          <span>Group Progress</span>
                          <span>{Math.round((isCompleted ? suggestion.requiredMembers : suggestion.currentMembers) / suggestion.requiredMembers * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              isCompleted 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                                : 'bg-gradient-to-r from-blue-500 to-purple-500'
                            }`}
                            style={{ width: `${(isCompleted ? suggestion.requiredMembers : suggestion.currentMembers) / suggestion.requiredMembers * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <strong>Your order value:</strong> ₹{suggestion.totalValue.toFixed(2)} | 
                        <strong>Potential savings:</strong> ₹{suggestion.potentialSavings.toFixed(2)}
                      </div>
                    </div>

                    <div className="ml-4">
                      <Button
                        onClick={() => handleJoinGroup(suggestion)}
                        disabled={isCompleted}
                        className={`px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ${
                          isCompleted
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        }`}
                      >
                        {isCompleted ? 'Completed' : 'Join Group'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expanded Group Details */}
          {isExpanded && selectedGroup && (
            <div ref={expandedRef} className="mt-6 p-6 bg-white border border-blue-200 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Group Details - {selectedGroup.supplierName}</h4>
                  <p className="text-sm text-gray-600">{selectedGroup.location} • {selectedGroup.rating} ⭐ • {selectedGroup.ordersCompleted} orders</p>
                </div>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Icon name="X" size={20} className="text-gray-500" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <Icon name="DollarSign" size={16} className="mr-2" />
                    💰 Savings Breakdown
                  </h5>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Original Total:</span>
                      <span className="font-medium">₹{selectedGroup.totalValue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600">
                      <span>Bulk Discount ({selectedGroup.discount}%):</span>
                      <span className="font-medium">-₹{selectedGroup.potentialSavings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-blue-600">
                      <span>Delivery Split:</span>
                      <span className="font-medium">-₹{(selectedGroup.deliveryFee / selectedGroup.requiredMembers).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-blue-200 pt-3">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Final Total:</span>
                        <span className="text-green-600">₹{(selectedGroup.totalValue - selectedGroup.potentialSavings - (selectedGroup.deliveryFee / selectedGroup.requiredMembers)).toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        You save ₹{(selectedGroup.potentialSavings + (selectedGroup.deliveryFee - selectedGroup.deliveryFee / selectedGroup.requiredMembers)).toFixed(2)} total!
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <h5 className="font-semibold text-green-800 mb-3 flex items-center">
                    <Icon name="Users" size={16} className="mr-2" />
                    📦 Group Members
                  </h5>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Vendor 1</span>
                      </div>
                      <span className="text-green-700">₹280</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Vendor 2</span>
                      </div>
                      <span className="text-green-700">₹320</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Vendor 3</span>
                      </div>
                      <span className="text-green-700">₹190</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-green-100 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Vendor 4</span>
                      </div>
                      <span className="text-green-700">₹250</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-100 rounded-lg border-2 border-blue-300">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="font-medium text-blue-700">You (Current Order)</span>
                      </div>
                      <span className="text-blue-700 font-medium">₹{selectedGroup.totalValue.toFixed(0)}</span>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-700">
                      <strong>🎯 Almost Complete!</strong> Join now to complete the group and get your discount immediately!
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={handleConfirmJoin}
                  disabled={isJoining || isGroupJoined(selectedGroup.id)}
                  className={`flex-1 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isGroupJoined(selectedGroup.id)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
                  }`}
                >
                  {isJoining ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Joining Group...
                    </>
                  ) : isGroupJoined(selectedGroup.id) ? (
                    <>
                      <Icon name="Check" size={16} className="mr-2" />
                      Already Joined
                    </>
                  ) : (
                    <>
                      <Icon name="Check" size={16} className="mr-2" />
                      Join & Complete Group
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsExpanded(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-lg font-medium"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Create Group Modal */}
          {showCreateGroup && (
            <div className="mt-6 p-6 bg-white border border-blue-200 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Create New Group Order</h4>
                  <p className="text-sm text-gray-600">Share this link with other vendors to join your group</p>
                </div>
                <button 
                  onClick={() => setShowCreateGroup(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Icon name="X" size={20} className="text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                  <h5 className="font-semibold text-blue-800 mb-2">📋 Group Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Group ID:</span>
                      <span className="font-mono text-blue-600">{groupLink.split('/').pop()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Required Members:</span>
                      <span>5 vendors</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount:</span>
                      <span>15% off</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Split:</span>
                      <span>₹12 each (₹60 total)</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h5 className="font-semibold text-gray-800 mb-2">🔗 Share Link</h5>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={groupLink}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                    />
                    <Button
                      onClick={copyGroupLink}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      <Icon name="Copy" size={14} className="mr-1" />
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Share this link via WhatsApp, email, or any messaging app
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <h5 className="font-semibold text-yellow-800 mb-2">💡 How it works</h5>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Share the link with 4 other vendors</li>
                    <li>• Each vendor adds their items to the group</li>
                    <li>• When 5 vendors join, everyone gets 15% discount</li>
                    <li>• Delivery cost is split among all members</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-4">
                <Button
                  onClick={() => setShowCreateGroup(false)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                >
                  Done
                </Button>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-blue-200">
            <Button
              variant="ghost"
              onClick={handleCreateGroup}
              className="w-full text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-medium"
            >
              <Icon name="Plus" size={18} className="mr-2" />
              Create New Group Order
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupBuyingSuggestion;