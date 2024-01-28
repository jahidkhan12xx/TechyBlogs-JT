"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const path = usePathname();
  const isActive = path === href;
  console.log(isActive, path);
  return (
    <Link href={href}>
      <span
        className={`${
          isActive &&
          "bg-red-800 px-3 py-2  text-xl font-semibold rounded-lg text-white"
        }  text-xl px-3 py-2    hover:bg-red-800 hover:text-white hover:rounded-lg hover:px-3 hover:py-2 transition-all duration-500 `}
      >
        {children}
      </span>
    </Link>
  );
};

export default NavLink;
