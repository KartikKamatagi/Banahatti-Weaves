import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Save, ArrowLeft } from 'lucide-react';

export default function EditSaree() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sarees, editSaree } = useCart();

  const targetSaree = sarees.find((s) => s.id === id);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'COTTON',
    fabric: '',
    color: '',
    length: '',
    description: '',
    stock: ''
  });

  useEffect(() => {
    if (targetSaree) {
      setFormData({
        name: targetSaree.name,
        price: targetSaree.price,
        category: targetSaree.category,
        fabric: targetSaree.fabric,
        color: targetSaree.color,
        length: targetSaree.length,
        description: targetSaree.description,
        stock: targetSaree.stock
      });
    }
  }, [targetSaree]);

  if (!targetSaree) {
    return (
      <div className="p-8 text-center space-y-3">
        <h2>Saree not found</h2>
        <button onClick={() => navigate('/admin/sarees')} className="text-crimson font-bold underline">
          Return to Sarees List
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editSaree(id, {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    });
    navigate('/admin/sarees');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans">
      
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/admin/sarees')}
          className="inline-flex items-center gap-1 text-xs font-bold uppercase text-gray-500 hover:text-crimson mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sarees List
        </button>
        <h1 className="font-serif text-3xl font-extrabold text-deep-charcoal">
          Edit Saree Details
        </h1>
        <p className="text-xs text-gray-500">
          Update price, stock, category, or descriptions for <strong>{targetSaree.name}</strong>.
        </p>
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
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
            />
          </div>

          <div>
            <label className="block uppercase font-bold text-deep-charcoal mb-1">
              Stock Quantity *
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
              className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
            />
          </div>

        </div>

        {/* Action Button */}
        <div className="pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/sarees')}
            className="px-6 py-3 rounded-xl border border-gray-300 text-xs font-bold uppercase tracking-wider"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-crimson hover:bg-gold-zari text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>SAVE CHANGES</span>
          </button>
        </div>

      </form>

    </div>
  );
}
