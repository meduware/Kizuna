import Link from "next/link";

type FooterLink = {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
};

const footerLinks = [
  {
    "title": "Getting Started",
    "links": [
      { "name": "Installation", "href": "/docs/installation" },
      { "name": "Development Environment Setup", "href": "/docs/dev-environment-setup" },
      { "name": "First Steps", "href": "/docs/first-steps" },
      { "name": "Troubleshooting", "href": "/docs/troubleshooting" },
    ]
  },
  {
    "title": "Core Concepts",
    "links": [
      { "name": "Managing User Data", "href": "/docs/managing-user-data" },
      { "name": "Data Privacy", "href": "/docs/data-privacy" },
      { "name": "Understanding Security", "href": "/docs/understanding-security" },
    ]
  },
  {
    "title": "Configuration",
    "links": [
      { "name": "Channel Settings", "href": "/docs/channel-settings" },
      { "name": "Signup Process", "href": "/docs/signup-process" },
      { "name": "API Integration", "href": "/docs/api-integration" },
    ]
  }
];


export default function Footer() {
  return (
    <footer className="pb-16 text-sm leading-6">
      <div className="mx-auto divide-y divide-slate-200 px-4 sm:px-6 md:px-8 dark:divide-slate-700">
        <div className="flex">
          {footerLinks.map((section: FooterLink) => (
            <div key={section.title} className="m-5">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">{section.title}</h2>
              <ul className="mt-3 space-y-2">
                {section.links.map((link: { name: string, href: string }) => (
                  <li key={link.name}>
                    <Link className="hover:text-slate-900 dark:hover:text-slate-300" href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-10">
          <Link href="/" className="text-3xl font-bold text-left">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">{process.env.PROJECT_NAME}</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
