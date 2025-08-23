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
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    // Navigate to hero section - looks for section with py-20 lg:py-32 classes (your hero section)
    const heroSection = document.querySelector('section.py-20.lg\\:py-32') || 
                       document.querySelector('#hero') || 
                       document.querySelector('.hero') || 
                       document.querySelector('main');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no hero section is found, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Responsive: 2 columns on mobile, 3 columns on md+ */}
      <div className="container h-16 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Logo Left (always left column) - Now clickable */}
        <div 
          className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        >
          <img 
            src="/lovable-uploads/71d413d8-e032-432c-b651-41c88e16fcc0.png" 
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
                    ? "h-6 w-6" // 24px for LinkedIn, Reddit, and Discord
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

        {/* Mobile Navigation (Hamburger right aligned; always column 2 on mobile) */}
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
