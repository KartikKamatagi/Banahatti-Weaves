import React from 'react';
import { X, Printer, ShieldCheck, Award, Download, CheckCircle2 } from 'lucide-react';
import './InvoiceModal.css';

export default function InvoiceModal({ order, onClose }) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = `INV-${order.id.replace('BW-ORD-', '')}-${new Date(order.date).getFullYear()}`;
  const subtotal = order.subtotal || order.totalAmount;
  const delivery = order.delivery ?? (order.totalAmount >= 3000 ? 0 : 150);
  const discount = order.discount || 0;
  const grandTotal = order.totalAmount;

  // Approximate 5% GST on handloom textiles
  const gstRate = 5;
  const taxableValue = Math.round((subtotal / (1 + gstRate / 100)));
  const gstAmount = subtotal - taxableValue;
  const cgst = Math.round(gstAmount / 2);
  const sgst = gstAmount - cgst;

  return (
    <div className="invoice-modal-backdrop" onClick={onClose}>
      <div className="invoice-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Toolbar (hidden during print) */}
        <div className="invoice-toolbar no-print">
          <div className="toolbar-info">
            <span className="toolbar-badge">Tax Invoice & Authenticity Certificate</span>
            <span className="toolbar-id">{order.id}</span>
          </div>
          <div className="toolbar-actions">
            <button onClick={handlePrint} className="btn-print" title="Print or Save as PDF">
              <Printer size={16} /> Print / Save PDF
            </button>
            <button onClick={onClose} className="btn-close" aria-label="Close invoice">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Invoice Paper Sheet */}
        <div className="invoice-paper" id="printable-invoice">
          
          {/* Header */}
          <div className="invoice-header">
            <div className="company-info">
              <h1 className="company-logo">
                BANAHATTI <span className="logo-accent">WEAVES</span>
              </h1>
              <p className="company-sub">Traditional Pit-Loom Artisanal Handlooms</p>
              <address className="company-address">
                Banahatti Handloom Weavers Cooperative Guild<br />
                Main Road, Rabkavi Banahatti, Bagalkot District<br />
                Karnataka - 587311, India<br />
                <strong>GSTIN:</strong> 29AABCB1234F1Z9 · <strong>Handloom Reg:</strong> KA/BGK/2018/0942
              </address>
            </div>

            <div className="invoice-meta-card">
              <div className="tax-badge">ORIGINAL TAX INVOICE</div>
              <table className="meta-table">
                <tbody>
                  <tr>
                    <th>Invoice No:</th>
                    <td><strong>{invoiceNumber}</strong></td>
                  </tr>
                  <tr>
                    <th>Order No:</th>
                    <td>{order.id}</td>
                  </tr>
                  <tr>
                    <th>Order Date:</th>
                    <td>{new Date(`${order.date}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  </tr>
                  <tr>
                    <th>Payment:</th>
                    <td><span className="pay-badge">{order.paymentMethod || 'COD'}</span></td>
                  </tr>
                  <tr>
                    <th>AWB / Tracking:</th>
                    <td><code>{order.trackingNumber || 'BD-890214IN'}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr className="invoice-divider" />

          {/* Bill to & Ship to */}
          <div className="invoice-parties">
            <div className="party-box">
              <h3>Billed & Shipped To:</h3>
              <p className="party-name">{order.customerName}</p>
              <p className="party-address">{order.address}</p>
              <p className="party-contact">
                {order.customerPhone && <span>Phone: {order.customerPhone}</span>}
                {order.customerEmail && <span> · Email: {order.customerEmail}</span>}
              </p>
            </div>
            <div className="party-box dispatch-box">
              <h3>Dispatch Location:</h3>
              <p className="party-name">Banahatti Loom Center #04</p>
              <p className="party-address">Weavers Colony, Bagalkot Road, Banahatti, KA</p>
              <p className="dispatch-logistic">
                <strong>Logistics:</strong> {order.carrier || 'BlueDart Express Handloom Freight'}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <table className="invoice-items-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>Item Description & Weave</th>
                <th style={{ width: '80px' }}>HSN</th>
                <th style={{ width: '60px' }} className="text-center">Qty</th>
                <th style={{ width: '100px' }} className="text-right">Unit Price</th>
                <th style={{ width: '110px' }} className="text-right">Total (INR)</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={`${item.sareeId}-${idx}`}>
                  <td>{idx + 1}</td>
                  <td>
                    <strong>{item.name}</strong>
                    <span className="item-sub">Authentic Banahatti Pit-Loom Silk/Cotton Handloom Saree</span>
                  </td>
                  <td>5007 / 5208</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-right">₹{item.price.toLocaleString('en-IN')}</td>
                  <td className="text-right">₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Calculation Summary & Notes */}
          <div className="invoice-bottom-grid">
            <div className="invoice-terms">
              <h4>Handloom Authenticity Declaration:</h4>
              <p>
                We hereby certify that the goods described in this invoice are authentic hand-woven handloom products woven on traditional pit looms by registered artisan weavers of Banahatti, Karnataka.
              </p>
              <div className="auth-seal-badge">
                <Award size={28} className="seal-icon" />
                <div>
                  <strong>SILK MARK & COTTON MARK COMPLIANT</strong>
                  <span>Direct Artisan Fair Trade Certified</span>
                </div>
              </div>
            </div>

            <div className="invoice-totals-table">
              <div className="total-row">
                <span>Subtotal (Items):</span>
                <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
              </div>
              {discount > 0 && (
                <div className="total-row discount-row">
                  <span>Artisanal Coupon ({order.couponCode || 'PROMO'}):</span>
                  <strong>- ₹{discount.toLocaleString('en-IN')}</strong>
                </div>
              )}
              <div className="total-row">
                <span>Estimated GST (5% Included):</span>
                <span>₹{gstAmount.toLocaleString('en-IN')} (CGST ₹{cgst} + SGST ₹{sgst})</span>
              </div>
              <div className="total-row">
                <span>Shipping & Insured Logistics:</span>
                <span>{delivery === 0 ? 'Complimentary (FREE)' : `₹${delivery}`}</span>
              </div>
              <div className="total-row grand-total-row">
                <span>Total Amount:</span>
                <strong>₹{grandTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>

          {/* Footer & Signature */}
          <div className="invoice-footer">
            <div className="support-info">
              <p>Need support or care advice for your handloom weave?</p>
              <p>Contact <strong>support@banahattiweaves.com</strong> or call <strong>+91 98765 43210</strong></p>
            </div>
            <div className="signature-box">
              <div className="seal-stamp">
                <span>BANAHATTI WEAVES</span>
                <small>AUTHORIZED SIGNATORY</small>
              </div>
              <p>For Banahatti Weaves Handloom Guild</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
