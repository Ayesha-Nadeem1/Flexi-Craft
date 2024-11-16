import { resourcesLinks, platformLinks, communityLinks } from "../constants";
import sclogo from "../assets/scLogo.png"
const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700">
      <div className="flex items-center flex-shrink-0 mb-5 ml-10">
        <img className="h-10 w-10 " src={sclogo} alt="Logo" />
        <span className="text-xl tracking-tight font-semibold">FlexiCraft<span className="text-5xl tracking-tight bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">.</span></span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 ml-10">
        <div>
          <h3 className="text-md font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Platform</h3>
          <ul className="space-y-2">
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Community</h3>
          <ul className="space-y-2">
            {communityLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-neutral-300 hover:text-white"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
