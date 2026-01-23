import React from "react";

/**
 * Footer Component
 *
 * This component should include:
 * - Social media links
 * - Copyright information
 * - Additional navigation links
 * - Contact information
 *
 * TODO: Add social media icons and links
 */
export default function Footer() {
  return (
    <footer className="w-full bg-[#232323]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              {/* <img src="beaver-footer.png" alt="beaver logo" className="h-12 mr-2" /> */}
              <div className="flex flex-col text-neutral-300 font-rubik">
                <h1 className="text-3xl font-bold sm:text-4xl font-luckiest">Hack Canada</h1>
                <p>Powered by CUTC</p>
              </div>
            </div>
            <p className="text-neutral-300">
              &copy; {new Date().getFullYear()} HackCanada. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-neutral-300 md:items-end font-rubik">
            <div className="flex flex-col gap-2 sm:flex-row md:justify-end">
              <a
                href=""
                className="no-underline hover:underline transition-all duration-300 underline-offset-2"
              >
                Apply as Mentor
              </a>
              <a
                href=""
                className="no-underline hover:underline transition-all duration-300 underline-offset-2"
              >
                Apply as Judge
              </a>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row md:justify-end">
              <a
                href=""
                className="no-underline hover:underline transition-all duration-300 underline-offset-2"
              >
                Code of Conduct
              </a>
              <a
                href=""
                className="no-underline hover:underline transition-all duration-300 underline-offset-2"
              >
                Privacy Policy
              </a>
              <a
                href=""
                className="no-underline hover:underline transition-all duration-300 underline-offset-2"
              >
                Contact Us
              </a>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center md:justify-end">
              
              <p>A Hackathons Canada/CUTC/GDG Laurier Initiative</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
