"use client";

import Link from "next/link";

export const TopMenuSale = () => {

  return (
    <nav
      className={`flex justify-center items-center w-full py-5 transition-all duration-300`}
    >
      {/* logo */}
      <div>
        <Link href="/">
          <span className={`antialiased font-bold`}>
            Saibai
          </span>
          <span
            className={`antialiased font-bold text-lime-600`}
          >
            Suru
          </span>
          <span
            className={`antialiased font-semibold text-purple-900`}
          >
            {" "}
            | Grow
          </span>
        </Link>
      </div>
    </nav>
  );
};
