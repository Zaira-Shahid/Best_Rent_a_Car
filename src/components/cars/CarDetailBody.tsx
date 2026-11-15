"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CarModel } from "@/types";
import { Section } from "@/components/ui/Section";
import { carButtonClass, PhoneIcon, WhatsAppIcon } from "@/components/cars/CarActionButtons";
import { cn } from "@/lib/utils";
import { brand, formatPhone, formatPrice, telLink, whatsappLink } from "@/lib/brand";

type CarDetailBodyProps = {
  car: CarModel;
  categoryName: string;
  related: CarModel[];
};

export function CarDetailBody({ car, categoryName, related }: CarDetailBodyProps) {
  const specs = [
    { label: "Brand", value: car.brand },
    { label: "Category", value: categoryName },
    { label: "Seats", value: `${car.seats}` },
    { label: "Transmission", value: car.transmission },
    { label: "Fuel", value: car.fuel },
    { label: "Colors", value: car.colors?.join(", ") ?? "Available on request" },
  ];

  return (
    <Section className="bg-white">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Overview</p>
          <h2 className="font-heading text-2xl font-semibold text-primary sm:text-3xl">
            Why rent the {car.name}?
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-primary/75">
            <p>
              The {car.name} is a popular choice for comfortable travel with {brand.name}. Ideal for city
              rides, airport transfers, and outstation trips.
            </p>
            <p>
              Contact us to check availability, pricing, and chauffeur booking for your dates. WhatsApp or
              call for a quick confirmation.
            </p>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06 } },
            }}
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {specs.map((item) => (
              <motion.li
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
                className="rounded-xl border border-primary/8 bg-background px-4 py-3"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{item.label}</p>
                <p className="mt-1 text-sm font-medium text-primary">{item.value}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="overflow-hidden rounded-2xl border border-primary/8 bg-background shadow-[0_16px_40px_rgba(0,11,29,0.08)]">
            <div className="relative aspect-[16/10]">
              <Image src={car.image} alt={car.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 40vw" />
            </div>
            <div className="space-y-4 p-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">From</p>
                <p className="font-heading text-2xl font-semibold text-primary">
                  {formatPrice(car.priceDay)} <span className="text-sm font-medium text-muted">/ day</span>
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href={whatsappLink(`Hi, I want to book ${car.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(carButtonClass.whatsapp, "w-full text-sm")}
                >
                  <WhatsAppIcon />
                  Book on WhatsApp
                </Link>
                <Link
                  href={telLink()}
                  className={cn(carButtonClass.call, "w-full text-sm")}
                >
                  <PhoneIcon />
                  Call {formatPhone()}
                </Link>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      {related.length > 0 ? (
        <div className="mt-14">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-xl font-semibold text-primary sm:text-2xl"
          >
            Related cars
          </motion.h3>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="mt-6 grid gap-4 sm:grid-cols-3"
          >
            {related.map((item) => (
              <motion.div
                key={item.slug}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <Link
                  href={`/cars/${item.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-primary/8 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-heading text-sm font-semibold text-primary">{item.name}</p>
                    <p className="mt-1 text-xs text-muted">{formatPrice(item.priceDay)} / day</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      ) : null}
    </Section>
  );
}
