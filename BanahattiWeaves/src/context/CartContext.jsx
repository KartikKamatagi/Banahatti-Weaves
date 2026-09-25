import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialSarees, initialOrders } from '../data/sareeData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Sarees Catalog State (Admin CRUD syncs live with Customer store)
  const [sarees, setSarees] = useState(() => {
    const saved = localStorage.getItem('bw_sarees');
    if (saved) {
      const parsed = JSON.parse(saved);
      const existingIds = new Set(parsed.map((s) => s.id));
      const missing = initialSarees.filter((s) => !existingIds.has(s.id));
      if (missing.length > 0) {
        return [...parsed, ...missing];
      }
      return parsed;
    }
    return initialSarees;
  });

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('bw_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(['saree-1', 'saree-3']);

  // Orders State (Admin & Customer shared state)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('bw_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('bw_sarees', JSON.stringify(sarees));
  }, [sarees]);

  useEffect(() => {
    localStorage.setItem('bw_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bw_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart Functions
  const addToCart = (saree, qty = 1) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((item) => item.saree.id === saree.id);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += qty;
        return updated;
      }
      return [...prevCart, { saree, quantity: qty }];
    });
    showToast(`Added "${saree.name}" to cart!`);
  };

  const updateCartQty = (sareeId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.saree.id === sareeId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (sareeId) => {
    setCart((prevCart) => prevCart.filter((item) => item.saree.id !== sareeId));
    showToast('Removed item from cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Functions
  const toggleWishlist = (sareeId) => {
    setWishlist((prev) => {
      if (prev.includes(sareeId)) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== sareeId);
      } else {
        showToast('Saved to wishlist!');
        return [...prev, sareeId];
      }
    });
  };

  // Admin Saree CRUD Operations
  const addSaree = (newSareeData) => {
    const newId = `saree-${Date.now()}`;
    const formatted = {
      id: newId,
      ...newSareeData,
      price: Number(newSareeData.price),
      originalPrice: Number(newSareeData.originalPrice || Number(newSareeData.price) * 1.2),
      stock: Number(newSareeData.stock),
      rating: 5.0,
      reviewsCount: 1,
      isLatest: true,
      images: newSareeData.images && newSareeData.images.length > 0 
        ? newSareeData.images 
        : ['/images/sarees/saree_model_maroon_1789668365104.png']
    };
    setSarees((prev) => [formatted, ...prev]);
    showToast('✨ Saree successfully added to store!');
    return formatted;
  };

  const editSaree = (id, updatedFields) => {
    setSarees((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    showToast('Saree details updated!');
  };

  const deleteSaree = (id) => {
    setSarees((prev) => prev.filter((item) => item.id !== id));
    // Remove from cart if present
    setCart((prev) => prev.filter((item) => item.saree.id !== id));
    showToast('Saree deleted from catalog');
  };

  // Coupons State
  const [coupon, setCoupon] = useState(() => {
    const saved = localStorage.getItem('bw_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('bw_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('bw_coupon');
    }
  }, [coupon]);

  const PROMO_CODES = {
    'WEAVE10': { code: 'WEAVE10', type: 'percent', value: 10, label: '10% Handloom Welcome Discount', minSpend: 1500 },
    'HANDLOOM300': { code: 'HANDLOOM300', type: 'flat', value: 300, label: '₹300 Off Artisanal Special', minSpend: 2500 },
    'UTSAV500': { code: 'UTSAV500', type: 'flat', value: 500, label: '₹500 Off Festive Loom Offer', minSpend: 4000 }
  };

  const applyCoupon = (codeStr) => {
    const clean = codeStr.trim().toUpperCase();
    const promo = PROMO_CODES[clean];
    if (!promo) {
      return { success: false, message: 'Invalid coupon code. Try WEAVE10 or HANDLOOM300' };
    }
    if (cartSubtotal < promo.minSpend) {
      return { success: false, message: `Requires a minimum cart value of ₹${promo.minSpend.toLocaleString('en-IN')}` };
    }
    setCoupon(promo);
    showToast(`✨ Coupon "${promo.code}" applied!`);
    return { success: true, promo };
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed');
  };

  // Orders Operations
  const createOrder = (customerInfo, extraDetails = {}) => {
    const subtotal = cart.reduce((sum, item) => sum + item.saree.price * item.quantity, 0);
    const delivery = subtotal >= 3000 || subtotal === 0 ? 0 : 150;
    
    let discount = 0;
    if (coupon) {
      if (coupon.type === 'percent') {
        discount = Math.round((subtotal * coupon.value) / 100);
      } else {
        discount = coupon.value;
      }
    }

    const totalAmount = Math.max(0, subtotal - discount + delivery);

    // Calculate delivery date (4 days from today)
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 4);
    const estDeliveryStr = estDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    const newOrder = {
      id: `BW-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      customerName: customerInfo.fullName,
      customerEmail: customerInfo.email || 'customer@example.com',
      customerPhone: customerInfo.phone,
      address: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pincode}`,
      rawAddress: {
        fullName: customerInfo.fullName,
        phone: customerInfo.phone,
        email: customerInfo.email,
        address: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.state,
        pincode: customerInfo.pincode,
        landmark: customerInfo.landmark || ''
      },
      items: cart.map((item) => ({
        sareeId: item.saree.id,
        name: item.saree.name,
        fabric: item.saree.fabric || 'Pure Handloom',
        price: item.saree.price,
        quantity: item.quantity,
        image: item.saree.images && item.saree.images[0] ? item.saree.images[0] : '/images/sarees/saree_model_maroon_1789668365104.png'
      })),
      subtotal,
      delivery,
      discount,
      couponCode: coupon ? coupon.code : null,
      totalAmount,
      paymentMethod: customerInfo.paymentMethod || extraDetails.paymentMethod || 'COD',
      paymentStatus: (customerInfo.paymentMethod === 'COD' ? 'Pending (Pay on Delivery)' : 'Paid Online (Verified)'),
      paymentDetails: extraDetails.paymentDetails || null,
      trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
      carrier: 'BlueDart Express Handloom Logistics',
      estimatedDelivery: estDeliveryStr,
      giftWrap: extraDetails.giftWrap || false,
      giftMessage: extraDetails.giftMessage || '',
      status: 'Confirmed'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setCoupon(null);
    showToast('🎉 Order placed successfully!');
    return newOrder;
  };

  const cancelOrder = (orderId, reason = 'Customer requested cancellation') => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'Cancelled',
            cancellationReason: reason,
            cancelledAt: new Date().toISOString()
          };
        }
        return ord;
      })
    );
    showToast(`Order ${orderId} has been cancelled`);
  };

  const reorder = (orderId) => {
    const orderToReorder = orders.find((o) => o.id === orderId);
    if (!orderToReorder || !orderToReorder.items?.length) {
      showToast('Order items not available');
      return false;
    }

    orderToReorder.items.forEach((item) => {
      // Find saree in catalog or make safe object
      const catalogSaree = sarees.find((s) => s.id === item.sareeId);
      if (catalogSaree) {
        addToCart(catalogSaree, item.quantity);
      } else {
        addToCart({
          id: item.sareeId,
          name: item.name,
          price: item.price,
          images: [item.image]
        }, item.quantity);
      }
    });

    showToast('✨ Items added to your shopping bag!');
    return true;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    showToast(`Order status updated to ${newStatus}`);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.saree.price * item.quantity, 0);
  const deliveryFee = cartSubtotal >= 3000 || cartSubtotal === 0 ? 0 : 150;
  const couponDiscount = coupon
    ? coupon.type === 'percent'
      ? Math.round((cartSubtotal * coupon.value) / 100)
      : coupon.value
    : 0;
  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        sarees,
        cart,
        wishlist,
        orders,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        toggleWishlist,
        addSaree,
        editSaree,
        deleteSaree,
        createOrder,
        cancelOrder,
        reorder,
        updateOrderStatus,
        coupon,
        applyCoupon,
        removeCoupon,
        couponDiscount,
        cartSubtotal,
        deliveryFee,
        cartTotal,
        cartCount,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
