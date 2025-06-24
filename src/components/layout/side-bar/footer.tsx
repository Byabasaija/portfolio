import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="py-4 px-6 text-center text-sm text-light-gray">
      <div className="mb-2">
        &copy; {new Date().getFullYear()}{" "}
        <Link
          className="inline text-orange-yellow-crayola underline hover:text-opacity-70"
          href="https://pascalbyabasaija.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pascal Byabasaija
        </Link>
      </div>
      
    </footer>
  );
}

export default Footer;
