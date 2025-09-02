import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Benefits", href: "#benefits" },
    { name: "Pricing", href: "#pricing" },
    { name: "Tutorials", href: "#tutorials" },
  ];

  const socialLinks = [
    {
      name: "Discord",
      href: "https://discord.gg/dbVnvKp3",
      icon: "/Discord Logo.svg",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/sanjhaiprakash/",
      icon: "/LinkedIn Icon.svg",
    },
    {
      name: "X",
      href: "https://x.com/Sanjhai_18",
      icon: "/X Icon.svg",
    },
    {
      name: "Reddit",
      href: "https://www.reddit.com/user/Appropriate-Look-875/",
      icon: "/Reddit Icon.svg",
    },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      // Smooth scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // If element not found, try alternate approach
        console.warn(`Element with selector ${href} not found`);
      }
    } else {
      // Navigate to different page
      window.location.href = href;
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-16 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Logo Left */}
        <div 
          className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity select-none"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleLogoClick();
            }
          }}
          aria-label="Go to home section"
        >
          <img 
            src="/readdit-later-logo.png" 
            alt="Readdit Later Logo" 
            className="h-10 w-10 rounded-lg"
          />
          <h1 className="text-xl font-bold">Readdit Later</h1>
        </div>

        {/* Centered Nav (hidden on mobile) */}
        <nav className="hidden md:flex justify-center">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Socials & CTA Right (hidden on mobile) */}
        <div className="hidden md:flex items-center justify-end space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="p-1 hover:scale-110 transition-transform"
            >
              <img
                src={social.icon}
                alt={social.name}
                className={
                  social.name === "LinkedIn" || social.name === "Reddit" || social.name === "Discord"
                    ? "h-6 w-6"
                    : "h-4 w-4"
                }
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                  ...(social.name === "LinkedIn" || social.name === "Reddit" || social.name === "Discord"
                    ? { height: "24px", width: "24px" }
                    : {}),
                }}
              />
            </a>
          ))}
          <Button 
            variant="hero" 
            size="default"
            className="text-black border border-black hover:bg-gray-100 bg-transparent shadow-none"
            onClick={() => window.open('https://chromewebstore.google.com/detail/jdceogapnjfcfdklbpnllbmnjbfmfejk', '_blank')}
          >
            <img
              src="/Chrome SVG.svg"
              alt="Chrome"
              className="h-4 w-4 mr-2"
              style={{ 
                display: "inline-block", 
                verticalAlign: "middle"
              }}
            />
            Add to Chrome
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-6 items-end">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="text-right text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="flex items-center space-x-4 mt-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <img
                        src={social.icon}
                        alt={social.name}
                        className={
                          social.name === "LinkedIn" || social.name === "Reddit" || social.name === "Discord"
                            ? "h-6 w-6"
                            : "h-4 w-4"
                        }
                        style={{
                          display: "inline-block",
                          verticalAlign: "middle",
                          ...(social.name === "LinkedIn" || social.name === "Reddit" || social.name === "Discord"
                            ? { height: "24px", width: "24px" }
                            : {}),
                        }}
                      />
                    </a>
                  ))}
                </div>
                <Button 
                  variant="hero" 
                  size="default"
                  className="text-white hover:bg-gray-800 mt-4"
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
                  Add to Chrome
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
    {
      id: 1,
      title: "Getting Started with Readdit Later",
      description: "Learn how to install and set up the Readdit Later Chrome extension",
      videoId: "your-video-id-here", // Replace with actual YouTube video ID
      thumbnail: `https://img.youtube.com/vi/your-video-id-here/maxresdefault.jpg`
    },
    {
      id: 2,
      title: "Saving and Organizing Posts",
      description: "Master the art of saving and categorizing your favorite Reddit posts",
      videoId: "your-video-id-here", // Replace with actual YouTube video ID
      thumbnail: `https://img.youtube.com/vi/your-video-id-here/maxresdefault.jpg`
    },
    {
      id: 3,
      title: "Advanced Features & Tips",
      description: "Discover pro tips and advanced features to maximize your productivity",
      videoId: "your-video-id-here", // Replace with actual YouTube video ID
      thumbnail: `https://img.youtube.com/vi/your-video-id-here/maxresdefault.jpg`
    },
    {
      id: 4,
      title: "Syncing Across Devices",
      description: "How to access your saved posts across multiple devices seamlessly",
      videoId: "your-video-id-here", // Replace with actual YouTube video ID
      thumbnail: `https://img.youtube.com/vi/your-video-id-here/maxresdefault.jpg`
    },
    {
      id: 5,
      title: "Troubleshooting Common Issues",
      description: "Quick solutions to common problems and FAQs",
      videoId: "your-video-id-here", // Replace with actual YouTube video ID
      thumbnail: `https://img.youtube.com/vi/your-video-id-here/maxresdefault.jpg`
    },
    {
      id: 6,
      title: "Best Practices Guide",
      description: "Learn the best practices for managing your Reddit content library",
      videoId: "your-video-id-here", // Replace with actual YouTube video ID
      thumbnail: `https://img.youtube.com/vi/your-video-id-here/maxresdefault.jpg`
    }
  ];

  const handleVideoClick = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <section id="tutorials" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Video Tutorials
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master Readdit Later with our comprehensive video guides. Learn everything from basic setup to advanced features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorialVideos.map((video) => (
            <Card 
              key={video.id} 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden border-muted/20"
              onClick={() => handleVideoClick(video.videoId)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="line-clamp-3">
                  {video.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Have questions or need help with something specific?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://discord.gg/dbVnvKp3" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-colors font-medium"
            >
              <img src="/Discord Logo.svg" alt="Discord" className="w-5 h-5 mr-2 brightness-0 invert" />
              Join our Discord
            </a>
            <a 
              href="https://www.reddit.com/user/Appropriate-Look-875/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#FF4500] text-white rounded-lg hover:bg-[#E03D00] transition-colors font-medium"
            >
              <img src="/Reddit Icon.svg" alt="Reddit" className="w-5 h-5 mr-2 brightness-0 invert" />
              Contact on Reddit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tutorials;
