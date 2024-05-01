import React, { useEffect, useState } from "react";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the distance between the bottom of the page and the bottom of the viewport
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolledToBottom = window.scrollY >= scrollableHeight;

      // Set showFooter state based on whether the user has scrolled to the bottom
      setShowFooter(scrolledToBottom);
    };

    // Attach event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Run effect only once on component mount

  return (
    <>
      {showFooter && (
        <footer className="bg-grey mb-0 shadow w-full m-0 dark:bg-gray-800 fixed bottom-0 left-0 right-0">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                Flowbite™
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
