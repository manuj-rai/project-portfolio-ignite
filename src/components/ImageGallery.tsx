import { useState, useRef, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Image {
  id: string;
  url: string;
  alt: string;
  title?: string;
}

interface ImageGalleryProps {
  images: Image[];
  className?: string;
}

const ImageGallery = ({ images, className }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setLoadedImages((prev) => new Set(prev).add(index));
          }
        });
      },
      { rootMargin: "50px" }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const handlePrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <>
      {/* Gallery Grid */}
      <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4", className)}>
        {images.map((image, index) => (
          <div
            key={image.id}
            data-index={index}
            ref={(el) => {
              if (el && observerRef.current && !loadedImages.has(index)) {
                observerRef.current.observe(el);
              }
            }}
            className="group relative aspect-square overflow-hidden rounded-xl bg-accent/20 cursor-pointer touch-target"
            onClick={() => setSelectedIndex(index)}
          >
            {loadedImages.has(index) ? (
              <>
                <img
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-active:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-medium text-foreground truncate">
                      {image.title || image.alt}
                    </p>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <ZoomIn className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full animate-pulse bg-accent/30" />
            )}
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-screen-lg p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-border">
          <div {...swipeHandlers} className="relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent transition-colors touch-target"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent transition-colors touch-target"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent transition-colors touch-target"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            {selectedIndex !== null && (
              <div className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center p-4 md:p-8">
                <img
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].alt}
                  className="max-w-full max-h-full object-contain animate-scale-in"
                />
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-sm md:text-base font-medium px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full inline-block">
                    {images[selectedIndex].title || images[selectedIndex].alt}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {selectedIndex + 1} / {images.length}
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
