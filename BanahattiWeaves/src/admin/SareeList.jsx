import React, { useState, useMemo } from 'react';
import './admin.css';
import './SareeList.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import DeleteConfirmModal from './DeleteConfirmModal';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit3, 
  Trash2, 
  X,
  Star,
  RefreshCw
} from 'lucide-react';

export default function SareeList() {
  const navigate = useNavigate();
  const { sarees, editSaree } = useCart();
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStock, setSelectedStock] = useState('ALL');

  // Modal State
  const [selectedSareeView, setSelectedSareeView] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Filter logic
  const filteredSarees = useMemo(() => {
    return sarees.filter((saree) => {
      if (selectedCategory !== 'ALL' && saree.category !== selectedCategory) return false;
      if (selectedStock === 'IN_STOCK' && saree.stock <= 5) return false;
      if (selectedStock === 'LOW_STOCK' && (saree.stock > 5 || saree.stock === 0)) return false;
      if (selectedStock === 'OUT_OF_STOCK' && saree.stock > 0) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = saree.name.toLowerCase().includes(q);
        const matchesFabric = saree.fabric?.toLowerCase().includes(q);
        const matchesColor = saree.color?.toLowerCase().includes(q);
        if (!matchesName && !matchesFabric && !matchesColor) return false;
      }
      return true;
    });
  }, [sarees, selectedCategory, selectedStock, searchTerm]);

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setDeleteTarget(null);
    }
  };

  const renderStockBadge = (stock) => {
    if (stock === 0) {
      return (
        <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#FBEBEB] text-[#B45454]">
          Out of Stock
        </span>
      );
    }
    if (stock <= 5) {
      return (
        <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#F5EFE6] text-[#B9823B]">
          Low ({stock} left)
        </span>
      );
    }
    return (
      <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#E8F2ED] text-[#4F806B]">
        In Stock ({stock})
      </span>
    );
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* TOP CONTROLS & ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-1 max-w-lg items-center gap-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77716B]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sarees..."
              className="input-admin w-full pl-9"
            />
          </div>
        </div>

        <button
          onClick={() => navigate('/admin/sarees/add')}
          className="btn-admin-primary flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Saree</span>
        </button>
      </div>

      {/* FILTERS ROW */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 border border-[#E5E0D9] rounded-[6px]">
        <span className="text-[13px] font-medium text-[#77716B]">Filter by:</span>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-admin h-[38px] text-[13px] py-0"
        >
          <option value="ALL">All Categories</option>
          <option value="COTTON">Cotton Sarees</option>
          <option value="SILK">Silk Sarees</option>
          <option value="TRADITIONAL">Traditional Sarees</option>
        </select>

        <select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          className="input-admin h-[38px] text-[13px] py-0"
        >
          <option value="ALL">All Stock Statuses</option>
          <option value="IN_STOCK">In Stock (&gt;5)</option>
          <option value="LOW_STOCK">Low Stock (&le;5)</option>
          <option value="OUT_OF_STOCK">Out of Stock (0)</option>
        </select>

        {(selectedCategory !== 'ALL' || selectedStock !== 'ALL' || searchTerm) && (
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedStock('ALL');
              setSearchTerm('');
            }}
            className="text-[13px] font-medium text-[#9A6863] hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        )}
      </div>

      {/* PREMIUM SAREES TABLE */}
      <div className="bg-white border border-[#E5E0D9] rounded-[6px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] text-[#242424]">
            <thead className="bg-[#F7F5F1] text-[12px] font-semibold text-[#77716B] uppercase tracking-[0.05em] border-b border-[#E5E0D9]">
              <tr>
                <th className="py-3 px-4 w-[70px]">Image</th>
                <th className="py-3 px-4">Saree Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D9]">
              {filteredSarees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#77716B]">
                    No sarees found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredSarees.map((s) => (
                  <tr key={s.id} className="hover:bg-[#FAF8F5] transition-colors h-[64px]">
                    
                    {/* 48px x 60px Image */}
                    <td className="py-2 px-4">
                      <img 
                        src={s.images?.[0] || '/images/sarees/saree_model_maroon_1789668365104.png'} 
                        alt={s.name} 
                        className="w-[48px] h-[60px] object-cover rounded-[4px] border border-[#E5E0D9]"
                      />
                    </td>

                    {/* Saree Name & SKU */}
                    <td className="py-2 px-4">
                      <p className="font-medium text-[#242424] truncate max-w-xs">{s.name}</p>
                      <span className="text-[12px] text-[#77716B] font-mono">SKU: {s.id}</span>
                    </td>

                    {/* Category */}
                    <td className="py-2 px-4 text-[#77716B]">
                      {s.category || 'COTTON'}
                    </td>

                    {/* Price */}
                    <td className="py-2 px-4 font-semibold text-[#242424]">
                      ₹{(s.price || 3499).toLocaleString('en-IN')}
                    </td>

                    {/* Stock Count */}
                    <td className="py-2 px-4 font-medium">{s.stock}</td>

                    {/* Status Badge */}
                    <td className="py-2 px-4">{renderStockBadge(s.stock)}</td>

                    {/* Subtle Text Actions */}
                    <td className="py-2 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-3 text-[13px] font-medium">
                        <button
                          onClick={() => setSelectedSareeView(s)}
                          className="text-[#77716B] hover:text-[#242424]"
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/admin/sarees/edit/${s.id}`)}
                          className="text-[#9A6863] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(s)}
                          className="text-[#B45454] hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SAREE DETAILS MODAL */}
      {selectedSareeView && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[8px] border border-[#E5E0D9] shadow-lg max-w-lg w-full overflow-hidden text-sm">
            
            <div className="p-5 border-b border-[#E5E0D9] flex justify-between items-center bg-[#F7F5F1]">
              <h3 className="font-semibold text-[16px] text-[#242424]">{selectedSareeView.name}</h3>
              <button onClick={() => setSelectedSareeView(null)} className="text-[#77716B] hover:text-[#242424]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                <img 
                  src={selectedSareeView.images?.[0] || '/images/sarees/saree_model_maroon_1789668365104.png'} 
                  alt="saree" 
                  className="w-[90px] h-[115px] object-cover rounded border border-[#E5E0D9]" 
                />
                <div className="space-y-1 text-[13px]">
                  <p className="text-[18px] font-bold text-[#242424]">₹{selectedSareeView.price.toLocaleString('en-IN')}</p>
                  <p className="text-[#77716B]">SKU: {selectedSareeView.id}</p>
                  <p className="text-[#77716B]">Category: {selectedSareeView.category}</p>
                  <p className="text-[#77716B]">Fabric: {selectedSareeView.fabric}</p>
                  <p className="text-[#77716B]">Stock: {selectedSareeView.stock} remaining</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E0D9]">
                <p className="text-[13px] text-[#77716B] leading-relaxed">{selectedSareeView.description}</p>
              </div>
            </div>

            <div className="p-4 border-t border-[#E5E0D9] bg-[#F7F5F1] flex justify-end gap-3">
              <button onClick={() => setSelectedSareeView(null)} className="btn-admin-secondary h-[38px] text-[13px]">
                Close
              </button>
              <button 
                onClick={() => {
                  navigate(`/admin/sarees/edit/${selectedSareeView.id}`);
                  setSelectedSareeView(null);
                }}
                className="btn-admin-primary h-[38px] text-[13px]"
              >
                Edit Saree
              </button>
            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Saree?"
        message="This action cannot be undone."
      />

    </div>
  );
}
