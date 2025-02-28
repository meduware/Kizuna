"use client";

import IconHolder from "@/components/ui/icon-holder";
import ShineBorder from "@/components/ui/shine-border";
import {
  IconDefinition,
  faClockRotateLeft,
  faCode,
  faDisplay,
  faFileExport,
  faMessage,
  faMicrophone,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const features = [
  {
    icon: faDisplay,
    title: "Screen Sharing",
    description: "Share your screen with others, for presentations, demos, and more.",
  },
  {
    icon: faMessage,
    title: "Real-time Messaging",
    description: "Send and receive messages instantly, with our fast and reliable chat app.",
  },
  {
    icon: faMicrophone,
    title: "Seamless Voice Calls",
    description:
      "Make high-quality voice calls with ease, with our crystal-clear audio technology.",
  },
  {
    icon: faShieldAlt,
    title: "End-to-End Encryption",
    description:
      "Rest assured that your conversations are secure, with our end-to-end encryption technology.",
  },
  {
    icon: faFileExport,
    title: "File Sharing",
    description:
      "Share files, images, and videos with ease, with our seamless file transfer feature.",
  },
  {
    icon: faClockRotateLeft,
    title: "Message History",
    description: "Access your conversation history, with our easy-to-use message history feature.",
  },
];

function generateFeature(
  { icon, title, description }: { icon: IconDefinition; title: string; description: string },
  index: number
): JSX.Element {
  return (
    <div
      key={index}
      className="flex flex-col text-left justify-center items-start p-5 max-w-[350px] md:hover:bg-secondary transition-colors min-h-[200px]"
    >
      <FontAwesomeIcon icon={icon} className="mb-5 text-blue-400" />
      <h4 className="text-md font-semibold mb-1">{title}</h4>
      <p className="text-md text-secondary-foreground opacity-70">{description}</p>
    </div>
  );
}

function generateCodeBlock(): JSX.Element {
  return (
    <ShineBorder
      className="relative flex w-full flex-col items-start justify-start rounded-lg border bg-slate-900"
      color={["#4ade80", "#3b82f6"]}
    >
      <div className="rounded-md bg-slate-900 overflow-hidden w-full">
        <div className="flex items-center mb-2">
          <div className="h-3 w-3 rounded-full mr-2 bg-red-500"></div>
          <div className="h-3 w-3 rounded-full mr-2 bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-white">
          <span className="font-bold">user@computer:</span>
          <span className="ml-1">~$</span>
          <span className="ml-2">cat config.json</span>
        </div>
        <pre className="text-gray-300 overflow-x-auto whitespace-pre-wrap">
          <code>
            {`
// This area needs to be updated after the config.json file is ready.

const nextConfig = { 
  reactStrictMode: false, 
}; 
const env = { 
  PROJECT_NAME: process.env.PROJECT_NAME, 
  PROJECT_REPO: process.env.PROJECT_REPO, 
  MONGODB_URI: process.env.MONGODB_URI, 
  ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET, 
  ENCRYPTION_SALT: process.env.ENCRYPTION_SALT, 
}; 
const withNextra = nextra({ 
  theme: 'nextra-theme-docs', 
  themeConfig: './theme.config.jsx' 
}); 

export default withNextra(nextConfig); 
`}
          </code>
        </pre>
      </div>
    </ShineBorder>
  );
}
export default function About(): JSX.Element {
  return (
    <>
      <div className="text-center gap-2 mb-10 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 items-center justify-center md:border-gradient">
        {features.map(
          (
            x: { icon: IconDefinition; title: string; description: string },
            index: number
          ): JSX.Element => generateFeature(x, index)
        )}
      </div>

      <section
        id="about"
        className="min-h-[200px] pt-[100px] flex flex-col justify-center items-center mx-3"
      >
        <IconHolder icon={<FontAwesomeIcon icon={faCode} />} />
        <div className="text-center space-y-4 mb-10">
          <h3 className="text-4xl font-semibold">Build the way you want</h3>
          <p className="text-md text-left">
            Take control of your chat app and tailor it to your unique needs with one simple config
            file.
          </p>
        </div>
        {generateCodeBlock()}
      </section>
    </>
  );
}
