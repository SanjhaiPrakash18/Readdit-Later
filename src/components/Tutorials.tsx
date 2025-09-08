import { Play } from "lucide-react";

const Tutorials = () => {
  const videos = [
    {
      id: "VGo-OdXUMD0", // Replace with your actual video ID
      title: "Readdit Later Tutorial Simple Onboarding Guide",
      description: "Quick setup guide for the Readdit Later Chrome extension - organize your saved Reddit posts in minutes!"
    },
    {
      id: "cwsK7Za8NMg", // Replace with your actual video ID  
      title: "Readdit Later Filtering Tutorial",
      description: "This is a tutorial on the Readdit Later Chrome extension showing how to use filters in Readdit Later to filter your posts"
    },
    {
      id: "aDc295YCCKI", // Replace with your actual video ID
      title: "Readdit Later Label Adding Tutorial",
      description: "This is a tutorial on the Readdit Later Chrome extension, showing how to add labels to your saved Reddit posts"
    }
  ];

  const handleVideoClick = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <section id="tutorials" className="py-20 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Video{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Tutorials
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how to use Readdit Later with our comprehensive video guides
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group cursor-pointer bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="relative aspect-video bg-muted">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                    <Play className="h-8 w-8 text-primary fill-primary" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tutorials;
