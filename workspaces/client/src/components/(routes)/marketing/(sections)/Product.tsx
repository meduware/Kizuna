import { useTranslation } from "@/hooks/useTranslation";
import { featureList, generateHeader, showcaseList } from "../helpers";

const Features = (): JSX.Element => {
  const translation = useTranslation();

  return (
    <section id="features" className="text-center space-y-4">
      <div className="mt-[100px]">
        {generateHeader(translation("What can you do with Kizuna?"))}
      </div>
      {showcaseList(featureList)}
    </section>
  );
};

export default Features;
