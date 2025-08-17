import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Star } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Dotted grid background */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <div className="container">
          <Card
            className="max-w-4xl mx-auto"
            style={{
              borderTop: "1px solid #e5e7eb",
              borderRight: "1px solid #e5e7eb",
              borderBottom: "1px solid #e5e7eb",
              borderLeft: "1px solid #e5e7eb",
            }}
          >
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <div className="flex justify-center mb-4">
                  <img
                    src="/lovable-uploads/71d413d8-e032-432c-b651-41c88e16fcc0.png"
                    alt="Readdit Later Logo"
                    className="h-16 w-16 rounded-lg"
                  />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Ready to Transform Your{" "}
                  <span className="gradient-primary bg-clip-text text-transparent">
                    Reddit Experience?
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Join the growing community of organized Reddit users. Install
                  Readdit Later now and never lose track of great content again.
                </p>
              </div>
              {/* Responsive Button below */}
              <div className="flex justify-center mb-8">
                <Button
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-6 py-3 bg-black hover:bg-gray-800 text-white text-base sm:text-lg"
                  onClick={() =>
                    window.open(
                      "https://chromewebstore.google.com/detail/jdceogapnjfcfdklbpnllbmnjbfmfejk",
                      "_blank"
                    )
                  }
                >
                  <Download className="h-4 w-4 mr-2" />
                  <span className="truncate">
                    Become an organized Reddit user
                  </span>
                </Button>
              </div>
              <div className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span>5.0 rating • Free installation • 1.03MB</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CTA;
