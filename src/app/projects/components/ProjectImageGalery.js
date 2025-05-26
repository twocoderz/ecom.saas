import Image from 'next/image';

export default function ProjectImageGallery({ images }) {
  return (
    <div className="relative w-full">
      <div className="grid grid-flow-col auto-cols-[300px] gap-4 overflow-x-auto pb-4 scroll-smooth">
        {images.map((image, index) => (
          <div key={index} className="w-full h-64 relative">
            <Image
              src={image.url}
              alt={image.alt || `Image ${index + 1} du projet`}
              width={300}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}