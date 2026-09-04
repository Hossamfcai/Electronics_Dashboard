import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import defaultImage from "../assets/screen.png";
export default function ProductGallery({ product }) {
  const getImages = () => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }

    if (product.image) {
      return [product.image];
    }

    if (product.imageUrl) {
      return [product.imageUrl];
    }

    if (product.productImage) {
      return [product.productImage];
    }

    return [];
  };

  const images = getImages();

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    setSelectedImage(0);
  }, [product]);

  const currentImage = images[selectedImage];

  return (
    <motion.section
      className="rounded-lg border border-outline-variant bg-surface-container-lowest p-5"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Main Image */}
      <div className="flex h-105 items-center justify-center overflow-hidden rounded-lg bg-surface-container-low">
        <img
          src={currentImage ? currentImage : defaultImage}
          alt={product.name || "Product"}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition ${
                selectedImage === index
                  ? "border-primary"
                  : "border-outline-variant"
              }`}
            >
              <img
                src={image}
                alt={`${product.name || "Product"} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.section>
  );
}
