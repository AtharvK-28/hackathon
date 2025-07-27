import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RatingModal = ({ order, isOpen, onClose, onSubmitRating }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [categories, setCategories] = useState({
    quality: 0,
    delivery: 0,
    packaging: 0,
    value: 0
  });

  if (!isOpen || !order) return null;

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleStarHover = (value) => {
    setHoveredRating(value);
  };

  const handleCategoryRating = (category, value) => {
    setCategories(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmit = () => {
    const ratingData = {
      orderId: order.orderId,
      overallRating: rating,
      categoryRatings: categories,
      review: review.trim(),
      submittedAt: new Date().toISOString()
    };
    
    onSubmitRating(ratingData);
    
    // Reset form
    setRating(0);
    setHoveredRating(0);
    setReview('');
    setCategories({
      quality: 0,
      delivery: 0,
      packaging: 0,
      value: 0
    });
    
    onClose();
  };

  const isFormValid = rating > 0;

  const categoryLabels = {
    quality: 'Product Quality',
    delivery: 'Delivery Time',
    packaging: 'Packaging',
    value: 'Value for Money'
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-100 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-card-foreground">Rate Your Order</h2>
            <p className="text-sm text-muted-foreground">{order.orderId} • {order.supplierName}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Overall Rating */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              How was your overall experience?
            </h3>
            
            <div className="flex justify-center space-x-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform duration-200 hover:scale-110"
                >
                  <Icon
                    name="Star"
                    size={32}
                    className={`${
                      star <= (hoveredRating || rating)
                        ? 'text-warning fill-current' :'text-muted-foreground'
                    } transition-colors duration-200`}
                  />
                </button>
              ))}
            </div>
            
            {rating > 0 && (
              <p className="text-sm font-medium text-card-foreground">
                {getRatingText(rating)}
              </p>
            )}
          </div>

          {/* Category Ratings */}
          <div>
            <h4 className="font-medium text-card-foreground mb-4">Rate specific aspects</h4>
            <div className="space-y-4">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-card-foreground">{label}</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleCategoryRating(key, star)}
                        className="p-0.5"
                      >
                        <Icon
                          name="Star"
                          size={16}
                          className={`${
                            star <= categories[key]
                              ? 'text-warning fill-current' :'text-muted-foreground'
                          } transition-colors duration-200`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Written Review */}
          <div>
            <Input
              label="Write a review (optional)"
              type="text"
              placeholder="Share your experience with other vendors..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              description="Help other vendors make informed decisions"
              className="min-h-[80px] resize-none"
            />
          </div>

          {/* Order Summary */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h5 className="font-medium text-card-foreground mb-2">Order Summary</h5>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items</span>
                <span className="text-card-foreground">{order.items.length} items</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="text-card-foreground font-medium">₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivered On</span>
                <span className="text-card-foreground">
                  {new Date(order.deliveredDate || order.orderDate).toLocaleDateString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Skip
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="flex-1"
          >
            <Icon name="Send" size={16} className="mr-2" />
            Submit Rating
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;