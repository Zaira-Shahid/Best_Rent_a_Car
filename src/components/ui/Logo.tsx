import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/best-carz-logo.png";
import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label={brand.name}
    >
      <Image
        src={logo}
        alt={brand.name}
        priority={priority}
        className="site-brand-logo h-full w-auto max-w-full object-contain object-left"
        sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 220px"
      />
    </Link>
  );
}
