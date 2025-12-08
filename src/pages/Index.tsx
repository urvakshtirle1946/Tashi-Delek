import HeroSection from "@/components/HeroSection";

const Index = () => {
  return (
    <>
      {/* Full Screen Background Video - Fixed to viewport */}
      <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-0 m-0 p-0 overflow-hidden">
        <video
          src="/assets/bg-sih-vedio.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-screen h-screen object-cover"
        />
        <div className="absolute inset-0 bg-monastery-terracotta-red/20 bg-gradient-to-b from-monastery-terracotta-red/25 via-monastery-terracotta-red/15 to-monastery-terracotta-red/25" />
      </div>
      
      <div className="relative w-full min-h-screen z-10">
        <main className="relative z-10">
          <HeroSection />
        </main>
      </div>
    </>
  );
};

export default Index;