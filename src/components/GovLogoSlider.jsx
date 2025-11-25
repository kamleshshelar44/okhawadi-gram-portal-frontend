import React from "react";

const GovLogoSlider = () => {
  const logos = [
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019032259-qxrqd6s3yg3mi3iv7lfo90cxk3ngn6puo0x8owzunc.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019032251-qxrqd6s3yg3mi3iv7lfo90cxk3ngn6puo0x8owzunc.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019052222-qxrqcz9efrtbx7tsfi6np298t0oixlvzyzpcupb014.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019052265-qxrqcz9efrtbx7tsfi6np298t0oixlvzyzpcupb014.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019032217-qxrqd6s3yg3mi3iv7lfo90cxk3ngn6puo0x8owzunc.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019041050-qxrqd22x09x6w1poz1ejejjml6amkp76zdntaj6tig.png"
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
