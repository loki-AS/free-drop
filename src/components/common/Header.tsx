import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-[#171717] p-3 mb-6">
      <Link href="/">
        <div className="">
          {/* <Image
            src="https://w7.pngwing.com/pngs/414/942/png-transparent-dropbox-computer-icons-file-hosting-service-logo-500px-application-miscellaneous-blue-angle-thumbnail.png"
            alt="logo"
            className="invert"
            height={50}
            width={50}
          /> */}
        </div>
        <div>
          <h1 className="font-bold text-3xl ephesis">Free Drop</h1>
        </div>
      </Link>
    </header>
  );
};

export default Header;
