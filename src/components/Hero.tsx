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
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
          {/* Left side - Confused Man SVG (hidden on mobile) */}
          <div className="hidden lg:flex justify-center">
            <img
              src="/Confused Man Readdit Later.svg"
              alt="Confused Man - Before using Readdit Later"
              className="w-72 xl:w-80 h-auto"
            />
          </div>

          {/* Center - Content (spans 3 columns on desktop) */}
          <div className="flex flex-col items-center text-center space-y-8 lg:col-span-3">
            {/* Badge */}
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              <Star className="h-4 w-4 mr-2 fill-primary text-primary" />
              Join over 30 Reddit users who are organizing their saved posts with this.
            </Badge>

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight flex flex-wrap items-center justify-center gap-x-4">
              <img
                src="/Bookmark SVG.svg"
                alt="Bookmark"
                className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 inline-block transform rotate-0"
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
                    filter: "brightness(0) invert(1)"
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

            {/* Features preview */}
            <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-muted-foreground">
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

          {/* Right side - Happy Man SVG (hidden on mobile) */}
          <div className="hidden lg:flex justify-center">
            <img
              src="/Happy Man Readdit Later.svg"
              alt="Happy Man - After using Readdit Later"
              className="w-72 xl:w-80 h-auto"
            />
          </div>
        </div>

        {/* Demo Video - Full width below the two columns */}
        <div className="w-full max-w-4xl mx-auto mt-16">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden relative group">
            <video
              ref={videoRef}
              src="/Land Page Read Lat 1.mp4"
              loop
              autoPlay
              muted
              className="w-full h-full object-cover rounded-lg pointer-events-none"
            >
              Your browser does not support the video tag.
            </video>
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

        {/* Product Hunt Badge */}
        <div className="flex justify-center pt-8">
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
      </div>
    </section>
  );
};

export default Hero;
