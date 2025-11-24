import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { path: '/about', label: t('navigation.about') },
    { path: '/projects', label: t('navigation.projects') },
    { path: '/schemes', label: t('navigation.schemes') },
    { path: '/forms', label: t('navigation.forms') },
    { path: '/gallery', label: t('navigation.gallery') },
    { path: '/contact', label: t('common.contact') },
    { path: '/contact-us', label: 'Send Message' },
  ];

  const services = [
    { path: '/forms', label: t('services.birthCertificate') },
    { path: '/forms', label: t('services.incomeCertificate') },
    { path: '/forms', label: t('services.residenceCertificate') },
    { path: '/rti', label: t('services.rtiAct') },
    { path: '/complaints', label: t('services.complaintsRequests') },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">ओ</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">ओखवडी ग्रामपंचायत</h3>
                <p className="text-sm text-gray-400">Okhawadi Gram Panchayat</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t('home.villageIntro')}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('home.quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('navigation.services')}</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.path}>
                  <Link
                    to={service.path}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">{t('home.contactUs')}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-300">
                    {t('common.okhawadiGramPanchayat')},
                    <br />
                    {t('common.Jawali')}, {t('common.Satara')}
                    <br />
                    {t('common.Maharashtra')} - {t('common.pinCodeNumber')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500" />
                <p className="text-sm text-gray-300">{t('common.contactNo')}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500" />
                <p className="text-sm text-gray-300">grampanchayat@okhawadi.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <h4 className="font-bold text-lg mb-4 text-center">{t('home.location')}</h4>
          <div className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14440.629182405173!2d73.75189519695132!3d17.83472473008931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc26959a93b5489%3A0xc52899fd79ef92b4!2sOkhavadi%2C%20Maharashtra%20415012!5e1!3m2!1sen!2sin!4v1762449884741!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Okhawadi Village Map"
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} {t('about.villageName')}. {t('common.allRightsReserved')}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center space-x-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                {t('common.privacyPolicy')}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t('common.termsOfService')}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {t('common.sitemap')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;