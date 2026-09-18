import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialSarees, initialOrders } from '../data/sareeData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Sarees Catalog State (Admin CRUD syncs live with Customer store)
  const [sarees, setSarees] = useState(() => {
    const saved = localStorage.getItem('bw_sarees');
    return saved ? JSON.parse(saved) : initialSarees;
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

  // Orders Operations
  const createOrder = (customerInfo) => {
    const subtotal = cart.reduce((sum, item) => sum + item.saree.price * item.quantity, 0);
    const delivery = subtotal >= 3000 ? 0 : 150;
    const totalAmount = subtotal + delivery;

    const newOrder = {
      id: `BW-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      customerName: customerInfo.fullName,
      customerEmail: customerInfo.email || 'customer@example.com',
      customerPhone: customerInfo.phone,
      address: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pincode}`,
      items: cart.map((item) => ({
        sareeId: item.saree.id,
        name: item.saree.name,
        price: item.saree.price,
        quantity: item.quantity,
        image: item.saree.images[0]
      })),
      subtotal,
      delivery,
      totalAmount,
      status: 'Pending'
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast('🎉 Order placed successfully!');
    return newOrder;
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
  const cartTotal = cartSubtotal + deliveryFee;
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
        updateOrderStatus,
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
