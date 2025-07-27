import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const QRCodeScanner = ({ isOpen, onClose, onScanSuccess, orderData = null }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Mock order data for demonstration
  const mockOrderData = orderData || {
    orderId: '#1234',
    vendorName: 'Street Food Corner',
    items: ['2kg Tomatoes', '1kg Onions', '0.5kg Green Chilies'],
    totalAmount: 125,
    deliveryAddress: 'Sector 14, Gurgaon'
  };

  useEffect(() => {
    if (isOpen) {
      requestCameraPermission();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      setHasPermission(true);
      setError('');
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      setHasPermission(false);
      setError('Camera access denied. Please enable camera permissions to scan QR codes.');
      console.error('Camera access error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setError('');
    setScanResult(null);
    
    // Mock QR code scanning - in real implementation, use a QR code library
    setTimeout(() => {
      const mockQRData = {
        orderId: mockOrderData.orderId,
        deliveryCode: 'DEL123456',
        timestamp: new Date().toISOString()
      };
      
      setScanResult(mockQRData);
      setIsScanning(false);
    }, 3000);
  };

  const confirmDelivery = () => {
    if (onScanSuccess) {
      onScanSuccess(scanResult);
    }
    handleClose();
  };

  const handleClose = () => {
    stopCamera();
    setIsScanning(false);
    setScanResult(null);
    setError('');
    onClose();
  };

  const handleManualEntry = () => {
    // Mock manual entry success
    const mockManualData = {
      orderId: mockOrderData.orderId,
      deliveryCode: 'MANUAL123',
      timestamp: new Date().toISOString(),
      method: 'manual'
    };
    
    if (onScanSuccess) {
      onScanSuccess(mockManualData);
    }
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-100 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold text-card-foreground">Scan QR Code</h3>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Order Info */}
        <div className="p-4 bg-muted/30 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} color="white" />
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">
                Order {mockOrderData.orderId}
              </p>
              <p className="text-xs text-muted-foreground">
                {mockOrderData.vendorName}
              </p>
            </div>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            <p>{mockOrderData.items.join(', ')}</p>
            <p className="mt-1">Total: ₹{mockOrderData.totalAmount}</p>
          </div>
        </div>

        {/* Scanner Content */}
        <div className="p-4">
          {hasPermission === false ? (
            <div className="text-center py-8">
              <Icon name="Camera" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-error mb-4">{error}</p>
              <Button onClick={requestCameraPermission} variant="outline">
                <Icon name="Camera" size={16} className="mr-2" />
                Enable Camera
              </Button>
            </div>
          ) : hasPermission === null ? (
            <div className="text-center py-8">
              <Icon name="Loader2" size={48} className="text-muted-foreground mx-auto mb-4 animate-spin" />
              <p className="text-sm text-muted-foreground">Requesting camera access...</p>
            </div>
          ) : scanResult ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} color="white" />
              </div>
              <h4 className="text-lg font-semibold text-card-foreground mb-2">QR Code Scanned!</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Delivery code: {scanResult.deliveryCode}
              </p>
              <div className="space-y-2">
                <Button onClick={confirmDelivery} className="w-full">
                  Confirm Delivery
                </Button>
                <Button variant="outline" onClick={() => setScanResult(null)} className="w-full">
                  Scan Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Camera View */}
              <div className="relative bg-black rounded-lg overflow-hidden aspect-square">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Scanning Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 border-2 border-white rounded-lg relative">
                      {/* Corner indicators */}
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
                      
                      {/* Scanning line */}
                      {isScanning && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse" 
                             style={{ 
                               animation: 'scan 2s linear infinite',
                               background: 'linear-gradient(90deg, transparent, #2D5A27, transparent)'
                             }} 
                        />
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Instructions */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white text-sm bg-black bg-opacity-50 rounded-md px-3 py-2">
                    {isScanning ? 'Scanning...' : 'Position QR code within the frame'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  onClick={startScanning} 
                  disabled={isScanning}
                  className="w-full"
                >
                  {isScanning ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Icon name="Scan" size={16} className="mr-2" />
                      Start Scanning
                    </>
                  )}
                </Button>
                
                <Button variant="outline" onClick={handleManualEntry} className="w-full">
                  <Icon name="Edit" size={16} className="mr-2" />
                  Enter Code Manually
                </Button>
              </div>

              {/* Help Text */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Ask the vendor to show their delivery QR code
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: calc(100% - 4px); }
          100% { top: 0; }
        }
      `}</style>
    </div>
  );
};

export default QRCodeScanner;