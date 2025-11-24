import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const languages = [
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
  ];

  const mainMenu = [
    {
      title: t('navigation.villageInfo'),
      submenu: [
        { path: '/about', label: t('navigation.about') },
        { path: '/history', label: t('navigation.history') },
        { path: '/culture', label: t('navigation.culture') },
        { path: '/festivals', label: t('navigation.festivals') },
        { path: '/map-location', label: t('navigation.mapLocation') },
      ],
    },
    {
      title: t('navigation.development'),
      submenu: [
        { path: '/projects', label: t('navigation.projects') },
        { path: '/infrastructure', label: t('navigation.infrastructure') },
        { path: '/schemes', label: t('navigation.schemes') },
        { path: '/budget', label: t('navigation.budget') },
      ],
    },
    {
      title: t('navigation.services'),
      submenu: [
        { path: '/forms', label: t('navigation.forms') },
        { path: '/rti', label: t('navigation.rti') },
        { path: '/complaints', label: t('navigation.complaints') },
      ],
    },
    {
      title: t('navigation.media'),
      submenu: [
        { path: '/news', label: t('navigation.news') },
        { path: '/events', label: t('navigation.events') },
        { path: '/gallery', label: t('navigation.gallery') },
        { path: '/videos', label: t('navigation.videos') },
      ],
    },
    {
      title: t('navigation.dataMap'),
      submenu: [
        { path: '/statistics', label: t('navigation.statistics') },
        { path: '/village-map', label: t('navigation.villageMap') },
      ],
    },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const isPathActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>📧 grampanchayat@okhawadi.in</span>
              <span>📱 +91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{new Date().toLocaleDateString(i18n.language)}</span>
              <span>{new Date().toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">ओ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                ओखवडी ग्रामपंचायत
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Okhawadi Gram Panchayat
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isPathActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white hover:text-primary-600'
              }`}
            >
              {t('navigation.home')}
            </Link>

            {mainMenu.map((item) => (
              <div key={item.title} className="relative group">
                <button className="font-medium text-gray-900 dark:text-white hover:text-primary-600 transition-colors">
                  {item.title}
                </button>
                <div className="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.path}
                      to={subitem.path}
                      className={`block px-4 py-2 text-sm ${
                        isPathActive(subitem.path)
                          ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1 font-medium text-gray-900 dark:text-white hover:text-primary-600"
              >
                <Globe className="w-4 h-4" />
                <span>
                  {languages.find((lang) => lang.code === i18n.language)?.flag}{' '}
                  {languages.find((lang) => lang.code === i18n.language)?.name}
                </span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        i18n.language === lang.code
                          ? 'bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <nav className="container mx-auto px-4 py-4">
            <Link
              to="/"
              className={`block py-2 font-medium ${
                isPathActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t('navigation.home')}
            </Link>

            {mainMenu.map((item) => (
              <div key={item.title} className="py-2">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <div className="ml-4 space-y-2">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.path}
                      to={subitem.path}
                      className={`block py-1 text-sm ${
                        isPathActive(subitem.path)
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Mobile Language & Theme */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-2 py-1 text-sm rounded ${
                      i18n.language === lang.code
                        ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {lang.flag}
                  </button>
                ))}
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;