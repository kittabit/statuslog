import React from 'react';
import Image from 'next/image';

export default function HeaderLayout(props) {
  return (
    <header className="py-8 md:py-12">
      <div className="container mx-auto text-center">
        <div className="inline-block logo mb-8 md:mb-0 text-gray-800">
          <Image
            src="/images/logo.png"
            alt="Statuslog Logo"
            width={300}
            height={75}
            className="max-w-[400px]"
          />
        </div>
      </div>
    </header>
  );
}