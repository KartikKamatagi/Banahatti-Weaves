import React, { useState } from 'react';
import './admin.css';
import './AdminCategories.css';
import { 
  FolderTree, 
  Plus, 
  Search, 
  X,
  Package
} from 'lucide-react';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function AdminCategories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Cotton Sarees',
      slug: 'cotton-sarees',
      description: 'Authentic pure cotton Banahatti handloom sarees crafted for daily elegance.',
      productCount: 14,
      image: '/images/sarees/saree_model_maroon_1789668365104.png',
      isActive: true,
    },
    {
      id: 2,
      name: 'Silk Sarees',
      slug: 'silk-sarees',
      description: 'Luxurious Mulberry and Silk-Cotton sarees with gold zari borders.',
      productCount: 8,
      image: '/images/sarees/saree_model_purple_1789668387478.png',
      isActive: true,
    },
    {
      id: 3,
      name: 'Traditional Sarees',
      slug: 'traditional-sarees',
      description: 'Heritage Chikki Paras and Kasuti embroidery inspired handlooms.',
      productCount: 11,
      image: '/images/sarees/saree_model_blue_1789668405492.png',
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
    image: '/images/sarees/saree_model_maroon_1789668365104.png',
    isActive: true
  });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '/images/sarees/saree_model_maroon_1789668365104.png',
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
      
      {/* ACTION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-[#E5E0D9] rounded-[6px]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77716B]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories..."
            className="input-admin w-full pl-9 h-[38px] text-[13px]"
          />
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-admin-primary flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* CATEGORIES TABLE */}
      <div className="bg-white border border-[#E5E0D9] rounded-[6px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] text-[#242424]">
            <thead className="bg-[#F7F5F1] text-[12px] font-semibold text-[#77716B] uppercase tracking-[0.05em] border-b border-[#E5E0D9]">
              <tr>
                <th className="py-3 px-4 w-[70px]">Banner</th>
                <th className="py-3 px-4">Category Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Products</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D9]">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-[#77716B]">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#FAF8F5] transition-colors h-[64px]">
                    
                    {/* Image */}
                    <td className="py-2 px-4">
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-[48px] h-[60px] object-cover rounded-[4px] border border-[#E5E0D9]" 
                      />
                    </td>

                    {/* Category Name & Description */}
                    <td className="py-2 px-4">
                      <p className="font-medium text-[#242424]">{cat.name}</p>
                      <p className="text-[12px] text-[#77716B] truncate max-w-xs">{cat.description}</p>
                    </td>

                    {/* Slug */}
                    <td className="py-2 px-4 font-mono text-[#77716B]">
                      /{cat.slug}
                    </td>

                    {/* Products Count */}
                    <td className="py-2 px-4 font-semibold text-[#242424]">
                      {cat.productCount} Sarees
                    </td>

                    {/* Status */}
                    <td className="py-2 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#E8F2ED] text-[#4F806B]">
                        Active
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-2 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(cat)}
                          className="px-2.5 py-1 text-[12px] font-semibold text-white bg-[#8C3E43] hover:bg-[#743237] rounded-md transition-colors shadow-2xs cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingCategory(cat)}
                          className="px-2.5 py-1 text-[12px] font-semibold text-white bg-[#D32F2F] hover:bg-[#B71C1C] rounded-md transition-colors shadow-2xs cursor-pointer"
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

      {/* ADD / EDIT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[8px] border border-[#E5E0D9] shadow-lg w-full max-w-md overflow-hidden text-sm">
            <div className="p-5 border-b border-[#E5E0D9] flex justify-between items-center bg-[#F7F5F1]">
              <h3 className="font-semibold text-[16px] text-[#242424]">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-[#77716B] hover:text-[#242424]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#242424] mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-admin w-full"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#242424] mb-1">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="input-admin w-full font-mono"
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#242424] mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="textarea-admin w-full"
                />
              </div>

              <div className="pt-4 border-t border-[#E5E0D9] flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-admin-secondary h-[38px] text-[13px]">
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary h-[38px] text-[13px]">
                  {editingCategory ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingCategory)}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Category?"
        message={`Are you sure you want to delete "${deletingCategory?.name}"?`}
      />

    </div>
  );
}
