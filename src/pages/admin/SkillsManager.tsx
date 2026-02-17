import React, { useEffect, useState } from 'react';
import {
  getSkillCategories,
  createSkillCategory,
  createSkill,
  updateSkill,
  deleteSkill,
  SkillCategory,
  Skill,
} from '../../lib/supabase';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const SkillsManager: React.FC = () => {
  const [categories, setCategories] = useState<(SkillCategory & { skills: Skill[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getSkillCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      await createSkillCategory({
        title: newCategoryName,
        order: categories.length,
      });
      setNewCategoryName('');
      await loadCategories();
      setMessage({ type: 'success', text: 'Category added successfully!' });
    } catch (error) {
      console.error('Error adding category:', error);
      setMessage({ type: 'error', text: 'Failed to add category' });
    }
  };

  const handleOpenModal = (categoryId: string, skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
    } else {
      const category = categories.find((c) => c.id === categoryId);
      setEditingSkill({
        category_id: categoryId,
        name: '',
        icon_name: 'FiCode',
        color: '#3B82F6',
        order: category?.skills.length || 0,
      });
    }
    setIsModalOpen(true);
    setMessage(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
  };

  const handleSaveSkill = async () => {
    if (!editingSkill || !editingSkill.name || !editingSkill.icon_name || !editingSkill.color) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      if (editingSkill.id) {
        await updateSkill(editingSkill.id, editingSkill as Skill);
        setMessage({ type: 'success', text: 'Skill updated successfully!' });
      } else {
        await createSkill(editingSkill as Omit<Skill, 'id' | 'created_at' | 'updated_at'>);
        setMessage({ type: 'success', text: 'Skill created successfully!' });
      }

      await loadCategories();
      setTimeout(() => handleCloseModal(), 1500);
    } catch (error) {
      console.error('Error saving skill:', error);
      setMessage({ type: 'error', text: 'Failed to save skill' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      await deleteSkill(id);
      await loadCategories();
      setMessage({ type: 'success', text: 'Skill deleted successfully!' });
    } catch (error) {
      console.error('Error deleting skill:', error);
      setMessage({ type: 'error', text: 'Failed to delete skill' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Skills</h1>
        <p className="text-gray-600">Manage your skills and categories</p>
      </div>

      {message && !isModalOpen && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
            message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
          ) : (
            <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
          )}
          <p className={`text-sm ${message.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
            {message.text}
          </p>
        </div>
      )}

      {/* Add Category */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Category</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            placeholder="Category name (e.g., Frontend Development)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAddCategory}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            <FiPlus size={20} />
            Add Category
          </button>
        </div>
      </div>

      {/* Categories and Skills */}
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{category.title}</h2>
              <button
                onClick={() => handleOpenModal(category.id)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all text-sm"
              >
                <FiPlus size={16} />
                Add Skill
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {category.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl"
                      style={{ backgroundColor: skill.color }}
                    >
                      {skill.icon_name.substring(0, 2)}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenModal(category.id, skill)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-800 truncate">{skill.name}</p>
                  <p className="text-xs text-gray-500 truncate">{skill.icon_name}</p>
                </div>
              ))}
            </div>

            {category.skills.length === 0 && (
              <p className="text-gray-500 text-center py-8">No skills in this category yet</p>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && editingSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingSkill.id ? 'Edit Skill' : 'Add Skill'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <FiX size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {message && (
                <div
                  className={`p-4 rounded-lg flex items-start gap-3 ${
                    message.type === 'success'
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  {message.type === 'success' ? (
                    <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                  ) : (
                    <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
                  )}
                  <p className={`text-sm ${message.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                    {message.text}
                  </p>
                </div>
              )}

              {/* Skill Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skill Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingSkill.name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., React"
                  required
                />
              </div>

              {/* Icon Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editingSkill.icon_name || ''}
                  onChange={(e) => setEditingSkill({ ...editingSkill, icon_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., FaReact, SiTypescript"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use icon names from react-icons (e.g., FaReact, SiNextdotjs)
                </p>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={editingSkill.color || '#3B82F6'}
                    onChange={(e) => setEditingSkill({ ...editingSkill, color: e.target.value })}
                    className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={editingSkill.color || ''}
                    onChange={(e) => setEditingSkill({ ...editingSkill, color: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="#3B82F6"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSkill}
                disabled={saving}
                className="flex items-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSave size={20} />
                {saving ? 'Saving...' : 'Save Skill'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;
