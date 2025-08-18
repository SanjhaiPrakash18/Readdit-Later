import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, X, Search, Filter, BarChart3, Zap, Eye, Users } from "lucide-react";
import clsx from "clsx";

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

const cardBg =
  "bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl shadow-xl border border-primary/10";

const redditBg =
  "bg-gradient-to-br from-red-100 via-red-50 to-white/80 dark:from-red-900/40 dark:via-zinc-900/20 dark:to-zinc-800/50";
const readditBg =
  "bg-gradient-to-br from-primary/20 via-primary/5 to-white/70 dark:from-primary/30 dark:via-zinc-900/30 dark:to-zinc-800/50";

const Benefits = () => {
  return (
    <section
      id="benefits"
      className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-background/95 to-primary/10"
    >
      {/* Decorative background grid dots */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(72, 91, 255, 0.11) 1.5px, transparent 1.5px), radial-gradient(rgba(255, 72, 100, 0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px"
        }}
      />
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-tight drop-shadow-lg">
            Reddit Native vs{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Readdit Later
            </span>
          </h2>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            See how <span className="font-bold text-primary">Readdit Later</span> transforms your saved posts experience with powerful features for better organization.
          </p>
        </div>
        {/* Feature Comparison Table */}
        <div className="mb-20">
          <div
            className={clsx(
              "rounded-3xl overflow-hidden border-2 border-primary/10",
              "shadow-2xl ring-1 ring-primary/10 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-2xl"
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/10">
              {/* Header */}
              <div className="p-7 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-zinc-900 dark:to-zinc-800">
                <h3 className="text-xl font-bold text-center uppercase tracking-wide text-zinc-700 dark:text-zinc-200 drop-shadow">
                  Feature
                </h3>
              </div>
              <div className="p-7 bg-gradient-to-br from-red-100 via-white to-red-50 dark:from-red-900/30 dark:via-zinc-900/30 dark:to-zinc-800">
                <h3 className="text-xl font-bold text-center uppercase tracking-wide text-red-700 dark:text-red-300 drop-shadow">
                  Reddit Native
                </h3>
              </div>
              <div className="p-7 bg-gradient-to-br from-primary/10 via-white to-primary/20 dark:from-primary/20 dark:via-zinc-900/20 dark:to-zinc-800">
                <h3 className="text-xl font-bold text-center uppercase tracking-wide text-primary drop-shadow">
                  Readdit Later
                </h3>
              </div>

              {/* Feature Rows */}
              {comparisonFeatures.map((feature, index) => (
                <React.Fragment key={index}>
                  <div
                    className={clsx(
                      cardBg,
                      "p-7 flex items-center gap-4 group transition-all duration-200 hover:scale-[1.03] hover:bg-primary/10"
                    )}
                  >
                    <span
                      className={clsx(
                        "inline-flex items-center justify-center rounded-full h-10 w-10 shadow transition-all duration-200",
                        "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                      )}
                    >
                      <feature.icon className="h-6 w-6" />
                    </span>
                    <span className="font-semibold text-lg text-zinc-700 dark:text-zinc-100 drop-shadow-sm">
                      {feature.feature}
                    </span>
                  </div>
                  <div
                    className={clsx(
                      redditBg,
                      "p-7 flex items-start gap-4 border-l-4 border-red-200 dark:border-red-700/40"
                    )}
                  >
                    <span className="inline-flex items-center justify-center rounded-full h-8 w-8 bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-300 shadow">
                      <feature.redditIcon className="h-5 w-5" />
                    </span>
                    <span className="text-red-700 dark:text-red-200 text-base font-medium">{feature.reddit}</span>
                  </div>
                  <div
                    className={clsx(
                      readditBg,
                      "p-7 flex items-start gap-4 border-l-4 border-primary/30 dark:border-primary/50"
                    )}
                  >
                    <span className="inline-flex items-center justify-center rounded-full h-8 w-8 bg-primary/10 text-primary shadow">
                      <feature.readditIcon className="h-5 w-5" />
                    </span>
                    <span className="text-primary text-base font-semibold">{feature.readditLater}</span>
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
