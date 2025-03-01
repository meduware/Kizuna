import {
  IconDefinition,
  faBell,
  faCogs,
  faLock,
  faServer,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faOsi } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function generateFeature(
  {
    icon,
    title,
    description,
  }: { icon: IconDefinition; title: string; description: string },
  index: number,
): JSX.Element {
  return (
    <div
      key={index}
      className="flex flex-col text-left justify-center items-start p-5 max-w-[350px] md:hover:bg-secondary transition-colors min-h-[200px]"
    >
      <FontAwesomeIcon icon={icon} className="mb-5 text-blue-400" />
      <h4 className="text-md font-semibold mb-1">{title}</h4>
      <p className="text-md text-secondary-foreground/70">{description}</p>
    </div>
  );
}
const features = [
  {
    icon: faLock,
    title: "Secure Communication",
    description: `${process.env.PROJECT_NAME} provides encrypted communication to ensure your privacy and security.`,
  },
  {
    icon: faServer,
    title: "Manage Your Own Server",
    description: `Full control in your hands. Set up your own server and manage your data independently.`,
  },
  {
    icon: faUsers,
    title: "Community Focused",
    description: `${process.env.PROJECT_NAME} offers customizable communication, tailored for private communities.`,
  },
  {
    icon: faCogs,
    title: "Fully Customizable",
    description: `Personalize ${process.env.PROJECT_NAME} to fit your needs and customize your chat experience.`,
  },
  {
    icon: faOsi,
    title: "Open Source",
    description: `${process.env.PROJECT_NAME} is an open-source platform, encouraging contributions and ensuring transparency.`,
  },
  {
    icon: faBell,
    title: "Instant Notifications",
    description: `Stay informed with instant notifications, ensuring you never miss important moments.`,
  },
];
const Features = (): JSX.Element => {
  return (
    <section id="features" className="text-center space-y-4">
      <h3 className="text-4xl font-semibold mt-[100px] mx-5">
        What can you do with {process.env.PROJECT_NAME}?
      </h3>
      <div className="text-center gap-2 mb-10 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 items-center justify-center md:border-gradient">
        {features.map(
          (
            x: { icon: IconDefinition; title: string; description: string },
            index: number,
          ): JSX.Element => generateFeature(x, index),
        )}
      </div>
    </section>
  );
};

export default Features;
