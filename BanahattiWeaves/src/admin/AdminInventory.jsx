import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Package, 
  Search, 
  Plus, 
  Minus, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Save, 
  RotateCcw,
  Sparkles
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
      
      // Clear edit buffer for this saree
      const nextEdits = { ...stockEdits };
      delete nextEdits[saree.id];
      setStockEdits(nextEdits);

      setSaveMessage(`Updated stock for ${saree.name} to ${updatedQty} units`);
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

  const lowStockCount = sarees.filter(s => (stockEdits[s.id] ?? s.stock) > 0 && (stockEdits[s.id] ?? s.stock) <= 5).length;
  const outOfStockCount = sarees.filter(s => (stockEdits[s.id] ?? s.stock) === 0).length;
  const inStockCount = sarees.filter(s => (stockEdits[s.id] ?? s.stock) > 5).length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#242424]">Inventory Stock Management</h1>
          <p className="text-xs text-[#77716B] mt-0.5">Real-time stock adjustment, reorder thresholds, and warehouse availability</p>
        </div>
      </div>

      {/* Success Notification Banner */}
      {saveMessage && (
        <div className="p-4 bg-[#3D8065]/10 border border-[#3D8065]/30 text-[#3D8065] rounded-xl text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <span className="text-xs font-semibold text-[#77716B]">Total Inventory Items</span>
          <p className="text-2xl font-bold text-[#242424] font-serif mt-1">{sarees.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <span className="text-xs font-semibold text-[#77716B]">Well Stocked (&gt; 5)</span>
          <p className="text-2xl font-bold text-[#3D8065] font-serif mt-1">{inStockCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <span className="text-xs font-semibold text-[#77716B]">Low Stock Alert (&le; 5)</span>
          <p className="text-2xl font-bold text-[#C58A3A] font-serif mt-1">{lowStockCount}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <span className="text-xs font-semibold text-[#77716B]">Out of Stock (0)</span>
          <p className="text-2xl font-bold text-[#B84A4A] font-serif mt-1">{outOfStockCount}</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilterStockStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterStockStatus === 'ALL' ? 'bg-[#1F2926] text-white' : 'bg-[#F7F6F3] text-[#77716B]'
            }`}
          >
            All Items ({sarees.length})
          </button>
          <button
            onClick={() => setFilterStockStatus('LOW')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterStockStatus === 'LOW' ? 'bg-[#C58A3A] text-white' : 'bg-[#F7F6F3] text-[#77716B]'
            }`}
          >
            Low Stock ({lowStockCount})
          </button>
          <button
            onClick={() => setFilterStockStatus('OUT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterStockStatus === 'OUT' ? 'bg-[#B84A4A] text-white' : 'bg-[#F7F6F3] text-[#77716B]'
            }`}
          >
            Out of Stock ({outOfStockCount})
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#77716B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by SKU or saree name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] focus:outline-none focus:border-[#1F2926]"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-[#E5E1DB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#242424]">
            <thead className="bg-[#F7F6F3] border-b border-[#E5E1DB] text-[10px] font-bold text-[#77716B] uppercase tracking-wider">
              <tr>
                <th className="p-4">Saree Product</th>
                <th className="p-4">SKU Code</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Quick Stock Adjuster</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E1DB]">
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
                    <tr key={item.id} className="hover:bg-[#F7F6F3]/50 transition-colors">
                      
                      {/* Product */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.image || (item.images && item.images[0]) || '/images/sarees/saree_model_maroon_1789668365104.png'} 
                            alt={item.name} 
                            className="w-9 h-11 object-cover rounded border border-[#E5E1DB]" 
                          />
                          <div>
                            <p className="font-semibold text-[#242424] max-w-[200px] truncate">{item.name}</p>
                            <span className="text-[10px] text-[#77716B]">{item.fabric || 'Pure Handloom Cotton'}</span>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="p-4 font-mono text-[#9A6863]">
                        {item.sku || `BW-${item.id}`}
                      </td>

                      {/* Category */}
                      <td className="p-4 text-[#77716B]">
                        {item.category}
                      </td>

                      {/* Price */}
                      <td className="p-4 font-serif font-bold text-[#242424]">
                        ₹{item.price?.toLocaleString('en-IN')}
                      </td>

                      {/* Stock Status */}
                      <td className="p-4">
                        {currentQty === 0 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#B84A4A]/10 text-[#B84A4A] px-2 py-0.5 rounded">
                            <XCircle className="w-3 h-3" /> OUT OF STOCK
                          </span>
                        ) : currentQty <= 5 ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#C58A3A]/10 text-[#C58A3A] px-2 py-0.5 rounded">
                            <AlertTriangle className="w-3 h-3" /> LOW STOCK ({currentQty})
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#3D8065]/10 text-[#3D8065] px-2 py-0.5 rounded">
                            <CheckCircle className="w-3 h-3" /> IN STOCK ({currentQty})
                          </span>
                        )}
                      </td>

                      {/* Quick Adjuster */}
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleStockChange(item.id, item.stock, -1)}
                            className="w-7 h-7 bg-white border border-[#E5E1DB] rounded-md text-[#77716B] hover:text-[#242424] hover:bg-[#F7F6F3] flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={currentQty}
                            onChange={(e) => handleStockInputChange(item.id, e.target.value)}
                            className="w-14 py-1 text-center font-bold text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-md text-[#242424]"
                          />
                          <button
                            onClick={() => handleStockChange(item.id, item.stock, 1)}
                            className="w-7 h-7 bg-white border border-[#E5E1DB] rounded-md text-[#77716B] hover:text-[#242424] hover:bg-[#F7F6F3] flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Action */}
                      <td className="p-4 text-right">
                        {isDirty && (
                          <button
                            onClick={() => handleSaveStock(item)}
                            className="px-3 py-1.5 bg-[#3D8065] text-white rounded-lg text-xs font-semibold hover:bg-[#3D8065]/90 inline-flex items-center gap-1 cursor-pointer shadow-xs"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save</span>
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
