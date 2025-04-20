import { featureList } from "@/utils/(mainpage)/constants";
import {
  generateHeader,
  showcaseList,
} from "@/utils/(mainpage)/helperFunctions";
import { useTranslation } from "@/hooks/useTranslation";

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
