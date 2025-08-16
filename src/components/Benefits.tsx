import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Users, Zap, Shield } from "lucide-react";

const benefits = [
  {
    icon: CheckCircle2,
    title: "Perfect for Power Users",
    items: [
      "Archive useful threads, guides, and discussions",
      "Keep track of posts you want to reference later",
      "Organize your Reddit content like a pro"
    ]
  },
  {
    icon: Zap,
    title: "Boost Your Productivity",
    items: [
      "No more endless scrolling to find that one post",
      "Clean, distraction-free reading experience",
      "Quick access to your most important content"
    ]
  },
  {
    icon: Users,
    title: "Built for Reddit Enthusiasts",
    items: [
      "Seamlessly integrates with your Reddit workflow",
      "Works with all subreddits and post types",
      "Respects Reddit's native saving functionality"
    ]
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    items: [
      "Your data is synced securely across devices",
      "Privacy-focused with minimal permissions",
      "Regular updates and improvements"
    ]
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why Choose{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Readdit Later?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of Reddit users who have transformed how they consume and organize content.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;