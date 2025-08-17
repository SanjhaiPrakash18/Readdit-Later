import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Benefits", href: "#benefits" },
    { name: "Pricing", href: "#pricing" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <rect width="20" height="20" rx="3" fill="#0077B5"/>
          <path fill="#fff" d="M6.94 8.5H5.25v5.25h1.69V8.5Zm-.85-2.74c-.54 0-.88.36-.88.82 0 .45.33.81.86.81h.01c.55 0 .88-.36.88-.81-.01-.46-.33-.82-.87-.82ZM14.75 11.44c0-1.6-.85-2.34-2-2.34-.92 0-1.34.51-1.57.87V8.5H9.5c.02.41 0 5.25 0 5.25h1.69v-2.93c0-.16.01-.33.06-.45.14-.33.43-.66.94-.66.67 0 .93.5.93 1.24v2.8h1.69v-3.25ZM5.25 7.5c-.01 0-.01 0 0 0Z"/>
        </svg>
      ),
    },
    {
      name: "X",
      href: "https://x.com/",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <rect width="20" height="20" rx="3" fill="#000"/>
          <path fill="#fff" d="M6.3 6.5h2.01l2.01 2.6 2.28-2.6h1.3l-2.91 3.23 3.03 3.77h-2.01l-2.13-2.75-2.41 2.75H6.4l3.11-3.55-2.86-3.45Zm2.02 1.08-.58-.75h-.01l.59.75Z"/>
        </svg>
      ),
    },
    {
      name: "Reddit",
      href: "https://reddit.com/",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <rect width="20" height="20" rx="3" fill="#FF4500"/>
          <g>
            <ellipse cx="10" cy="13.5" rx="4.5" ry="3" fill="#fff"/>
            <circle cx="7.7" cy="12.2" r="0.7" fill="#FF4500"/>
            <circle cx="12.3" cy="12.2" r="0.7" fill="#FF4500"/>
            <ellipse cx="10" cy="14.6" rx="1.5" ry="0.5" fill="#FF4500"/>
            <circle cx="15.2" cy="9.2" r="1" fill="#fff" stroke="#FF4500" strokeWidth="0.5"/>
            <circle cx="4.8" cy="9.2" r="1" fill="#fff" stroke="#FF4500" strokeWidth="0.5"/>
            <ellipse cx="10" cy="10.8" rx="4.5" ry="3" fill="none" stroke="#FF4500" strokeWidth="0.8"/>
            <circle cx="10" cy="10.8" r="0.9" fill="#fff"/>
            <circle cx="10" cy="10.8" r="0.8" fill="none" stroke="#FF4500" strokeWidth="0.2"/>
          </g>
          <circle cx="13.5" cy="6.5" r="1" fill="#fff" stroke="#FF4500" strokeWidth="0.5"/>
          <path d="M11.5 6.2l1.2.3" stroke="#FF4500" strokeWidth="0.5" strokeLinecap="round"/>
          <circle cx="10" cy="10.8" r="0.15" fill="#FF4500"/>
        </svg>
      ),
    },
  ];

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/71d413d8-e032-432c-b651-41c88e16fcc0.png" 
            alt="Readdit Later Logo" 
            className="h-10 w-10 rounded-lg"
          />
          <h1 className="text-xl font-bold">Readdit Later</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 items-center ml-8">
          <div className="flex items-center space-x-6">
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
          <div className="flex items-center space-x-4 ml-auto">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-1 hover:scale-110 transition-transform"
              >
                {social.svg}
              </a>
            ))}
            <Button 
              variant="hero" 
              size="default"
              className="text-white hover:bg-gray-800"
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
              Add to Chrome
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
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
                      {social.svg}
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
                      filter: "brightness(0) invert(1)" // This makes any color white
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
