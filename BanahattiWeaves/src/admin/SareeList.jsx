import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PlusCircle, Edit, Trash2, Search, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function SareeList() {
  const navigate = useNavigate();
  const { sarees, deleteSaree, editSaree } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalId, setDeleteModalId] = useState(null);

  const filteredSarees = sarees.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.fabric.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmDelete = () => {
    if (deleteModalId) {
      deleteSaree(deleteModalId);
      setDeleteModalId(null);
    }
  };

  const sareeToDelete = sarees.find((s) => s.id === deleteModalId);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-deep-charcoal">
            Manage Sarees Catalog
          </h1>
          <p className="text-xs text-gray-500">
            Add, update stock, edit, or remove sarees from your online store.
          </p>
        </div>

        <Link
          to="/admin/sarees/add"
          className="bg-crimson hover:bg-gold-zari text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>ADD NEW SAREE</span>
        </Link>
      </div>

      {/* Search Filter */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <input 
            type="text" 
            placeholder="Search by saree name, fabric or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs p-2.5 pl-9 rounded-xl border border-gray-200 focus:outline-none focus:border-crimson"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>

        <span className="text-xs font-bold text-gray-500 whitespace-nowrap">
          Total: {filteredSarees.length} Sarees
        </span>
      </div>

      {/* Sarees Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-deep-charcoal">
            <thead className="bg-gray-50 uppercase font-bold text-[10px] tracking-wider text-gray-500 border-b border-gray-200">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Saree Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSarees.map((saree) => (
                <tr key={saree.id} className="hover:bg-cream/40 transition-colors">
                  
                  {/* Image */}
                  <td className="p-4">
                    <img 
                      src={saree.images[0]} 
                      alt={saree.name}
                      className="w-12 h-14 object-cover rounded-lg border border-gray-200"
                    />
                  </td>

                  {/* Name */}
                  <td className="p-4">
                    <strong className="font-serif font-bold text-sm block text-deep-charcoal">{saree.name}</strong>
                    <span className="text-[11px] text-gray-400">{saree.fabric}</span>
                  </td>

                  {/* Category */}
                  <td className="p-4">
                    <span className="bg-crimson/10 text-crimson font-bold text-[10px] uppercase px-2.5 py-1 rounded-md">
                      {saree.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4 font-serif font-bold text-crimson text-sm">
                    ₹{saree.price.toLocaleString('en-IN')}
                  </td>

                  {/* Stock inline editor */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        min="0"
                        value={saree.stock}
                        onChange={(e) => editSaree(saree.id, { stock: parseInt(e.target.value) || 0 })}
                        className="w-16 p-1 text-center font-bold border border-gray-300 rounded-lg text-xs"
                      />
                      <span className="text-[10px] text-gray-400">units</span>
                    </div>
                  </td>

                  {/* Actions: Edit & Delete */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/sarees/edit/${saree.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Saree"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => setDeleteModalId(saree.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Saree"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-serif font-bold text-lg text-deep-charcoal">Confirm Delete</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-crimson">"{sareeToDelete?.name}"</strong>? This will remove the saree from the store.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteModalId(null)}
                className="px-4 py-2 text-xs font-bold uppercase text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 text-xs font-bold uppercase bg-red-600 hover:bg-red-700 text-white rounded-xl shadow"
              >
                Delete Saree
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
