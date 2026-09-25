import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Checkout.css';
import { 
  CheckCircle2, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  Truck, 
  Gift, 
  ArrowRight, 
  ArrowLeft, 
  QrCode, 
  Tag, 
  Sparkles, 
  ShoppingBag,
  MapPin,
  Check,
  Building,
  Smartphone
} from 'lucide-react';

const Money = ({ value }) => <>₹{Number(value || 0).toLocaleString('en-IN')}</>;

export default function Checkout() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { 
    cart, 
    cartSubtotal, 
    deliveryFee, 
    cartTotal, 
    createOrder,
    coupon,
    applyCoupon,
    removeCoupon,
    couponDiscount
  } = useCart();

  // Current Step: 1 = Address, 2 = Shipping & Gifting, 3 = Payment
  const [currentStep, setCurrentStep] = useState(1);
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Details
  const [shippingInfo, setShippingInfo] = useState({
    fullName: currentUser?.name || 'Smt. Radhika Hegde',
    phone: currentUser?.phone || '+91 98450 12345',
    email: currentUser?.email || 'radhika@example.com',
    address: 'Flat 402, Kaveri Apartments, 8th Cross',
    landmark: 'Near Someshwara Temple',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  });

  // Shipping & Gifting Options
  const [shippingMethod, setShippingMethod] = useState('STANDARD'); // 'STANDARD' | 'EXPRESS'
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'CARD' | 'NETBANKING' | 'COD'
  const [upiApp, setUpiApp] = useState('GPay');
  const [upiId, setUpiId] = useState('radhika@okhdfcbank');
  const [cardDetails, setCardDetails] = useState({
    number: '4532 8901 2345 6789',
    name: 'Radhika Hegde',
    expiry: '09/28',
    cvv: '891'
  });
  const [selectedBank, setSelectedBank] = useState('HDFC');

  const updateField = (field) => (e) => {
    setShippingInfo({ ...shippingInfo, [field]: e.target.value });
  };

  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    if (!couponCodeInput.trim()) return;
    setCouponError('');
    const res = applyCoupon(couponCodeInput.trim());
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponCodeInput('');
    }
  };

  const handleQuickPromoClick = (code) => {
    setCouponError('');
    applyCoupon(code);
  };

  const autofillDemoAddress = (type) => {
    if (type === 'BANAHATTI') {
      setShippingInfo({
        fullName: 'Shankar Patil',
        phone: '+91 97411 88990',
        email: 'shankar.patil@example.com',
        address: '#14, Pitloom Nagar, Near Weaver Bhavan',
        landmark: 'Opp. Kalmeshwara Temple',
        city: 'Rabkavi Banahatti',
        state: 'Karnataka',
        pincode: '587311'
      });
    } else {
      setShippingInfo({
        fullName: 'Ananya Deshmukh',
        phone: '+91 98765 43210',
        email: 'ananya@example.com',
        address: '42 Heritage Enclave, 100ft Road, Indiranagar',
        landmark: 'Near Metro Station',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560038'
      });
    }
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.pincode) {
      alert('Please fill in all mandatory delivery address fields.');
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalOrderSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment gateway authentication
    setTimeout(() => {
      const order = createOrder(
        {
          ...shippingInfo,
          paymentMethod
        },
        {
          paymentMethod,
          paymentDetails: paymentMethod === 'UPI' ? { upiApp, upiId } : paymentMethod === 'CARD' ? { last4: cardDetails.number.slice(-4) } : { bank: selectedBank },
          giftWrap: isGiftWrap,
          giftMessage: isGiftWrap ? giftMessage : '',
          shippingSpeed: shippingMethod
        }
      );

      setIsProcessing(false);
      navigate('/orders');
    }, 1200);
  };

  if (!cart.length) {
    return (
      <main className="purchase-page container-custom">
        <div className="empty-bag text-center py-16">
          <ShoppingBag size={48} className="mx-auto text-[#9A6863] mb-4" />
          <span className="badge-gold inline-block mb-2">Shopping Bag</span>
          <h1 className="font-serif text-3xl font-bold mb-3 text-[#1E2D29]">Your bag is currently empty</h1>
          <p className="text-sm text-gray-600 mb-6">Discover our authentic handloom collections straight from Banahatti looms.</p>
          <button onClick={() => navigate('/collections')} className="button-primary inline-flex items-center gap-2">
            Explore Handloom Sarees <ArrowRight size={16} />
          </button>
        </div>
      </main>
    );
  }

  // Adjusted delivery fee if Priority express is selected
  const shippingExtra = shippingMethod === 'EXPRESS' ? 150 : 0;
  const giftWrapExtra = isGiftWrap ? 99 : 0;
  const calculatedGrandTotal = Math.max(0, cartTotal + shippingExtra + giftWrapExtra);

  return (
    <main className="checkout-page-enhanced container-custom">
      
      {/* Header Bar */}
      <header className="checkout-header-bar">
        <div className="checkout-title-wrap">
          <span className="badge-gold">Authentic Pit-Loom Checkout</span>
          <h1>Secure Artisan Order</h1>
        </div>

        {/* Stepper Pill Nav */}
        <div className="checkout-stepper-nav">
          <div className={`step-indicator-pill ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
            <span className="step-num">{currentStep > 1 ? <Check size={12} /> : '1'}</span>
            <span>Delivery</span>
          </div>
          <span className="stepper-divider-arrow">›</span>
          <div className={`step-indicator-pill ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>
            <span className="step-num">{currentStep > 2 ? <Check size={12} /> : '2'}</span>
            <span>Shipping & Gift</span>
          </div>
          <span className="stepper-divider-arrow">›</span>
          <div className={`step-indicator-pill ${currentStep === 3 ? 'active' : ''}`}>
            <span className="step-num">3</span>
            <span>Payment</span>
          </div>
        </div>
      </header>

      {/* Main 2-Column Checkout Layout */}
      <div className="checkout-columns-layout">
        
        {/* Left Side: Step Forms */}
        <div className="checkout-form-container">
          
          {/* STEP 1: DELIVERY ADDRESS */}
          {currentStep === 1 && (
            <form onSubmit={handleStep1Submit} className="checkout-panel-card">
              <div className="panel-header-section">
                <div>
                  <h2>01. Where should we send your weave?</h2>
                  <p>Enter the complete delivery address for insured courier dispatch.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => autofillDemoAddress('BENGALURU')}
                    className="quick-autofill-btn"
                    title="Autofill Bengaluru address"
                  >
                    ⚡ Demo Bengaluru
                  </button>
                  <button 
                    type="button" 
                    onClick={() => autofillDemoAddress('BANAHATTI')}
                    className="quick-autofill-btn"
                    title="Autofill Banahatti address"
                  >
                    ⚡ Banahatti Local
                  </button>
                </div>
              </div>

              <div className="checkout-fields-grid">
                <label className="form-field-label">
                  Recipient Full Name *
                  <input 
                    type="text" 
                    required 
                    value={shippingInfo.fullName} 
                    onChange={updateField('fullName')}
                    className="form-field-input"
                    placeholder="e.g. Radhika Hegde"
                  />
                </label>

                <label className="form-field-label">
                  Phone Number (For Courier OTP) *
                  <input 
                    type="tel" 
                    required 
                    value={shippingInfo.phone} 
                    onChange={updateField('phone')}
                    className="form-field-input"
                    placeholder="+91 98000 00000"
                  />
                </label>

                <label className="form-field-label col-span-full">
                  Email Address (For Tax Invoice & Tracking) *
                  <input 
                    type="email" 
                    required 
                    value={shippingInfo.email} 
                    onChange={updateField('email')}
                    className="form-field-input"
                    placeholder="name@example.com"
                  />
                </label>

                <label className="form-field-label col-span-full">
                  Street Address / House No / Apartment *
                  <textarea 
                    required 
                    rows="2"
                    value={shippingInfo.address} 
                    onChange={updateField('address')}
                    className="form-field-textarea"
                    placeholder="House/Flat number, building name, street name"
                  />
                </label>

                <label className="form-field-label">
                  Landmark (Optional)
                  <input 
                    type="text" 
                    value={shippingInfo.landmark} 
                    onChange={updateField('landmark')}
                    className="form-field-input"
                    placeholder="Near temple, park, school"
                  />
                </label>

                <label className="form-field-label">
                  Postal Pincode *
                  <input 
                    type="text" 
                    required 
                    maxLength="6"
                    value={shippingInfo.pincode} 
                    onChange={updateField('pincode')}
                    className="form-field-input"
                    placeholder="e.g. 560038"
                  />
                </label>

                <label className="form-field-label">
                  City *
                  <input 
                    type="text" 
                    required 
                    value={shippingInfo.city} 
                    onChange={updateField('city')}
                    className="form-field-input"
                  />
                </label>

                <label className="form-field-label">
                  State *
                  <select 
                    value={shippingInfo.state} 
                    onChange={updateField('state')}
                    className="form-field-select"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Goa">Goa</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </label>
              </div>

              <div className="step-navigation-actions">
                <button 
                  type="button" 
                  onClick={() => navigate('/cart')}
                  className="btn-step-back"
                >
                  <ArrowLeft size={15} /> Return to Bag
                </button>
                <button type="submit" className="btn-step-next">
                  Proceed to Shipping <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: SHIPPING & GIFTING */}
          {currentStep === 2 && (
            <form onSubmit={handleStep2Submit} className="checkout-panel-card">
              <div className="panel-header-section">
                <div>
                  <h2>02. Choose Shipping Speed & Packaging</h2>
                  <p>Handloom sarees are dispatched in weather-proof moisture-sealed boxes.</p>
                </div>
              </div>

              <div className="shipping-methods-container">
                <div 
                  onClick={() => setShippingMethod('STANDARD')}
                  className={`selection-option-card ${shippingMethod === 'STANDARD' ? 'selected' : ''}`}
                >
                  <div className="selection-left">
                    <Truck size={22} className="text-[#9A6863]" />
                    <div className="selection-info">
                      <h4>Standard Handloom Freight (BlueDart / Delhivery)</h4>
                      <p>Estimated delivery in 3–4 working days directly from Banahatti, Karnataka.</p>
                    </div>
                  </div>
                  <span className={`selection-cost ${deliveryFee === 0 ? 'cost-free' : ''}`}>
                    {deliveryFee === 0 ? 'COMPLIMENTARY' : '₹150'}
                  </span>
                </div>

                <div 
                  onClick={() => setShippingMethod('EXPRESS')}
                  className={`selection-option-card ${shippingMethod === 'EXPRESS' ? 'selected' : ''}`}
                >
                  <div className="selection-left">
                    <Sparkles size={22} className="text-[#9A6863]" />
                    <div className="selection-info">
                      <h4>Priority Express Weaver Dispatch (Air Cargo)</h4>
                      <p>Fast-tracked packing & air courier dispatch within 48 hours for urgent celebrations.</p>
                    </div>
                  </div>
                  <span className="selection-cost">
                    +₹150
                  </span>
                </div>
              </div>

              {/* Artisanal Gift Potli Packaging */}
              <div className="gift-package-box">
                <label className="gift-toggle-row">
                  <input 
                    type="checkbox" 
                    checked={isGiftWrap}
                    onChange={(e) => setIsGiftWrap(e.target.checked)}
                  />
                  <div>
                    <span className="gift-toggle-title">
                      <Gift size={16} className="text-[#9A6863]" /> 
                      Gift Packaging in Handmade Cotton Potli Bag (+₹99)
                    </span>
                    <p className="gift-toggle-desc">
                      Includes an eco-friendly weaver blessing card with your handwritten personalized gift message.
                    </p>
                  </div>
                </label>

                {isGiftWrap && (
                  <div className="mt-4 pt-3 border-t border-dashed border-[#E5DED7]">
                    <label className="form-field-label">
                      Personalized Message on Artisan Note Card
                      <textarea 
                        rows="2"
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Wishing you elegance and warmth on your special day! With love from..."
                        className="form-field-textarea mt-1"
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="step-navigation-actions">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(1)}
                  className="btn-step-back"
                >
                  <ArrowLeft size={15} /> Edit Address
                </button>
                <button type="submit" className="btn-step-next">
                  Continue to Payment <ArrowRight size={15} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT & REVIEW */}
          {currentStep === 3 && (
            <form onSubmit={handleFinalOrderSubmit} className="checkout-panel-card">
              <div className="panel-header-section">
                <div>
                  <h2>03. Select Payment Method</h2>
                  <p>All payments are securely verified and backed by buyer protection.</p>
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="payment-tabs-header">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`pay-tab-btn ${paymentMethod === 'UPI' ? 'active' : ''}`}
                >
                  <Smartphone size={18} />
                  <span>Instant UPI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`pay-tab-btn ${paymentMethod === 'CARD' ? 'active' : ''}`}
                >
                  <CreditCard size={18} />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('NETBANKING')}
                  className={`pay-tab-btn ${paymentMethod === 'NETBANKING' ? 'active' : ''}`}
                >
                  <Building size={18} />
                  <span>Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`pay-tab-btn ${paymentMethod === 'COD' ? 'active' : ''}`}
                >
                  <Truck size={18} />
                  <span>Cash on Del</span>
                </button>
              </div>

              {/* Tab Bodies */}
              <div className="pay-method-body">
                
                {/* 1. UPI */}
                {paymentMethod === 'UPI' && (
                  <div className="upi-sim-box">
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Select UPI Application or Scan QR
                    </span>

                    <div className="upi-apps-row">
                      {['GPay', 'PhonePe', 'Paytm', 'BHIM UPI'].map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setUpiApp(app)}
                          className={`upi-app-badge ${upiApp === app ? 'selected' : ''}`}
                        >
                          {app}
                        </button>
                      ))}
                    </div>

                    <div className="qr-code-mock">
                      <div className="qr-box">
                        <QrCode size={52} />
                      </div>
                      <div className="text-xs text-gray-700">
                        <strong className="block text-sm text-[#1E2D29] mb-1">
                          Scan to Pay with Any UPI App
                        </strong>
                        <p className="text-gray-500 mb-2">Open Google Pay, PhonePe, or BHIM to pay seamlessly.</p>
                        <span className="text-[10px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded">
                          0% Transaction Fee · Instant Verification
                        </span>
                      </div>
                    </div>

                    <label className="form-field-label mt-2">
                      Or Enter Virtual Payment Address (UPI ID)
                      <div className="flex gap-2 mt-1">
                        <input 
                          type="text" 
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="form-field-input"
                          placeholder="yourname@upi"
                        />
                        <button 
                          type="button" 
                          className="bg-[#1E2D29] text-white text-xs px-4 rounded font-bold"
                          onClick={() => alert(`UPI ID ${upiId} is valid & ready!`)}
                        >
                          Verify
                        </button>
                      </div>
                    </label>
                  </div>
                )}

                {/* 2. CARD */}
                {paymentMethod === 'CARD' && (
                  <div>
                    {/* Visual Card Preview */}
                    <div className="card-preview-box">
                      <div className="card-preview-chip">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#E5B680]">BANAHATTI PAY</span>
                        <CreditCard size={24} className="text-[#E5B680]" />
                      </div>
                      <div className="card-num-display">
                        {cardDetails.number || '•••• •••• •••• ••••'}
                      </div>
                      <div className="card-bottom-row">
                        <div>
                          <small className="block text-[8px] text-gray-300">CARDHOLDER</small>
                          <span>{cardDetails.name || 'YOUR NAME'}</span>
                        </div>
                        <div>
                          <small className="block text-[8px] text-gray-300">EXPIRES</small>
                          <span>{cardDetails.expiry || 'MM/YY'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="checkout-fields-grid">
                      <label className="form-field-label col-span-full">
                        Card Number
                        <input 
                          type="text" 
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="form-field-input font-mono"
                          maxLength="19"
                        />
                      </label>
                      <label className="form-field-label">
                        Cardholder Name
                        <input 
                          type="text" 
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                          className="form-field-input"
                        />
                      </label>
                      <div className="flex gap-2">
                        <label className="form-field-label flex-1">
                          Expiry
                          <input 
                            type="text" 
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="form-field-input font-mono"
                            maxLength="5"
                          />
                        </label>
                        <label className="form-field-label flex-1">
                          CVV
                          <input 
                            type="password" 
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="form-field-input font-mono"
                            maxLength="4"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. NET BANKING */}
                {paymentMethod === 'NETBANKING' && (
                  <div>
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-3">
                      Select Your Preferred Bank
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                      {['HDFC', 'SBI', 'ICICI', 'Axis Bank'].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-3 border rounded text-xs font-bold transition-all text-center ${selectedBank === bank ? 'border-[#9A6863] bg-[#FDF6F5] text-[#9A6863]' : 'border-gray-200 bg-white text-gray-700'}`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      You will be securely redirected to {selectedBank}'s encrypted Net Banking gateway upon clicking Place Order.
                    </p>
                  </div>
                )}

                {/* 4. CASH ON DELIVERY */}
                {paymentMethod === 'COD' && (
                  <div className="p-2 text-xs text-gray-700 space-y-2">
                    <p className="font-bold text-[#1E2D29]">
                      ✓ Pay via Cash or UPI when your handloom package arrives.
                    </p>
                    <p className="text-gray-500">
                      Our courier executive will present a verified Banahatti Weaves moisture-sealed box. You can inspect the package authenticity before payment.
                    </p>
                  </div>
                )}

              </div>

              {/* Navigation Actions */}
              <div className="step-navigation-actions">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(2)}
                  className="btn-step-back"
                >
                  <ArrowLeft size={15} /> Back to Shipping
                </button>
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="btn-place-order"
                >
                  {isProcessing ? (
                    'Processing Authentic Loom Order...'
                  ) : (
                    <>
                      <Lock size={15} /> Confirm & Pay <Money value={calculatedGrandTotal} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Right Sticky Sidebar: Order Summary & Coupons */}
        <aside className="checkout-sidebar-enhanced">
          <div className="sidebar-heading-group">
            <span className="eyebrow" style={{ color: '#E5B680' }}>Order Breakdown</span>
            <h2>{cart.length} {cart.length === 1 ? 'Handloom Saree' : 'Handloom Sarees'}</h2>
          </div>

          {/* Items Preview List */}
          <div className="sidebar-items-scroll">
            {cart.map(({ saree, quantity }) => (
              <div key={saree.id} className="sidebar-item-row">
                <img 
                  src={saree.images && saree.images[0] ? saree.images[0] : '/images/sarees/saree_model_maroon_1789668365104.png'} 
                  alt={saree.name} 
                />
                <div className="sidebar-item-info">
                  <strong>{saree.name}</strong>
                  <span>Qty: {quantity} · {saree.fabric || 'Pure Handloom'}</span>
                </div>
                <div className="sidebar-item-price">
                  <Money value={saree.price * quantity} />
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Code Section */}
          <div className="coupon-input-box">
            {coupon ? (
              <div className="applied-coupon-pill">
                <div>
                  <strong>{coupon.code}</strong> applied ({coupon.label})
                </div>
                <button 
                  type="button" 
                  onClick={removeCoupon}
                  className="remove-coupon-btn"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <input 
                    type="text" 
                    placeholder="Enter Coupon (e.g. WEAVE10)" 
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="coupon-input"
                  />
                  <button type="submit" className="coupon-btn">
                    Apply
                  </button>
                </form>
                {couponError && (
                  <p className="text-[11px] text-[#ffb8b3] mt-1">{couponError}</p>
                )}
                
                {/* Clickable Quick Promos */}
                <div className="quick-promos-list">
                  <button 
                    type="button" 
                    onClick={() => handleQuickPromoClick('WEAVE10')} 
                    className="promo-tag-btn"
                  >
                    🏷️ WEAVE10 (10% Off)
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleQuickPromoClick('HANDLOOM300')} 
                    className="promo-tag-btn"
                  >
                    🏷️ HANDLOOM300 (₹300 Off)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Price Math Lines */}
          <div className="summary-math-lines">
            <div>
              <span>Items Subtotal:</span>
              <strong><Money value={cartSubtotal} /></strong>
            </div>

            {couponDiscount > 0 && (
              <div className="discount-line">
                <span>Artisan Coupon Discount:</span>
                <strong>- <Money value={couponDiscount} /></strong>
              </div>
            )}

            <div>
              <span>Insured Handloom Freight:</span>
              <span>
                {deliveryFee === 0 && shippingMethod === 'STANDARD' ? (
                  <strong style={{ color: '#E5B680' }}>Complimentary (FREE)</strong>
                ) : (
                  <Money value={deliveryFee + shippingExtra} />
                )}
              </span>
            </div>

            {isGiftWrap && (
              <div>
                <span>Artisanal Gift Potli Packaging:</span>
                <strong><Money value={99} /></strong>
              </div>
            )}
          </div>

          {/* Grand Total */}
          <div className="summary-grand-total">
            <span>Total Payable:</span>
            <strong><Money value={calculatedGrandTotal} /></strong>
          </div>

          {/* Trust Guarantees */}
          <div className="checkout-guarantee-badges">
            <div className="guarantee-item">
              <ShieldCheck size={16} />
              <span>Silk Mark & Handloom Verified Weave Guarantee</span>
            </div>
            <div className="guarantee-item">
              <Sparkles size={16} />
              <span>Direct Fair Trade to Banahatti Pit-Loom Artisans</span>
            </div>
            <div className="guarantee-item">
              <Lock size={16} />
              <span>256-Bit Bank-Grade Encrypted Checkout</span>
            </div>
          </div>

        </aside>

      </div>
    </main>
  );
}
