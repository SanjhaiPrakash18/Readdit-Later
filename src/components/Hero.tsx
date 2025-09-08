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
    <>
      {/* Load Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Margarine&display=swap"
        rel="stylesheet"
      />
      
      <section 
        className="relative py-12 lg:py-20 overflow-hidden" 
        style={{ 
          backgroundColor: '#ffffff',
          backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      >
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
            {/* Left side - Confused Man SVG (hidden on mobile) */}
            <div className="hidden lg:flex flex-col justify-center items-center">
              {/* Hand-drawn thought bubble with handwritten text */}
              <div className="mb-6 relative">
                <svg 
                  width="300" 
                  height="160" 
                  viewBox="0 0 300 160" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Hand-drawn thought bubble main body */}
                  <path 
                    d="M25 75 C20 55, 40 30, 80 35 C120 25, 180 28, 220 40 C250 45, 265 60, 260 75 C265 90, 245 105, 210 108 C170 115, 120 112, 80 105 C45 100, 22 90, 25 75 Z" 
                    fill="white" 
                    stroke="#374151" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Hand-drawn small thought bubbles */}
                  <circle 
                    cx="98" 
                    cy="125" 
                    r="8" 
                    fill="white"
                    stroke="#374151" 
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      transform: "rotate(-5deg)",
                      transformOrigin: "98px 125px"
                    }}
                  />
                  <circle 
                    cx="78" 
                    cy="135" 
                    r="5" 
                    fill="white"
                    stroke="#374151" 
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      transform: "rotate(8deg)",
                      transformOrigin: "78px 135px"
                    }}
                  />
                  <circle 
                    cx="63" 
                    cy="142" 
                    r="3" 
                    fill="white"
                    stroke="#374151" 
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      transform: "rotate(-3deg)",
                      transformOrigin: "63px 142px"
                    }}
                  />
                </svg>
                
                {/* Handwritten text overlay */}
                <div 
                  className="absolute inset-0 flex items-center justify-center px-6"
                  style={{
                    fontFamily: 'Margarine, cursive',
                    fontSize: '15px',
                    lineHeight: '1.4',
                    color: '#374151',
                    fontWeight: '400',
                    textAlign: 'center',
                    transform: 'rotate(-2deg)',
                    marginTop: '-20px'
                  }}
                >
                  <div>
                    <div>How will I find this</div>
                    <div>solopreneur post</div>
                    <div>among 500+ posts?</div>
                  </div>
                </div>
              </div>
              
              <img
                src="/Confused Man Readdit Later.svg"
                alt="Confused Man - Before using Readdit Later"
                className="w-72 xl:w-80 h-auto"
              />
            </div>

            {/* Center - Content (spans 3 columns on desktop) */}
            <div className="flex flex-col items-center text-center space-y-6 lg:col-span-3">
              {/* Product Hunt Badge */}
              <div className="flex justify-center -mt-4">
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

              {/* Badge */}
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Star className="h-4 w-4 mr-2 fill-primary text-primary" />
                Join over 80 Reddit users who are organizing their saved posts with this.
              </Badge>

              {/* Main headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight flex flex-wrap items-center justify-center gap-x-4">
                <img
                  src="/Bookmark SVG.svg"
                  alt="Bookmark"
                  className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 inline-block transform rotate-0"
                />
                Find Your Saved{" "}
                <span className="gradient-primary bg-clip-text text-transparent">
                  Reddit Posts in Seconds
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Supercharge your Reddit experience with lightning-fast search and instant filtering. Readdit Later makes managing saved posts 10x faster and effortless.
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
                  Powerful Grouping
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
            <div className="hidden lg:flex flex-col justify-center items-center">
              {/* Happy thought bubble with handwritten text */}
              <div className="mb-6 relative">
                <svg 
                  width="300" 
                  height="160" 
                  viewBox="0 0 300 160" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: 'scaleX(-1)' }}
                >
                  {/* Hand-drawn thought bubble main body (mirrored) */}
                  <path 
                    d="M25 75 C20 55, 40 30, 80 35 C120 25, 180 28, 220 40 C250 45, 265 60, 260 75 C265 90, 245 105, 210 108 C170 115, 120 112, 80 105 C45 100, 22 90, 25 75 Z" 
                    fill="white" 
                    stroke="#374151" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Hand-drawn small thought bubbles (mirrored) */}
                  <circle 
                    cx="98" 
                    cy="125" 
                    r="8" 
                    fill="white"
                    stroke="#374151" 
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      transform: "rotate(5deg)",
                      transformOrigin: "98px 125px"
                    }}
                  />
                  <circle 
                    cx="78" 
                    cy="135" 
                    r="5" 
                    fill="white"
                    stroke="#374151" 
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      transform: "rotate(-8deg)",
                      transformOrigin: "78px 135px"
                    }}
                  />
                  <circle 
                    cx="63" 
                    cy="142" 
                    r="3" 
                    fill="white"
                    stroke="#374151" 
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      transform: "rotate(3deg)",
                      transformOrigin: "63px 142px"
                    }}
                  />
                </svg>
                
                {/* Happy handwritten text overlay */}
                <div 
                  className="absolute inset-0 flex items-center justify-center px-6"
                  style={{
                    fontFamily: 'Margarine, cursive',
                    fontSize: '15px',
                    lineHeight: '1.4',
                    color: '#374151',
                    fontWeight: '400',
                    textAlign: 'center',
                    transform: 'rotate(2deg)',
                    marginTop: '-20px'
                  }}
                >
                  <div>
                    <div>Wait, what? I just found</div>
                    <div>a post I saved 2 months ago</div>
                    <div>without scrolling!</div>
                  </div>
                </div>
              </div>
              
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
                src="/Land Page Read Lat 3.mp4"
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
        </div>
      </section>
    </>
  );
};

export default Hero;
