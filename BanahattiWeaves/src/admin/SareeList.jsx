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
  RefreshCw
} from 'lucide-react';

export default function SareeList() {
  const navigate = useNavigate();
  const { sarees } = useCart();
  
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
        <span className="badge-admin badge-admin-outofstock">
          Out of Stock
        </span>
      );
    }
    if (stock <= 5) {
      return (
        <span className="badge-admin badge-admin-pending">
          Low ({stock} left)
        </span>
      );
    }
    return (
      <span className="badge-admin badge-admin-instock">
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
              placeholder="Search sarees by name, fabric, or color..."
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
      <div className="saree-filter-bar">
        <span className="text-[13px] font-semibold text-[#77716B]">Filter by:</span>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-admin h-[38px] text-[13px] py-0 cursor-pointer"
        >
          <option value="ALL">All Categories</option>
          <option value="COTTON">Cotton Sarees</option>
          <option value="SILK">Silk Sarees</option>
          <option value="TRADITIONAL">Traditional Sarees</option>
        </select>

        <select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          className="input-admin h-[38px] text-[13px] py-0 cursor-pointer"
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
            className="text-[13px] font-medium text-[#8C3E43] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        )}
      </div>

      {/* PREMIUM SAREES TABLE */}
      <div className="saree-table-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-[70px]">Image</th>
                <th>Saree Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSarees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#77716B]">
                    No sarees found matching selected criteria.
                  </td>
                </tr>
              ) : (
                filteredSarees.map((s) => (
                  <tr key={s.id} className="saree-table-row">
                    
                    {/* 48px x 60px Image */}
                    <td>
                      <img 
                        src={s.images?.[0] || '/images/sarees/saree_model_maroon_1789668365104.png'} 
                        alt={s.name} 
                        className="saree-thumb-48x60"
                      />
                    </td>

                    {/* Saree Name & SKU */}
                    <td>
                      <p className="font-semibold text-[#242424] truncate max-w-xs">{s.name}</p>
                      <span className="text-[12px] text-[#77716B] font-mono">SKU: {s.id}</span>
                    </td>

                    {/* Category */}
                    <td className="text-[#77716B] font-medium">
                      {s.category || 'COTTON'}
                    </td>

                    {/* Price */}
                    <td className="font-bold text-[#242424]">
                      ₹{(s.price || 3499).toLocaleString('en-IN')}
                    </td>

                    {/* Stock Count */}
                    <td className="font-semibold">{s.stock}</td>

                    {/* Status Badge with Live Dot */}
                    <td>{renderStockBadge(s.stock)}</td>

                    {/* Action Buttons */}
                    <td className="text-right whitespace-nowrap">
                      <div className="saree-action-btn-group">
                        <button
                          onClick={() => setSelectedSareeView(s)}
                          className="saree-action-view"
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/admin/sarees/edit/${s.id}`)}
                          className="saree-action-edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteTarget(s)}
                          className="saree-action-delete"
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
        <div className="admin-modal-overlay animate-fade-in">
          <div className="admin-modal-container max-w-lg">
            
            <div className="p-5 border-b border-[#E5E0D9] flex justify-between items-center bg-[#FAF8F5]">
              <h3 className="font-semibold text-[16px] text-[#242424]">{selectedSareeView.name}</h3>
              <button onClick={() => setSelectedSareeView(null)} className="text-[#77716B] hover:text-[#242424] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
              <div className="saree-modal-detail-grid">
                <img 
                  src={selectedSareeView.images?.[0] || '/images/sarees/saree_model_maroon_1789668365104.png'} 
                  alt="saree" 
                  className="saree-modal-image" 
                />
                <div className="space-y-1 text-[13px]">
                  <p className="text-[20px] font-bold text-[#8C3E43]">₹{selectedSareeView.price.toLocaleString('en-IN')}</p>
                  <p className="text-[#77716B]">SKU: <span className="font-mono text-[#242424] font-medium">{selectedSareeView.id}</span></p>
                  <p className="text-[#77716B]">Category: <span className="text-[#242424] font-medium">{selectedSareeView.category}</span></p>
                  <p className="text-[#77716B]">Fabric: <span className="text-[#242424] font-medium">{selectedSareeView.fabric}</span></p>
                  <p className="text-[#77716B]">Stock: <span className="text-[#242424] font-medium">{selectedSareeView.stock} remaining</span></p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E0D9]">
                <p className="text-[13px] text-[#524E4A] leading-relaxed">{selectedSareeView.description}</p>
              </div>
            </div>

            <div className="p-4 border-t border-[#E5E0D9] bg-[#FAF8F5] flex justify-end gap-3">
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
        message="Are you sure you want to delete this saree? This action cannot be undone."
      />

    </div>
  );
}
