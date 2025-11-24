import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  Eye,
  FileText,
  X,
  Check,
  AlertCircle,
  Users,
  Gift
} from 'lucide-react';
import api from '../../utils/axios';

const AdminSchemes = () => {
  const { t } = useTranslation();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    title_mr: '',
    title_hi: '',
    description: '',
    description_mr: '',
    description_hi: '',
    eligibility: '',
    eligibility_mr: '',
    eligibility_hi: '',
    benefits: '',
    benefits_mr: '',
    benefits_hi: '',
    category: 'agriculture',
    image: null,
    applicationLink: '',
    lastDate: '',
    contactPerson: '',
    contactPhone: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const categories = [
    { value: 'agriculture', label: 'कृषी' },
    { value: 'education', label: 'शिक्षण' },
    { value: 'health', label: 'आरोग्य' },
    { value: 'housing', label: 'घरे' },
    { value: 'employment', label: 'रोजगार' },
    { value: 'welfare', label: 'कल्याण' },
    { value: 'infrastructure', label: 'पायाभूत सुविधा' },
    { value: 'other', label: 'इतर' }
  ];

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      const response = await api.get('/schemes');
      setSchemes(response.data.data || []);
    } catch (error) {
      console.error('Error fetching schemes:', error);
      setErrors({ general: 'योजना मिळवताना त्रुटी आली' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    setSuccess('');

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('title_mr', formData.title_mr);
      data.append('title_hi', formData.title_hi);
      data.append('description', formData.description);
      data.append('description_mr', formData.description_mr);
      data.append('description_hi', formData.description_hi);
      data.append('eligibility', formData.eligibility);
      data.append('eligibility_mr', formData.eligibility_mr);
      data.append('eligibility_hi', formData.eligibility_hi);
      data.append('benefits', formData.benefits);
      data.append('benefits_mr', formData.benefits_mr);
      data.append('benefits_hi', formData.benefits_hi);
      data.append('category', formData.category);
      data.append('applicationLink', formData.applicationLink);
      data.append('lastDate', formData.lastDate);
      data.append('contactPerson', formData.contactPerson);
      data.append('contactPhone', formData.contactPhone);

      if (formData.image) {
        data.append('image', formData.image);
      }

      if (selectedScheme) {
        await api.put(`/schemes/${selectedScheme._id}`, data);
        setSuccess('योजना यशस्वीरित्या अपडेट केली');
      } else {
        await api.post('/schemes', data);
        setSuccess('योजना यशस्वीरित्या जोडली');
      }

      fetchSchemes();
      setShowAddModal(false);
      setShowEditModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving scheme:', error);
      setErrors({ general: error.response?.data?.message || 'योजना सेव करताना त्रुटी आली' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('तुम्हाला ही योजना हटवायची आहे का?')) return;

    try {
      await api.delete(`/schemes/${id}`);
      setSuccess('योजना यशस्वीरित्या हटवली');
      fetchSchemes();
    } catch (error) {
      console.error('Error deleting scheme:', error);
      setErrors({ general: 'योजना हटवताना त्रुटी आली' });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      title_mr: '',
      title_hi: '',
      description: '',
      description_mr: '',
      description_hi: '',
      eligibility: '',
      eligibility_mr: '',
      eligibility_hi: '',
      benefits: '',
      benefits_mr: '',
      benefits_hi: '',
      category: 'agriculture',
      image: null,
      applicationLink: '',
      lastDate: '',
      contactPerson: '',
      contactPhone: ''
    });
    setSelectedScheme(null);
    setErrors({});
  };

  const handleEdit = (scheme) => {
    setSelectedScheme(scheme);
    setFormData({
      title: scheme.title || '',
      title_mr: scheme.title_mr || '',
      title_hi: scheme.title_hi || '',
      description: scheme.description || '',
      description_mr: scheme.description_mr || '',
      description_hi: scheme.description_hi || '',
      eligibility: scheme.eligibility || '',
      eligibility_mr: scheme.eligibility_mr || '',
      eligibility_hi: scheme.eligibility_hi || '',
      benefits: scheme.benefits || '',
      benefits_mr: scheme.benefits_mr || '',
      benefits_hi: scheme.benefits_hi || '',
      category: scheme.category || 'agriculture',
      image: null,
      applicationLink: scheme.applicationLink || '',
      lastDate: scheme.lastDate ? new Date(scheme.lastDate).toISOString().split('T')[0] : '',
      contactPerson: scheme.contactPerson || '',
      contactPhone: scheme.contactPhone || ''
    });
    setShowEditModal(true);
  };

  const filteredSchemes = schemes.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.title_mr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const isLastDateExpiring = (lastDate) => {
    if (!lastDate) return false;
    const today = new Date();
    const last = new Date(lastDate);
    const diffTime = last - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          योजना व्यवस्थापन
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>योजना जोडा</span>
        </button>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
          <Check className="w-5 h-5 mr-2" />
          {success}
        </div>
      )}

      {errors.general && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {errors.general}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="योजना शोधा..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">सर्व श्रेण्या</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Schemes List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  योजना
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  श्रेणी
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  अंतिम तारीख
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  स्थिती
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  क्रिया
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSchemes.length > 0 ? (
                filteredSchemes.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.title_mr || item.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {item.description_mr?.substring(0, 100) || item.description?.substring(0, 100)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {categories.find(cat => cat.value === item.category)?.label || item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {item.lastDate ? (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(item.lastDate).toLocaleDateString('mr-IN')}
                          {isLastDateExpiring(item.lastDate) && (
                            <span className="ml-2 px-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                              लवकरच संपत आहे
                            </span>
                          )}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {item.isActive ? 'सक्रिय' : 'निष्क्रिय'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    कोणत्याही योजना आढळल्या नाहीत
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedScheme ? 'योजना संपादित करा' : 'नवीन योजना जोडा'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Language Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  <button
                    type="button"
                    className="py-2 px-1 border-b-2 border-blue-500 font-medium text-sm text-blue-600"
                  >
                    इंग्रजी
                  </button>
                  <button
                    type="button"
                    className="py-2 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                    मराठी
                  </button>
                  <button
                    type="button"
                    className="py-2 px-1 border-b-2 border-transparent font-medium text-sm text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  >
                    हिंदी
                  </button>
                </nav>
              </div>

              {/* English Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  योजनेचे नाव (इंग्रजी) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  योजनेचे नाव (मराठी)
                </label>
                <input
                  type="text"
                  value={formData.title_mr}
                  onChange={(e) => setFormData({...formData, title_mr: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  योजनेचे नाव (हिंदी)
                </label>
                <input
                  type="text"
                  value={formData.title_hi}
                  onChange={(e) => setFormData({...formData, title_hi: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  वर्णन (इंग्रजी) *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  वर्णन (मराठी)
                </label>
                <textarea
                  value={formData.description_mr}
                  onChange={(e) => setFormData({...formData, description_mr: e.target.value})}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  वर्णन (हिंदी)
                </label>
                <textarea
                  value={formData.description_hi}
                  onChange={(e) => setFormData({...formData, description_hi: e.target.value})}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Eligibility and Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Users className="w-4 h-4 inline mr-1" />
                    पात्रता (इंग्रजी)
                  </label>
                  <textarea
                    value={formData.eligibility}
                    onChange={(e) => setFormData({...formData, eligibility: e.target.value})}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="कोण पात्र आहे..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Users className="w-4 h-4 inline mr-1" />
                    पात्रता (मराठी)
                  </label>
                  <textarea
                    value={formData.eligibility_mr}
                    onChange={(e) => setFormData({...formData, eligibility_mr: e.target.value})}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="कोण पात्र आहे..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Gift className="w-4 h-4 inline mr-1" />
                    फायदे (इंग्रजी)
                  </label>
                  <textarea
                    value={formData.benefits}
                    onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="योजनेचे फायदे..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Gift className="w-4 h-4 inline mr-1" />
                    फायदे (मराठी)
                  </label>
                  <textarea
                    value={formData.benefits_mr}
                    onChange={(e) => setFormData({...formData, benefits_mr: e.target.value})}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="योजनेचे फायदे..."
                  />
                </div>
              </div>

              {/* Additional fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    श्रेणी
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    अर्ज करण्याची अंतिम तारीख
                  </label>
                  <input
                    type="date"
                    value={formData.lastDate}
                    onChange={(e) => setFormData({...formData, lastDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    अर्जाची लिंक
                  </label>
                  <input
                    type="url"
                    value={formData.applicationLink}
                    onChange={(e) => setFormData({...formData, applicationLink: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="https://example.com/apply"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    संपर्क व्यक्ती
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="संपर्काचे नाव"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  संपर्क क्रमांक
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="संपर्क क्रमांक"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  योजना प्रतिमा
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  रद्द करा
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {selectedScheme ? 'अपडेट करा' : 'जोडा'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSchemes;