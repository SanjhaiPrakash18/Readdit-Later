import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, Play, Pause } from "lucide-react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <section 
      className="relative py-20 lg:py-32 overflow-hidden" 
      style={{ 
        backgroundColor: '#ffffff',
        backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Alternative dotted patterns - uncomment one to try different styles */}
      {/* 
      // Fine dots:
      backgroundImage: `radial-gradient(circle, #d1d5db 0.5px, transparent 0.5px)`,
      backgroundSize: '16px 16px'
      
      // Large subtle dots:
      backgroundImage: `radial-gradient(circle, #f3f4f6 2px, transparent 2px)`,
      backgroundSize: '32px 32px'
      
      // Colorful dots (using your primary color):
      backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
      backgroundSize: '24px 24px'
      */}
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            <Star className="h-4 w-4 mr-2 fill-primary text-primary" />
            Join over 20 Reddit users who are organizing their saved posts with this.
          </Badge>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight flex flex-wrap items-center justify-center gap-x-4">
            <img
              src="/Bookmark SVG.svg"
              alt="Bookmark"
              className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 inline-block"
            />
            Save & Organize Your{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Reddit Posts With Ease
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Never lose track of great Reddit content again! Save posts directly from Reddit, 
            sync them across devices, and browse in a clean, distraction-free view.
          </p>

          {/* Demo Video */}
          <div className="w-full max-w-4xl mx-auto mb-8">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden relative group">
              <video
                ref={videoRef}
                src="/Land Page Read Lat 1.mp4"
                loop
                autoPlay
                muted
                className="w-full h-full object-cover rounded-lg pointer-events-none"
                // poster="/video-poster.jpg"
              >
                Your browser does not support the video tag.
              </video>
              {/* Custom play/pause button overlay, visible on hover */}
              <button
                type="button"
                aria-label={playing ? "Pause video" : "Play video"}
                onClick={handlePlayPause}
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 bg-black/60 rounded-full p-2 transition-opacity"
                tabIndex={0}
              >
                {playing ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              variant="hero" 
              size="default" 
              className="px-6 py-3 text-white"
              style={{ backgroundColor: '#000000' }}
              onClick={() => window.open('https://chromewebstore.google.com/detail/jdceogapnjfcfdklbpnllbmnjbfmfejk', '_blank')}
            >
              <img
                src="/Chrome SVG.svg"
                alt="Chrome"
                className="h-4 w-4 mr-2"
                style={{ 
                  display: "inline-block", 
                  verticalAlign: "middle",
                  filter: "brightness(0) invert(1)" // This makes any color white
                }}
              />
              Add to Chrome - Free
            </Button>
            <Button 
              variant="outline" 
              size="default"
              className="px-6 py-3"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Features
            </Button>
          </div>

          {/* Product Hunt Badge */}
          <div className="flex justify-center pt-4">
            <a
              href="https://www.producthunt.com/products/readdit-later?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-readdit&#0045;later"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1004780&theme=dark&t=1755402660796"
                alt="Readdit Later - Save and manage your Reddit posts with ease | Product Hunt"
                style={{ width: 250, height: 54 }}
                width={250}
                height={54}
              />
            </a>
          </div>

          {/* Features preview */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Auto Sync
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Powerful Filters
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Bulk Actions
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Statistics Dashboard
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
