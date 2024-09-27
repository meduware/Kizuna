"use client";

import IconHolder from "@/components/ui/icon-holder";
import { IconDefinition, faClockRotateLeft, faCode, faDisplay, faFileExport, faMessage, faMicrophone, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";


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
    description: "Make high-quality voice calls with ease, with our crystal-clear audio technology.",
  },
  {
    icon: faShieldAlt,
    title: "End-to-End Encryption",
    description: "Rest assured that your conversations are secure, with our end-to-end encryption technology.",
  },
  {
    icon: faFileExport,
    title: "File Sharing",
    description: "Share files, images, and videos with ease, with our seamless file transfer feature.",
  },
  {
    icon: faClockRotateLeft,
    title: "Message History",
    description: "Access your conversation history, with our easy-to-use message history feature.",
  }
]

function generateFeature({ icon, title, description }: { icon: IconDefinition, title: string, description: string }): JSX.Element {
  return (
    <div className="flex flex-col text-left justify-center items-start p-5 max-w-[350px] hover:bg-secondary">
      <FontAwesomeIcon icon={icon} className="mb-5" />
      <h4 className="text-md font-semibold mb-1">{title}</h4>
      <p className="text-md text-secondary-foreground">{description}</p>
    </div>
  )
}

function generateCodeBlock(): JSX.Element {
  return (
    <div className="bg-slate-900 rounded-md p-4 max-w-md mx-auto mt-20">
      <div className="flex items-center mb-2">
        <div className="h-3 w-3 rounded-full mr-2 bg-red-500"></div>
        <div className="h-3 w-3 rounded-full mr-2 bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-white">
        <span className="font-bold">user@computer:</span><span className="ml-1">~$</span>
        <span className="ml-2">ls</span>
      </div>
      <div className="text-gray-300 pl-5">
        file1.txt file2.txt folder1
      </div>
      <div className="text-white">
        <span className="font-bold">user@computer:</span><span className="ml-1">~$</span>
        <span className="ml-2">cd folder1</span>
      </div>
      <div className="text-white">
        <span className="font-bold">user@computer:</span><span className="ml-1">~/folder1$</span>
        <span className="ml-2">cat file3.txt</span>
      </div>
      <div className="text-gray-300 pl-5">
        This is the content of file3.txt
      </div>
    </div>
  )
};

export default function About(): JSX.Element {

  return (
    <section id="about" className="min-h-[200px] flex flex-col justify-center items-center">
      <div className="text-center gap-2 mb-10 grid grid-cols-3 border-gradient">
        {features.map((x: { icon: IconDefinition, title: string, description: string }): JSX.Element => (generateFeature(x)))}
      </div>

      <IconHolder icon={<FontAwesomeIcon icon={faCode} />} />
      <div className="text-center space-y-4 mb-10">
        <h3 className="text-5xl font-semibold">Build the way you want</h3>
        <p className="text-md text-left">Take control of your chat app and tailor it to your unique needs with one simple config file.</p>
      </div>
      {generateCodeBlock()}
    </section >
  )
}
