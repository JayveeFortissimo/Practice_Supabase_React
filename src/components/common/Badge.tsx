import { Badge } from "@/components/ui/badge";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text"

const BadgeGradientOutlineDemo = ({text}:{text:string}) => {
  return (
    <div className="bg-linear-to-r from-sky-400 to-indigo-600 rounded-full p-0.5 flex items-center justify-center mb-3">
      <Badge className="bg-background text-foreground rounded-full border-none p-2 w-[10rem] text-md">
       <AnimatedShinyText>{text}</AnimatedShinyText> 
      </Badge>
    </div>
  );
};

export default BadgeGradientOutlineDemo;
