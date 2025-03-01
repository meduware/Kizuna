function generateFeature(
  {
    icon,
    title,
    description,
  }: { icon: JSX.Element; title: string; description: string },
  index: number,
): JSX.Element {
  return (
    <div
      key={index}
      className="flex flex-col text-left justify-center items-start p-5 max-w-[350px] md:hover:bg-secondary transition-colors min-h-[200px]"
    >
      <div className="mb-5 text-blue-400">{icon}</div>
      <h4 className="text-md font-semibold mb-1">{title}</h4>
      <p className="text-md text-secondary-foreground/70">{description}</p>
    </div>
  );
}

function showcaseList(
  list: {
    icon: JSX.Element;
    title: string;
    description: string;
  }[],
): JSX.Element {
  return (
    <div className="text-center gap-2 mb-10 grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 items-center justify-center md:border-gradient">
      {list.map(
        (
          x: { icon: JSX.Element; title: string; description: string },
          index: number,
        ): JSX.Element => generateFeature(x, index),
      )}
    </div>
  );
}

function generateHeader(
  title: string,
  description?: string,
  icon?: JSX.Element,
): JSX.Element {
  return (
    <>
      {icon && icon}
      <div className="text-center space-y-4 mb-10">
        <h3 className="text-4xl font-semibold">{title}</h3>
        {description && (
          <p className="text-lg sm:text-center text-left px-5 text-foreground/80 max-w-[750px]">
            {description}
          </p>
        )}
      </div>
    </>
  );
}

export { showcaseList, generateFeature, generateHeader };
