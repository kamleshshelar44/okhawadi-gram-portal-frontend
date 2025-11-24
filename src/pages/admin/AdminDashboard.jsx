import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Users,
  FileText,
  Image as ImageIcon,
  MapPin,
  Calendar,
  TrendingUp,
  Eye,
  Edit,
  Plus,
  BarChart3,
  Activity,
  Download,
  Upload
} from 'lucide-react';
import api from '../../utils/axios';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalNews: 0,
    totalProjects: 0,
    totalGallery: 0,
    totalContacts: 0,
  });
  const [recentNews, setRecentNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [newsRes, projectsRes, galleryRes, contactsRes] = await Promise.all([
        api.get('/news?limit=5'),
        api.get('/projects?limit=5'),
        api.get('/gallery?limit=5'),
        api.get('/contacts'),
      ]);

      setStats({
        totalNews: newsRes.data.total || 0,
        totalProjects: projectsRes.data.total || 0,
        totalGallery: galleryRes.data.total || 0,
        totalContacts: contactsRes.data.data?.length || 0,
      });

      setRecentNews(newsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Add News',
      description: 'Create new news article',
      icon: Plus,
      link: '/admin/news?action=add',
      color: 'bg-blue-500',
    },
    {
      title: 'Add Project',
      description: 'Add new development project',
      icon: Plus,
      link: '/admin/projects?action=add',
      color: 'bg-green-500',
    },
    {
      title: 'Upload Gallery',
      description: 'Add photos to gallery',
      icon: Upload,
      link: '/admin/gallery?action=add',
      color: 'bg-purple-500',
    },
    {
      title: 'Edit Village Info',
      description: 'Update village details',
      icon: Edit,
      link: '/admin/village-info',
      color: 'bg-orange-500',
    },
  ];

  const navigationItems = [
    {
      title: 'News Management',
      count: stats.totalNews,
      link: '/admin/news',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Projects',
      count: stats.totalProjects,
      link: '/admin/projects',
      icon: MapPin,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Gallery',
      count: stats.totalGallery,
      link: '/admin/gallery',
      icon: ImageIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Contacts',
      count: stats.totalContacts,
      link: '/admin/contacts',
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          डॅशबोर्ड
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          ओखवडी ग्रामपंचायत वेबसाइट व्यवस्थापन पॅनेल
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {navigationItems.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {item.count}
                </p>
              </div>
              <div className={`p-3 rounded-full ${item.bgColor}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          त्वरित क्रिया
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {action.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent News */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              अलीकडील बातम्या
            </h3>
            <Link
              to="/admin/news"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              सर्व पहा →
            </Link>
          </div>
          <div className="space-y-4">
            {recentNews.length > 0 ? (
              recentNews.map((news) => (
                <div key={news._id} className="flex items-start space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {news.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(news.date).toLocaleDateString('mr-IN')}
                    </p>
                  </div>
                  <Link
                    to={`/admin/news/edit/${news._id}`}
                    className="text-gray-400 hover:text-primary-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                कोणत्याही बातम्या आढळल्या नाहीत
              </p>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            साइट आकडेवारी
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">साइट स्थिती</span>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                सक्रिय
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300">एकूण संपर्क</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {stats.totalContacts}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-purple-500" />
                <span className="text-gray-700 dark:text-gray-300">एकूण बातम्या</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {stats.totalNews}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ImageIcon className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700 dark:text-gray-300">गॅलरी आयटम</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {stats.totalGallery}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          सिस्टम माहिती
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">शेवटचा अपडेट:</span>
            <span className="ml-2 text-gray-900 dark:text-white">
              {new Date().toLocaleDateString('mr-IN')}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">सिस्टम वेळ:</span>
            <span className="ml-2 text-gray-900 dark:text-white">
              {new Date().toLocaleTimeString('mr-IN')}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">आवृत्ती:</span>
            <span className="ml-2 text-gray-900 dark:text-white">
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;