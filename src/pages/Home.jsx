import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import { Calendar, MapPin, Users, BookOpen, Droplets, School, Award, Clock, ArrowRight, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import api from '../utils/axios';

const Home = () => {
  const { t } = useTranslation();
  const [villageInfo, setVillageInfo] = useState(null);
  const [news, setNews] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: true,
    cssEase: "linear",
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  };

  useEffect(() => {
    fetchHomeData();
  }, [localStorage.getItem('i18nextLng')]);

  const fetchHomeData = async () => {
    try {
      const lang = localStorage.getItem('i18nextLng') || 'en';
      const [villageRes, newsRes, galleryRes, contactsRes] = await Promise.all([
        api.get(`/village?lang=${lang}`),
        api.get(`/news?limit=3&lang=${lang}`),
        api.get(`/gallery?limit=6`),
        api.get('/contacts'),
      ]);

      setVillageInfo(villageRes.data.data);
      setNews(newsRes.data.data);
      setGallery(galleryRes.data.data);
      setContacts(contactsRes.data.data);
    } catch (error) {
      console.error('Error fetching home data:', error);
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
    <div>
      {/* Hero Slider Section */}
      <section className="relative h-[500px] overflow-hidden">
        {villageInfo?.sliderImages && villageInfo.sliderImages.length > 0 ? (
          <>
            {/* Slider Images Layer - z-0 */}
            <Slider {...sliderSettings} className="h-full">
              {villageInfo.sliderImages.map((image) => (
                <div key={image._id} className="relative h-[500px]">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${image.url}`}
                    alt={image.caption || t('home.villageName')}
                    className="w-full h-full object-cover z-0"
                  />
                </div>
              ))}
            </Slider>

            {/* Gradient Overlay Layer - z-10 */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10"></div>

            {/* Text Overlay Layer - z-20 - Fixed Position Outside Slider */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl text-white">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    {t('home.welcome')}
                  </h1>
                  <p className="text-xl mb-8 leading-relaxed">
                    {villageInfo?.description || t('home.villageIntro')}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/about"
                      className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                    >
                      {t('navigation.about')}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <Link
                      to="/contact"
                      className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors"
                    >
                      {t('home.contactUs')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Fallback to static hero if no images uploaded
          <div className="relative h-[500px]">
            {/* Background Image - z-0 */}
            <img
              src="../../../Images/ok.jpg"
              alt="Village Temple"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            {/* Background Gradient - z-10 */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-900/90 z-10"></div>
            {/* Content - z-20 */}
            <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
              <div className="max-w-3xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {t('home.welcome')}
                </h1>
                <p className="text-xl mb-8 leading-relaxed">
                  {villageInfo?.description || t('home.villageIntro')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/about"
                    className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                  >
                    {t('navigation.about')}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <Link
                    to="/contact"
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors"
                  >
                    {t('home.contactUs')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Village Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-md">
              <Users className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {villageInfo?.population || '439'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('home.population')}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-md">
              <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {villageInfo?.literacyRate || '87.5'}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('home.literacyRate')}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-md">
              <MapPin className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {villageInfo?.area || '12.4'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('home.area')}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-md">
              <Droplets className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {villageInfo?.waterSources?.length || 2}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('home.waterSources')}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-md">
              <School className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {villageInfo?.schools?.length || 1}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('home.schools')}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-md">
              <Award className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                10+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t('home.awards')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Panchayat Contacts */}
      <section className="py-16  dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.panchayatContacts')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('home.panchayatContactstext')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {contacts.slice(0, 3).map((contact) => (
  <div
    key={contact._id}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 text-center border border-gray-100 dark:border-gray-700"
  >
    {/* Image */}
    <div className="flex justify-center mb-4">
      <img
        src={`${import.meta.env.VITE_API_URL}${contact.image}` || "https://img.icons8.com/nolan/1200/user-default.jpg"}
        alt={contact.name}
        className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
      />
    </div>

    {/* Name */}
    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
      {contact.name}
    </h3>

    {/* Position */}
    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1 font-bold">
      {contact.position}
    </p>

    {/* Contact Details */}
    {/* <div className="mt-4 space-y-2 text-left">
      {contact.phone && (
        <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
          <Phone className="w-4 h-4" />
          <span>{contact.phone}</span>
        </div>
      )}

      {contact.email && (
        <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
          <Mail className="w-4 h-4" />
          <span>{contact.email}</span>
        </div>
      )}
    </div> */}
  </div>
))}

          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('home.latestNews')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.newText')}
              </p>
            </div>
            <Link
              to="/news"
              className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center"
            >
              {t('common.viewAll')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item) => (
  <article
    key={item._id}
    className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden flex flex-col"
  >
    {/* Image with fallback */}
    <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />
      ) : (
        <span className="text-gray-500 text-sm">No Image</span>
      )}
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center space-x-2 mb-3">
        <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
          {item.category}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(item.date).toLocaleDateString("mr-IN")}
        </span>
      </div>

      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
        {item.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
        {item.content}
      </p>

      {/* Read More always at the bottom */}
      <div className="mt-auto">
        <Link
          to={`/news/${item._id}`}
          className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
        >
          Read More →
        </Link>
      </div>
    </div>
  </article>
))}

          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16  dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('home.photoGallery')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t('home.imageHeading')}
              </p>
            </div>
            <Link
              to="/gallery"
              className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center"
            >
              {t('common.viewAll')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gallery.map((item) => (
              <div key={item._id} className="relative group overflow-hidden rounded-lg">
                {item.type === 'image'?
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />:<video
                  src={item.url}
                  controls
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />}
                {item.type === 'image' &&<div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-xs text-center px-2">{item.title}</p>
                </div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('home.villageNotice')}
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            {t('home.villageNoticeText')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/complaints"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('services.complaintsRequests')}
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              {t('home.contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;