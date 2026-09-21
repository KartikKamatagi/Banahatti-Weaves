import React, { useState, useEffect } from 'react';
import './admin.css';
import './EditSaree.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  UploadCloud, 
  Trash2, 
  ArrowLeft, 
  Save 
} from 'lucide-react';

export default function EditSaree() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sarees, editSaree } = useCart();

  const targetSaree = sarees.find((s) => String(s.id) === String(id));

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    originalPrice: '',
    category: 'COTTON',
    fabric: 'Pure Cotton',
    color: '',
    length: '6.3 Meters (Includes 0.8m Blouse Piece)',
    stock: '10',
    description: '',
    urlInput: ''
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (targetSaree) {
      setFormData({
        name: targetSaree.name || '',
        sku: targetSaree.sku || targetSaree.id || '',
        price: targetSaree.price || '',
        originalPrice: targetSaree.originalPrice || '',
        category: targetSaree.category || 'COTTON',
        fabric: targetSaree.fabric || 'Pure Cotton',
        color: targetSaree.color || '',
        length: targetSaree.length || '6.3 Meters (Includes 0.8m Blouse Piece)',
        stock: targetSaree.stock !== undefined ? String(targetSaree.stock) : '10',
        description: targetSaree.description || '',
        urlInput: ''
      });

      if (Array.isArray(targetSaree.images) && targetSaree.images.length > 0) {
        setImages(targetSaree.images);
      } else if (targetSaree.image) {
        setImages([targetSaree.image]);
      } else {
        setImages(['/images/sarees/saree_model_maroon_1789668365104.png']);
      }
    }
  }, [targetSaree]);

  if (!targetSaree) {
    return (
      <div className="card-admin text-center space-y-4 max-w-md mx-auto my-12 p-8">
        <h2 className="text-[20px] font-bold text-[#242424]">Saree Not Found</h2>
        <p className="text-[13px] text-[#77716B]">The saree with ID "{id}" could not be located in your inventory.</p>
        <button 
          onClick={() => navigate('/admin/sarees')} 
          className="btn-admin-primary"
        >
          Return to Sarees
        </button>
      </div>
    );
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill in Saree Name and Price.');
      return;
    }

    editSaree(id, {
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice || formData.price * 1.2),
      stock: Number(formData.stock),
      images: images.length > 0 ? images : [targetSaree.image || '/images/sarees/saree_model_maroon_1789668365104.png']
    });

    navigate('/admin/sarees');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Action Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/sarees')}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#77716B] hover:text-[#242424]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sarees
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/sarees')}
            className="btn-admin-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn-admin-primary"
          >
            Update Saree
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* DESKTOP TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: PRODUCT INFORMATION CARD */}
          <div className="card-admin space-y-4">
            <h2 className="text-[18px] font-bold text-[#242424] border-b border-[#E5E0D9] pb-3">
              Product Information
            </h2>

            {/* Saree Name */}
            <div>
              <label className="block text-[13px] font-semibold text-[#242424] mb-1">
                Saree Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-admin w-full"
              />
            </div>

            {/* SKU & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#242424] mb-1">
                  SKU
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="input-admin w-full font-mono"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#242424] mb-1">
                  Stock *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="input-admin w-full font-medium"
                />
              </div>
            </div>

            {/* Price & Discount Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#242424] mb-1">
                  Selling Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="input-admin w-full font-semibold"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#242424] mb-1">
                  Discount Price / MRP (₹)
                </label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="input-admin w-full"
                />
              </div>
            </div>

            {/* Category & Fabric */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#242424] mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-admin w-full cursor-pointer"
                >
                  <option value="COTTON">Cotton Sarees</option>
                  <option value="SILK">Silk Sarees</option>
                  <option value="TRADITIONAL">Traditional Sarees</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#242424] mb-1">
                  Fabric
                </label>
                <select
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  className="input-admin w-full cursor-pointer"
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
                <label className="block text-[13px] font-semibold text-[#242424] mb-1">
                  Color
                </label>
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="input-admin w-full"
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#242424] mb-1">
                  Length
                </label>
                <input
                  type="text"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  className="input-admin w-full"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[13px] font-semibold text-[#242424] mb-1">
                Description
              </label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="textarea-admin w-full"
              />
            </div>

          </div>

          {/* RIGHT: IMAGE UPLOAD CARD */}
          <div className="card-admin space-y-4">
            <h2 className="text-[18px] font-bold text-[#242424] border-b border-[#E5E0D9] pb-3">
              Image Upload
            </h2>

            {/* Dashed Upload Box */}
            <div className="border-2 border-dashed border-[#DCD6CE] bg-[#FAF8F5] rounded-[6px] p-8 text-center space-y-3">
              <UploadCloud className="w-10 h-10 text-[#9A6863] mx-auto stroke-1" />
              <div>
                <p className="text-[14px] font-semibold text-[#242424]">Upload saree images</p>
                <p className="text-[12px] text-[#77716B] mt-0.5">PNG, JPG or WEBP</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const url = prompt('Enter image URL (/images/sarees/...):');
                  if (url) setImages([...images, url]);
                }}
                className="btn-admin-secondary h-[38px] text-[13px] inline-flex items-center"
              >
                Choose Images
              </button>
            </div>

            {/* URL Input Helper */}
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.urlInput}
                onChange={(e) => setFormData({ ...formData, urlInput: e.target.value })}
                placeholder="Or paste image URL..."
                className="input-admin flex-1 text-[13px]"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="btn-admin-secondary h-[46px] text-[13px]"
              >
                + Add
              </button>
            </div>

            {/* Clean Grid of Uploaded Images (3/4 aspect ratio) */}
            <div>
              <span className="text-[13px] font-semibold text-[#77716B] block mb-3">
                IMAGE PREVIEWS ({images.length})
              </span>
              
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-[3/4] border border-[#E5E0D9] rounded-[4px] overflow-hidden group">
                    <img src={img} alt="preview" className="w-full h-full object-cover" />
                    
                    {/* Controls Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between items-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="p-1 bg-[#B45454] text-white rounded hover:bg-[#B45454]/90"
                        title="Remove Image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {idx === 0 ? (
                        <span className="text-[10px] font-bold bg-[#4F806B] text-white px-2 py-0.5 rounded shadow">
                          MAIN IMAGE
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetMainImage(idx)}
                          className="text-[10px] font-semibold bg-white text-[#242424] px-2 py-0.5 rounded hover:bg-[#FAF8F5]"
                        >
                          Set Main
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Save Bar */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#E5E0D9]">
          <button
            type="button"
            onClick={() => navigate('/admin/sarees')}
            className="btn-admin-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-admin-primary"
          >
            Update Saree
          </button>
        </div>

      </form>
    </div>
  );
}
