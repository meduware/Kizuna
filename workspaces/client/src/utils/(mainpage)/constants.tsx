import {
  Lock,
  Server,
  User,
  FileSliders,
  GitPullRequest,
  Bell,
  MonitorUp,
  MessageSquare,
  Mic,
  Shield,
  FileOutput,
  Clock,
} from "lucide-react";

const featureList = [
  {
    icon: <Lock />,
    title: "Secure Communication",
    description: `${process.env.PROJECT_NAME} provides encrypted communication to ensure your privacy and security.`,
  },
  {
    icon: <Server />,
    title: "Manage Your Own Server",
    description: `Full control in your hands. Set up your own server and manage your data independently.`,
  },
  {
    icon: <User />,
    title: "Community Focused",
    description: `${process.env.PROJECT_NAME} offers customizable communication, tailored for private communities.`,
  },
  {
    icon: <FileSliders />,
    title: "Fully Customizable",
    description: `Personalize ${process.env.PROJECT_NAME} to fit your needs and customize your chat experience.`,
  },
  {
    icon: <GitPullRequest />,
    title: "Open Source",
    description: `${process.env.PROJECT_NAME} is an open-source platform, encouraging contributions and ensuring transparency.`,
  },
  {
    icon: <Bell />,
    title: "Instant Notifications",
    description: `Stay informed with instant notifications, ensuring you never miss important moments.`,
  },
];

const aboutList = [
  {
    icon: <MonitorUp />,
    title: "Screen Sharing",
    description:
      "Share your screen with others, for presentations, demos, and more.",
  },
  {
    icon: <MessageSquare />,
    title: "Real-time Messaging",
    description:
      "Send and receive messages instantly, with our fast and reliable chat app.",
  },
  {
    icon: <Mic />,
    title: "Seamless Voice Calls",
    description:
      "Make high-quality voice calls with ease, with our crystal-clear audio technology.",
  },
  {
    icon: <Shield />,
    title: "End-to-End Encryption",
    description:
      "Rest assured that your conversations are secure, with our end-to-end encryption technology.",
  },
  {
    icon: <FileOutput />,
    title: "File Sharing",
    description:
      "Share files, images, and videos with ease, with our seamless file transfer feature.",
  },
  {
    icon: <Clock />,
    title: "Message History",
    description:
      "Access your conversation history, with our easy-to-use message history feature.",
  },
];

const footerLinks = [
  {
    title: "Getting Started",
    links: [
      { name: "First Steps", href: "/docs/first-steps" },
      { name: "Setup & Usage", href: "/docs/setup-&-usage" },
      {
        name: "Development Environment Setup",
        href: "/docs/dev-environment-setup",
      },
      { name: "Troubleshooting", href: "/docs/troubleshooting" },
    ],
  },
  {
    title: "Core Concepts",
    links: [
      { name: "Managing User Data", href: "/docs/managing-user-data" },
      { name: "Data Privacy", href: "/docs/data-privacy" },
      { name: "Understanding Security", href: "/docs/understanding-security" },
    ],
  },
  {
    title: "Configuration",
    links: [
      { name: "Channel Settings", href: "/docs/channel-settings" },
      { name: "Signup Process", href: "/docs/signup-process" },
      { name: "API Integration", href: "/docs/api-integration" },
    ],
  },
];

const terminalCode = `
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
`;

export { featureList, aboutList, terminalCode, footerLinks };
