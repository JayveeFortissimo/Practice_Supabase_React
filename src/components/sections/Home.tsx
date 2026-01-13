import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import BadgeGradientOutlineDemo from "@/components/common/Badge";
import { useNavigate } from "react-router-dom";

const Home = ({
  title,
  description,
  btnText,
  btnUrl,
}: {
  title: string;
  description: string;
  btnText: string;
  btnUrl: string;
}) => {
  const router = useNavigate();
  return (
    <div className="min-h-[70vh] p-2 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <BadgeGradientOutlineDemo text={"Music is Life 🎼🎶"} />
        <h1 className="text-3xl md:text-6xl font-bold text-center mb-4 tracking-tighter md:leading-[1.2] text-neutral-800">
          {title}
        </h1>
        <p className="text-md md:text-xl text-gray-500 text-center mb-8 max-w-[70rem]">
          {description}
        </p>
        <Button
          variant={"seemore"}
          className="text-md"
          onClick={() => router(btnUrl)}
        >
          {btnText} <ArrowUpRight />
        </Button>
      </div>
    </div>
  );
};

export default Home;
