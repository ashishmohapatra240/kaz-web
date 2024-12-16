"use client";

import LightGallery from "lightgallery/react";
import Image from "next/image";

// Import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// Import plugins if you need them
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { galleryImages } from "./GalleryImages";

export default function PhotoGallery() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Gallery</h2>

        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          mode="lg-fade"
          download={false}
          thumbnail={true}
          zoom={true}
          zoomFromOrigin={true}
          allowMediaOverlap={true}
          closeOnTap={true}
        >
          {galleryImages.map((image) => (
            <a
              key={image.id}
              data-lg-size={`${image.width}-${image.height}`}
              className="gallery-item relative overflow-hidden rounded-lg aspect-square"
              href={image.src}
              data-src={image.src}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={100}
                priority
                unoptimized
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </a>
          ))}
        </LightGallery>
      </div>
    </section>
  );
}
