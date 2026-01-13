import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  variant?: "outlined" | "contained";
  backgroundImage?: string;
  title: string;
  description?: string;
  className?: string;
  button?: string;
  onClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  variant = "outlined",
  backgroundImage,
  title,
  description,
  button,
  className,
  onClick,
}) => {
  return (
    <section
      className={cn(
        "relative flex flex-col items-center justify-center text-center min-h-[26.25rem] lg:min-h-[37.5rem] px-5 border-b py-3",
        variant === "outlined" && " border-gray-200",
        className || ""
      )}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C49A6C_0%,#C49A6C_66%)] opacity-30 h-full" />
      )}

      <div className="relative z-10 max-w-[54rem] flex flex-col items-center gap-2 text-shadow-2xs">
        <h1 className="text-[1.875rem] bold text-white  sm:text-5xl uppercase text-shadow-2xs font-playfair">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-[1.25rem] leading-normal md:text-3xl text-white text-shadow-2xs ">
            {description}
          </p>
        )}

        {button && (
          <Button
            onClick={onClick}
            className={cn(
              "mt-6 rounded text-lg h-12",
              variant === "outlined" &&
                "border-3 border-white bg-transparent   hover:text-white hover:bg-cta-100 cursor-pointer"
            )}
          >
            {button}
            <ChevronRight />
          </Button>
        )}
      </div>
    </section>
  );
};

export { HeroSection };
