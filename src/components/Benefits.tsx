import React from "react";
import { CheckCircle2, X, Search, Filter, BarChart3, Zap, Eye, Users } from "lucide-react";

const comparisonFeatures = [
  {
    feature: "Organizing Saved Posts",
    reddit: "Basic chronological list with no categories",
    readditLater: "Smart filtering by subreddit, post type, and time periods",
    icon: Filter,
  },
  {
    feature: "Search Functionality",
    reddit: "No search within saved posts",
    readditLater: "Powerful search across titles, subreddits, and content",
    icon: Search,
  },
  {
    feature: "Analytics & Insights",
    reddit: "No analytics or usage statistics",
    readditLater: "Detailed stats on saved posts, subreddits, and trends",
    icon: BarChart3,
  },
  {
    feature: "Bulk Management",
    reddit: "Remove posts one by one manually",
    readditLater: "Select and unsave multiple posts at once",
    icon: Zap,
  },
  {
    feature: "Visual Experience",
    reddit: "Basic list view with minimal information",
    readditLater: "Rich cards with metadata and quick actions",
    icon: Eye,
  },
  {
    feature: "User Experience",
    reddit: "Cluttered interface with distractions",
    readditLater: "Clean, focused interface designed for productivity",
    icon: Users,
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 lg:py-32 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Reddit Native vs{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Readdit Later
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how Readdit Later transforms your saved posts experience with powerful features for better organization.
          </p>
        </div>

        {/* Comparison Layout */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-card overflow-hidden border border-border max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] min-h-[600px]">
            
            {/* Reddit Native Column */}
            <div className="bg-card p-8 lg:p-12 flex flex-col border-r border-border/50">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-destructive mb-2">
                  Reddit Native
                </h3>
              </div>
              
              <div className="space-y-8 flex-1">
                {comparisonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center">
                      <X className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <feature.icon className="h-5 w-5 text-destructive" />
                        <h4 className="font-medium text-destructive">
                          {feature.feature}
                        </h4>
                      </div>
                      <p className="text-destructive/80 text-sm leading-relaxed">
                        {feature.reddit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VS Divider */}
            <div className="bg-muted/30 flex items-center justify-center py-8 lg:py-0 px-6">
              <div className="bg-card rounded-full w-12 h-12 flex items-center justify-center shadow-primary border-2 border-primary/20">
                <span className="text-primary font-bold text-sm">VS</span>
              </div>
            </div>

            {/* Readdit Later Column */}
            <div className="bg-card p-8 lg:p-12 flex flex-col border-l border-border/50">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  Readdit Later
                </h3>
              </div>
              
              <div className="space-y-8 flex-1">
                {comparisonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <feature.icon className="h-5 w-5 text-primary" />
                        <h4 className="font-medium text-primary">
                          {feature.feature}
                        </h4>
                      </div>
                      <p className="text-primary/80 text-sm font-medium leading-relaxed">
                        {feature.readditLater}
                      </p>
                    </div>
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
