import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Tutorials from "@/components/Tutorials";

const TutorialsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Tutorials />
      </main>
      <Footer />
    </div>
  );
};

export default TutorialsPage;