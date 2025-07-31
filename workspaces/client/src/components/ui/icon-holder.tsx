import React from "react";
import { BorderBeam } from "./border-beam";

interface IconHolderProps {
  icon: React.ReactNode;
}

export default function IconHolder({ icon }: IconHolderProps): JSX.Element {
  return (
    <div className="flex relative mb-9">
      <div className="border rounded-xl p-1">
        <BorderBeam
          size={20}
          duration={12}
          delay={9}
          colorFrom="grey"
          colorTo="grey"
        />
        <div className="border rounded-xl p-1 relative">
          <BorderBeam
            size={20}
            duration={12}
            delay={2}
            colorFrom="grey"
            colorTo="grey"
          />
          <div className="bg-primary rounded-xl p-4 text-2xl text-white">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}
