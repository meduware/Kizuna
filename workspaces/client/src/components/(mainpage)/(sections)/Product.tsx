import { featureList } from "@/utils/(mainpage)/constants";
import {
  generateHeader,
  showcaseList,
} from "@/utils/(mainpage)/helperFunctions";

const Features = (): JSX.Element => {
  return (
    <section id="features" className="text-center space-y-4">
      <div className="mt-[100px]">
        {generateHeader("What can you do with Kizuna?")}
      </div>
      {showcaseList(featureList)}
    </section>
  );
};

export default Features;
