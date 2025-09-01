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
                <g fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {/* Quote marks */}
                  <path d="M45 35 L47 33" transform="rotate(-15 46 34)"/>
                  <path d="M49 35 L51 33" transform="rotate(-15 50 34)"/>
                  
                  {/* "How will I find this" - Line 1 */}
                  <g transform="translate(55, 38)">
                    {/* H - handwritten style */}
                    <path d="M0 0 Q0.5 0, 1 0.5 L1 10 Q1 10.5, 0.5 11 Q0 11, 0 10.5 L0 0.5 Z M0 5 Q2 4.5, 4 5 M4 0.5 Q4 0, 4.5 0 Q5 0, 5 0.5 L5 10.5 Q5 11, 4.5 11 Q4 11, 4 10.5"/>
                    {/* o */}
                    <path d="M9 3.5 Q9 2.5, 10 2.5 Q11.5 2.5, 12.5 3.5 Q13 4.5, 12.5 5.5 Q11.5 6.5, 10 6.5 Q9 6.5, 9 5.5 Q8.5 4.5, 9 3.5"/>
                    {/* w */}
                    <path d="M17 3 Q17.5 3, 18 3.5 L18.5 7 Q19 6, 19.5 5.5 L20 7 Q20.5 3.5, 21 3 Q21.5 3, 21.5 3.5"/>
                    {/* space */}
                    {/* w */}
                    <path d="M25.5 3 Q26 3, 26.5 3.5 L27 7 Q27.5 6, 28 5.5 L28.5 7 Q29 3.5, 29.5 3 Q30 3, 30 3.5"/>
                    {/* i */}
                    <path d="M34 3.5 Q34 3, 34.5 3 Q35 3, 35 3.5 L35 6.5 Q35 7, 34.5 7 Q34 7, 34 6.5 M34.2 1 Q34.7 0.8, 35 1.2"/>
                    {/* l */}
                    <path d="M39 0.5 Q39 0, 39.5 0 Q40 0, 40 0.5 L40 6.5 Q40 7, 39.5 7 Q39 7, 39 6.5"/>
                    {/* l */}
                    <path d="M43.5 0.5 Q43.5 0, 44 0 Q44.5 0, 44.5 0.5 L44.5 6.5 Q44.5 7, 44 7 Q43.5 7, 43.5 6.5"/>
                    {/* space */}
                    {/* I */}
                    <path d="M49 3 Q51 2.8, 53 3 M51 3 L51 6.5 Q51 7, 50.5 7 M49 6.8 Q51 7, 53 6.8"/>
                    {/* space */}
                    {/* f */}
                    <path d="M58 0.5 Q58 0, 58.5 0 Q59 0, 59 0.5 L59 6.5 Q59 7, 58.5 7 M58.5 3.5 Q60.5 3.3, 62 3.5"/>
                    {/* i */}
                    <path d="M66 3.5 Q66 3, 66.5 3 Q67 3, 67 3.5 L67 6.5 Q67 7, 66.5 7 Q66 7, 66 6.5 M66.2 1 Q66.7 0.8, 67 1.2"/>
                    {/* n */}
                    <path d="M71 6.5 Q71 7, 70.5 7 Q70 7, 70 6.5 L70 3.5 Q70 3, 70.5 3 Q72 2.8, 73 3.5 L73 6.5 Q73 7, 73.5 7"/>
                    {/* d */}
                    <path d="M78 0.5 Q78 0, 78.5 0 Q79 0, 79 0.5 L79 6.5 Q79 7, 78.5 7 Q77 7.2, 76 6.5 Q75.5 5.5, 76 4.5 Q77 3.8, 78.5 4"/>
                    {/* space */}
                    {/* t */}
                    <path d="M84 1 Q84 0.5, 84.5 0.5 Q85 0.5, 85 1 L85 6 Q85 6.8, 84.2 6.8 M83 3 Q85.5 2.8, 87 3"/>
                    {/* h */}
                    <path d="M91 0.5 Q91 0, 91.5 0 Q92 0, 92 0.5 L92 6.5 Q92 7, 91.5 7 M92 4 Q93 3.5, 94 4 L94 6.5 Q94 7, 94.5 7"/>
                    {/* i */}
                    <path d="M98.5 3.5 Q98.5 3, 99 3 Q99.5 3, 99.5 3.5 L99.5 6.5 Q99.5 7, 99 7 Q98.5 7, 98.5 6.5 M98.7 1 Q99.2 0.8, 99.5 1.2"/>
                    {/* s */}
                    <path d="M104 3.5 Q104 3, 105 3 Q106 3, 106.5 3.5 Q106.5 4, 106 4.2 Q105 4.5, 104.5 5 Q104 5.5, 104.5 6 Q105.5 6.5, 106.5 6.2"/>
                  </g>
                  
                  {/* "solopreneur post" - Line 2 */}
                  <g transform="translate(70, 52)">
                    {/* s */}
                    <path d="M0 3.5 Q0 3, 1 3 Q2 3, 2.5 3.5 Q2.5 4, 2 4.2 Q1 4.5, 0.5 5 Q0 5.5, 0.5 6 Q1.5 6.5, 2.5 6.2"/>
                    {/* o */}
                    <path d="M6 3.5 Q6 2.5, 7 2.5 Q8.5 2.5, 9.5 3.5 Q10 4.5, 9.5 5.5 Q8.5 6.5, 7 6.5 Q6 6.5, 6 5.5 Q5.5 4.5, 6 3.5"/>
                    {/* l */}
                    <path d="M13.5 0.5 Q13.5 0, 14 0 Q14.5 0, 14.5 0.5 L14.5 6.5 Q14.5 7, 14 7 Q13.5 7, 13.5 6.5"/>
                    {/* o */}
                    <path d="M18 3.5 Q18 2.5, 19 2.5 Q20.5 2.5, 21.5 3.5 Q22 4.5, 21.5 5.5 Q20.5 6.5, 19 6.5 Q18 6.5, 18 5.5 Q17.5 4.5, 18 3.5"/>
                    {/* p */}
                    <path d="M26 3 Q26 2.5, 26.5 2.5 Q27 2.5, 27 3 L27 8.5 Q27 9, 26.5 9 Q26 9, 26 8.5 M27 4 Q28 3.5, 29 4 Q29.5 4.5, 29 5.5 Q28 6, 27 5.5"/>
                    {/* r */}
                    <path d="M33 6.5 Q33 7, 32.5 7 Q32 7, 32 6.5 L32 3.5 Q32 3, 32.5 3 Q34 2.8, 35 3.8"/>
                    {/* e */}
                    <path d="M39 4.5 Q41 4.3, 43 4.5 Q43 3.5, 42 3 Q41 2.8, 40 3 Q39 3.5, 39 4.5 Q39 5.5, 40 6 Q41.5 6.3, 42.5 6"/>
                    {/* n */}
                    <path d="M47 6.5 Q47 7, 46.5 7 Q46 7, 46 6.5 L46 3.5 Q46 3, 46.5 3 Q48 2.8, 49 3.5 L49 6.5 Q49 7, 49.5 7"/>
                    {/* e */}
                    <path d="M53.5 4.5 Q55.5 4.3, 57.5 4.5 Q57.5 3.5, 56.5 3 Q55.5 2.8, 54.5 3 Q53.5 3.5, 53.5 4.5 Q53.5 5.5, 54.5 6 Q56 6.3, 57 6"/>
                    {/* u */}
                    <path d="M61.5 3.5 Q61.5 3, 62 3 Q62.5 3, 62.5 3.5 L62.5 5.5 Q62.5 6.5, 63.5 6.5 Q64.5 6.5, 65 5.5 L65 3.5 Q65 3, 65.5 3"/>
                    {/* r */}
                    <path d="M69.5 6.5 Q69.5 7, 69 7 Q68.5 7, 68.5 6.5 L68.5 3.5 Q68.5 3, 69 3 Q70.5 2.8, 71.5 3.8"/>
                    {/* space */}
                    {/* p */}
                    <path d="M76 3 Q76 2.5, 76.5 2.5 Q77 2.5, 77 3 L77 8.5 Q77 9, 76.5 9 Q76 9, 76 8.5 M77 4 Q78 3.5, 79 4 Q79.5 4.5, 79 5.5 Q78 6, 77 5.5"/>
                    {/* o */}
                    <path d="M83 3.5 Q83 2.5, 84 2.5 Q85.5 2.5, 86.5 3.5 Q87 4.5, 86.5 5.5 Q85.5 6.5, 84 6.5 Q83 6.5, 83 5.5 Q82.5 4.5, 83 3.5"/>
                    {/* s */}
                    <path d="M91 3.5 Q91 3, 92 3 Q93 3, 93.5 3.5 Q93.5 4, 93 4.2 Q92 4.5, 91.5 5 Q91 5.5, 91.5 6 Q92.5 6.5, 93.5 6.2"/>
                    {/* t */}
                    <path d="M98 1 Q98 0.5, 98.5 0.5 Q99 0.5, 99 1 L99 6 Q99 6.8, 98.2 6.8 M97 3 Q99.5 2.8, 101 3"/>
                  </g>
                  
                  {/* "among 500+ posts?" - Line 3 */}
                  <g transform="translate(60, 66)">
                    {/* a */}
                    <path d="M0 6.5 Q0 7, 0.5 7 L0.5 4.5 Q0.5 3.5, 1.5 3.5 Q2.5 3.5, 3 4.5 L3 6.5 Q3 7, 3.5 7 M0.8 5.5 Q2.2 5.3, 3.2 5.5"/>
                    {/* m */}
                    <path d="M7.5 6.5 Q7.5 7, 7 7 Q6.5 7, 6.5 6.5 L6.5 3.5 Q6.5 3, 7 3 Q8 2.8, 8.5 3.5 Q9.5 2.8, 10.5 3.5 L10.5 6.5 Q10.5 7, 11 7"/>
                    {/* o */}
                    <path d="M15 3.5 Q15 2.5, 16 2.5 Q17.5 2.5, 18.5 3.5 Q19 4.5, 18.5 5.5 Q17.5 6.5, 16 6.5 Q15 6.5, 15 5.5 Q14.5 4.5, 15 3.5"/>
                    {/* n */}
                    <path d="M23 6.5 Q23 7, 22.5 7 Q22 7, 22 6.5 L22 3.5 Q22 3, 22.5 3 Q24 2.8, 25 3.5 L25 6.5 Q25 7, 25.5 7"/>
                    {/* g */}
                    <path d="M29.5 4.5 Q29.5 3.5, 30.5 3.5 Q31.5 3.5, 32 4.5 Q32 6.5, 31 7.5 Q30.5 8, 30 8.5 L32 8.2 M29.8 5.5 Q31.2 5.3, 32.2 5.5"/>
                    {/* space */}
                    {/* 5 */}
                    <path d="M37 3 Q39 2.8, 41 3 M37 3 L37 4.5 Q39 4.3, 40.5 4.5 Q41 5, 40.5 5.5 Q39.5 6.5, 37.5 6.3"/>
                    {/* 0 */}
                    <path d="M44.5 3.5 Q44.5 2.5, 45.5 2.5 Q47 2.5, 48 3.5 Q48.5 4.5, 48 5.5 Q47 6.5, 45.5 6.5 Q44.5 6.5, 44.5 5.5 Q44 4.5, 44.5 3.5"/>
                    {/* 0 */}
                    <path d="M52 3.5 Q52 2.5, 53 2.5 Q54.5 2.5, 55.5 3.5 Q56 4.5, 55.5 5.5 Q54.5 6.5, 53 6.5 Q52 6.5, 52 5.5 Q51.5 4.5, 52 3.5"/>
                    {/* + */}
                    <path d="M60 2.8 Q60 2.5, 60.3 2.5 Q60.6 2.5, 60.6 2.8 L60.6 5.7 Q60.6 6, 60.3 6 Q60 6, 60 5.7 M58.8 4.2 Q61.8 4, 62.2 4.2"/>
                    {/* space */}
                    {/* p */}
                    <path d="M67 3 Q67 2.5, 67.5 2.5 Q68 2.5, 68 3 L68 8.5 Q68 9, 67.5 9 Q67 9, 67 8.5 M68 4 Q69 3.5, 70 4 Q70.5 4.5, 70 5.5 Q69 6, 68 5.5"/>
                    {/* o */}
                    <path d="M74 3.5 Q74 2.5, 75 2.5 Q76.5 2.5, 77.5 3.5 Q78 4.5, 77.5 5.5 Q76.5 6.5, 75 6.5 Q74 6.5, 74 5.5 Q73.5 4.5, 74 3.5"/>
                    {/* s */}
                    <path d="M82 3.5 Q82 3, 83 3 Q84 3, 84.5 3.5 Q84.5 4, 84 4.2 Q83 4.5, 82.5 5 Q82 5.5, 82.5 6 Q83.5 6.5, 84.5 6.2"/>
                    {/* t */}
                    <path d="M89 1 Q89 0.5, 89.5 0.5 Q90 0.5, 90 1 L90 6 Q90 6.8, 89.2 6.8 M88 3 Q90.5 2.8, 92 3"/>
                    {/* s */}
                    <path d="M96 3.5 Q96 3, 97 3 Q98 3, 98.5 3.5 Q98.5 4, 98 4.2 Q97 4.5, 96.5 5 Q96 5.5, 96.5 6 Q97.5 6.5, 98.5 6.2"/>
                    {/* ? */}
                    <path d="M103 3.5 Q103 3, 104 3 Q105 3, 105.5 3.5 Q105.5 4.2, 105 4.5 Q104.2 4.8, 104.2 5.2 M104.2 6.8 Q104.5 7, 104.8 6.8"/>
                  </g>
                  
                  {/* Closing quote marks */}
                  <path d="M167 68 L169 70" transform="rotate(15 168 69)"/>
                  <path d="M171 68 L173 70" transform="rotate(15 172 69)"/>
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
