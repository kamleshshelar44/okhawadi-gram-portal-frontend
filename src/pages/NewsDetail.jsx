import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import api from '../utils/axios';

const NewsDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewsDetail();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      const response = await api.get(`/news/${id}`);
      setNews(response.data.data);
    } catch (error) {
      console.error('Error fetching news detail:', error);
      setError('बातमी लोड करताना त्रुटी आली. कृपया नंतर पुन्हा प्रयत्न करा.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category) => {
    const categories = {
      'news': 'बातम्या',
      'announcement': 'घोषणा',
      'update': 'अपडेट',
      'event': 'कार्यक्रम',
      'development': 'विकास',
      'education': 'शिक्षण'
    };
    return categories[category] || category;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'बातमी आढळली नाही'}
          </div>
          <Link to="/news" className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            बातम्यांसाठी परत
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          to="/news"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          बातम्यांसाठी परत
        </Link>

        {/* News Article */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {news.image && (
            <div className="w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-700">
              <img
                src={news.image}
                alt={news.title_mr || news.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          )}

          <div className="p-8">
            {/* Category and Date */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full">
                <Tag className="w-4 h-4 inline mr-1" />
                {getCategoryLabel(news.category)}
              </span>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(news.date).toLocaleDateString('mr-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <User className="w-4 h-4 mr-1" />
                {news.author}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {news.title_mr || news.title}
            </h1>

            {/* Summary */}
            {news.summary_mr && (
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                  {news.summary_mr}
                </p>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div
                className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: (news.content_mr || news.content).replace(/\n/g, '<br />')
                }}
              />
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div>
                  प्रकाशित: {new Date(news.createdAt).toLocaleDateString('mr-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                {news.updatedAt && news.updatedAt !== news.createdAt && (
                  <div>
                    अद्ययावत: {new Date(news.updatedAt).toLocaleDateString('mr-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Related News Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            अधिक बातम्या
          </h2>
          <div className="text-center py-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              अधिक बातम्या लवकरच उपलब्ध होतील
            </p>
            <Link
              to="/news"
              className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
            >
              सर्व बातम्या पहा
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;