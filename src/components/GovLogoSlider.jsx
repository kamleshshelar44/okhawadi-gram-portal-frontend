import React from "react";

const GovLogoSlider = () => {
  const logos = [
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019032259-qxrqd6s3yg3mi3iv7lfo90cxk3ngn6puo0x8owzunc.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019032251-qxrqd6s3yg3mi3iv7lfo90cxk3ngn6puo0x8owzunc.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019052222-qxrqcz9efrtbx7tsfi6np298t0oixlvzyzpcupb014.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019052265-qxrqcz9efrtbx7tsfi6np298t0oixlvzyzpcupb014.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019032217-qxrqd6s3yg3mi3iv7lfo90cxk3ngn6puo0x8owzunc.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019041050-qxrqd22x09x6w1poz1ejejjml6amkp76zdntaj6tig.png",
  ];

  // Duplicate list for smooth infinite sliding
  const sliderLogos = [...logos, ...logos];

  return (
    <div className="w-full bg-white border-t border-gray-300 py-4 overflow-hidden">
      <div className="flex items-center whitespace-nowrap animate-slide">
        {sliderLogos.map((src, index) => (
          <div key={index} className="px-6 flex items-center justify-center">
            <img src={src} alt="Gov Logo" className="h-12 object-contain" />
          </div>
        ))}
      </div>

      {/* Animation Styles */}
      <style>
        {`
          .animate-slide {
            display: inline-flex;
            animation: slide 25s linear infinite;
          }

          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default GovLogoSlider;
