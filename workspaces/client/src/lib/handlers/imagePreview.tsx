import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const ImagePreview = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null,
    );
  }, [images.length]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) =>
      prev !== null ? (prev + 1) % images.length : null,
    );
  }, [images.length]);

  // Klavye ok tuşları ile geçiş
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (currentIndex !== null) {
        if (event.key === "ArrowLeft") {
          prevImage();
          event.stopPropagation(); // Prevent event from propagating to the background
        }
        if (event.key === "ArrowRight") {
          nextImage();
          event.stopPropagation(); // Prevent event from propagating to the background
        }
        if (event.key === "Escape") {
          setCurrentIndex(null); // Close modal on Escape key press
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, prevImage, nextImage]);

  return (
    <>
      {/* Küçük resimler */}
      <div className="grid grid-cols-6 gap-2">
        {images.map((file, index) => (
          <Image
            key={index}
            src={file}
            alt="Uploaded file"
            width={300}
            height={300}
            className="rounded-md object-cover w-120 h-120 cursor-pointer"
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Ön izleme modalı */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setCurrentIndex(null)} // Close modal on background click
        >
          <div
            className="relative p-5"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <button
              onClick={() => setCurrentIndex(null)}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              <X size={32} />
            </button>
            {images.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white bg-gray-800/50 p-2 rounded-full hover:bg-gray-700"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            {/* Resim */}
            <Image
              src={images[currentIndex]}
              alt="Preview"
              width={600}
              height={600}
              onClick={(e) => e.stopPropagation()} // Prevent event from propagating to the background
              className="max-w-full max-h-screen object-contain transition-transform duration-300"
            />

            {/* Sonraki resme git */}
            {images.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white bg-gray-800/50 p-2 rounded-full hover:bg-gray-700"
              >
                <ChevronRight size={32} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
