import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  MessageSquare,
  Send,
  AlertCircle,
  Check
} from 'lucide-react';
import api from '../utils/axios';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/contact-form', formData);
      setSuccess(t('contact.success'));
      setFormData({
        name: '',
        email: '',
        mobile: '',
        message: ''
      });
    } catch (error) {
      setErrors({
        general: error.response?.data?.message || t('contact.error')
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.Contactus')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.headerText')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.contactInfo')}
              </h2>

              <div className="space-y-6">

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('contact.phone')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">+91 02378 245678</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {t('contact.phoneTime')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('contact.email')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">grampanchyat.okhawadi@gov.in</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {t('contact.emailReply')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('contact.address')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('contact.addressLine1')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('contact.addressLine2')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('contact.officeHours')}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t('contact.office1')}</p>
                    <p className="text-gray-600 dark:text-gray-300">{t('contact.office2')}</p>
                    <p className="text-gray-600 dark:text-gray-300">{t('contact.office3')}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Cards */}
            <div className="mt-8 space-y-4">

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  {t('contact.emergency')}
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  108 - {t('contact.health')}<br />
                  112 - {t('contact.police')}<br />
                  100 - {t('contact.fire')}
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                  {t('contact.importantNumbers')}
                </h3>
                <p className="text-green-700 dark:text-green-300 text-sm">
                  {t('contact.sarpanch')}: +91 98765 43210<br />
                  {t('contact.officer')}: +91 98765 43211<br />
                  {t('contact.talathi')}: +91 98765 43212
                </p>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.sendMessage')}
              </h2>

              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  {success}
                </div>
              )}

              {errors.general && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      {t('contact.fullName')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('contact.fullNamePlaceholder')}
                      className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      {t('contact.emailAddress')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('contact.emailPlaceholder')}
                      className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    {t('contact.mobile')} *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    maxLength="10"
                    required
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder={t('contact.mobilePlaceholder')}
                    className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    {t('contact.message')} *
                  </label>
                  <textarea
                    name="message"
                    rows="6"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('contact.messagePlaceholder')}
                    className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {t('contact.info')}
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• {t('contact.info1')}</li>
                    <li>• {t('contact.info2')}</li>
                    <li>• {t('contact.info3')}</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg flex items-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{loading ? t('contact.sending') : t('contact.submit')}</span>
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
