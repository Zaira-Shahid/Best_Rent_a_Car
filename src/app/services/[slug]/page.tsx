import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/shared";
import {
  AirportPickDropDetail,
  CorporateCarRentalDetail,
  DailyCarRentalDetail,
  ExecutiveCarRentalDetail,
  HotelTransferDetail,
  WeddingCarRentalDetail,
  WeeklyCarRentalDetail,
} from "@/components/services";
import { serviceDetails, services } from "@/data";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

const detailComponents = {
  "airport-pick-drop": AirportPickDropDetail,
  "hotel-transfer": HotelTransferDetail,
  "executive-car-rental": ExecutiveCarRentalDetail,
  "wedding-car-rental": WeddingCarRentalDetail,
  "daily-car-rental": DailyCarRentalDetail,
  "monthly-car-rental": DailyCarRentalDetail,
  "weekly-car-rental": WeeklyCarRentalDetail,
  "corporate-car-rental": CorporateCarRentalDetail,
} as const;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return { title: "Service Not Found" };

  const detail = serviceDetails[slug];

  return pageMeta({
    title: service.name,
    description:
      detail?.metaDescription ??
      `${service.name} with Aziz Afridi Rent A Car — professional and on-time service across Pakistan.`,
    path: `/services/${service.slug}`,
    keywords: [service.name.toLowerCase(), "car rental service Pakistan"],
  });
}


export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const DetailComponent = detailComponents[slug as keyof typeof detailComponents];
  const detail = serviceDetails[slug];

  if (DetailComponent && detail) {
    return <DetailComponent data={detail} />;
  }

  return (
    <ContentPage
      title={service.name}
      description={`Book ${service.name.toLowerCase()} with Aziz Afridi Rent A Car.`}
      body={[
        `Our ${service.name.toLowerCase()} service is designed for comfort, reliability, and clear pricing.`,
        "Contact us with your schedule and preferred vehicle to confirm availability.",
      ]}
    />
  );
}
