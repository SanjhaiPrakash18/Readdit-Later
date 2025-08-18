import React from "react";
import { CheckCircle2, X, Search, Filter, BarChart3, Zap, Eye, Users } from "lucide-react";
import clsx from "clsx";

const comparisonFeatures = [
  {
    feature: "Organizing Saved Posts",
    reddit: "Basic chronological list with no categories",
    readditLater: "Smart filtering by subreddit, post type, and time periods",
    icon: Filter,
    redditIcon: X,
    readditIcon: CheckCircle2,
  },
  {
    feature: "Search Functionality",
    reddit: "No search within saved posts",
    readditLater: "Powerful search across titles, subreddits, and content",
    icon: Search,
    redditIcon: X,
    readditIcon: CheckCircle2,
  },
  {
    feature: "Analytics & Insights",
    reddit: "No analytics or usage statistics",
    readditLater: "Detailed stats on saved posts, subreddits, and trends",
    icon: BarChart3,
    redditIcon: X,
    readditIcon: CheckCircle2,
  },
  {
    feature: "Bulk Management",
    reddit: "Remove posts one by one manually",
    readditLater: "Select and unsave multiple posts at once",
    icon: Zap,
    redditIcon: X,
    readditIcon: CheckCircle2,
  },
  {
    feature: "Visual Experience",
    reddit: "Basic list view with minimal information",
    readditLater: "Rich cards with metadata and quick actions",
    icon: Eye,
    redditIcon: X,
    readditIcon: CheckCircle2,
  },
  {
    feature: "User Experience",
    reddit: "Cluttered interface with distractions",
    readditLater: "Clean, focused interface designed for productivity",
    icon: Users,
    redditIcon: X,
    readditIcon: CheckCircle2,
  },
];

const fadeIn =
  "opacity-0 translate-y-8 animate-fadein will-change-transform will-change-opacity";
const animationDelays = [
  "delay-0",
  "delay-100",
  "delay-200",
  "delay-300",
  "delay-400",
  "delay-500",
];

const Benefits = () => {
  return (
    <section
      id="benefits"
      className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-background/95 to-primary/5"
    >
      {/* Decorative blurred background shape */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-primary/30 to-primary/0 blur-3xl opacity-40"
        aria-hidden
      />
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-neutral-800">Reddit Native</span> vs{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Readdit Later
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            See how Readdit Later transforms your saved posts experience with powerful features for better organization.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {comparisonFeatures.map((feature, i) => (
            <div
              key={feature.feature}
              className={clsx(
                "relative group rounded-3xl bg-white/80 dark:bg-neutral-950/90 shadow-xl border border-primary/10 flex flex-col p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
                fadeIn,
                animationDelays[i % animationDelays.length]
              )}
              style={{ animationFillMode: "forwards", animationDuration: "900ms" }}
            >
              {/* Feature Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 shadow-sm">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">{feature.feature}</h3>

              {/* Comparison Row */}
              <div className="flex gap-2 items-start mb-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                  <feature.redditIcon className="w-4 h-4" />
                  Reddit
                </span>
                <span className="text-sm text-red-800">{feature.reddit}</span>
              </div>
              <div className="flex gap-2 items-start">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <feature.readditIcon className="w-4 h-4" />
                  Readdit Later
                </span>
                <span className="text-sm font-semibold text-primary">{feature.readditLater}</span>
              </div>

              {/* Decorative badge */}
              <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-primary/80 text-white text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Upgrade
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Fade-in keyframes */}
      <style jsx>{`
        @keyframes fadein {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadein {
          animation-name: fadein;
        }
      `}</style>
    </section>
  );
};

export default Benefits;
