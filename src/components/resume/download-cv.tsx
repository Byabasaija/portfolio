import Link from "next/link";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function DownloadCV() {
  return (
    <div className="z-10 flex items-center justify-center mt-5 mb-5">
      <Link 
        href="/cv.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
        download="Pascal-CV.pdf"
      >
        <AnimatedGradientText>
          📑 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            Download Pascal's full CV
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5 text-white-1" />
        </AnimatedGradientText>
      </Link>
    </div>
  );
}

export default DownloadCV;
