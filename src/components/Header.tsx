import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/71d413d8-e032-432c-b651-41c88e16fcc0.png" 
            alt="Readdit Later Logo" 
            className="h-10 w-10"
          />
          <h1 className="text-xl font-bold">Readdit Later</h1>
        </div>
        <Button 
          variant="hero" 
          size="lg"
          className="shadow-primary"
          onClick={() => window.open('https://chromewebstore.google.com/detail/jdceogapnjfcfdklbpnllbmnjbfmfejk', '_blank')}
        >
          <ExternalLink className="h-4 w-4" />
          Add to Chrome
        </Button>
      </div>
    </header>
  );
};

export default Header;