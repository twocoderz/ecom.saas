"use client";
import { useState, use } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export default function ProjectImageGallery({ images, type = 'web' }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={type === 'mobile' ? 2 : 2.5}
        navigation
        pagination={{ clickable: true }}
        className="rounded-lg shadow-md swiper"
        style={{ paddingBottom: '2rem' }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative cursor-pointer group"
              style={{ height: type === 'mobile' ? 400 : 250 }}
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={image.url}
                alt={image.alt || `Image ${index + 1} du projet`}
                fill
                className="object-contain rounded-lg group-hover:scale-105 transition-transform duration-200 bg-white"
                sizes="(max-width: 768px) 90vw, 400px"
                style={{
                  maxWidth: type === 'mobile' ? 220 : 400,
                  margin: '0 auto',
                  height: '100%',
                  width: '100%',
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={() => setLightboxIndex(null)}>
          <div className="relative max-w-full max-h-full p-4" onClick={e => e.stopPropagation()}>
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt || `Image ${lightboxIndex + 1} du projet`}
              width={type === 'mobile' ? 320 : 800}
              height={type === 'mobile' ? 600 : 600}
              className="object-contain rounded-lg shadow-lg bg-white"
            />
            <button
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full px-2 py-1 text-lg"
              onClick={() => setLightboxIndex(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}