import React, { useEffect, useState } from 'react';
import { getAboutContent, updateAboutContent, AboutContent, uploadImage } from '../../lib/supabase';
import { FiSave, FiAlertCircle, FiCheckCircle, FiUpload, FiX } from 'react-icons/fi';

const AboutManager: React.FC = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [newExpertise, setNewExpertise] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await getAboutContent();
      setContent(data);
      if (data?.image_url) {
        setImagePreview(data.image_url);
      }
    } catch (error) {
      console.error('Error loading about content:', error);
      setMessage({ type: 'error', text: 'Failed to load content' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setSaving(true);
    setMessage(null);

    try {
      await updateAboutContent(content.id, {
        subtitle: content.subtitle,
        bio_paragraph_1: content.bio_paragraph_1,
        bio_paragraph_2: content.bio_paragraph_2,
        bio_paragraph_3: content.bio_paragraph_3,
        image_url: content.image_url,
        expertise: content.expertise,
      });

      setMessage({ type: 'success', text: 'About content updated successfully!' });
    } catch (error) {
      console.error('Error updating about content:', error);
      setMessage({ type: 'error', text: 'Failed to update content' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !content) return;

    setUploading(true);
    setMessage(null);

    try {
      const fileName = `about-${Date.now()}.${file.name.split('.').pop()}`;
      const publicUrl = await uploadImage('images', fileName, file);

      setContent({ ...content, image_url: publicUrl });
      setImagePreview(publicUrl);
      setMessage({ type: 'success', text: 'Image uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage({ type: 'error', text: 'Failed to upload image' });
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (field: keyof AboutContent, value: string | string[]) => {
    if (!content) return;
    setContent({ ...content, [field]: value });
  };

  const addExpertise = () => {
    if (!content || !newExpertise.trim()) return;
    const updated = [...content.expertise, newExpertise.trim()];
    setContent({ ...content, expertise: updated });
    setNewExpertise('');
  };

  const removeExpertise = (index: number) => {
    if (!content) return;
    const updated = content.expertise.filter((_, i) => i !== index);
    setContent({ ...content, expertise: updated });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">No about content found. Please add content in Supabase.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">About Section</h1>
        <p className="text-gray-600">Manage your about section content</p>
      </div>

      {message && (
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

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
          <div className="flex items-start gap-4">
            {imagePreview && (
              <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <label className="cursor-pointer inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all">
                <FiUpload size={20} />
                <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">Recommended: Square image, at least 800x800px</p>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
          <input
            type="text"
            value={content.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Bio Paragraph 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio Paragraph 1</label>
          <textarea
            value={content.bio_paragraph_1}
            onChange={(e) => handleChange('bio_paragraph_1', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Bio Paragraph 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio Paragraph 2</label>
          <textarea
            value={content.bio_paragraph_2 || ''}
            onChange={(e) => handleChange('bio_paragraph_2', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Bio Paragraph 3 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio Paragraph 3</label>
          <textarea
            value={content.bio_paragraph_3 || ''}
            onChange={(e) => handleChange('bio_paragraph_3', e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Expertise Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expertise</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newExpertise}
              onChange={(e) => setNewExpertise(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
              placeholder="Add expertise..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addExpertise}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {content.expertise.map((item, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeExpertise(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <FiX size={16} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSave size={20} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutManager;
