import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../utils/axios';

const News = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news');
      setNews(response.data.data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {t('navigation.news')}
        </h1>
        <div className="grid gap-6">
          {news.length > 0 ? (
            news.map((item) => (
              <article key={item._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:shrink-0">
                    <div className="h-48 w-full object-cover md:h-full md:w-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                     { item.image? <img
                src={item.image}
                alt={item.title_mr || item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />:<span className="text-gray-400">No Image</span>}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(item.date).toLocaleDateString('mr-IN')}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {item.content}
                    </p>
                    <Link
                      to={`/news/${item._id}`}
                      className="text-primary-600 hover:text-primary-700 font-semibold"
                    >
                      {t('common.readMore')} →
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                सध्या कोणत्याही बातम्या आढळल्या नाहीत.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;