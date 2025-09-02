import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Clock, Users } from "lucide-react";

const tutorials = [
  {
    id: 1,
    title: "Getting Started with Reddit Saved Posts Manager",
    description: "Learn how to set up and configure your account to start managing your saved Reddit posts effectively.",
    thumbnail: "https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_1/maxresdefault.jpg",
    videoUrl: "https://youtube.com/watch?v=YOUTUBE_VIDEO_ID_1",
    duration: "5:32",
    views: "12.5K"
  },
  {
    id: 2,
    title: "Advanced Search and Filtering Techniques",
    description: "Master the search functionality and learn pro tips for finding exactly the content you're looking for.",
    thumbnail: "https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_2/maxresdefault.jpg",
    videoUrl: "https://youtube.com/watch?v=YOUTUBE_VIDEO_ID_2",
    duration: "8:47",
    views: "8.3K"
  },
  {
    id: 3,
    title: "Custom Labels and Organization Tips",
    description: "Discover how to create custom labels and organize your saved posts for maximum productivity.",
    thumbnail: "https://img.youtube.com/vi/YOUTUBE_VIDEO_ID_3/maxresdefault.jpg",
    videoUrl: "https://youtube.com/watch?v=YOUTUBE_VIDEO_ID_3",
    duration: "6:15",
    views: "15.7K"
  }
];

const Tutorials = () => {
  return (
    <section id="tutorials" className="py-20 lg:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Learn with{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Video Tutorials
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch our step-by-step video guides to become a Reddit power user in no time.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="shadow-card hover:shadow-primary transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group cursor-pointer">
              <div className="relative">
                <img 
                  src={tutorial.thumbnail} 
                  alt={tutorial.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                    onClick={() => window.open(tutorial.videoUrl, '_blank')}
                  >
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {tutorial.duration}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">{tutorial.title}</CardTitle>
                <CardDescription className="text-sm font-medium text-primary flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {tutorial.views} views
                  </span>
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {tutorial.description}
                </p>
                <button 
                  className="mt-4 text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
                  onClick={() => window.open(tutorial.videoUrl, '_blank')}
                >
                  Watch Tutorial →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Want more tutorials? Subscribe to our YouTube channel for the latest tips and tricks.
          </p>
          <button 
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            onClick={() => window.open('https://youtube.com/@YourChannelName', '_blank')}
          >
            <Play className="h-5 w-5" />
            Visit YouTube Channel
          </button>
        </div>
      </div>
    </section>
  );
};

export default Tutorials;
