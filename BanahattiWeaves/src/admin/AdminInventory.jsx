import React, { useState } from 'react';
import './admin.css';
import './AdminInventory.css';
import { useCart } from '../context/CartContext';
import { 
  Search, 
  Plus, 
  Minus, 
  Save, 
  CheckCircle 
} from 'lucide-react';

export default function AdminInventory() {
  const { sarees, editSaree } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStockStatus, setFilterStockStatus] = useState('ALL');
  const [stockEdits, setStockEdits] = useState({});
  const [saveMessage, setSaveMessage] = useState('');

  const handleStockChange = (sareeId, currentStock, delta) => {
    const activeVal = stockEdits[sareeId] !== undefined ? stockEdits[sareeId] : currentStock;
    const newVal = Math.max(0, activeVal + delta);
    setStockEdits({
      ...stockEdits,
      [sareeId]: newVal
    });
  };

  const handleStockInputChange = (sareeId, val) => {
    const parsed = parseInt(val, 10);
    setStockEdits({
      ...stockEdits,
      [sareeId]: isNaN(parsed) ? 0 : Math.max(0, parsed)
    });
  };

  const handleSaveStock = (saree) => {
    const updatedQty = stockEdits[saree.id];
    if (updatedQty !== undefined) {
      editSaree(saree.id, {
        ...saree,
        stock: updatedQty
      });
      
      const nextEdits = { ...stockEdits };
      delete nextEdits[saree.id];
      setStockEdits(nextEdits);

      setSaveMessage(`Stock updated for ${saree.name}`);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const filteredSarees = sarees.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.sku && item.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.id && String(item.id).toLowerCase().includes(searchTerm.toLowerCase()));

    const currentQty = stockEdits[item.id] !== undefined ? stockEdits[item.id] : item.stock;

    if (filterStockStatus === 'LOW') return matchesSearch && currentQty > 0 && currentQty <= 5;
    if (filterStockStatus === 'OUT') return matchesSearch && currentQty === 0;
    if (filterStockStatus === 'IN') return matchesSearch && currentQty > 5;
    return matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* SUCCESS BANNER */}
      {saveMessage && (
        <div className="p-3 bg-[#E8F2ED] border border-[#4F806B]/30 text-[#4F806B] rounded text-[13px] font-medium flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* FILTER & SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-[#E5E0D9] rounded-[6px]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStockStatus('ALL')}
            className={`px-3 py-1 rounded text-[13px] font-medium transition-all ${
              filterStockStatus === 'ALL' ? 'bg-[#1E2D29] text-white' : 'bg-[#F7F5F1] text-[#77716B]'
            }`}
          >
            All Items ({sarees.length})
          </button>
          <button
            onClick={() => setFilterStockStatus('LOW')}
            className={`px-3 py-1 rounded text-[13px] font-medium transition-all ${
              filterStockStatus === 'LOW' ? 'bg-[#B9823B] text-white' : 'bg-[#F7F5F1] text-[#77716B]'
            }`}
          >
            Low Stock
          </button>
          <button
            onClick={() => setFilterStockStatus('OUT')}
            className={`px-3 py-1 rounded text-[13px] font-medium transition-all ${
              filterStockStatus === 'OUT' ? 'bg-[#B45454] text-white' : 'bg-[#F7F5F1] text-[#77716B]'
            }`}
          >
            Out of Stock
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#77716B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search SKU or name..."
            className="input-admin w-full pl-9 h-[38px] text-[13px]"
          />
        </div>
      </div>

      {/* CLEAN INVENTORY TABLE */}
      <div className="bg-white border border-[#E5E0D9] rounded-[6px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] text-[#242424]">
            <thead className="bg-[#F7F5F1] text-[12px] font-semibold text-[#77716B] uppercase tracking-[0.05em] border-b border-[#E5E0D9]">
              <tr>
                <th className="py-3 px-4 w-[70px]">Image</th>
                <th className="py-3 px-4">Saree Name</th>
                <th className="py-3 px-4">SKU Code</th>
                <th className="py-3 px-4">Stock Qty</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Adjust Stock</th>
                <th className="py-3 px-4 text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D9]">
              {filteredSarees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#77716B]">
                    No inventory records matching selected criteria.
                  </td>
                </tr>
              ) : (
                filteredSarees.map((item) => {
                  const currentQty = stockEdits[item.id] !== undefined ? stockEdits[item.id] : item.stock;
                  const isDirty = stockEdits[item.id] !== undefined && stockEdits[item.id] !== item.stock;

                  return (
                    <tr key={item.id} className="hover:bg-[#FAF8F5] transition-colors h-[64px]">
                      
                      {/* 48px x 60px Image */}
                      <td className="py-2 px-4">
                        <img 
                          src={item.image || (item.images && item.images[0]) || '/images/sarees/saree_model_maroon_1789668365104.png'} 
                          alt={item.name} 
                          className="w-[48px] h-[60px] object-cover rounded-[4px] border border-[#E5E0D9]" 
                        />
                      </td>

                      {/* Saree Name */}
                      <td className="py-2 px-4 font-medium">
                        <p className="font-medium text-[#242424] max-w-xs truncate">{item.name}</p>
                      </td>

                      {/* SKU */}
                      <td className="py-2 px-4 font-mono text-[#77716B]">
                        {item.sku || `BW-${item.id}`}
                      </td>

                      {/* Current Stock */}
                      <td className="py-2 px-4 font-semibold text-[#242424]">
                        {currentQty}
                      </td>

                      {/* Status Badge */}
                      <td className="py-2 px-4">
                        {currentQty === 0 ? (
                          <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#FBEBEB] text-[#B45454]">
                            Out of Stock
                          </span>
                        ) : currentQty <= 5 ? (
                          <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#F5EFE6] text-[#B9823B]">
                            Low Stock ({currentQty})
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#E8F2ED] text-[#4F806B]">
                            In Stock
                          </span>
                        )}
                      </td>

                      {/* Adjust Stock Controls */}
                      <td className="py-2 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleStockChange(item.id, item.stock, -1)}
                            className="w-7 h-7 bg-white border border-[#D8D2CA] rounded text-[#242424] hover:bg-[#FAF8F5] flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={currentQty}
                            onChange={(e) => handleStockInputChange(item.id, e.target.value)}
                            className="w-12 h-7 text-center font-medium text-[13px] bg-white border border-[#D8D2CA] rounded text-[#242424]"
                          />
                          <button
                            type="button"
                            onClick={() => handleStockChange(item.id, item.stock, 1)}
                            className="w-7 h-7 bg-white border border-[#D8D2CA] rounded text-[#242424] hover:bg-[#FAF8F5] flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-2 px-4 text-right">
                        {isDirty && (
                          <button
                            type="button"
                            onClick={() => handleSaveStock(item)}
                            className="btn-admin-primary h-[32px] px-3 text-[12px]"
                          >
                            Save
                          </button>
                        )}
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
