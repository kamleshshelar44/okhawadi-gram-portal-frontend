import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Users, BookOpen, Award } from 'lucide-react';
import api from '../utils/axios';

const About = () => {
  const { t } = useTranslation();
  const [villageInfo, setVillageInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVillageInfo();
  }, []);

  const fetchVillageInfo = async () => {
    try {
      const response = await api.get('/village');
      setVillageInfo(response.data.data);
    } catch (error) {
      console.error('Error fetching village info:', error);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t('navigation.about')}</h1>
          <p className="text-xl opacity-90">
            {villageInfo?.name} - जावळी तालुका, सातारा जिल्हा
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Village Description */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('about.description')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {villageInfo?.description || 'ओखवडी हे सातारा जिल्ह्यातील जावळी तालुक्यातील एक सुंदर गाव आहे. याची समृद्ध सांस्कृतिक वारसा आणि नैसर्गिक सौंदर्य प्रसिद्ध आहे. पश्चिम घाटाच्या पहिल्या पायऱ्यांवर वसलेले हे गाव आपल्या शांततेसाठी आणि सहकार्यासाठी ओळखले जाते.'}
              </p>
            </div>

            {/* History */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('about.history')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {villageInfo?.history || 'ओखवडी गावाचा इतिहास अनेक शतके जुना आहे. मूळतः कृषी समुदायांनी वसवलेले हे गाव पारंपरिक मूल्ये आणि सांस्कृतिक प्रथा जपत विकसित होत आहे. गावाची नावे आणि त्यांमागच्या कथा आजही जुन्या पिढ्यांकडून चालत येतात.'}
              </p>
            </div>

            {/* Culture */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('about.culture')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {villageInfo?.culture || 'ओखवडीची संस्कृती महाराष्ट्रीय परंपरांनी समृद्ध आहे. गावात विविध सण मोठ्या उत्साहात साजरे केले जातात आणि मजबूत सामुदायिक भावना कायम ठेवली जाते. गावातील लोक कृषी, पशुपालन आणि इतर पारंपरिक व्यवसायांवर अवलंबून आहेत.'}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Village Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                गाव माहिती
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('about.taluka')}</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{villageInfo?.taluka || 'जावळी'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('about.district')}</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{villageInfo?.district || 'सातारा'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('about.state')}</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{villageInfo?.state || 'महाराष्ट्र'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('about.pinCode')}</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{villageInfo?.pinCode || '415012'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('about.postOffice')}</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{villageInfo?.postOffice || 'मेढा'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('about.stdCode')}</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{villageInfo?.stdCode || '02378'}</p>
                </div>
              </div>
            </div>

            {/* Political Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                राजकीय माहिती
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('about.sarpanch')}</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{villageInfo?.sarpanch || 'कौशल्या लक्ष्मण शेलर'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('about.assemblyMLA')}</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{villageInfo?.assemblyMLA || 'भोसले शिवेंद्रसिंह अभयसिंहराजे'}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('about.parliamentMP')}</span>
                  <p className="font-semibold text-gray-900 dark:text-white">{villageInfo?.parliamentMP || 'श्रीमंत छ. उदयनराजे प्रतापसिंहमहाराज भोसले'}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                महत्वापूर्ण आकडेवारी
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary-600" />
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">लोकसंख्या</span>
                    <p className="font-semibold text-gray-900 dark:text-white">{villageInfo?.population || '2,150'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">साक्षरता दर</span>
                    <p className="font-semibold text-gray-900 dark:text-white">{villageInfo?.literacyRate || '87.5'}%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">क्षेत्रफळ</span>
                    <p className="font-semibold text-gray-900 dark:text-white">{villageInfo?.area || '12.4'} वर्ग किमी</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-primary-600" />
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">उंची</span>
                    <p className="font-semibold text-gray-900 dark:text-white">समुद्रसपाटीपासून {villageInfo?.elevation || '678 मीटर'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;