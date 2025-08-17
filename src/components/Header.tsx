import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Benefits", href: "#benefits" },
    { name: "Pricing", href: "#pricing" },
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
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </button>
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
