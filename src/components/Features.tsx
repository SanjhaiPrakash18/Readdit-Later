import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Search, BarChart3, MousePointer, FolderOpen, Tag } from "lucide-react";

const features = [
  {
    icon: RefreshCw,
    title: "Automatic Sync",
    description: "Your saved posts are synced in the background so they're always up-to-date across all your devices.",
    benefit: "Never lose a saved post again"
  },
  {
    icon: Search,
    title: "Detailed View & Search",
    description: "Browse saved posts with powerful filters, sorting, and search functionality to find exactly what you need.",
    benefit: "Find any post in seconds"
  },
  {
    icon: BarChart3,
    title: "Statistics Dashboard",
    description: "See total saved posts, subreddits count, and your saving trends with beautiful visualizations.",
    benefit: "Track your Reddit habits"
  },
  {
    icon: MousePointer,
    title: "Bulk Actions",
    description: "Select multiple posts to unsave or manage in seconds with powerful bulk operations.",
    benefit: "Manage hundreds of posts instantly"
  },
  {
    icon: FolderOpen,
    title: "Group by Subreddits & Labels",
    description: "Automatically organize your saved posts by subreddit or custom labels for easy browsing and discovery.",
    benefit: "Find content by category instantly"
  },
  {
    icon: Tag,
    title: "Custom Labels",
    description: "Create and assign custom labels to your saved posts for personalized organization that fits your workflow.",
    benefit: "Organize your way"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Master Reddit
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make your Reddit experience more organized and productive.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-card hover:shadow-primary transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-sm font-medium text-primary">
                  {feature.benefit}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
