import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import QuickStatsCard from './components/QuickStatsCard';
import RevenueChart from './components/RevenueChart';
import InventoryAlerts from './components/InventoryAlerts';
import OrderAggregationTable from './components/OrderAggregationTable';
import DeliveryRouteMap from './components/DeliveryRouteMap';
import NotificationPanel from './components/NotificationPanel';
import QuickActionButton from '../vendor-dashboard/components/QuickActionButton';
import Input from '../../components/ui/Input';

const SupplierDashboard = () => {
  const [revenuePeriod, setRevenuePeriod] = useState('week');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showBulkConfirmModal, setShowBulkConfirmModal] = useState(false);
  const [showRoutePlanningModal, setShowRoutePlanningModal] = useState(false);
  const [showNotificationComposer, setShowNotificationComposer] = useState(false);
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const [showPickupPoint, setShowPickupPoint] = useState(false);
  const [pickupPoints, setPickupPoints] = useState([
    {
      id: 1,
      name: "Dadar Station West",
      location: "Behind the bus stop at Dadar Station West",
      coordinates: "19.0170, 72.8478",
      activeWindow: false,
      windowEndTime: null,
      currentOrders: [],
      totalOrders: 0,
      completedOrders: 0,
      status: "inactive"
    },
    {
      id: 2,
      name: "Bandra Market",
      location: "Near Bandra Station, opposite McDonald's",
      coordinates: "19.0596, 72.8295",
      activeWindow: false,
      windowEndTime: null,
      currentOrders: [],
      totalOrders: 0,
      completedOrders: 0,
      status: "inactive"
    },
    {
      id: 3,
      name: "Andheri Station",
      location: "Andheri Station East, near auto stand",
      coordinates: "19.1197, 72.8464",
      activeWindow: false,
      windowEndTime: null,
      currentOrders: [],
      totalOrders: 0,
      completedOrders: 0,
      status: "inactive"
    }
  ]);
  const [selectedPickupPoint, setSelectedPickupPoint] = useState(null);
  const [pickupOrders, setPickupOrders] = useState([
    {
      id: 64,
      vendorName: "Raju Chaat Wala",
      vendorPhone: "+91 98765 43210",
      pickupNumber: "#64",
      items: [
        { name: "Onions", quantity: "10kg", price: 200 },
        { name: "Potatoes", quantity: "5kg", price: 150 }
      ],
      totalAmount: 350,
      status: "pending",
      qrCode: "PICKUP-64-RAJU-CHAAT",
      location: "Dadar Station West",
      orderTime: "08:30 AM",
      paymentStatus: "PAID"
    },
    {
      id: 65,
      vendorName: "Mumbai Dosa Corner",
      vendorPhone: "+91 98765 43211",
      pickupNumber: "#65",
      items: [
        { name: "Rice", quantity: "15kg", price: 450 },
        { name: "Urad Dal", quantity: "3kg", price: 180 }
      ],
      totalAmount: 630,
      status: "pending",
      qrCode: "PICKUP-65-MUMBAI-DOSA",
      location: "Dadar Station West",
      orderTime: "08:45 AM",
      paymentStatus: "PAID"
    },
    {
      id: 66,
      vendorName: "Spice King",
      vendorPhone: "+91 98765 43212",
      pickupNumber: "#66",
      items: [
        { name: "Red Chilli", quantity: "2kg", price: 400 },
        { name: "Coriander", quantity: "1kg", price: 120 }
      ],
      totalAmount: 520,
      status: "completed",
      qrCode: "PICKUP-66-SPICE-KING",
      location: "Dadar Station West",
      orderTime: "09:00 AM",
      paymentStatus: "PAID"
    }
  ]);
  const [bulkOrderStatuses, setBulkOrderStatuses] = useState({});
  const [inventoryAlerts, setInventoryAlerts] = useState([]);
  const [analyticsTab, setAnalyticsTab] = useState('overview');
  const [showBulkOrderDetails, setShowBulkOrderDetails] = useState(false);
  const [selectedBulkOrder, setSelectedBulkOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Dynamic data state
  const [dynamicQuickStats, setDynamicQuickStats] = useState([
    {
      title: "Today's Orders",
      value: "24",
      change: "+12%",
      changeType: "positive",
      icon: "Package"
    },
    {
      title: "Revenue",
      value: "₹12,450",
      change: "+8%",
      changeType: "positive",
      icon: "TrendingUp"
    },
    {
      title: "Pending Deliveries",
      value: "8",
      change: "-3",
      changeType: "negative",
      icon: "Truck"
    },
    {
      title: "Customer Rating",
      value: "4.8",
      change: "+0.2",
      changeType: "positive",
      icon: "Star"
    }
  ]);
  
  const [dynamicRevenueData, setDynamicRevenueData] = useState({
    week: [
      { day: 'Mon', revenue: 1200 },
      { day: 'Tue', revenue: 1800 },
      { day: 'Wed', revenue: 1500 },
      { day: 'Thu', revenue: 2200 },
      { day: 'Fri', revenue: 1900 },
      { day: 'Sat', revenue: 2400 },
      { day: 'Sun', revenue: 2100 }
    ],
    month: [
      { week: 'Week 1', revenue: 8500 },
      { week: 'Week 2', revenue: 9200 },
      { week: 'Week 3', revenue: 7800 },
      { week: 'Week 4', revenue: 10500 }
    ]
  });
  
  const [dynamicInventoryAlerts, setDynamicInventoryAlerts] = useState([
    {
      id: 1,
      type: 'low_stock',
      productName: 'Fresh Tomatoes',
      message: 'Stock is running low',
      currentStock: 5,
      minimumStock: 10,
      unit: 'kg'
    },
    {
      id: 2,
      type: 'expiring',
      productName: 'Milk',
      message: 'Expires in 2 days',
      currentStock: 8,
      minimumStock: 5,
      unit: 'liters',
      expiryDate: '2024-01-28'
    }
  ]);
  
  const navigate = useNavigate();

  // Essential mock data for other components
  const orderAggregationData = [
    {
      id: 1,
      orderId: '#ORD001',
      customerName: 'Rajesh Kumar',
      items: 3,
      totalAmount: 450,
      routeName: 'Route A',
      estimatedTime: '30 mins',
      status: 'Pending'
    },
    {
      id: 2,
      orderId: '#ORD002',
      customerName: 'Priya Sharma',
      items: 2,
      totalAmount: 320,
      routeName: 'Route B',
      estimatedTime: '45 mins',
      status: 'Confirmed'
    }
  ];

  const deliveryRoutes = [
    {
      id: 1,
      name: 'Route A',
      totalDistance: '12.5 km',
      estimatedTime: '45 mins',
      stops: [
        { id: 1, name: 'Rajesh Kumar' },
        { id: 2, name: 'Amit Patel' },
        { id: 3, name: 'Sneha Singh' }
      ],
      status: 'active'
    },
    {
      id: 2,
      name: 'Route B',
      totalDistance: '18.2 km',
      estimatedTime: '60 mins',
      stops: [
        { id: 4, name: 'Priya Sharma' },
        { id: 5, name: 'Vikram Malhotra' }
      ],
      status: 'planned'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'orders',
      title: 'New Order Received',
      message: 'Order #ORD003 from Priya Sharma',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      read: false,
      priority: 'high',
      actionRequired: true
    },
    {
      id: 2,
      type: 'inventory',
      title: 'Low Stock Alert',
      message: 'Fresh Tomatoes running low',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      priority: 'medium'
    }
  ];

  const bulkOrders = [
    {
      id: 'BULK001',
      customerName: 'Restaurant Chain A',
      items: [
        { name: 'Fresh Tomatoes', quantity: 100, unit: 'kg' },
        { name: 'Onions', quantity: 50, unit: 'kg' },
        { name: 'Potatoes', quantity: 75, unit: 'kg' }
      ],
      totalAmount: 8500,
      status: 'Pending',
      deliveryDate: '2024-01-28',
      priority: 'high'
    },
    {
      id: 'BULK002',
      customerName: 'Hotel B',
      items: [
        { name: 'Milk', quantity: 200, unit: 'liters' },
        { name: 'Cheese', quantity: 25, unit: 'kg' }
      ],
      totalAmount: 12000,
      status: 'Confirmed',
      deliveryDate: '2024-01-29',
      priority: 'medium'
    }
  ];

  const supplierAnalytics = {
    topProducts: [
      { name: 'Fresh Tomatoes', sales: 450, growth: '+15%' },
      { name: 'Onions', sales: 320, growth: '+8%' },
      { name: 'Milk', sales: 280, growth: '+12%' }
    ],
    topCustomers: [
      { name: 'Restaurant Chain A', orders: 25, revenue: 45000 },
      { name: 'Hotel B', orders: 18, revenue: 32000 },
      { name: 'Catering Service C', orders: 15, revenue: 28000 }
    ],
    revenueTrends: {
      daily: 8500,
      weekly: 52000,
      monthly: 185000,
      growth: '+12%'
    },
    profitability: {
      grossProfit: 92500,
      netProfit: 74000,
      profitMargin: 40,
      costOfGoods: 92500,
      operatingExpenses: 18500,
      profitGrowth: '+18%',
      profitByCategory: [
        { category: 'Vegetables', profit: 35000, margin: 45, growth: '+22%' },
        { category: 'Dairy', profit: 28000, margin: 35, growth: '+15%' },
        { category: 'Grains', profit: 20000, margin: 30, growth: '+12%' },
        { category: 'Fruits', profit: 9500, margin: 25, growth: '+8%' }
      ],
      costBreakdown: [
        { item: 'Product Costs', amount: 92500, percentage: 50 },
        { item: 'Delivery Costs', amount: 9250, percentage: 5 },
        { item: 'Storage Costs', amount: 5550, percentage: 3 },
        { item: 'Marketing', amount: 3700, percentage: 2 },
        { item: 'Other Expenses', amount: 3700, percentage: 2 }
      ],
      profitTrends: {
        daily: 3400,
        weekly: 21000,
        monthly: 74000
      }
    }
  };

  // Function to generate realistic random changes
  const generateRealisticChanges = () => {
    // Generate random order changes (between -5 and +15)
    const orderChange = Math.floor(Math.random() * 21) - 5;
    const currentOrders = parseInt(dynamicQuickStats[0].value);
    const newOrders = Math.max(0, currentOrders + orderChange);
    
    // Generate random revenue changes (between -500 and +2000)
    const revenueChange = Math.floor(Math.random() * 2501) - 500;
    const currentRevenue = parseInt(dynamicQuickStats[1].value.replace(/[₹,]/g, ''));
    const newRevenue = Math.max(0, currentRevenue + revenueChange);
    
    // Generate random delivery changes (between -2 and +5)
    const deliveryChange = Math.floor(Math.random() * 8) - 2;
    const currentDeliveries = parseInt(dynamicQuickStats[2].value);
    const newDeliveries = Math.max(0, currentDeliveries + deliveryChange);
    
    // Generate random rating changes (between -0.1 and +0.1)
    const ratingChange = (Math.random() * 0.2 - 0.1).toFixed(1);
    const currentRating = parseFloat(dynamicQuickStats[3].value);
    const newRating = Math.max(0, Math.min(5, currentRating + parseFloat(ratingChange)));
    
    // Update quick stats with realistic changes
    const updatedQuickStats = [
      {
        ...dynamicQuickStats[0],
        value: newOrders.toString(),
        change: orderChange >= 0 ? `+${orderChange}` : orderChange.toString(),
        changeType: orderChange >= 0 ? "positive" : "negative"
      },
      {
        ...dynamicQuickStats[1],
        value: `₹${newRevenue.toLocaleString()}`,
        change: revenueChange >= 0 ? `+${revenueChange.toLocaleString()}` : revenueChange.toLocaleString(),
        changeType: revenueChange >= 0 ? "positive" : "negative"
      },
      {
        ...dynamicQuickStats[2],
        value: newDeliveries.toString(),
        change: deliveryChange >= 0 ? `+${deliveryChange}` : deliveryChange.toString(),
        changeType: deliveryChange >= 0 ? "positive" : "negative"
      },
      {
        ...dynamicQuickStats[3],
        value: newRating.toFixed(1),
        change: ratingChange >= 0 ? `+${ratingChange}` : ratingChange,
        changeType: ratingChange >= 0 ? "positive" : "negative"
      }
    ];
    
    // Update revenue data with small variations
    const updatedRevenueData = {
      week: dynamicRevenueData.week.map(day => ({
        ...day,
        revenue: Math.max(0, day.revenue + Math.floor(Math.random() * 401) - 200)
      })),
      month: dynamicRevenueData.month.map(week => ({
        ...week,
        revenue: Math.max(0, week.revenue + Math.floor(Math.random() * 1001) - 500)
      }))
    };
    
    // Randomly add or remove inventory alerts
    const newInventoryAlerts = [...dynamicInventoryAlerts];
    
    // 30% chance to add a new alert
    if (Math.random() < 0.3) {
      const newAlert = {
        id: Date.now(),
        type: Math.random() < 0.7 ? 'low_stock' : 'expiring',
        productName: ['Onions', 'Potatoes', 'Carrots', 'Spinach', 'Cabbage'][Math.floor(Math.random() * 5)],
        message: Math.random() < 0.7 ? 'Stock is running low' : 'Expires in 3 days',
        currentStock: Math.floor(Math.random() * 10) + 1,
        minimumStock: Math.floor(Math.random() * 15) + 5,
        unit: Math.random() < 0.7 ? 'kg' : 'pieces',
        ...(Math.random() < 0.3 && { expiryDate: '2024-01-30' })
      };
      newInventoryAlerts.push(newAlert);
    }
    
    // 20% chance to remove an alert
    if (newInventoryAlerts.length > 1 && Math.random() < 0.2) {
      newInventoryAlerts.pop();
    }
    
    // Generate random notifications (10% chance)
    const newNotifications = [];
    if (Math.random() < 0.1) {
      const notificationTypes = [
        { type: 'orders', title: 'New Order Received', message: 'Order #ORD' + Math.floor(Math.random() * 1000) + ' from Customer' },
        { type: 'payment', title: 'Payment Received', message: '₹' + (Math.floor(Math.random() * 5000) + 1000) + ' payment received' },
        { type: 'delivery', title: 'Delivery Update', message: 'Order #ORD' + Math.floor(Math.random() * 1000) + ' status updated' }
      ];
      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      newNotifications.push({
        id: Date.now(),
        ...randomNotification,
        timestamp: new Date(),
        read: false,
        priority: Math.random() < 0.3 ? 'high' : 'normal'
      });
    }
    
    return {
      quickStats: updatedQuickStats,
      revenueData: updatedRevenueData,
      inventoryAlerts: newInventoryAlerts,
      notifications: newNotifications
    };
  };

  // Handler functions
  const handleConfirmOrder = (order) => {
    console.log('Confirming order:', order);
    // Update order status in real app
    alert(`Order ${order.orderId} confirmed successfully!`);
  };

  const handleViewRoute = (order) => {
    console.log('Viewing route for order:', order);
    setSelectedRoute(deliveryRoutes.find(route => route.name === order.routeName));
  };

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  const handleOptimizeRoute = (route) => {
    console.log('Optimizing route:', route);
    alert(`Route ${route.name} optimized successfully!`);
  };

  const handleMarkAsRead = (notificationId) => {
    console.log('Marking notification as read:', notificationId);
    // Update notification status in real app
  };

  const handleMarkAllAsRead = () => {
    console.log('Marking all notifications as read');
    // Update all notifications status in real app
  };

  const handleRestockItem = (alert) => {
    console.log('Restocking item:', alert);
    // Open restock modal or form
    alert(`Restock form opened for ${alert.productName}`);
  };

  const handleUpdateStock = (alert) => {
    console.log('Updating stock for:', alert);
    // Open stock update modal
    const newStock = prompt(`Enter new stock quantity for ${alert.productName}:`, alert.currentStock);
    if (newStock !== null) {
      const quantity = parseFloat(newStock);
      if (quantity >= 0) {
        // Update the inventory alerts
        setDynamicInventoryAlerts(prev => prev.map(item => 
          item.id === alert.id 
            ? { ...item, currentStock: quantity }
            : item
        ));
        alert(`Stock updated to ${quantity} ${alert.unit}`);
      }
    }
  };

  // New handler functions for quick actions
  const handleAddProduct = () => {
    setShowAddProductModal(true);
  };

  const handleAnalytics = () => {
    setShowAnalyticsModal(true);
  };

  const handleBulkConfirmOrders = () => {
    setShowBulkConfirmModal(true);
  };

  const handlePlanRoutes = () => {
    setShowRoutePlanningModal(true);
  };

  const handleSendNotifications = () => {
    setShowNotificationComposer(true);
  };

  const handleGenerateReport = () => {
    setShowReportGenerator(true);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setIsLoading(true);
    
    // Generate realistic changes
    const changes = generateRealisticChanges();
    
    // Mock refresh delay with realistic updates
    setTimeout(() => {
      setDynamicQuickStats(changes.quickStats);
      setDynamicRevenueData(changes.revenueData);
      setDynamicInventoryAlerts(changes.inventoryAlerts);
      
      // Add new notifications if any
      if (changes.notifications.length > 0) {
        // In a real app, you'd add these to the notifications state
        console.log('New notifications:', changes.notifications);
      }
      
      setIsRefreshing(false);
      setIsLoading(false);
    }, 1500);
  };

  const handleBulkOrderProcess = (bulkOrder) => {
    console.log('Processing bulk order:', bulkOrder);
    setIsLoading(true);
    // Simulate processing delay
    setTimeout(() => {
      // Update the bulk order status
      setBulkOrderStatuses(prev => ({
        ...prev,
        [bulkOrder.id]: 'Confirmed'
      }));
      setIsLoading(false);
      alert(`Bulk order ${bulkOrder.id} processed successfully!`);
    }, 1000);
  };

  const handleInventoryOptimization = () => {
    console.log('Running inventory optimization');
    alert('Inventory optimization completed! Recommended restock quantities updated.');
  };

  const handleSupplierAnalytics = () => {
    console.log('Opening detailed supplier analytics');
    alert('Opening comprehensive supplier analytics dashboard...');
  };

  const getBulkOrderStatus = (order) => {
    return bulkOrderStatuses[order.id] || order.status;
  };

  // PickupPoint Functions
  const startPickupWindow = (pickupPoint) => {
    const updatedPickupPoints = pickupPoints.map(point => {
      if (point.id === pickupPoint.id) {
        const windowEndTime = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
        const locationOrders = pickupOrders.filter(order => order.location === point.name && order.status === "pending");
        
        return {
          ...point,
          activeWindow: true,
          windowEndTime: windowEndTime,
          status: "active",
          currentOrders: locationOrders,
          totalOrders: pickupOrders.filter(order => order.location === point.name).length,
          completedOrders: 0
        };
      }
      return point;
    });
    
    setPickupPoints(updatedPickupPoints);
    setSelectedPickupPoint(pickupPoint);
    setShowPickupPoint(true);
    
    // Simulate vendor notifications with realistic details
    const locationOrders = pickupOrders.filter(order => order.location === pickupPoint.name && order.status === "pending");
    const vendorCount = locationOrders.length;
    
    setTimeout(() => {
      alert(`🚚 GADI AAYI! 
      
Pickup window started at ${pickupPoint.name}
📍 Location: ${pickupPoint.location}
⏰ Window: 30 minutes
📱 ${vendorCount} vendors notified
🔔 Unique notification sound played
📋 QR codes sent to vendors

Vendors will receive:
"GADI AAYI! 🚚 Your pickup is ready at ${pickupPoint.name}. Window closes in 30 minutes. Show QR code to driver."`);
    }, 1000);
  };

  const endPickupWindow = (pickupPoint) => {
    const updatedPickupPoints = pickupPoints.map(point => {
      if (point.id === pickupPoint.id) {
        return {
          ...point,
          activeWindow: false,
          windowEndTime: null,
          status: "completed"
        };
      }
      return point;
    });
    
    setPickupPoints(updatedPickupPoints);
    setShowPickupPoint(false);
    setSelectedPickupPoint(null);
    
    alert(`✅ Pickup window ended at ${pickupPoint.name}. Moving to next location.`);
  };

  const scanQRCode = (qrCode) => {
    const order = pickupOrders.find(order => order.qrCode === qrCode);
    if (order) {
      // Update order status
      const updatedOrders = pickupOrders.map(o => 
        o.id === order.id ? { ...o, status: "completed" } : o
      );
      setPickupOrders(updatedOrders);
      
      // Update pickup point stats
      const updatedPickupPoints = pickupPoints.map(point => {
        if (point.id === selectedPickupPoint.id) {
          return {
            ...point,
            completedOrders: point.completedOrders + 1
          };
        }
        return point;
      });
      setPickupPoints(updatedPickupPoints);
      
      alert(`✅ Order ${order.pickupNumber} completed for ${order.vendorName}!`);
    } else {
      alert("❌ Invalid QR Code. Please try again.");
    }
  };

  const getTimeRemaining = (endTime) => {
    if (!endTime) return "00:00";
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) return "00:00";
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Timer effect for pickup windows
  useEffect(() => {
    const timer = setInterval(() => {
      setPickupPoints(prev => prev.map(point => {
        if (point.activeWindow && point.windowEndTime) {
          const now = new Date();
          const end = new Date(point.windowEndTime);
          if (now >= end) {
            // Auto-end window when time expires
            return {
              ...point,
              activeWindow: false,
              windowEndTime: null,
              status: "completed"
            };
          }
        }
        return point;
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container-responsive py-6">
        {/* Page Header */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">Supplier Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your inventory, orders, and delivery routes
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleRefresh} disabled={isLoading || isRefreshing}>
                <Icon name={isLoading || isRefreshing ? "Loader" : "Refresh"} size={16} className="mr-2" />
                {isLoading || isRefreshing ? "Refreshing..." : "Refresh Data"}
              </Button>
              <Button variant="outline" onClick={handleAddProduct}>
                <Icon name="Plus" size={16} className="mr-2" />
                Add Product
              </Button>
              <Button onClick={handleAnalytics}>
                <Icon name="BarChart3" size={16} className="mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {dynamicQuickStats.map((stat, index) => (
            <QuickStatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Revenue Overview */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Revenue Overview</h3>
            <Button variant="outline" size="sm" onClick={handleSupplierAnalytics}>
              <Icon name="BarChart3" size={16} className="mr-2" />
              View Analytics
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Daily Revenue</p>
              <p className="text-2xl font-bold text-card-foreground">₹{supplierAnalytics.revenueTrends.daily.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Weekly Revenue</p>
              <p className="text-2xl font-bold text-card-foreground">₹{supplierAnalytics.revenueTrends.weekly.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <p className="text-2xl font-bold text-card-foreground">₹{supplierAnalytics.revenueTrends.monthly.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Growth</p>
              <p className="text-2xl font-bold text-success">{supplierAnalytics.revenueTrends.growth}</p>
            </div>
          </div>
        </div>

        {/* Bulk Orders Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-card-foreground">Bulk Orders</h3>
            <Button variant="outline" size="sm" onClick={handleInventoryOptimization}>
              <Icon name="Zap" size={16} className="mr-2" />
              Optimize Inventory
            </Button>
          </div>
          <div className="space-y-4">
            {bulkOrders.map((order) => (
              <div key={order.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-card-foreground">{order.customerName}</h4>
                    <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-card-foreground">₹{order.totalAmount.toLocaleString()}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      getBulkOrderStatus(order) === 'Pending' ? 'text-warning bg-warning/10' : 'text-primary bg-primary/10'
                    }`}>
                      {getBulkOrderStatus(order)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Items:</p>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm text-card-foreground">
                          {item.name} - {item.quantity} {item.unit}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery Date: {order.deliveryDate}</p>
                    <p className="text-sm text-muted-foreground">Priority: {order.priority}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {getBulkOrderStatus(order) === 'Pending' && (
                    <Button size="sm" onClick={() => handleBulkOrderProcess(order)} disabled={isLoading}>
                      <Icon name="Check" size={14} className="mr-1" />
                      {isLoading ? "Processing..." : "Process Order"}
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedBulkOrder(order);
                    setShowBulkOrderDetails(true);
                  }}>
                    <Icon name="Eye" size={14} className="mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {/* Left Sidebar - Revenue Chart and Inventory Alerts */}
          <div className="lg:col-span-1 space-y-4">
            <RevenueChart 
              data={dynamicRevenueData[revenuePeriod]}
              period={revenuePeriod}
              onPeriodChange={setRevenuePeriod}
            />
            <InventoryAlerts
              alerts={dynamicInventoryAlerts}
              onRestock={handleRestockItem}
              onUpdateStock={handleUpdateStock}
            />
          </div>

          {/* Central Area - Order Aggregation and Route Map */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-[400px]">
              <OrderAggregationTable 
                orders={orderAggregationData}
                onConfirmOrder={handleConfirmOrder}
                onViewRoute={handleViewRoute}
              />
            </div>
            <div className="h-[300px]">
              <DeliveryRouteMap 
                routes={deliveryRoutes}
                selectedRoute={selectedRoute}
                onRouteSelect={handleRouteSelect}
                onOptimizeRoute={handleOptimizeRoute}
              />
            </div>
          </div>

          {/* Right Panel - Notifications */}
          <div className="lg:col-span-1">
            <NotificationPanel 
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />
          </div>
        </div>

        {/* Top Products & Customers - Fixed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Top Products</h3>
              <Button variant="ghost" size="sm">
                <Icon name="BarChart3" size={16} className="mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {supplierAnalytics.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-card-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                  </div>
                  <span className="text-success font-medium">{product.growth}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Top Customers</h3>
              <Button variant="ghost" size="sm">
                <Icon name="Users" size={16} className="mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {supplierAnalytics.topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-card-foreground">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                  </div>
                  <span className="font-medium text-card-foreground">₹{customer.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <QuickActionButton
            title="Add Product"
            subtitle="Create new product listing"
            icon="Plus"
            onClick={() => setShowAddProductModal(true)}
            theme="primary"
          />
          <QuickActionButton
            title="Analytics"
            subtitle="View business insights"
            icon="BarChart3"
            onClick={() => setShowAnalyticsModal(true)}
            theme="secondary"
          />
          <QuickActionButton
            title="PickupPoint"
            subtitle="Manage delivery windows"
            icon="Truck"
            onClick={() => setShowPickupPoint(true)}
            theme="success"
          />
          <QuickActionButton
            title="Bulk Confirm"
            subtitle="Confirm multiple orders"
            icon="CheckSquare"
            onClick={() => setShowBulkConfirmModal(true)}
            theme="warning"
          />
          <QuickActionButton
            title="Route Planning"
            subtitle="Optimize delivery routes"
            icon="Map"
            onClick={() => setShowRoutePlanningModal(true)}
            theme="info"
          />
          <QuickActionButton
            title="Notifications"
            subtitle="Send vendor alerts"
            icon="Bell"
            onClick={() => setShowNotificationComposer(true)}
            theme="danger"
          />
        </div>

        {/* Quick Actions Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <QuickActionButton
            title="Add Product"
            subtitle="List new items"
            icon="Plus"
            onClick={() => setShowAddProductModal(true)}
            color="text-blue-600"
            bgColor="bg-blue-100"
          />
          <QuickActionButton
            title="Analytics"
            subtitle="View business insights"
            icon="BarChart3"
            onClick={() => setShowAnalyticsModal(true)}
            color="text-green-600"
            bgColor="bg-green-100"
          />
          <QuickActionButton
            title="PickupPoint"
            subtitle="Virtual loading bay"
            icon="Truck"
            onClick={() => setShowPickupPoint(true)}
            color="text-orange-600"
            bgColor="bg-orange-100"
          />
          <QuickActionButton
            title="Virasaat"
            subtitle="License your recipes"
            icon="Crown"
            to="/virasaat"
            color="text-purple-600"
            bgColor="bg-purple-100"
          />
        </div>
      </div>

      {/* Analytics Modal */}
      {showAnalyticsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-100 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-7xl max-h-[95vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-card-foreground">Business Analytics Dashboard</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAnalyticsModal(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              {/* Analytics Navigation */}
              <div className="flex space-x-2 mb-6 border-b border-border overflow-x-auto">
                <button 
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    analyticsTab === 'overview' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-muted-foreground hover:text-card-foreground'
                  }`}
                  onClick={() => setAnalyticsTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    analyticsTab === 'sales' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-muted-foreground hover:text-card-foreground'
                  }`}
                  onClick={() => setAnalyticsTab('sales')}
                >
                  Sales Analytics
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    analyticsTab === 'profitability' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-muted-foreground hover:text-card-foreground'
                  }`}
                  onClick={() => setAnalyticsTab('profitability')}
                >
                  Profitability
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    analyticsTab === 'customers' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-muted-foreground hover:text-card-foreground'
                  }`}
                  onClick={() => setAnalyticsTab('customers')}
                >
                  Customer Insights
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    analyticsTab === 'inventory' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-muted-foreground hover:text-card-foreground'
                  }`}
                  onClick={() => setAnalyticsTab('inventory')}
                >
                  Inventory Analytics
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                    analyticsTab === 'performance' 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-muted-foreground hover:text-card-foreground'
                  }`}
                  onClick={() => setAnalyticsTab('performance')}
                >
                  Performance Metrics
                </button>
              </div>

              {/* Analytics Content */}
              {analyticsTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Revenue Chart */}
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Revenue Trends</h4>
                    <div className="h-64 bg-card rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <p className="text-2xl font-bold text-card-foreground">₹{supplierAnalytics.revenueTrends.monthly.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Total Revenue (This Month)</p>
                        </div>
                        <div className="text-right">
                          <p className="text-success font-semibold">{supplierAnalytics.revenueTrends.growth}</p>
                          <p className="text-xs text-muted-foreground">vs last month</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {dynamicRevenueData.week.map((day, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <span className="text-xs text-muted-foreground w-8">{day.day}</span>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{width: `${(day.revenue / 2400) * 100}%`}}
                              ></div>
                            </div>
                            <span className="text-xs font-medium w-12">₹{day.revenue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Profitability Overview */}
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Profitability Overview</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                        <div>
                          <p className="font-medium">Gross Profit</p>
                          <p className="text-sm text-muted-foreground">This month</p>
                        </div>
                        <span className="text-2xl font-bold text-success">₹{supplierAnalytics.profitability.grossProfit.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                        <div>
                          <p className="font-medium">Net Profit Margin</p>
                          <p className="text-sm text-muted-foreground">Profit percentage</p>
                        </div>
                        <span className="text-2xl font-bold text-primary">{supplierAnalytics.profitability.profitMargin}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                        <div>
                          <p className="font-medium">Profit Growth</p>
                          <p className="text-sm text-muted-foreground">vs last month</p>
                        </div>
                        <span className="text-2xl font-bold text-success">{supplierAnalytics.profitability.profitGrowth}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sales by Category */}
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Sales by Category</h4>
                    <div className="space-y-4">
                      {supplierAnalytics.profitability.profitByCategory.map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{category.category}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: `${category.margin}%`}}></div>
                            </div>
                            <span className="text-sm font-medium">{category.margin}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Analytics */}
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Customer Analytics</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                        <div>
                          <p className="font-medium">New Customers</p>
                          <p className="text-sm text-muted-foreground">This month</p>
                        </div>
                        <span className="text-2xl font-bold text-success">+24</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                        <div>
                          <p className="font-medium">Repeat Orders</p>
                          <p className="text-sm text-muted-foreground">Customer retention</p>
                        </div>
                        <span className="text-2xl font-bold text-primary">68%</span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Performance Metrics</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Order Fulfillment Rate</span>
                        <span className="font-semibold text-success">98.5%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Average Delivery Time</span>
                        <span className="font-semibold text-primary">2.3 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Customer Satisfaction</span>
                        <span className="font-semibold text-success">4.8/5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Inventory Turnover</span>
                        <span className="font-semibold text-warning">12.5 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {analyticsTab === 'sales' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-card-foreground">₹{supplierAnalytics.revenueTrends.daily.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Daily Sales</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-card-foreground">156</p>
                      <p className="text-sm text-muted-foreground">Orders Today</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-success">{supplierAnalytics.revenueTrends.growth}</p>
                      <p className="text-sm text-muted-foreground">Growth Rate</p>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Sales Performance by Product</h4>
                    <div className="space-y-3">
                      {supplierAnalytics.topProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                          </div>
                          <span className="text-success font-medium">{product.growth}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Revenue vs Profit Comparison</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                          <span>Total Revenue</span>
                          <span className="font-semibold text-primary">₹{supplierAnalytics.revenueTrends.monthly.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                          <span>Gross Profit</span>
                          <span className="font-semibold text-success">₹{supplierAnalytics.profitability.grossProfit.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                          <span>Net Profit</span>
                          <span className="font-semibold text-success">₹{supplierAnalytics.profitability.netProfit.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                          <span>Profit Margin</span>
                          <span className="font-semibold text-primary">{supplierAnalytics.profitability.profitMargin}%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                          <span>Cost of Goods</span>
                          <span className="font-semibold text-warning">₹{supplierAnalytics.profitability.costOfGoods.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-card rounded-lg">
                          <span>Operating Expenses</span>
                          <span className="font-semibold text-warning">₹{supplierAnalytics.profitability.operatingExpenses.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {analyticsTab === 'profitability' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-card-foreground">₹{supplierAnalytics.profitability.grossProfit.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Gross Profit</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-card-foreground">₹{supplierAnalytics.profitability.netProfit.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Net Profit</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-success">{supplierAnalytics.profitability.profitGrowth}</p>
                      <p className="text-sm text-muted-foreground">Profit Growth Rate</p>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Profitability by Category</h4>
                    <div className="space-y-3">
                      {supplierAnalytics.profitability.profitByCategory.map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{category.category}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: `${category.margin}%`}}></div>
                            </div>
                            <span className="text-sm font-medium">{category.margin}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Cost Breakdown</h4>
                    <div className="space-y-3">
                      {supplierAnalytics.profitability.costBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{item.item}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{width: `${item.percentage}%`}}></div>
                            </div>
                            <span className="text-sm font-medium">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Profit Trends</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Daily Profit</span>
                        <span className="font-semibold text-success">₹{supplierAnalytics.profitability.profitTrends.daily.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Weekly Profit</span>
                        <span className="font-semibold text-success">₹{supplierAnalytics.profitability.profitTrends.weekly.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Monthly Profit</span>
                        <span className="font-semibold text-success">₹{supplierAnalytics.profitability.profitTrends.monthly.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {analyticsTab === 'customers' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-muted/30 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Top Customers</h4>
                      <div className="space-y-3">
                        {supplierAnalytics.topCustomers.map((customer, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg">
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">{customer.orders} orders</p>
                            </div>
                            <span className="font-medium text-card-foreground">₹{customer.revenue.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-muted/30 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Customer Demographics</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Restaurants</span>
                          <span className="font-semibold">45%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Hotels</span>
                          <span className="font-semibold">30%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Retail Stores</span>
                          <span className="font-semibold">15%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Others</span>
                          <span className="font-semibold">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {analyticsTab === 'inventory' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-card-foreground">156</p>
                      <p className="text-sm text-muted-foreground">Total Products</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-warning">{dynamicInventoryAlerts.length}</p>
                      <p className="text-sm text-muted-foreground">Low Stock Items</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-success">12.5</p>
                      <p className="text-sm text-muted-foreground">Avg Turnover (Days)</p>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Inventory Status</h4>
                    <div className="space-y-3">
                      {dynamicInventoryAlerts.map((alert, index) => (
                        <div key={alert.id} className="flex items-center justify-between p-3 bg-card rounded-lg">
                          <span>{alert.productName}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  alert.type === 'low_stock' ? 'bg-warning' : 'bg-danger'
                                }`}
                                style={{width: `${(alert.currentStock / alert.minimumStock) * 100}%`}}
                              ></div>
                            </div>
                            <span className="text-sm">{alert.currentStock}/{alert.minimumStock} {alert.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Inventory Health Score</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Stock Availability</span>
                        <span className="font-semibold text-success">92%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Expiry Risk</span>
                        <span className="font-semibold text-warning">8%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Overstock Items</span>
                        <span className="font-semibold text-primary">15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {analyticsTab === 'performance' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-muted/30 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Delivery Performance</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>On-time Delivery</span>
                          <span className="font-semibold text-success">98.5%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Average Delivery Time</span>
                          <span className="font-semibold text-primary">2.3 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Route Efficiency</span>
                          <span className="font-semibold text-success">94.2%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted/30 p-6 rounded-lg">
                      <h4 className="font-semibold mb-4">Customer Satisfaction</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Overall Rating</span>
                          <span className="font-semibold text-success">4.8/5</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Response Time</span>
                          <span className="font-semibold text-primary">15 mins</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Issue Resolution</span>
                          <span className="font-semibold text-success">96%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6 pt-6 border-t border-border">
                <Button variant="outline">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Report
                </Button>
                <Button variant="outline">
                  <Icon name="Share" size={16} className="mr-2" />
                  Share Dashboard
                </Button>
                <Button onClick={() => setShowAnalyticsModal(false)} className="ml-auto">
                  Close Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-100 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">Add New Product</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddProductModal(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Product Name</label>
                  <input type="text" className="w-full p-2 border border-border rounded-md" placeholder="Enter product name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Category</label>
                  <select className="w-full p-2 border border-border rounded-md">
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Dairy</option>
                    <option>Grains</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Price per Unit</label>
                  <input type="number" className="w-full p-2 border border-border rounded-md" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Initial Stock</label>
                  <input type="number" className="w-full p-2 border border-border rounded-md" placeholder="0" />
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button variant="outline" onClick={() => setShowAddProductModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => {
                  alert('Product added successfully!');
                  setShowAddProductModal(false);
                }} className="flex-1">
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Confirm Orders Modal */}
      {showBulkConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-100 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">Bulk Confirm Orders</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowBulkConfirmModal(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="space-y-3">
                {orderAggregationData.filter(order => order.status === 'Pending').map(order => (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">{order.orderId}</p>
                      <p className="text-sm text-muted-foreground">{order.customerName}</p>
                    </div>
                    <Button size="sm" onClick={() => handleConfirmOrder(order)}>
                      Confirm
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button onClick={() => setShowBulkConfirmModal(false)} className="w-full">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Route Planning Modal */}
      {showRoutePlanningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-100 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">Route Planning</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowRoutePlanningModal(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">Route Name</label>
                    <input type="text" className="w-full p-2 border border-border rounded-md" placeholder="Route A" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-card-foreground mb-2">Vehicle Type</label>
                    <select className="w-full p-2 border border-border rounded-md">
                      <option>Two Wheeler</option>
                      <option>Three Wheeler</option>
                      <option>Four Wheeler</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Delivery Stops</label>
                  <div className="space-y-2">
                    {orderAggregationData.map(order => (
                      <div key={order.id} className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">{order.customerName} - {order.orderId}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button variant="outline" onClick={() => setShowRoutePlanningModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => {
                  alert('Route planned successfully!');
                  setShowRoutePlanningModal(false);
                }} className="flex-1">
                  Plan Route
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Composer Modal */}
      {showNotificationComposer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-100 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">Send Notification</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowNotificationComposer(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Recipients</label>
                  <select className="w-full p-2 border border-border rounded-md">
                    <option>All Customers</option>
                    <option>Recent Orders</option>
                    <option>Specific Customers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Subject</label>
                  <input type="text" className="w-full p-2 border border-border rounded-md" placeholder="Notification subject" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Message</label>
                  <textarea className="w-full p-2 border border-border rounded-md h-24" placeholder="Enter your message"></textarea>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button variant="outline" onClick={() => setShowNotificationComposer(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => {
                  alert('Notification sent successfully!');
                  setShowNotificationComposer(false);
                }} className="flex-1">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Generator Modal */}
      {showReportGenerator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-100 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">Generate Report</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowReportGenerator(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Report Type</label>
                  <select className="w-full p-2 border border-border rounded-md">
                    <option>Sales Report</option>
                    <option>Inventory Report</option>
                    <option>Customer Report</option>
                    <option>Financial Report</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Date Range</label>
                  <select className="w-full p-2 border border-border rounded-md">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">Format</label>
                  <select className="w-full p-2 border border-border rounded-md">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button variant="outline" onClick={() => setShowReportGenerator(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => {
                  alert('Report generated and downloaded successfully!');
                  setShowReportGenerator(false);
                }} className="flex-1">
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Order Details Modal */}
      {showBulkOrderDetails && selectedBulkOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-100 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">Bulk Order Details</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowBulkOrderDetails(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-card-foreground">Order ID:</p>
                    <p className="text-sm text-muted-foreground">{selectedBulkOrder.id}</p>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Customer:</p>
                    <p className="text-sm text-muted-foreground">{selectedBulkOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Total Amount:</p>
                    <p className="text-sm text-muted-foreground">₹{selectedBulkOrder.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Status:</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedBulkOrder.status === 'Pending' ? 'text-warning bg-warning/10' : 'text-primary bg-primary/10'
                    }`}>
                      {selectedBulkOrder.status}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Delivery Date:</p>
                    <p className="text-sm text-muted-foreground">{selectedBulkOrder.deliveryDate}</p>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Priority:</p>
                    <p className="text-sm text-muted-foreground">{selectedBulkOrder.priority}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-card-foreground">Items:</p>
                    <div className="space-y-2">
                      {selectedBulkOrder.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <p className="text-sm text-card-foreground">{item.name} - {item.quantity} {item.unit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <Button variant="outline" onClick={() => setShowBulkOrderDetails(false)} className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PickupPoint Modal */}
      {showPickupPoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground">🚚 PickupPoint: Virtual Loading Bay</h2>
                  <p className="text-muted-foreground mt-1">Manage coordinated pickup windows for efficient deliveries</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowPickupPoint(false)}>
                  <Icon name="X" size={24} />
                </Button>
              </div>
            </div>

            {/* Pickup Points List */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {pickupPoints.map((point) => (
                  <div key={point.id} className="bg-muted rounded-lg p-4 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-card-foreground">{point.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        point.status === 'active' ? 'bg-green-100 text-green-800' :
                        point.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {point.status === 'active' ? '🟢 Active' :
                         point.status === 'completed' ? '🔵 Completed' : '⚪ Inactive'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{point.location}</p>
                    <p className="text-xs text-muted-foreground mb-3">Coordinates: {point.coordinates}</p>
                    
                    {point.activeWindow && (
                      <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm font-medium text-yellow-800">
                          ⏰ Window closes in: {getTimeRemaining(point.windowEndTime)}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span>Orders: {point.totalOrders}</span>
                      <span>Completed: {point.completedOrders}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      {!point.activeWindow && point.status !== 'completed' && (
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => startPickupWindow(point)}
                        >
                          <Icon name="Play" size={14} className="mr-1" />
                          Start Window
                        </Button>
                      )}
                      {point.activeWindow && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="flex-1"
                          onClick={() => endPickupWindow(point)}
                        >
                          <Icon name="Square" size={14} className="mr-1" />
                          End Window
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedPickupPoint(point)}
                      >
                        <Icon name="Eye" size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Active Pickup Point Details */}
              {selectedPickupPoint && (
                <div className="bg-muted rounded-lg p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-card-foreground">
                      🚚 {selectedPickupPoint.name} - Active Pickup Window
                    </h3>
                    {selectedPickupPoint.activeWindow && (
                      <div className="text-2xl font-bold text-red-600">
                        ⏰ {getTimeRemaining(selectedPickupPoint.windowEndTime)}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-card rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedPickupPoint.totalOrders}</div>
                      <div className="text-sm text-muted-foreground">Total Orders</div>
                    </div>
                    <div className="bg-card rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedPickupPoint.completedOrders}</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                    <div className="bg-card rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {selectedPickupPoint.totalOrders - selectedPickupPoint.completedOrders}
                      </div>
                      <div className="text-sm text-muted-foreground">Pending</div>
                    </div>
                  </div>

                  {/* QR Code Scanner Simulation */}
                  <div className="bg-card rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-card-foreground mb-3">📱 QR Code Scanner</h4>
                    <div className="flex items-center space-x-3 mb-3">
                      <Input 
                        placeholder="Enter QR Code (e.g., PICKUP-64-RAJU-CHAAT)"
                        className="flex-1"
                        id="qrInput"
                      />
                      <Button onClick={() => {
                        const qrCode = document.getElementById('qrInput').value;
                        if (qrCode) {
                          scanQRCode(qrCode);
                          document.getElementById('qrInput').value = '';
                        }
                      }}>
                        <Icon name="Scan" size={16} className="mr-1" />
                        Scan
                      </Button>
                    </div>
                    
                    {/* Demo QR Codes for Testing */}
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-2">💡 Demo QR Codes (click to test):</p>
                      <div className="flex flex-wrap gap-2">
                        {pickupOrders
                          .filter(order => order.location === selectedPickupPoint.name && order.status === "pending")
                          .map((order) => (
                            <button
                              key={order.id}
                              onClick={() => {
                                document.getElementById('qrInput').value = order.qrCode;
                                scanQRCode(order.qrCode);
                              }}
                              className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90 transition-colors"
                            >
                              {order.pickupNumber} - {order.vendorName}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Orders List */}
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-3">📋 Orders for Pickup</h4>
                    <div className="space-y-3">
                      {pickupOrders
                        .filter(order => order.location === selectedPickupPoint.name)
                        .map((order) => (
                          <div key={order.id} className="bg-card rounded-lg p-4 border border-border">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <span className="text-lg font-bold text-primary">{order.pickupNumber}</span>
                                <span className="font-semibold text-card-foreground">{order.vendorName}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
                                </span>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-card-foreground">₹{order.totalAmount}</div>
                                <div className="text-xs text-muted-foreground">{order.paymentStatus}</div>
                              </div>
                            </div>
                            
                            <div className="mb-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="text-sm text-muted-foreground">
                                  • {item.quantity} {item.name} - ₹{item.price}
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Ordered: {order.orderTime}</span>
                              <span>QR: {order.qrCode}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierDashboard;