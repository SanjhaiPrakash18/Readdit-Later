import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, X, Search, Filter, BarChart3, Zap, Eye, Users } from "lucide-react";

const comparisonFeatures = [
  {
    feature: "Organizing Saved Posts",
    reddit: "Basic chronological list with no categories",
    readditLater: "Smart filtering by subreddit, post type, and time periods",
    icon: Filter,
    redditIcon: X,
    readditIcon: CheckCircle2
  },
  {
    feature: "Search Functionality",
    reddit: "No search within saved posts",
    readditLater: "Powerful search across titles, subreddits, and content",
    icon: Search,
    redditIcon: X,
    readditIcon: CheckCircle2
  },
  {
    feature: "Analytics & Insights",
    reddit: "No analytics or usage statistics",
    readditLater: "Detailed stats on saved posts, subreddits, and trends",
    icon: BarChart3,
    redditIcon: X,
    readditIcon: CheckCircle2
  },
  {
    feature: "Bulk Management",
    reddit: "Remove posts one by one manually",
    readditLater: "Select and unsave multiple posts at once",
    icon: Zap,
    redditIcon: X,
    readditIcon: CheckCircle2
  },
  {
    feature: "Visual Experience",
    reddit: "Basic list view with minimal information",
    readditLater: "Rich cards with metadata and quick actions",
    icon: Eye,
    redditIcon: X,
    readditIcon: CheckCircle2
  },
  {
    feature: "User Experience",
    reddit: "Cluttered interface with distractions",
    readditLater: "Clean, focused interface designed for productivity",
    icon: Users,
    redditIcon: X,
    readditIcon: CheckCircle2
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
            See how Readdit Later transforms your saved posts experience with features 
            that Reddit should have built years ago.
          </p>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {/* Header */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <h3 className="text-lg font-semibold text-center">Feature</h3>
              </div>
              <div className="p-6 bg-gradient-to-br from-red-50 to-red-100">
                <h3 className="text-lg font-semibold text-center text-red-800">Reddit Native</h3>
              </div>
              <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/20">
                <h3 className="text-lg font-semibold text-center text-primary">Readdit Later</h3>
              </div>

              {/* Feature Rows */}
              {comparisonFeatures.map((feature, index) => (
                <React.Fragment key={index}>
                  <div className="p-6 bg-white/50">
                    <div className="flex items-center gap-3">
                      <feature.icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{feature.feature}</span>
                    </div>
                  </div>
                  <div className="p-6 bg-red-50/30">
                    <div className="flex items-start gap-3">
                      <feature.redditIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-red-700 text-sm">{feature.reddit}</span>
                    </div>
                  </div>
                  <div className="p-6 bg-primary/5">
                    <div className="flex items-start gap-3">
                      <feature.readditIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-primary text-sm font-medium">{feature.readditLater}</span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
