import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t bg-background/95 backdrop-blur overflow-hidden">
      {/* Dotted grid background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      <div className="container relative py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/71d413d8-e032-432c-b651-41c88e16fcc0.png" 
              alt="Readdit Later Logo" 
              className="h-8 w-8 rounded-lg"
            />
            <span className="font-semibold">Readdit Later</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a 
              href="https://chromewebstore.google.com/detail/jdceogapnjfcfdklbpnllbmnjbfmfejk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary transition-colors text-xs"
            >
              Chrome Store <ExternalLink className="h-3 w-3" />
            </a>
            <span className="text-xs">Version 1.0.9</span>
            <span className="text-xs">© 2024 Readdit Later</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;