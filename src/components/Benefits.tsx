import React from "react";
import { CheckCircle2, X, Search, Filter, BarChart3, Zap, Eye, Users } from "lucide-react";

const comparisonFeatures = [
  {
    reddit: "Basic chronological list with no categories",
    readditLater: "Smart filtering by subreddit, post type, and time periods",
  },
  {
    reddit: "No search within saved posts",
    readditLater: "Powerful search across titles, subreddits, and content",
  },
  {
    reddit: "No analytics or usage statistics",
    readditLater: "Detailed stats on saved posts, subreddits, and trends",
  },
  {
    reddit: "Remove posts one by one manually",
    readditLater: "Select and unsave multiple posts at once",
  },
  {
    reddit: "Basic list view with minimal information",
    readditLater: "Rich cards with metadata and quick actions",
  },
  {
    reddit: "Cluttered interface with distractions",
    readditLater: "Clean, focused interface designed for productivity",
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 lg:py-32 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Reddit Native vs {" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Readdit Later
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how Readdit Later transforms your saved posts experience with powerful features for better organization.
          </p>
        </div>

        {/* Comparison Layout */}
        <div className="bg-card rounded-3xl shadow-card overflow-hidden border border-border max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr]">
            
            {/* Other Solutions Column */}
            <div className="p-8 lg:p-16 flex flex-col">
              <div className="mb-16">
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Other Solutions
                </h3>
              </div>
              
              <div className="space-y-8 flex-1">
                {comparisonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-1 text-muted-foreground">
                      <X className="w-6 h-6" />
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {feature.reddit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* VS Divider */}
            <div className="bg-muted/30 flex items-center justify-center py-8 lg:py-0 px-8">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center border border-primary/20">
                <span className="text-primary font-bold text-lg">VS</span>
              </div>
            </div>

            {/* Readdit Later Column */}
            <div className="p-8 lg:p-16 flex flex-col">
              <div className="mb-16">
                <h3 className="text-3xl lg:text-4xl font-bold mb-2">
                  <span className="gradient-primary bg-clip-text text-transparent">
                    Readdit Later
                  </span>
                  <span className="text-primary text-2xl ml-2">•</span>
                </h3>
              </div>
              
              <div className="space-y-8 flex-1">
                {comparisonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 mt-1 text-primary">
                      <Zap className="w-6 h-6" />
                    </div>
                    <p className="text-foreground text-lg font-medium leading-relaxed">
                      {feature.readditLater}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
