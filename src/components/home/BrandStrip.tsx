import Image from "next/image";

const brands = [
  { name: "Toyota", image: "/brands/toyota-logo.png" },
  { name: "Honda", image: "/brands/honda-logo.png" },
  { name: "Suzuki", image: "/brands/suzuki-logo.png" },
  { name: "Kia", image: "/brands/kia-logo.png" },
  { name: "Hyundai", image: "/brands/hyundai-logo.png" },
  { name: "Mercedes", image: "/brands/mercedes-logo.png" },
  { name: "Audi", image: "/brands/audi-logo.png" },
  { name: "Lexus", image: "/brands/lexus-logo.png" },
  { name: "Changan", image: "/brands/changan-logo.png" },
  { name: "Haval", image: "/brands/haval-logo.jfif.jpeg" },
] as const;

function BrandItem({ name, image }: { name: string; image: string }) {
  return (
    <div className="relative mx-4 h-14 w-24 shrink-0 opacity-80 transition hover:opacity-100 sm:mx-6 sm:h-16 sm:w-28">
      <Image src={image} alt={name} fill className="object-contain mix-blend-multiply" sizes="112px" />
    </div>
  );
}

export function BrandStrip() {
  const loop = [...brands, ...brands, ...brands];

  return (
    <section className="border-b border-brand-black/10 bg-white" aria-labelledby="brand-strip-title">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:px-6 lg:flex-row lg:gap-10 lg:px-8 lg:py-7">
        <div className="shrink-0 text-center lg:w-[270px] lg:text-left">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-red">Brands</p>
          <h2 id="brand-strip-title" className="font-heading text-xl font-bold tracking-tight text-brand-black">
            Trusted car brands
          </h2>
          <p className="sr-only lg:not-sr-only lg:mt-1 lg:text-[13px] lg:leading-snug lg:text-brand-black/65">
            Popular brands available for daily, weekly, and monthly rental.
          </p>
        </div>

        <div className="relative min-w-0 w-full flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track flex w-max" style={{ animationDuration: "32s" }}>
            {loop.map((item, index) => (
              <BrandItem key={`${item.name}-${index}`} name={item.name} image={item.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
