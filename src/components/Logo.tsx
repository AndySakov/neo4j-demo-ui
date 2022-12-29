import Link from "next/link";
import React from "react";

const Logo: React.FC = () => {
  return (
    <span className="bg-white p-[1px]">
      <span className="bg-gradient-to-br from-[#3126b0] to-[#6d2fc4] bg-clip-text text-5xl font-extrabold uppercase italic tracking-tight text-white text-transparent sm:text-[2rem]">
        <Link href="/">IMDD</Link>
      </span>
    </span>
  );
};

export default Logo;
