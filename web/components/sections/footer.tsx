import React from 'react';

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
        <div className="flex flex-row justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className='flex items-center gap-4'>
              <img src="beaver-footer.png" alt="beaver logo" className="h-12 mr-2" />
              <div className='flex flex-col text-neutral-300'>
                <h1 className='text-4xl font-bold'>Hack Canada</h1>
                <p>Powered by Hackathons Canada</p>
              </div>
            </div>
            <p className=" text-neutral-300">&copy; {new Date().getFullYear()} HackCanada. All rights reserved.</p>
          </div>
          <div className="flex flex-col gap-4 text-neutral-300">
            <div className='flex gap-2 justify-end'>
              <a href="" className="no-underline hover:underline transition-all duration-300 underline-offset-2">Apply as Mentor</a>
              <a href="" className="no-underline hover:underline transition-all duration-300 underline-offset-2">Apply as Judge</a>
            </div>
            <div className='flex gap-4 justify-end'>
              <a href="" className="no-underline hover:underline transition-all duration-300 underline-offset-2">Code of Conduct</a>
              <a href="" className="no-underline hover:underline transition-all duration-300 underline-offset-2">Privacy Policy</a>
              <a href="" className="no-underline hover:underline transition-all duration-300 underline-offset-2">Contact Us</a>
            </div>
            <div className='flex align-center items-center gap-4 justify-end'>
              <img src="hackathonscanada.png" alt="hackathons canada logo" />
              <p>A Hackathons Canada Initiative</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

