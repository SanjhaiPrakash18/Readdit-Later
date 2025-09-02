import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Tutorials = () => {
  const tutorials = [
    {
      id: "dQw4w9WgXcQ",
      title: "Getting Started with ReadLater",
      description: "Learn the basics of using ReadLater extension to save articles for later reading.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Advanced Features Overview",
      description: "Discover advanced features like tagging, categories, and search functionality.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Tips for Better Organization",
      description: "Master the art of organizing your saved articles for maximum productivity.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Sync Across Devices",
      description: "Learn how to sync your saved articles across all your devices seamlessly.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Keyboard Shortcuts",
      description: "Speed up your workflow with essential keyboard shortcuts and hotkeys.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Export and Backup",
      description: "Keep your data safe by learning how to export and backup your articles.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Video Tutorials
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to get the most out of ReadLater with our comprehensive video guides
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <Card 
              key={index} 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80"
              onClick={() => window.open(`https://www.youtube.com/watch?v=${tutorial.id}`, '_blank')}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={tutorial.thumbnail} 
                    alt={tutorial.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-primary/90 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-6 w-6 text-primary-foreground fill-current" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                    {tutorial.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {tutorial.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutorials;