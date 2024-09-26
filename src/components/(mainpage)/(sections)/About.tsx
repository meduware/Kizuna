"use client";

import IconHolder from "@/components/ui/icon-holder";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function About(): JSX.Element {

  return (
    <section id="about" className="min-h-[200px] flex flex-col justify-center items-center">
      <IconHolder icon={<FontAwesomeIcon icon={faCode} />} />
      <div className="text-center space-y-4 mb-10">
        <h3 className="text-5xl font-semibold">Build the way you want</h3>
        <p className="text-md">Take control of your chat app and tailor it to your unique needs.</p>
      </div>
    </section>
  )
}
