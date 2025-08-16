import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-5"></div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            <Star className="h-4 w-4 mr-2 fill-primary text-primary" />
            5.0 Rating • 10+ Users
          </Badge>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Save & Organize Your{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Reddit Posts
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Never lose track of great Reddit content again! Save posts directly from Reddit, 
            sync them across devices, and browse in a clean, distraction-free view.
          </p>

          {/* Demo Video */}
          <div className="w-full max-w-4xl mx-auto mb-8">
            <div className="aspect-video bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Demo Video Placeholder</p>
                <p className="text-sm text-muted-foreground">1920x1080 resolution</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              variant="hero" 
              size="default" 
              className="px-6 py-3"
              onClick={() => window.open('https://chromewebstore.google.com/detail/jdceogapnjfcfdklbpnllbmnjbfmfejk', '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
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
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
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
      </div>
    </section>
  );
};

export default Hero;