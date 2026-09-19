import React, { useState } from 'react';
import { 
  FolderTree, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Package, 
  CheckCircle, 
  XCircle, 
  Image as ImageIcon,
  X,
  Layers,
  Sparkles
} from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function AdminCategories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Cotton Sarees',
      slug: 'cotton-sarees',
      description: 'Authentic pure cotton Banahatti handloom sarees crafted for lightweight comfort and daily elegance.',
      productCount: 14,
      image: '/images/sarees/saree_model_maroon_1789668365104.png',
      isFeatured: true,
      isActive: true,
    },
    {
      id: 2,
      name: 'Silk Sarees',
      slug: 'silk-sarees',
      description: 'Luxurious Mulberry and Silk-Cotton sarees with intricate gold zari borders for festive celebrations.',
      productCount: 8,
      image: '/images/sarees/saree_model_purple_1789668387478.png',
      isFeatured: true,
      isActive: true,
    },
    {
      id: 3,
      name: 'Traditional Sarees',
      slug: 'traditional-sarees',
      description: 'Heritage Chikki Paras and Kasuti embroidery inspired handlooms passed down through generations.',
      productCount: 11,
      image: '/images/sarees/saree_model_blue_1789668405492.png',
      isFeatured: true,
      isActive: true,
    },
    {
      id: 4,
      name: 'Festive & Bridal',
      slug: 'festive-bridal',
      description: 'Grand occasion handloom sarees with rich zari weave patterns, pallus, and rich temple borders.',
      productCount: 6,
      image: '/images/sarees/saree_model_magenta_grid_1789755709147.jpg',
      isFeatured: false,
      isActive: true,
    },
    {
      id: 5,
      name: 'New Arrivals',
      slug: 'new-arrivals',
      description: 'Fresh off the handloom frames - latest modern weaves and seasonal color palettes.',
      productCount: 9,
      image: '/images/sarees/saree_model_emerald_green_1789755773551.jpg',
      isFeatured: true,
      isActive: true,
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    isFeatured: false,
    isActive: true
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '/images/sarees/saree_model_blue_gingham_1789755799573.jpg',
      isFeatured: false,
      isActive: true
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      isFeatured: cat.isFeatured,
      isActive: cat.isActive
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const generatedSlug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');

    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? {
        ...c,
        ...formData,
        slug: generatedSlug
      } : c));
    } else {
      const newCat = {
        id: Date.now(),
        ...formData,
        slug: generatedSlug,
        productCount: 0
      };
      setCategories([...categories, newCat]);
    }

    setIsAddModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingCategory) {
      setCategories(categories.filter(c => c.id !== deletingCategory.id));
      setDeletingCategory(null);
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Controls & Action Bar */}
      <div className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#242424]">Saree Categories</h1>
          <p className="text-xs text-[#77716B] mt-0.5">Organize store collections, fabric types, and occasion categories</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-[#1F2926] text-white rounded-lg text-xs font-semibold hover:bg-[#2A3733] shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW CATEGORY</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#77716B]">Total Categories</span>
            <FolderTree className="w-4 h-4 text-[#9A6863]" />
          </div>
          <p className="text-2xl font-bold text-[#242424] font-serif mt-2">{categories.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#77716B]">Active Categories</span>
            <CheckCircle className="w-4 h-4 text-[#3D8065]" />
          </div>
          <p className="text-2xl font-bold text-[#242424] font-serif mt-2">
            {categories.filter(c => c.isActive).length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#77716B]">Featured Collections</span>
            <Sparkles className="w-4 h-4 text-[#C58A3A]" />
          </div>
          <p className="text-2xl font-bold text-[#242424] font-serif mt-2">
            {categories.filter(c => c.isFeatured).length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#77716B]">Categorized Sarees</span>
            <Package className="w-4 h-4 text-[#1F2926]" />
          </div>
          <p className="text-2xl font-bold text-[#242424] font-serif mt-2">
            {categories.reduce((acc, c) => acc + c.productCount, 0)}
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77716B]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search category by name or description..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] placeholder-[#77716B] focus:outline-none focus:border-[#1F2926]"
          />
        </div>
        <span className="text-xs font-medium text-[#77716B]">
          Showing {filteredCategories.length} of {categories.length} categories
        </span>
      </div>

      {/* Categories Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat) => (
          <div 
            key={cat.id} 
            className="bg-white rounded-xl border border-[#E5E1DB] shadow-xs overflow-hidden flex flex-col justify-between group hover:border-[#9A6863]/40 transition-all"
          >
            {/* Card Header & Image */}
            <div>
              <div className="relative h-44 bg-[#F7F6F3] overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {cat.isFeatured && (
                    <span className="text-[10px] font-bold bg-[#9A6863] text-white px-2 py-0.5 rounded shadow-xs">
                      FEATURED
                    </span>
                  )}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-xs ${
                    cat.isActive ? 'bg-[#3D8065] text-white' : 'bg-[#77716B] text-white'
                  }`}>
                    {cat.isActive ? 'ACTIVE' : 'HIDDEN'}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-[#242424]">{cat.name}</h3>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1F2926] bg-[#F7F6F3] border border-[#E5E1DB] px-2.5 py-1 rounded-full">
                    <Package className="w-3 h-3 text-[#9A6863]" />
                    {cat.productCount} Sarees
                  </span>
                </div>

                <p className="text-xs font-mono text-[#9A6863]">/{cat.slug}</p>

                <p className="text-xs text-[#77716B] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 border-t border-[#E5E1DB] bg-[#F7F6F3]/50 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(cat)}
                className="px-3 py-1.5 text-xs font-semibold text-[#1F2926] bg-white border border-[#E5E1DB] rounded-lg hover:bg-[#F7F6F3] flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setDeletingCategory(cat)}
                className="px-3 py-1.5 text-xs font-semibold text-[#B84A4A] bg-white border border-[#B84A4A]/20 rounded-lg hover:bg-[#B84A4A]/10 flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT CATEGORY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl border border-[#E5E1DB] shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E5E1DB] flex justify-between items-center bg-[#F7F6F3]">
              <h2 className="font-serif text-lg font-bold text-[#242424]">
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#77716B] hover:text-[#242424] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#77716B] mb-1">
                  CATEGORY NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Silk Sarees"
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] focus:outline-none focus:border-[#1F2926]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#77716B] mb-1">
                  URL SLUG (AUTO-GENERATED IF BLANK)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="silk-sarees"
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg font-mono text-[#242424]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#77716B] mb-1">
                  BANNER / THUMBNAIL IMAGE URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/sarees/..."
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#77716B] mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of sarees in this collection..."
                  className="w-full p-3 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] focus:outline-none focus:border-[#1F2926]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-[#242424] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 accent-[#1F2926]"
                  />
                  Featured Collection
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold text-[#242424] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 accent-[#1F2926]"
                  />
                  Active Status
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E5E1DB] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#77716B] bg-white border border-[#E5E1DB] rounded-lg hover:bg-[#F7F6F3]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#1F2926] rounded-lg hover:bg-[#2A3733] shadow-xs"
                >
                  {editingCategory ? 'SAVE CHANGES' : 'CREATE CATEGORY'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deletingCategory && (
        <DeleteConfirmModal
          isOpen={!!deletingCategory}
          title="Delete Category"
          message={`Are you sure you want to delete the category "${deletingCategory.name}"? Sarees assigned to this category will not be deleted.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingCategory(null)}
        />
      )}

    </div>
  );
}
