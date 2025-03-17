import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export const ImagePreview = ({ images }: { images: string[] }) => {
  const { isMobile } = useSidebar();
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const gridCols =
    images.length === 1
      ? "grid-cols-1"
      : images.length === 2
        ? "sm:grid-cols-2 grid-cols-1"
        : "sm:grid-cols-2 grid-cols-1";

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (currentIndex !== null) {
        if (event.key === "ArrowLeft") prevImage();
        if (event.key === "ArrowRight") nextImage();
        if (event.key === "Escape") setCurrentIndex(null);
      }
    };

    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    setScale(1);
    setPosition({ x: 0, y: 0 });
    setDragging(false);
    setStartPosition({ x: 0, y: 0 });

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, prevImage, nextImage]);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (scale > 1) {
      setDragging(true);
      setStartPosition({
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (dragging && scale > 1) {
      const scaleFactor = scale / 4;
      setPosition({
        x: (event.clientX - startPosition.x) * scaleFactor,
        y: (event.clientY - startPosition.y) * scaleFactor,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleZoom = () => {
    setScale(scale === 1 && !isMobile ? 2 : 1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <div className={`grid ${gridCols} gap-2 mt-2`}>
        {images.slice(0, isMobile ? 2 : 4).map((file, index) => (
          <div key={index} className="relative">
            <Image
              src={file}
              alt="Uploaded file"
              width={300}
              height={300}
              className={`rounded-md object-cover ${
                images.length === 1 ? "w-full h-auto" : "w-[200px] h-[200px]"
              } cursor-pointer`}
              onClick={() => setCurrentIndex(index)}
            />
            {index === (isMobile ? 1 : 3) &&
              images.length > (isMobile ? 2 : 4) && (
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-6xl rounded-md cursor-pointer"
                  onClick={() => setCurrentIndex(isMobile ? 2 : 4)}
                >
                  +{images.length - (isMobile ? 1 : 3)}
                </div>
              )}
          </div>
        ))}
      </div>

      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setCurrentIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(null);
            }}
            className="absolute top-4 right-4 text-foreground bg-muted p-1 rounded-md hover:bg-primary"
          >
            <X size={34} />
          </button>

          <div className="absolute top-4 left-4 text-white text-lg select-none">
            {currentIndex + 1} / {images.length}
          </div>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground bg-muted p-1 rounded-md hover:bg-primary"
              style={{ zIndex: 100 }} // Sol ok için z-index eklenebilir
            >
              <ChevronLeft size={34} />
            </button>
          )}

          <div
            className="relative"
            style={{ cursor: scale > 1 ? "grab" : "pointer" }}
          >
            <Image
              src={images[currentIndex]}
              alt="Preview"
              width={600}
              height={600}
              onClick={(e) => {
                e.stopPropagation();
                handleZoom();
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onDragStart={(e) => e.preventDefault()}
              style={{
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                transition: dragging ? "none" : "transform 0.3s ease",
                userSelect: "none",
                touchAction: "none",
              }}
              className="max-w-full max-h-screen object-contain p-4 sm:p-0"
            />
          </div>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground bg-muted p-1 rounded-md hover:bg-primary"
              style={{ zIndex: 100 }}
            >
              <ChevronRight size={34} />
            </button>
          )}
        </div>
      )}
    </>
  );
};
