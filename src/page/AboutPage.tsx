import features from "@/lib/about";
import { HeroSection } from "@/components/sections/Hero";
import Trombones from "@/assets/Image/Trombones.png"

const AboutPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <header className="w-full">
        <HeroSection
          variant="outlined"
          backgroundImage={Trombones}
          title={"WE WANT TO KNOW THAT WE NOT JUST MUSICIANS ONLY"}
          description={
            "This is our pride and passion, we spend time and effort to make amazing performance on stages"
          }
          className="min-h-[26.25rem]! mb-5 bg-[#111820]"
        />
      </header>
      <div className="max-w-(--breakpoint-lg) w-full py-10 px-6">
        <h2 className="text-neutral-700 text-center text-3xl md:text-[2.75rem] md:leading-[1.2] font-semibold tracking-[-0.03em] sm:max-w-xl text-pretty sm:mx-auto sm:text-center">
          Technologies that use in this website
        </h2>
        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature) => (
            <div
              key={feature.category}
              className="flex flex-col md:flex-row items-center gap-x-12 gap-y-6 md:even:flex-row-reverse"
            >
              <div className="w-full aspect-[4/3] bg-muted rounded-xl border border-border/50 basis-1/2 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="basis-1/2 shrink-0">
                <span className="uppercase font-medium text-sm text-muted-foreground">
                  {feature.category}
                </span>
                <h4 className="my-3 text-3xl font-semibold tracking-[-0.02em]">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground">{feature.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
