import { motion } from "motion/react";

const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1600607687940-4e5a994239b7?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=400",
];

export default function ImageCarousel() {
  // We double the images to create a seamless loop
  const duplicatedImages = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES];

  return (
    <div id="image-carousel-container" className="w-full bg-primary py-12 overflow-hidden border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <span className="text-accent uppercase tracking-widest text-xs font-bold">Featured Portfolio</span>
      </div>
      
      <div className="relative flex">
        <motion.div
          id="scrolling-content"
          className="flex gap-4"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 25, // Adjusted speed to be "not slow" as requested
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-64 h-44 md:w-80 md:h-56 overflow-hidden luxury-shadow"
            >
              <img
                src={src}
                // src={`/carousel/image-${(index % 8) + 1}.jpg`} // UNCOMMENT THIS TO USE LOCAL IMAGES
                alt={`Featured ${index}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
