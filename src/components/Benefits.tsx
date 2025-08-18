import React from "react";
import { CheckCircle2, X, Search, Filter, BarChart3, Zap, Eye, Users } from "lucide-react";

const comparisonFeatures = [
  {
    feature: "Organizing Saved Posts",
    competitor: "Basic chronological list with no categories",
    readditLater: "Smart filtering by subreddit, post type, and time periods",
    icon: Filter,
  },
  {
    feature: "Search Functionality",
    competitor: "No search within saved posts",
    readditLater: "Powerful search across titles, subreddits, and content",
    icon: Search,
  },
  {
    feature: "Analytics & Insights",
    competitor: "No analytics or usage statistics",
    readditLater: "Detailed stats on saved posts, subreddits, and trends",
    icon: BarChart3,
  },
  {
    feature: "Bulk Management",
    competitor: "Remove posts one by one manually",
    readditLater: "Select and unsave multiple posts at once",
    icon: Zap,
  },
  {
    feature: "Visual Experience",
    competitor: "Basic list view with minimal information",
    readditLater: "Rich cards with metadata and quick actions",
    icon: Eye,
  },
  {
    feature: "User Experience",
    competitor: "Cluttered interface with distractions",
    readditLater: "Clean, focused interface designed for productivity",
    icon: Users,
  }
];

const Benefits = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-800">
            Choosing Us Over Others
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            See why we stand out with superior service, innovation, and client
            satisfaction benchmarks.
          </p>
        </div>

        {/* Comparison Layout */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
            
            {/* Competitors Column */}
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-8 lg:p-12 flex flex-col">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-700 mb-2">
                  Reddit Native
                </h3>
              </div>
              
              <div className="space-y-8 flex-1">
                {comparisonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <X className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2">
                        {feature.feature}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {feature.competitor}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VS Divider */}
            <div className="bg-gradient-to-b from-slate-200 to-slate-300 flex items-center justify-center py-8 lg:py-0">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg border-4 border-slate-300">
                <span className="text-slate-600 font-bold text-lg">VS</span>
              </div>
            </div>

            {/* Your Service Column */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 lg:p-12 flex flex-col text-white">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Readdit Later
                </h3>
              </div>
              
              <div className="space-y-8 flex-1">
                {comparisonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-800" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        {feature.feature}
                      </h4>
                      <p className="text-blue-100 text-sm leading-relaxed">
                        {feature.readditLater}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Experience the Difference
          </button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
