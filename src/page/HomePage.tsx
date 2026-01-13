import Home from "@/components/sections/Home";
import SectionHome from "@/components/sections/SectionHome";
import { HeroSection } from "@/components/sections/Hero";
import image from "@/assets/Image/Maestro2.png";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const router = useNavigate();
  return (
    <>
      <header className="w-full mb-20">
        <HeroSection
          variant="outlined"
          backgroundImage={image}
          title={"🎧 Where Music Meets Meaning, Life Is Changing"}
          description={
            "Discover stories behind the sounds, explore new artists, and dive into the rhythm of every genre. From hidden indie gems to legendary tracks, this is where every beat has a story worth hearing."
          }
          button={"📖 Upload Blogs Now"}
          onClick={() => router("/profile")}
        />
      </header>

      <SectionHome
        title={"More Music Idols Around The World "}
        description={
          "See this the trumpeters hitters around america, japan, philippines can lead in bigband and hit high notes 🔥"
        }
      />

      <Home
        title={"🎧 Where Music Meets Meaning, Life Is Changing"}
        description={
          " Discover stories behind the sounds, explore new artists, and dive into the rhythm of every genre. From hidden indie gems to legendary tracks, this is where every beat has a story worth hearing."
        }
        btnText={"Explore More"}
        btnUrl={"/blogs"}
      />
    </>
  );
};

export default Homepage;
