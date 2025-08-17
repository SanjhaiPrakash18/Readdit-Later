import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Auto Sync Across Devices",
  "Powerful Search & Filters",
  "Bulk Actions",
  "Statistics Dashboard",
  "Unlimited Saves",
  "Clean Reading Experience",
  "Privacy Focused",
  "Regular Updates"
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Get all features completely free. No hidden costs, no subscription required.
          </p>
        </div>
        <div className="max-w-md mx-auto">
          <Card className="shadow-card relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Most Popular
              </Badge>
            </div>
            
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">Free For Now</CardTitle>
              <CardDescription className="text-muted-foreground">
                Everything you need to organize your Reddit content
              </CardDescription>
              <div className="mt-6">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-muted-foreground ml-2">for now</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              {/* Center the button */}
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-gray-800 text-white w-fit"
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
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                No credit card required • Install in seconds
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
