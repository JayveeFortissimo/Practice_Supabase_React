import Home from "@/components/sections/Home";
import SectionHome from "@/components/sections/SectionHome";

const Homepage = () => {
  return (
    <>
      <Home
        title={"🎧 Where Music Meets Meaning, Life Is Changing"}
        description={
          " Discover stories behind the sounds, explore new artists, and dive into the rhythm of every genre. From hidden indie gems to legendary tracks, this is where every beat has a story worth hearing."
        }
        btnText={"Explore More"}
        btnUrl={"/blogs"}
      />

      <SectionHome
        title={"More Music Idols Around The World "}
        description={
          "See this the trumpeters hitters around america, japan, philippines can lead in bigband and hit high notes 🔥"
        }
      />
    </>
  );
};

export default Homepage;
