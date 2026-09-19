import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  UploadCloud, 
  Trash2, 
  Star, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Image as ImageIcon,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function AddSaree() {
  const navigate = useNavigate();
  const { addSaree } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    sku: `BW-${Math.floor(1000 + Math.random() * 9000)}`,
    price: '',
    originalPrice: '',
    category: 'COTTON',
    fabric: 'Pure Cotton',
    color: 'Red & Gold',
    length: '6.3 Meters (Includes 0.8m Blouse Piece)',
    stock: '10',
    description: '',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isActive: true,
    urlInput: ''
  });

  const [images, setImages] = useState([
    '/images/sarees/saree_model_maroon_1789668365104.png',
    '/images/sarees/media__1789668269619.jpg'
  ]);

  const handleAddImageUrl = () => {
    if (formData.urlInput.trim()) {
      setImages([...images, formData.urlInput.trim()]);
      setFormData({ ...formData, urlInput: '' });
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSetMainImage = (index) => {
    const main = images[index];
    const rest = images.filter((_, i) => i !== index);
    setImages([main, ...rest]);
  };

  const handleMoveImage = (index, direction) => {
    const updated = [...images];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setImages(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill in Saree Name and Price.');
      return;
    }

    addSaree({
      ...formData,
      id: formData.sku,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice || formData.price * 1.2),
      stock: Number(formData.stock),
      images: images.length > 0 ? images : ['/images/sarees/saree_model_maroon_1789668365104.png']
    });

    navigate('/admin/sarees');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/sarees')}
            className="p-2 rounded-lg border border-[#E5E1DB] text-[#77716B] hover:text-[#242424] hover:bg-[#F7F6F3]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#242424]">Add New Saree</h1>
            <p className="text-xs text-[#77716B] mt-0.5">Create a new Banahatti handloom saree product entry</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/admin/sarees')}
            className="px-4 py-2 text-xs font-semibold text-[#77716B] bg-white border border-[#E5E1DB] rounded-lg hover:bg-[#F7F6F3]"
          >
            CANCEL
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#1F2926] rounded-lg hover:bg-[#2A3733] shadow-xs cursor-pointer"
          >
            SAVE SAREE
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT COLUMN: SAREE INFORMATION */}
          <div className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs space-y-4">
            <h2 className="font-serif text-base font-bold text-[#242424] border-b border-[#E5E1DB] pb-3">
              Saree Information
            </h2>

            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-[#77716B] mb-1">
                SAREE NAME *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Banahatti Crimson Red Chikki Paras Saree"
                className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] focus:outline-none focus:border-[#1F2926]"
              />
            </div>

            {/* SKU & Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#77716B] mb-1">SKU ID</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg font-mono text-[#242424]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#77716B] mb-1">STOCK QUANTITY *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
                />
              </div>
            </div>

            {/* Price & Discount Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#77716B] mb-1">SELLING PRICE (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="3499"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#77716B] mb-1">ORIGINAL MRP (₹)</label>
                <input
                  type="number"
                  placeholder="4499"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
                />
              </div>
            </div>

            {/* Category & Fabric */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#77716B] mb-1">CATEGORY</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
                >
                  <option value="COTTON">Cotton Sarees</option>
                  <option value="SILK">Silk Sarees</option>
                  <option value="TRADITIONAL">Traditional Sarees</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#77716B] mb-1">FABRIC TYPE</label>
                <select
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
                >
                  <option value="Pure Cotton">Pure Cotton</option>
                  <option value="Silk Cotton">Silk Cotton</option>
                  <option value="Mulberry Silk">Mulberry Silk</option>
                  <option value="Organic Linen">Organic Linen</option>
                </select>
              </div>
            </div>

            {/* Color & Length */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#77716B] mb-1">COLOR PALETTE</label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="Crimson Red & Gold"
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#77716B] mb-1">SAREE LENGTH</label>
                <input
                  type="text"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: SAREE IMAGES */}
          <div className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs space-y-4">
            <h2 className="font-serif text-base font-bold text-[#242424] border-b border-[#E5E1DB] pb-3">
              Saree Images
            </h2>

            {/* Drag & Drop Area */}
            <div className="border-2 border-dashed border-[#E5E1DB] bg-[#F7F6F3] rounded-xl p-6 text-center space-y-2">
              <UploadCloud className="w-8 h-8 text-[#9A6863] mx-auto" />
              <p className="text-xs font-semibold text-[#242424]">Drag & drop images here or browse</p>
              <p className="text-[10px] text-[#77716B]">Supports JPG, PNG or WebP files</p>
            </div>

            {/* Add Image URL Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.urlInput}
                onChange={(e) => setFormData({ ...formData, urlInput: e.target.value })}
                placeholder="Or paste image URL (/images/sarees/...)"
                className="flex-1 px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-3 py-2 bg-[#1F2926] text-white text-xs font-semibold rounded-lg hover:bg-[#2A3733]"
              >
                + ADD
              </button>
            </div>

            {/* Images List Previews */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-semibold text-[#77716B] uppercase tracking-wider block">
                IMAGE PREVIEWS ({images.length})
              </span>
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5E1DB] bg-white shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={img} alt="preview" className="w-10 h-12 object-cover rounded border border-[#E5E1DB]" />
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-[#242424] truncate max-w-[180px]">{img}</p>
                      {idx === 0 && (
                        <span className="text-[9px] font-bold text-[#3D8065] bg-[#3D8065]/10 px-1.5 py-0.5 rounded">
                          MAIN IMAGE
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {idx !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleSetMainImage(idx)}
                        className="px-2 py-1 text-[10px] font-semibold text-[#9A6863] border border-[#9A6863]/30 rounded hover:bg-[#9A6863]/10"
                      >
                        Set Main
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleMoveImage(idx, -1)}
                      disabled={idx === 0}
                      className="p-1 text-[#77716B] hover:text-[#242424] disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveImage(idx, 1)}
                      disabled={idx === images.length - 1}
                      className="p-1 text-[#77716B] hover:text-[#242424] disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-1 text-[#B84A4A] hover:bg-[#B84A4A]/10 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: DESCRIPTION & CHECKBOXES */}
        <div className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs space-y-4">
          <h2 className="font-serif text-base font-bold text-[#242424] border-b border-[#E5E1DB] pb-3">
            Description & Store Visibility
          </h2>

          <div>
            <label className="block text-xs font-semibold text-[#77716B] mb-1">
              PRODUCT DESCRIPTION
            </label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Authentic Banahatti handloom cotton saree featuring traditional Chikki Paras checks..."
              className="w-full p-3 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] focus:outline-none focus:border-[#1F2926]"
            />
          </div>

          {/* Visibility Checkboxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#242424] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 accent-[#1F2926]"
              />
              Featured Saree
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#242424] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNewArrival}
                onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                className="w-4 h-4 accent-[#1F2926]"
              />
              New Arrival
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#242424] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isBestSeller}
                onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                className="w-4 h-4 accent-[#1F2926]"
              />
              Bestseller
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#242424] cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 accent-[#1F2926]"
              />
              Active Listing
            </label>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pb-8">
          <button
            type="button"
            onClick={() => navigate('/admin/sarees')}
            className="px-6 py-2.5 text-xs font-semibold text-[#77716B] bg-white border border-[#E5E1DB] rounded-lg hover:bg-[#F7F6F3]"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1F2926] rounded-lg hover:bg-[#2A3733] shadow-xs cursor-pointer"
          >
            SAVE SAREE
          </button>
        </div>

      </form>
    </div>
  );
}
