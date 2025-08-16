import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Download, Star } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container">
        <Card className="max-w-4xl mx-auto shadow-primary border-primary/20">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/71d413d8-e032-432c-b651-41c88e16fcc0.png" 
                  alt="Readdit Later Logo" 
                  className="h-16 w-16"
                />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to Transform Your{" "}
                <span className="gradient-primary bg-clip-text text-transparent">
                  Reddit Experience?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Join the growing community of organized Reddit users. Install Readdit Later now and never lose track of great content again.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6 h-auto"
                onClick={() => window.open('https://chromewebstore.google.com/detail/jdceogapnjfcfdklbpnllbmnjbfmfejk', '_blank')}
              >
                <Download className="h-5 w-5 mr-2" />
                Install Free Extension
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 h-auto"
                onClick={() => window.open('https://chromewebstore.google.com/detail/jdceogapnjfcfdklbpnllbmnjbfmfejk', '_blank')}
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                View on Chrome Store
              </Button>
            </div>

            <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span>5.0 rating • Free installation • 1.03MB</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CTA;