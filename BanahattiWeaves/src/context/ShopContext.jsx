import React, { createContext, useContext, useState } from 'react';
import { productsData } from '../data/productsData';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products] = useState(productsData);
  const [cart, setCart] = useState([
    {
      product: productsData[0],
      quantity: 1,
      blouseStitching: false,
      stitchingSize: 'Unstitched'
    }
  ]);
  const [wishlist, setWishlist] = useState(['saree-02', 'saree-04']);
  const [currency, setCurrency] = useState('INR'); // 'INR' or 'USD'
  const [exchangeRate] = useState(0.012);
  
  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedFabric, setSelectedFabric] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState(15000);
  const [sortBy, setSortBy] = useState('featured');
  
  // Orders History
  const [orders, setOrders] = useState([
    {
      id: 'BH-ORD-2026-9482',
      date: '2026-09-10',
      items: [
        { product: productsData[0], quantity: 1, blouseStitching: true, price: 4749 },
        { product: productsData[3], quantity: 1, blouseStitching: false, price: 5900 }
      ],
      totalAmount: 10649,
      status: 'DISPATCHED',
      trackingId: 'EK-IN-849201948',
      estimatedDelivery: '2026-09-18',
      shippingAddress: {
        name: 'Kartik Gowda',
        phone: '+91 98765 43210',
        address: 'House #42, Heritage Enclave, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038'
      }
    }
  ]);

  const [toastMessage, setToastMessage] = useState(null);
  const [appliedCoupon, setAppliedCoupon] = useState({ code: 'HANDLOOM10', discountPercent: 10 });
  const [quickAddProduct, setQuickAddProduct] = useState(null);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);

  const freeShippingThreshold = 3000;

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const formatPrice = (priceINR) => {
    if (currency === 'USD') {
      const usdVal = Math.round(priceINR * exchangeRate);
      return `$${usdVal}`;
    }
    return `₹${priceINR.toLocaleString('en-IN')}`;
  };

  const addToCart = (product, quantity = 1, options = {}) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        if (options.blouseStitching !== undefined) {
          updated[existingIndex].blouseStitching = options.blouseStitching;
        }
        if (options.stitchingSize) {
          updated[existingIndex].stitchingSize = options.stitchingSize;
        }
        return updated;
      } else {
        return [...prevCart, {
          product,
          quantity,
          blouseStitching: options.blouseStitching || false,
          stitchingSize: options.stitchingSize || 'Unstitched'
        }];
      }
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const updateCartQty = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const toggleBlouseStitching = (productId) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        return { ...item, blouseStitching: !item.blouseStitching };
      }
      return item;
    }));
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist!');
        return [...prev, productId];
      }
    });
  };

  const applyCouponCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'HANDLOOM10') {
      setAppliedCoupon({ code: 'HANDLOOM10', discountPercent: 10 });
      showToast('🎉 10% Handloom Heritage Discount Applied!');
      return true;
    } else if (cleanCode === 'BANAHATTI20') {
      setAppliedCoupon({ code: 'BANAHATTI20', discountPercent: 20 });
      showToast('🌟 20% Weaver Appreciation Discount Applied!');
      return true;
    } else {
      showToast('Invalid promo code. Try HANDLOOM10 or BANAHATTI20');
      return false;
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (shippingDetails, paymentMethod) => {
    const subtotal = cart.reduce((acc, item) => {
      let p = item.product.price;
      if (item.blouseStitching) p += 499;
      return acc + (p * item.quantity);
    }, 0);

    const discount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPercent) / 100) : 0;
    const giftWrapFee = giftWrap ? 199 : 0;
    const finalTotal = subtotal - discount + giftWrapFee;

    const newOrder = {
      id: `BH-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal,
      discount,
      giftWrapFee,
      totalAmount: finalTotal,
      paymentMethod,
      shippingAddress: shippingDetails,
      status: 'CONFIRMED',
      trackingId: `EK-IN-${Math.floor(100000000 + Math.random() * 900000000)}`,
      estimatedDelivery: '3 to 5 Business Days'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast('🎉 Order Successfully Placed! Handloom Mark Certificate issued.');
    return newOrder;
  };

  // Cart Calculations
  const cartSubtotalINR = cart.reduce((acc, item) => {
    let itemPrice = item.product.price;
    if (item.blouseStitching) itemPrice += 499;
    return acc + (itemPrice * item.quantity);
  }, 0);

  const discountINR = appliedCoupon 
    ? Math.round((cartSubtotalINR * appliedCoupon.discountPercent) / 100) 
    : 0;

  const giftWrapINR = giftWrap ? 199 : 0;
  const deliveryFeeINR = cartSubtotalINR >= freeShippingThreshold ? 0 : 150;
  const totalCartINR = cartSubtotalINR - discountINR + deliveryFeeINR + giftWrapINR;
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      wishlist,
      currency,
      setCurrency,
      searchTerm,
      setSearchTerm,
      selectedCollection,
      setSelectedCollection,
      selectedFabric,
      setSelectedFabric,
      selectedColor,
      setSelectedColor,
      maxPriceFilter,
      setMaxPriceFilter,
      sortBy,
      setSortBy,
      orders,
      appliedCoupon,
      applyCouponCode,
      formatPrice,
      addToCart,
      removeFromCart,
      updateCartQty,
      toggleBlouseStitching,
      toggleWishlist,
      clearCart,
      placeOrder,
      cartSubtotalINR,
      discountINR,
      deliveryFeeINR,
      giftWrapINR,
      giftWrap,
      setGiftWrap,
      freeShippingThreshold,
      totalCartINR,
      totalItemsCount,
      toastMessage,
      showToast,
      quickAddProduct,
      setQuickAddProduct,
      isSizeChartOpen,
      setIsSizeChartOpen
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
