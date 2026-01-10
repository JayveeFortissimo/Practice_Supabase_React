import { Marquee } from "@/components/ui/marquee";
import allPlayers from "@/lib/trumpetPlayers";
const SectionHome = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center items-center text-center w-full">
      <div className="mb-8 px-2">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-10 mb-4 text-neutral-800">
          {title}
        </h1>
        <p className="text-md md:text-xl text-gray-600">{description}</p>
      </div>
      <Marquee className="w-full py-8">
        {allPlayers.map((pro, index) => (
          <div
            key={index}
            className="mx-4 w-[380px] rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-[320px] overflow-hidden">
              <img
                src={pro.img}
                alt={pro.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-5 bg-white">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {pro.name}
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                {pro.instrument}
              </p>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default SectionHome;
