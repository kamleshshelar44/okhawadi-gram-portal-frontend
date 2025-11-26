import React from "react";
import Slider from "react-slick";

const GovLogoSlider = () => {
  const logos = [
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019032259-qxrqd6s3yg3mi3iv7lfo90cxk3ngn6puo0x8owzunc.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019032251-qxrqd6s3yg3mi3iv7lfo90cxk3ngn6puo0x8owzunc.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019052222-qxrqcz9efrtbx7tsfi6np298t0oixlvzyzpcupb014.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019052265-qxrqcz9efrtbx7tsfi6np298t0oixlvzyzpcupb014.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019032217-qxrqd6s3yg3mi3iv7lfo90cxk3ngn6puo0x8owzunc.png",
    "https://cdnbbsr.s3waas.gov.in/s37cac11e2f46ed46c339ec3d569853759/uploads/bfi_thumb/2019041050-qxrqd22x09x6w1poz1ejejjml6amkp76zdntaj6tig.png",
  ];

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <div className="w-full bg-white py-6 border-t border-gray-300">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {logos.map((src, index) => (
            <div key={index} className="flex items-center justify-center px-4">
              <img
                src={src}
                className="h-12 md:h-16 object-contain mx-auto"
                alt="Gov Logo"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default GovLogoSlider;
