import React from 'react';
import Image from 'next/image';

export default function HeaderLayout(props) {
  return (
    <header className="py-8 md:py-12">
      <div className="container flex flex-col items-center md:flex-row justify-between">
        <div className="logo mb-8 md:mb-0 text-gray-800">
          <Image
            src="/images/statuslog_logo.png"
            alt="Statuslog Logo"
            width={200}
            height={45}
            className="max-w-[200px]"
          />
        </div>
        <div className="links flex space-x-2 items-center leading-none font-medium">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-white bg-[#7f7352] hover:bg-[#7f7352]/80 focus:outline-none focus:ring-2 duration-700 transition"
            aria-label="Report an Issue"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 22 22"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M11 15h2v2h-2v-2m0-8h2v6h-2V7m1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8z"
                fill="currentColor"
              ></path>
            </svg>
            Report an Issue
          </button>
        </div>
      </div>
    </header>
  );
}