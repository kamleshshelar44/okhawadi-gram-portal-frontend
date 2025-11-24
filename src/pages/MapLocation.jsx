import React from "react";

const MapLocation = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            नकाशा आणि स्थान
          </h1>
          <div className="aspect-video rounded-lg overflow-hidden">
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
    </div>
  );
};

export default MapLocation;
