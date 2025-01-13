import { useEffect, useRef, useState } from "react";
import { Hero } from "@/components/Hero";
import { ResultForm } from "@/components/ResultForm";
import { UniversityCard } from "@/components/UniversityCard";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const blobRef = useRef(null);

  // DYNAMICALLY GENERATE UNI DATA
  const [universities, setUniversities] = useState([]);

  const handleUniversities = (value: any[]) => {
    setUniversities(value);
  };

  const handleFormSubmit = (loading: boolean) => {
    setIsLoading(loading);
    if (!loading) {
      setIsFormSubmitted(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (blobRef.current) {
        blobRef.current.style.left = `${e.clientX - 300}px`;
        blobRef.current.style.top = `${e.clientY - 300}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative" id="main-div">
      {/* Cursor Blob */}
      <div
        ref={blobRef}
        className="cursor-blob fixed w-[600px] h-[600px] rounded-full z-10"
        style={{ left: '-300px', top: '-300px' }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none opacity-50" />
      <div className="relative z-10">
        <Hero />
        <ResultForm onSubmit={handleFormSubmit} sendDataToIndex={handleUniversities} />

        {(isFormSubmitted || isLoading) && (
          <section className="py-20 px-4 bg-gradient-to-b from-secondary/0 to-background">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Recommended Universities</h2>
                <p className="text-muted-foreground">
                  Based on your academic profile, here are your top matches
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  // Loading skeletons
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="glass-card p-6 rounded-xl space-y-4">
                      <Skeleton className="h-8 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  ))
                ) : (
                  universities.map((university) => (
                    <UniversityCard key={university.name} {...university} />
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default Index;