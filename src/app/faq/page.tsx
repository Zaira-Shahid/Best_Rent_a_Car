import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { FaqHelpCard } from "@/components/faq/FaqHelpCard";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Container } from "@/components/ui/Container";
import { brand, formatPhoneDisplay } from "@/lib/brand";
import { pageMeta } from "@/lib/seo";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?auto=format&fit=crop&w=1200&q=80";

export const metadata: Metadata = pageMeta({
  title: "FAQ",
  description:
    "Frequently asked questions about booking, payments, drivers, and airport pickups with Aziz Afridi Rent A Car.",
  path: "/faq",
  keywords: ["car rental FAQ", "booking questions"],
});

const CATEGORIES = [
  { slug: "general", label: "General" },
  { slug: "booking", label: "Booking" },
  { slug: "rental", label: "Car Rental" },
  { slug: "payment", label: "Payment" },
  { slug: "services", label: "Driver Services" },
  { slug: "airport", label: "Airport Pickup" },
  { slug: "policies", label: "Policies" },
];

const FAQS = [
  {
    category: "general",
    question: "Which cities do you cover?",
    answer:
      "We cover Islamabad, Rawalpindi, Lahore, Karachi, and major tourist destinations including Murree, Naran, Hunza, and more.",
  },
  {
    category: "general",
    question: "Do you offer 24/7 customer support?",
    answer:
      "Yes. Our agent team is available around the clock via phone and WhatsApp for bookings and urgent support.",
  },
  {
    category: "general",
    question: "Is there a mileage limit on rentals?",
    answer:
      "Standard rentals include 200km/day. Corporate and monthly packages can be customized for unlimited mileage on request.",
  },
  {
    category: "general",
    question: "Can I add additional passengers to my booking?",
    answer:
      "Yes, additional passengers can be added at booking. Our chauffeur remains the designated driver for the trip.",
  },
  {
    category: "general",
    question: "Do you rent cars to tourists visiting Pakistan?",
    answer:
      "Yes. Tourists can book chauffeur-driven vehicles with a valid passport. Share passenger details when you reserve.",
  },
  {
    category: "general",
    question: "What happens if the car breaks down during my rental?",
    answer:
      "Call our 24/7 agent line immediately. We arrange a replacement vehicle or roadside assistance as quickly as possible at no extra cost, subject to the terms of your agreement.",
  },
  {
    category: "general",
    question: "What vehicle categories do you offer?",
    answer:
      "Our fleet includes economy sedans, executive cars, luxury sedans, SUVs, 4x4s for northern routes, and vans for group travel. Browse the fleet page or ask an agent for a recommendation.",
  },
  {
    category: "general",
    question: "Do you allow pets in the vehicle?",
    answer:
      "Pets may be allowed on selected vehicles with prior approval. Please inform our agent at booking so we can assign a suitable car and prepare protective covers if needed.",
  },
  {
    category: "general",
    question: "Can I smoke inside the vehicle?",
    answer:
      "No. All Aziz Afridi vehicles are strictly non-smoking. A cleaning fee may apply if this policy is violated.",
  },
  {
    category: "booking",
    question: "How can I book a car?",
    answer:
      "Booking your Aziz Afridi vehicle is effortless. Browse our fleet online, select your desired dates and location, and confirm through our secure form. Alternatively, contact our agent via WhatsApp or phone for a personalized booking experience.",
  },
  {
    category: "booking",
    question: "What documents are required to book a car?",
    answer: "A valid CNIC or Passport for passenger records is required for all chauffeur-driven bookings.",
  },
  {
    category: "booking",
    question: "Can I modify or cancel my reservation?",
    answer:
      "Yes, reservations can be modified or cancelled free of charge up to 24 hours before pickup. Contact our agent team to make changes.",
  },
  {
    category: "booking",
    question: "How far in advance should I book?",
    answer:
      "For standard bookings, a few hours' notice is often enough. For weddings, corporate fleets, or peak-season northern trips, we recommend booking 3-7 days ahead to guarantee your preferred vehicle.",
  },
  {
    category: "booking",
    question: "Can I book on behalf of someone else?",
    answer:
      "Yes. You can arrange and pay for a rental for a family member or guest — just ensure passenger details are shared before pickup.",
  },
  {
    category: "booking",
    question: "Will I receive a booking confirmation?",
    answer:
      "Yes. After confirmation you receive booking details by WhatsApp or email, including vehicle type, pickup time, chauffeur contact, and payment summary.",
  },
  {
    category: "booking",
    question: "Can I request a specific car model or color?",
    answer:
      "We do our best to match preferred models and colors subject to availability. Share your preference with the agent when booking and we will confirm what we can allocate.",
  },
  {
    category: "booking",
    question: "Do you offer same-day bookings?",
    answer:
      "Yes, same-day bookings are often available in Islamabad and Rawalpindi. Call an agent to check live fleet availability for your preferred time slot.",
  },
  {
    category: "rental",
    question: "Do you offer car rental with a driver?",
    answer:
      "Yes. All our rentals include a professional chauffeur for city travel, airport transfers, corporate trips, and outstation journeys.",
  },
  {
    category: "rental",
    question: "Can I rent a car for a week or a month?",
    answer:
      "Yes. We offer daily, weekly, and monthly packages with better rates for longer durations — ideal for corporate and family use.",
  },
  {
    category: "rental",
    question: "Is fuel included in the rental price?",
    answer:
      "We operate on a full-to-full fuel policy — your vehicle is delivered with a full tank and should be returned the same way. Daily rates typically exclude fuel unless stated otherwise.",
  },
  {
    category: "rental",
    question: "Is insurance included in the price?",
    answer:
      "Yes, all our rentals include comprehensive insurance coverage with a standard excess. Premium protection packages are available for additional peace of mind.",
  },
  {
    category: "rental",
    question: "Can I take the rented car outside the city?",
    answer:
      "Yes, out-of-city and intercity trips are allowed on most rentals. Northern route trips require a 4x4-suitable vehicle, which our team will help you select.",
  },
  {
    category: "rental",
    question: "What is your policy on late returns?",
    answer:
      "A grace period of 30-60 minutes is typically allowed. Extended delays are billed at a prorated daily rate — let us know in advance if you need extra time.",
  },
  {
    category: "rental",
    question: "Are child seats available?",
    answer:
      "Yes. Child and infant seats can be arranged on request. Mention the child’s age when booking so the correct seat is installed before delivery.",
  },
  {
    category: "rental",
    question: "What is included with every rental?",
    answer:
      "Professional chauffeur, air-conditioned vehicle, basic insurance, and 24/7 agent support. Add-ons like decoration, extra waiting time, or multipoint stops can be arranged separately.",
  },
  {
    category: "rental",
    question: "Do you provide Wi-Fi in the car?",
    answer:
      "In-car Wi-Fi is available on selected premium and executive vehicles. Ask your agent to confirm availability when you book.",
  },
  {
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, major debit/credit cards, and bank transfers. Corporate clients can arrange monthly invoicing.",
  },
  {
    category: "payment",
    question: "Is a security deposit required?",
    answer:
      "Yes, a refundable security deposit is required at pickup. The amount depends on the vehicle category.",
  },
  {
    category: "payment",
    question: "Do you offer discounts for long-term rentals?",
    answer:
      "Yes. Weekly and monthly packages come with reduced daily rates — ideal for corporate and extended family use.",
  },
  {
    category: "payment",
    question: "Is my security deposit refunded automatically?",
    answer:
      "Yes. Once the vehicle is returned in its original condition with a full tank, the deposit is refunded within 3-5 business days to your original payment method.",
  },
  {
    category: "payment",
    question: "Can corporate clients get monthly invoicing?",
    answer:
      "Yes. We offer consolidated monthly invoicing with detailed trip logs for registered companies and embassies on approved accounts.",
  },
  {
    category: "payment",
    question: "Do you require advance payment?",
    answer:
      "For most bookings a partial advance confirms the reservation. Full payment may be required for peak dates, weddings, or outstation packages — your agent will confirm the amount.",
  },
  {
    category: "payment",
    question: "Are tolls and parking included?",
    answer:
      "Unless stated in your package, tolls, parking, and intercity highway charges are billed separately at actual cost or as agreed in your quote.",
  },
  {
    category: "payment",
    question: "Do you issue receipts and invoices?",
    answer:
      "Yes. Digital receipts are shared after payment. Tax invoices and corporate billing documents can be issued for registered accounts.",
  },
  {
    category: "services",
    question: "Do you provide chauffeurs?",
    answer:
      "Yes, we provide professionally trained, uniformed chauffeurs with expert knowledge of Islamabad and northern routes.",
  },
  {
    category: "services",
    question: "Do you deliver cars to hotels or homes?",
    answer: "Yes. Doorstep delivery is available in major cities subject to location and timing.",
  },
  {
    category: "services",
    question: "Are your drivers background verified?",
    answer:
      "Absolutely. Every chauffeur undergoes background checks, defensive driving training, and route familiarization before joining our team.",
  },
  {
    category: "services",
    question: "Do you offer wedding car decoration?",
    answer:
      "Yes. Our wedding packages include floral and ribbon decoration options for baraat and walima convoys — let us know your theme when booking.",
  },
  {
    category: "services",
    question: "Can I request the same driver for repeat trips?",
    answer:
      "Yes, subject to availability. Regular and corporate clients can request a preferred chauffeur for consistency across bookings.",
  },
  {
    category: "services",
    question: "Do chauffeurs speak English?",
    answer:
      "Most of our chauffeurs communicate in Urdu and basic English. For VIP or embassy assignments we can assign bilingual drivers on request.",
  },
  {
    category: "services",
    question: "Is waiting time included?",
    answer:
      "A standard waiting allowance is included with city and airport packages. Extended waiting is charged hourly — ask your agent for the rate when booking.",
  },
  {
    category: "services",
    question: "Can the chauffeur make multiple stops?",
    answer:
      "Yes. City packages can include reasonable multipoint stops. Share your itinerary in advance so we can plan timing and any extra charges clearly.",
  },
  {
    category: "airport",
    question: "Are airport pickups available?",
    answer: "Yes. Airport pick & drop is available for Islamabad Airport and other major routes on request.",
  },
  {
    category: "airport",
    question: "Can I request a car for airport delivery?",
    answer:
      "Absolutely. We provide premium airport meet-and-greet services — your chauffeur meets you at the terminal so you can begin your journey immediately.",
  },
  {
    category: "airport",
    question: "How will I find my driver at the airport?",
    answer:
      "Your dedicated chauffeur will meet you at the arrivals terminal with a signage board bearing your name for a seamless meet-and-greet.",
  },
  {
    category: "airport",
    question: "Is flight delay tracking included with airport pickups?",
    answer:
      "Yes. We track your flight status and adjust pickup timing automatically, so you're never left waiting even if your flight is delayed.",
  },
  {
    category: "airport",
    question: "Can I book a return airport drop-off in advance?",
    answer:
      "Absolutely. You can schedule your departure transfer at the same time as your arrival pickup for a seamless round trip.",
  },
  {
    category: "airport",
    question: "What if my flight lands late at night?",
    answer:
      "Night arrivals are fully supported. Share your flight number with our agent and we will schedule the chauffeur accordingly, including early-morning landings.",
  },
  {
    category: "airport",
    question: "Do you offer meet-and-greet with luggage assistance?",
    answer:
      "Yes. Your chauffeur assists with luggage from arrivals to the vehicle. For larger groups we can arrange an SUV or van with extra space.",
  },
  {
    category: "airport",
    question: "How early should I book an airport transfer?",
    answer:
      "We recommend booking at least a few hours ahead. For early-morning flights or peak travel days, reserve 24 hours in advance to lock your preferred vehicle.",
  },
  {
    category: "policies",
    question: "What is your cancellation policy?",
    answer:
      "Free cancellation up to 24 hours before pickup. Late cancellations or no-shows may incur a fee as stated in your booking confirmation.",
  },
  {
    category: "policies",
    question: "Who is allowed to drive the vehicle?",
    answer:
      "Aziz Afridi rentals are chauffeur-driven. Only our assigned professional driver operates the vehicle for safety and insurance compliance.",
  },
  {
    category: "policies",
    question: "What if I damage the vehicle?",
    answer:
      "Report any incident to our agent immediately. Coverage depends on your insurance package and excess. An inspection is completed at handback.",
  },
  {
    category: "policies",
    question: "Do you have a booking policy page?",
    answer:
      "Yes. Full terms for deposits, cancellations, mileage, and usage are outlined on our Booking Policy page for complete transparency.",
  },
  {
    category: "policies",
    question: "Can I extend my rental after pickup?",
    answer:
      "Yes, subject to vehicle availability. Message or call your agent before the scheduled end time so we can extend the booking and update billing.",
  },
  {
    category: "policies",
    question: "Are there age or passenger limits?",
    answer:
      "Passenger limits follow each vehicle’s legal seating capacity. Child seats are available on request. Share group size when booking for the right car.",
  },
];

const QUICK_TOPICS = [
  {
    icon: "event_available",
    title: "Flexible Booking",
    text: "Modify or cancel free of charge up to 24 hours before pickup.",
  },
  {
    icon: "directions_car",
    title: "Chauffeur Included",
    text: "Every rental comes with a verified professional driver.",
  },
  {
    icon: "payments",
    title: "Transparent Pricing",
    text: "Clear quotes with optional add-ons — no hidden surprises.",
  },
  {
    icon: "flight_land",
    title: "Airport Ready",
    text: "Flight tracking and meet-and-greet at major terminals.",
  },
];

const BOOKING_STEPS = [
  {
    step: "01",
    icon: "search",
    title: "Choose Your Car",
    text: "Browse the fleet or ask an agent to recommend the right vehicle for your trip.",
  },
  {
    step: "02",
    icon: "calendar_month",
    title: "Confirm Dates",
    text: "Share pickup location, timing, and duration — city, airport, or outstation.",
  },
  {
    step: "03",
    icon: "verified_user",
    title: "Secure Booking",
    text: "Confirm via form, WhatsApp, or phone and receive your booking details instantly.",
  },
  {
    step: "04",
    icon: "airport_shuttle",
    title: "Ride in Comfort",
    text: "Your chauffeur arrives on time with a clean, inspected Aziz Afridi vehicle.",
  },
];

const SUPPORT_STATS = [
  { icon: "bolt", value: "< 15 min", label: "Avg. Agent Reply" },
  { icon: "support_agent", value: "24/7", label: "Live Support" },
  { icon: "thumb_up", value: "98%", label: "Booking Satisfaction" },
  { icon: "location_on", value: "Nationwide", label: "Coverage Ready" },
];

const EXPLORE_LINKS = [
  {
    href: "/cars",
    icon: "directions_car",
    title: "Browse Fleet",
    text: "Compare economy to luxury vehicles available today.",
  },
  {
    href: "/services/airport-pick-drop",
    icon: "flight",
    title: "Airport Transfers",
    text: "Meet-and-greet pickups with flight tracking included.",
  },
  {
    href: "/booking-policy",
    icon: "policy",
    title: "Booking Policy",
    text: "Read deposit, cancellation, and usage terms in full.",
  },
  {
    href: "/contact",
    icon: "mail",
    title: "Contact Concierge",
    text: "Send a custom request for weddings, corporate, or tours.",
  },
];

export default function FaqPage() {
  return (
    <>
      <header className="relative overflow-hidden bg-navy py-14 sm:py-20 lg:py-28">
        <Container className="relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6 xl:col-span-7">
              <nav className="mb-5 flex gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/60 sm:mb-6 sm:text-xs">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <span>/</span>
                <span className="text-white">FAQ</span>
              </nav>
              <h1 className="hero-shadow animate-fade-up max-w-2xl font-heading text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Frequently Asked <span className="text-accent">Questions</span>
              </h1>
              <p className="animate-fade-up-delay mt-5 max-w-xl text-sm text-white/60 sm:mt-6 sm:text-base lg:text-lg">
                Everything you need to know about renting a luxury vehicle with Aziz Afridi. Find answers on booking,
                payments, chauffeurs, and airport transfers — or call an agent anytime.
              </p>
              <div className="animate-fade-up-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={`tel:${brand.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold !text-white transition hover:brightness-95"
                >
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  Call Agent · {formatPhoneDisplay()}
                </a>
                <a
                  href="#faq-answers"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Browse Answers
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </a>
              </div>
            </div>

            <div className="animate-fade-up-delay relative mx-auto w-full max-w-md lg:col-span-6 lg:mx-0 lg:max-w-none xl:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl sm:aspect-[5/6] lg:aspect-[4/5]">
                <Image
                  src={HERO_IMAGE}
                  alt="Aziz Afridi call agent ready to answer your questions"
                  fill
                  priority
                  className="object-cover object-[center_20%]"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <p className="text-sm font-semibold text-white">Live agent available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-accent/5 blur-3xl" />
      </header>

      <section className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {QUICK_TOPICS.map((topic, index) => (
              <AnimateIn key={topic.title} delay={index * 70}>
                <div className="h-full rounded-2xl border border-primary/8 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,31,38,0.08)] sm:p-6">
                  <span className="material-symbols-outlined text-[28px] text-secondary">{topic.icon}</span>
                  <h2 className="mt-3 font-heading text-base font-semibold text-primary sm:text-lg">{topic.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{topic.text}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORT_STATS.map((stat, index) => (
              <AnimateIn key={stat.label} delay={index * 60}>
                <div className="flex h-full items-center gap-4 rounded-2xl border border-primary/8 bg-white p-5 sm:p-6">
                  <span className="material-symbols-outlined text-3xl text-secondary">{stat.icon}</span>
                  <div>
                    <p className="font-heading text-xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">{stat.label}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <AnimateIn>
            <div className="mb-10 text-center sm:mb-12">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Simple Process
              </span>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary sm:text-4xl">
                How Booking Works
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted sm:text-base">
                From first inquiry to doorstep delivery, your Aziz Afridi agent keeps every step clear and quick.
              </p>
            </div>
          </AnimateIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {BOOKING_STEPS.map((item, index) => (
              <AnimateIn key={item.step} delay={index * 80}>
                <div className="relative h-full rounded-2xl border border-primary/8 bg-background p-6 transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,31,38,0.08)]">
                  <span className="font-heading text-3xl font-bold text-secondary/25">{item.step}</span>
                  <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      <section id="faq-answers" className="scroll-mt-24 py-12 sm:py-20 lg:py-[100px]">
        <Container>
          <AnimateIn>
            <div className="mb-8 max-w-2xl sm:mb-10">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Help Center
              </span>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary sm:text-4xl">
                Answers by Category
              </h2>
              <p className="mt-3 text-sm text-muted sm:text-base">
                Select a topic below to explore detailed answers. Still stuck? Call a live agent anytime.
              </p>
            </div>
          </AnimateIn>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <AnimateIn className="lg:sticky lg:top-28">
                <FaqHelpCard />
              </AnimateIn>
            </div>

            <div className="lg:col-span-8">
              <AnimateIn delay={80}>
                <FaqAccordion categories={CATEGORIES} faqs={FAQS} />
              </AnimateIn>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <Container>
          <AnimateIn>
            <div className="mb-10 text-center sm:mb-12">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Explore More
              </span>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-primary sm:text-4xl">
                Helpful Links
              </h2>
            </div>
          </AnimateIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {EXPLORE_LINKS.map((link, index) => (
              <AnimateIn key={link.href} delay={index * 70}>
                <Link
                  href={link.href}
                  className="group flex h-full flex-col rounded-2xl border border-primary/8 bg-background p-6 transition hover:-translate-y-1 hover:border-secondary/30 hover:shadow-[0_12px_30px_rgba(0,31,38,0.08)]"
                >
                  <span className="material-symbols-outlined text-[28px] text-secondary transition group-hover:scale-110">
                    {link.icon}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-primary">{link.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{link.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
                    View
                    <span className="material-symbols-outlined text-[16px] transition group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </Container>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8 lg:pb-[100px]">
        <Container>
          <AnimateIn>
            <div className="relative overflow-hidden rounded-[24px] bg-navy px-5 py-12 text-center text-white sm:rounded-[40px] sm:px-12 sm:py-20 md:px-24">
              <div className="relative z-10">
                <span className="material-symbols-outlined mx-auto mb-4 block animate-fade-up text-[36px] text-accent">
                  support_agent
                </span>
                <h2 className="animate-fade-up font-heading text-2xl font-semibold sm:text-4xl">
                  Still Have Questions?
                </h2>
                <p className="animate-fade-up-delay mx-auto mt-5 max-w-2xl text-sm text-white/60 sm:mt-6 sm:text-lg">
                  If you couldn&apos;t find the answer you were looking for, our agent team is ready to assist you
                  personally with bookings, special requests, and trip planning.
                </p>
                <div className="animate-fade-up-delay-2 mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                  <a
                    href={`tel:${brand.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold !text-white transition hover:brightness-95 sm:px-10 sm:py-4"
                  >
                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                    Call Agent
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-10 sm:py-4"
                  >
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    Contact Us
                  </Link>
                  <a
                    href={`https://wa.me/${brand.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-accent px-8 py-3.5 text-sm font-semibold text-accent transition hover:bg-accent hover:text-primary sm:px-10 sm:py-4"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    WhatsApp
                  </a>
                </div>
              </div>
              <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
              <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
            </div>
          </AnimateIn>
        </Container>
      </section>
    </>
  );
}
