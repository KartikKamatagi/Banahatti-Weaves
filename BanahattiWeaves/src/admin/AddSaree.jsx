import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PlusCircle, Image as ImageIcon, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function AddSaree() {
  const navigate = useNavigate();
  const { addSaree } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'COTTON',
    fabric: 'Pure Banahatti Cotton',
    color: 'Red & Gold',
    length: '5.5 Meters (with 0.8m Blouse)',
    description: '',
    stock: '10',
    imageUrlInput: ''
  });

  const [imageUrls, setImageUrls] = useState([
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  ]);

  const handleAddImageUrl = () => {
    if (formData.imageUrlInput.trim()) {
      setImageUrls([...imageUrls, formData.imageUrlInput.trim()]);
      setFormData({ ...formData, imageUrlInput: '' });
    }
  };

  const handleRemoveImage = (idx) => {
    setImageUrls(imageUrls.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill in Saree Name and Price.');
      return;
    }

    addSaree({
      ...formData,
      images: imageUrls.length > 0 ? imageUrls : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80']
    });

    navigate('/admin/sarees');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/admin/sarees')}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase text-gray-500 hover:text-crimson mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Sarees List
          </button>
          <h1 className="font-serif text-3xl font-extrabold text-deep-charcoal">
            Add New Banahatti Saree
          </h1>
          <p className="text-xs text-gray-500">
            Fill in saree specifications and photos. It will appear live on the store upon submission.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-md space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          <div className="md:col-span-2">
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Saree Name *
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. Royal Maroon Silk Chikki Paras Saree"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Selling Price (₹) *
            </label>
            <input 
              type="number" 
              required
              placeholder="3999"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson font-serif font-bold text-crimson"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson font-bold"
            >
              <option value="COTTON">COTTON</option>
              <option value="SILK">SILK</option>
              <option value="TRADITIONAL">TRADITIONAL</option>
            </select>
          </div>

          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Fabric
            </label>
            <input 
              type="text" 
              value={formData.fabric}
              onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
              placeholder="100% Combed Cotton / Pure Mulberry Silk"
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Color
            </label>
            <input 
              type="text" 
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              placeholder="e.g. Crimson Red & Gold Zari"
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Dimensions / Length
            </label>
            <input 
              type="text" 
              value={formData.length}
              onChange={(e) => setFormData({ ...formData, length: e.target.value })}
              placeholder="5.5 Meters (with 0.8m Blouse)"
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Initial Stock Quantity *
            </label>
            <input 
              type="number" 
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson font-bold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Description
            </label>
            <textarea 
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide saree weave story, border motifs, and care details..."
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
            />
          </div>

        </div>

        {/* Image Upload / URL Input & Preview */}
        <div className="pt-4 border-t border-gray-100 space-y-4">
          <label className="block uppercase font-bold text-deep-charcoal text-xs">
            Saree Images & Photo Previews
          </label>

          <div className="flex gap-2">
            <input 
              type="text"
              placeholder="Paste Image URL (e.g. https://images.unsplash.com/...)"
              value={formData.imageUrlInput}
              onChange={(e) => setFormData({ ...formData, imageUrlInput: e.target.value })}
              className="flex-1 text-xs p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
            />
            <button
              type="button"
              onClick={handleAddImageUrl}
              className="bg-gold-zari hover:bg-black text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Add Photo
            </button>
          </div>

          {/* Image Previews */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {imageUrls.map((img, idx) => (
              <div key={idx} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold shadow hover:bg-black"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-crimson hover:bg-gold-zari text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>ADD SAREE TO STORE</span>
          </button>
        </div>

      </form>

    </div>
  );
}
