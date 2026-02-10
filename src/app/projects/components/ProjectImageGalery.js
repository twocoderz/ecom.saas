"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { FaTimes } from 'react-icons/fa';

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
        className="rounded-xl swiper"
        style={{ paddingBottom: '2rem' }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative cursor-pointer group rounded-xl overflow-hidden bg-white/5 border border-white/10"
              style={{ height: type === 'mobile' ? 400 : 250 }}
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={image.url}
                alt={image.alt || `Image ${index + 1} du projet`}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 90vw, 400px"
                style={{
                  maxWidth: type === 'mobile' ? 220 : 400,
                  margin: '0 auto',
                  height: '100%',
                  width: '100%',
                }}
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-300" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" 
          onClick={() => setLightboxIndex(null)}
        >
          <div 
            className="relative max-w-full max-h-full p-4" 
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt || `Image ${lightboxIndex + 1} du projet`}
              width={type === 'mobile' ? 320 : 800}
              height={type === 'mobile' ? 600 : 600}
              className="object-contain rounded-xl shadow-2xl"
            />
            <button
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
