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
                width="280" 
                height="140" 
                viewBox="0 0 280 140" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Hand-drawn thought bubble main body */}
                <path 
                  d="M25 65 C20 45, 40 20, 80 25 C120 15, 180 18, 220 30 C250 35, 265 50, 260 65 C265 80, 245 95, 210 98 C170 105, 120 102, 80 95 C45 90, 22 80, 25 65 Z" 
                  fill="none" 
                  stroke="#374151" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: "none"
                  }}
                />
                
                {/* Hand-drawn small thought bubbles */}
                <circle 
                  cx="98" 
                  cy="115" 
                  r="8" 
                  fill="none" 
                  stroke="#374151" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    transform: "rotate(-5deg)",
                    transformOrigin: "98px 115px"
                  }}
                />
                <circle 
                  cx="78" 
                  cy="125" 
                  r="5" 
                  fill="none" 
                  stroke="#374151" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    transform: "rotate(8deg)",
                    transformOrigin: "78px 125px"
                  }}
                />
                <circle 
                  cx="63" 
                  cy="132" 
                  r="3" 
                  fill="none" 
                  stroke="#374151" 
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    transform: "rotate(-3deg)",
                    transformOrigin: "63px 132px"
                  }}
                />
                
                {/* Hand-drawn text inside bubble */}
                <g fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {/* "How will I find this" */}
                  <g transform="translate(60, 35)">
                    {/* H */}
                    <path d="M0 0 L0 12 M0 6 L4 6 M4 0 L4 12"/>
                    {/* o */}
                    <path d="M8 4 C8 2, 12 2, 12 4 C12 6, 8 6, 8 4 Z"/>
                    {/* w */}
                    <path d="M16 2 L17 8 L18 4 L19 8 L20 2"/>
                    {/* (space) */}
                    {/* w */}
                    <path d="M24 2 L25 8 L26 4 L27 8 L28 2"/>
                    {/* i */}
                    <path d="M32 2 L32 8 M32 0 L32 1"/>
                    {/* l */}
                    <path d="M36 0 L36 8"/>
                    {/* l */}
                    <path d="M40 0 L40 8"/>
                    {/* (space) */}
                    {/* I */}
                    <path d="M46 2 L46 8 M44 2 L48 2 M44 8 L48 8"/>
                    {/* (space) */}
                    {/* f */}
                    <path d="M54 0 L54 8 M54 4 L58 4"/>
                    {/* i */}
                    <path d="M62 2 L62 8 M62 0 L62 1"/>
                    {/* n */}
                    <path d="M66 8 L66 2 C66 2, 70 2, 70 8"/>
                    {/* d */}
                    <path d="M74 0 L74 8 C74 2, 78 2, 78 8"/>
                    {/* (space) */}
                    {/* t */}
                    <path d="M84 1 L84 8 M82 3 L86 3"/>
                    {/* h */}
                    <path d="M90 0 L90 8 C90 4, 94 4, 94 8"/>
                    {/* i */}
                    <path d="M98 2 L98 8 M98 0 L98 1"/>
                    {/* s */}
                    <path d="M102 2 C102 2, 106 2, 106 4 C106 6, 102 6, 102 8 C102 8, 106 8, 106 8"/>
                  </g>
                  
                  {/* "solopreneur post" */}
                  <g transform="translate(75, 50)">
                    {/* s */}
                    <path d="M0 2 C0 2, 4 2, 4 4 C4 6, 0 6, 0 8 C0 8, 4 8, 4 8"/>
                    {/* o */}
                    <path d="M8 4 C8 2, 12 2, 12 4 C12 6, 8 6, 8 4 Z"/>
                    {/* l */}
                    <path d="M16 0 L16 8"/>
                    {/* o */}
                    <path d="M20 4 C20 2, 24 2, 24 4 C24 6, 20 6, 20 4 Z"/>
                    {/* p */}
                    <path d="M28 2 L28 10 C28 2, 32 2, 32 4 C32 6, 28 6, 28 6"/>
                    {/* r */}
                    <path d="M36 8 L36 2 C36 2, 40 2, 40 4"/>
                    {/* e */}
                    <path d="M44 4 L48 4 C48 2, 44 2, 44 4 C44 6, 48 6, 48 8"/>
                    {/* n */}
                    <path d="M52 8 L52 2 C52 2, 56 2, 56 8"/>
                    {/* e */}
                    <path d="M60 4 L64 4 C64 2, 60 2, 60 4 C60 6, 64 6, 64 8"/>
                    {/* u */}
                    <path d="M68 2 L68 6 C68 8, 72 8, 72 6 L72 2"/>
                    {/* r */}
                    <path d="M76 8 L76 2 C76 2, 80 2, 80 4"/>
                    {/* (space) */}
                    {/* p */}
                    <path d="M86 2 L86 10 C86 2, 90 2, 90 4 C90 6, 86 6, 86 6"/>
                    {/* o */}
                    <path d="M94 4 C94 2, 98 2, 98 4 C98 6, 94 6, 94 4 Z"/>
                    {/* s */}
                    <path d="M102 2 C102 2, 106 2, 106 4 C106 6, 102 6, 102 8 C102 8, 106 8, 106 8"/>
                    {/* t */}
                    <path d="M112 1 L112 8 M110 3 L114 3"/>
                  </g>
                  
                  {/* "among 500+ posts?" */}
                  <g transform="translate(55, 65)">
                    {/* a */}
                    <path d="M0 8 L0 4 C0 2, 4 2, 4 4 L4 8 M0 6 L4 6"/>
                    {/* m */}
                    <path d="M8 8 L8 2 C8 2, 10 4, 12 2 C12 2, 14 4, 16 2 L16 8"/>
                    {/* o */}
                    <path d="M20 4 C20 2, 24 2, 24 4 C24 6, 20 6, 20 4 Z"/>
                    {/* n */}
                    <path d="M28 8 L28 2 C28 2, 32 2, 32 8"/>
                    {/* g */}
                    <path d="M36 4 C36 2, 40 2, 40 4 C40 8, 36 8, 36 6 L40 6 L40 10"/>
                    {/* (space) */}
                    {/* 5 */}
                    <path d="M48 2 L48 4 L52 4 C52 4, 52 8, 48 8 M48 2 L52 2"/>
                    {/* 0 */}
                    <path d="M56 2 C56 2, 60 2, 60 8 C60 8, 56 8, 56 2 Z"/>
                    {/* 0 */}
                    <path d="M64 2 C64 2, 68 2, 68 8 C68 8, 64 8, 64 2 Z"/>
                    {/* + */}
                    <path d="M72 3 L72 7 M70 5 L74 5"/>
                    {/* (space) */}
                    {/* p */}
                    <path d="M80 2 L80 10 C80 2, 84 2, 84 4 C84 6, 80 6, 80 6"/>
                    {/* o */}
                    <path d="M88 4 C88 2, 92 2, 92 4 C92 6, 88 6, 88 4 Z"/>
                    {/* s */}
                    <path d="M96 2 C96 2, 100 2, 100 4 C100 6, 96 6, 96 8 C96 8, 100 8, 100 8"/>
                    {/* t */}
                    <path d="M106 1 L106 8 M104 3 L108 3"/>
                    {/* s */}
                    <path d="M112 2 C112 2, 116 2, 116 4 C116 6, 112 6, 112 8 C112 8, 116 8, 116 8"/>
                    {/* ? */}
                    <path d="M120 2 C120 2, 124 2, 124 4 C124 6, 120 6, 120 6 M120 8 L120 9"/>
                  </g>
                  
                  {/* Quote marks */}
                  <path d="M55 32 L57 30" transform="rotate(-10 56 31)"/>
                  <path d="M59 32 L61 30" transform="rotate(-10 60 31)"/>
                  <path d="M145 68 L147 70" transform="rotate(10 146 69)"/>
                  <path d="M149 68 L151 70" transform="rotate(10 150 69)"/>
                </g>
              </svg>
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
              Join over 70 Reddit users who are organizing their saved posts with this.
            </Badge>

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight flex flex-wrap items-center justify-center gap-x-4">
              <img
                src="/Bookmark SVG.svg"
                alt="Bookmark"
                className="h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 inline-block transform rotate-0"
              />
              Manage Your Saved{" "}
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
              src="/Land Page Read Lat 2.mp4"
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
  );
};

export default Hero;
