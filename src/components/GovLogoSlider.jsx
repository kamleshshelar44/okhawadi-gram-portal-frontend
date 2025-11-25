import React from "react";

const GovLogoSlider = () => {
  const logos = [
    "https://data.gov.in/sites/default/files/data_gov_in_0.png",
    "https://www.makeinindia.com/sites/default/files/2019-05/logo-black.png",
    "https://www.incredibleindia.org/content/dam/incredible-india/images/brand_logo/incredible-india-logo-colour.png",
    "https://www.india.gov.in/sites/upload_files/npi/files/logo_1.png",
    "https://digitalindia.gov.in/wp-content/themes/digitalindia/images/logo.png",
    "https://www.pmindia.gov.in/wp-content/themes/pmindia/images/logo.png"
  ];

  return (
    <div className="w-full bg-white border-t border-gray-200 py-4 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center">
          {logos.map((src, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-3 border-r last:border-r-0"
            >
              <img
                src={src}
                alt="Government Logo"
                className="h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GovLogoSlider;
