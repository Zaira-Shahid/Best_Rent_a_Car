import type {
  ServiceDetail,
  ServiceDetailSource,
  ServiceFleetItem,
  ServicePricingPackage,
  ServiceTestimonial,
} from "@/types";
import { carModels } from "./cars";
import { brand, formatPhone, telLink, whatsappLink } from "@/lib/brand";
import { googleReviews, reviewMeta } from "./reviews";

/** Service pages show the same real Google reviews (the only reviews there are), never invented ones. */
const googleReviewItems: ServiceTestimonial[] = googleReviews.map((review) => ({
  quote: review.text,
  name: review.name,
  role: reviewMeta(review),
}));
const googleRatingSummary = {
  value: `${brand.rating.toFixed(1)}/5 on Google`,
  label: `Based on ${brand.reviewCount} Google reviews`,
};

const hotelTransfer: ServiceDetailSource = {
  slug: "hotel-transfer",
  name: "Hotel Transfer",
  metaDescription:
    "Comfortable hotel transfer services across Pakistan with Best Carz Rent a Car — professional chauffeurs, fixed pricing, and door-to-door luxury.",
  hero: {
    badge: "Premium Logistics",
    title: "Comfortable Hotel Transfer Services",
    description:
      "Experience seamless door-to-door luxury travel with our professional chauffeur service. We bridge the gap between your arrival and your destination with uncompromising elegance. Every transfer is pre-scheduled, fixed-price, and tracked end-to-end, so there are no surprises at either end of your journey.",
    image:
      "/images/site/hotel-chauffeur-van.webp",
    primaryCta: { label: "Reserve Transfer", href: "/contact" },
    secondaryCta: { label: "Explore Fleet", href: "#fleet" },
  },
  features: {
    title: "World-Class Transfers",
    description:
      "Tailored travel solutions for the discerning passenger, ensuring punctuality and privacy at every turn. Each chauffeur is trained on hotel etiquette and local routes to keep every transfer smooth, quiet, and on schedule.",
    items: [
      {
        icon: "flight_land",
        title: "Airport to Hotel",
        text: "Greeter service and seamless pickup from major hubs directly to your lobby.",
      },
      {
        icon: "flight_takeoff",
        title: "Hotel to Airport",
        text: "Punctual departures for stress-free boarding.",
      },
      {
        icon: "map",
        title: "City Tour",
        text: "Personalized itineraries with expert drivers.",
      },
      {
        icon: "business_center",
        title: "Business Transfers",
        text: "Move between meetings with the efficiency and confidentiality your executive status demands. Our fleet is equipped with Wi-Fi and privacy partitions.",
      },
    ],
  },
  coverage: {
    title: "National Coverage",
    description: "Luxury at your doorstep across Pakistan's most prominent cities and retreats.",
    cities: [
      {
        name: "Islamabad",
        tag: "24/7 Availability",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCdIEGISQQlT0Kfudh7Fh-erk5291TdfPLfrSpFPLX0PW_RNkgPIMIswbraPw0uc1OimVbGU-AUFft9dtXGsHAxevvGmJ3FnAn4vmF0lzny_DDKhXJ3Ls0gaT7vy33qy3Qh2wsBECWMwPhdlyqmU5CGwUfw2kUjZxWb6lbIiF7JvLFJH5NvDHald78U9p1aqp47luBNzD0kIe45XrlMXCjH42aYqekpHq3mmd1ITnYavuPg5fdlOifD",
      },
      {
        name: "Lahore",
        tag: "15 Hotels Linked",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCT1pw8ZdADhhjXqe3eBcw5Ux6FQE01oLp9riGzxi4-xTyNcSB2xKyD-xwool_ERPMHO9bL8ZYCIFfVkwqcsfCLoEnw91qH0XMJUwojeOKI-cix6d8-PhQ92OR_RLoU7SdFybmC8-2aPEDCYxP6y_1-n37Um0uZteHkeVfA4qGV-w2vRqaUszBO8RKync40dmIhD5sx71dw4JS1yE5r91XYhtCG9JzF7NO8PoFdXfk5RiWLJVAF0S0K",
      },
      {
        name: "Karachi",
        tag: "Airport VIP Fast-track",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCTr08rLdv7jmHeVvULIesxu9a2lDVLd_lGNxxuxW2B7tHVDDO8x5rgSks4Ff5vFrUz_SpxseN_oFRi9mDSHAq0iSicFFKmT3-uXkh9CyQJpfZZTBURLXeNwq2kb0v8xG_klDAUZFPz32aXwdHYp0SMsSp-navc9YZLfsFSG6Rvlr-KzQbRk7hLc75qE_41OBynzzTYeVJtENdqpu2KyZSKud-agQ5PexN2IE4obbcPeQhn_wCJhrv1",
      },
      {
        name: "Murree",
        tag: "4x4 Premium Fleet",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCJcDcSvcULxf6DizyBbP_HUgOVTsAm7M7F6irkK57fXMLDyuCvh587NX92tbaJYlza5Yf5rDXT7Nqtr6DchROkdfS77qraVchaIcZ1gIimzFaJbiOHmcCtfefsKPH_K3l0MtmDfNwB5imVHoUBzB_B4Gr2sA7F5tUCLiaqecq8eTvRu8eeZtFeAyEofZFERtOmqtpjOiOFCeHacefiSd4LSBryGWhWCvjCNJ376MxAy6L08pNmoZHC",
      },
    ],
  },
  booking: {
    title: "Secure Your Private Chauffeur",
    description:
      "Simple, fast, and transparent booking. Your vehicle will be waiting precisely when you need it.",
    highlights: [
      { icon: "verified", text: "Fixed Transparent Pricing" },
      { icon: "schedule", text: "Free Waiting Time (60 mins)" },
      { icon: "person", text: "Bilingual Professional Drivers" },
    ],
  },
  fleet: {
    title: "Our Premium Fleet",
    description: "Choose the vehicle that matches your itinerary and party size.",
    items: [
      {
        name: "Executive Sedan",
        tag: "2024 Model",
        seats: 3,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBTJ4YCSAXfXW6Y-F7FvY_-_wMNDMe19tv0kTN4gf_1_OTG2I-rHZtuKg0WHVGh6hUBgcibDiFcbPKTZg1Bawg9Jcf3nbX1FF-VXH---fIRKEsn-O-r_Zyo8I1fyeK2TlfB0pSajCL6fEozPXAQCNg9zPh9Whx06E0f7znuiOYtiFlInuVFKrBxBmPVGtrih0lCiWc2qRS2k0leBI3QUeFU73NubDvicTLNla98M2RxdcIw57n1hxr9",
        priceDay: 32000,
      },
      {
        name: "Luxury SUV",
        tag: "Top Choice",
        carSlug: "lexus-lx",
      },
      {
        name: "Business Van",
        tag: "Large Group",
        carSlug: "grand-cabin",
      },
    ],
  },
  included: {
    title: "What's Included",
    description: "Every hotel transfer is priced all-inclusive — no hidden extras at drop-off.",
    items: [
      { icon: "person", text: "Professional, uniformed chauffeur for the entire journey" },
      { icon: "local_gas_station", text: "Fuel fully included — the fixed fare covers the full route" },
      { icon: "water_drop", text: "Complimentary bottled water for every passenger" },
      { icon: "wifi", text: "In-car Wi-Fi available on Business Van and Executive Sedan bookings" },
      { icon: "schedule", text: "60 minutes of free waiting time at the pickup point" },
    ],
  },
  audience: {
    title: "Who It's For",
    description: "Built for anyone who needs a reliable, comfortable link between the airport, hotel, and city.",
    items: [
      {
        icon: "flight",
        title: "International Travelers",
        text: "Land, clear immigration, and step straight into a waiting private vehicle without haggling for a taxi.",
      },
      {
        icon: "business_center",
        title: "Corporate Guests",
        text: "Reliable, punctual transfers for delegates and visiting staff attending meetings or conferences.",
      },
      {
        icon: "groups",
        title: "Families & Groups",
        text: "Spacious SUVs and vans for families and tour groups traveling together with luggage.",
      },
    ],
  },
  notes: {
    title: "Flight Delays & Meet-and-Greet",
    description: "We plan around your flight, not the other way around.",
    items: [
      {
        icon: "flight_land",
        title: "Real-Time Flight Monitoring",
        text: "We track your flight number, so delayed or early arrivals never leave you without a car.",
      },
      {
        icon: "badge",
        title: "Meet & Greet at Arrivals",
        text: "Your chauffeur waits at the arrivals hall with a name board, ready to assist with luggage.",
      },
      {
        icon: "hourglass_top",
        title: "Complimentary Grace Period",
        text: "60 minutes of free waiting is included after landing to clear immigration and baggage claim.",
      },
    ],
  },
};

const executiveCarRental: ServiceDetailSource = {
  slug: "executive-car-rental",
  name: "Executive Car Rental",
  metaDescription:
    "Executive car rental with premium chauffeur service from Best Carz Rent a Car — designed for global leaders who demand privacy, punctuality, and prestige.",
  hero: {
    badge: "VIP Chauffeur Services",
    title: "Executive Car Rental With Premium Chauffeur Service",
    description:
      "Experience the pinnacle of corporate travel. Our fleet of meticulously maintained luxury vehicles and professional chauffeurs ensure your journey is as productive as it is comfortable. From single transfers to standing monthly arrangements, every detail is coordinated so you can focus on business, not logistics.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2cP6lh8z8yLUyvfAS2r5Kyu0c2myayXrEh3Tqte9GAzqwXkZEqJwAF8FLPzpBDlejLFxqcK39gyEJY3xGwD2WPQdVxW-96QI_vkw1LPOQP5Djf4DqLUm4c96I8VJnurZE8uEgbeowL3JmC3k54rEtgS_FWgb3uyZ8oKvA5VYVQBqTGvkFHShX583W7gfpzW-JwSoOXMpnA5J45sfEONUI3iTcqPnmu0QLVRu4yCCvXX6_N-uuPvCw",
    primaryCta: { label: "Explore Fleet", href: "#fleet" },
    secondaryCta: { label: "Contact Concierge", href: "/contact" },
  },
  fleet: {
    title: "Our Exclusive Fleet",
    description:
      "Selected for comfort, safety, and executive presence. Choose the perfect statement for your arrival.",
    items: [
      {
        name: "Mercedes-Benz S-Class",
        tag: "Ultimate Luxury",
        carSlug: "mercedes-s500",
      },
      {
        name: "BMW 7 Series",
        tag: "Innovation",
        seats: 4,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA1d8iVz2j2ubfPwx1GLKTeiZwGSZkK8352f6k8LiCV_f0TQDJGcp1qeMdsbdL3jQ2jEjSjKV4Uctpydz2J6d1Nf1dT7PpU8I1rz7YHN1fWUNatRoMCvJTXD44TmlVnQOUeAmCZrHXW0C7nDcrRsUTTbDHf31v-5bXUekZiMSC7JsBYuDEgFtgk4pxr1pyLchh21zOzWYUQKYQNuhpKJZeahvVBaDW75TLs3S9BgW3O5B4Z5TjzVcrG",
        priceDay: 58000,
      },
      {
        name: "Toyota Prado",
        tag: "Versatile",
        carSlug: "toyota-prado",
      },
      {
        name: "Toyota Fortuner",
        tag: "Commanding",
        carSlug: "toyota-fortuner",
      },
    ],
  },
  features: {
    title: "Designed for Global Leaders",
    description:
      "Our services go beyond transportation. We provide a mobile sanctuary for the modern executive, with vehicles maintained to a five-star standard and chauffeurs briefed on your itinerary in advance.",
    items: [
      {
        icon: "flight_takeoff",
        title: "VIP Transfers",
        text: "Seamless airport pickups with meet-and-greet service and luggage assistance directly to your destination.",
      },
      {
        icon: "business_center",
        title: "Business Meetings",
        text: "Arrive composed and prepared. Use the travel time for final preparations while we handle the navigation.",
      },
      {
        icon: "celebration",
        title: "Corporate Events",
        text: "Full fleet support for gala dinners, conferences, and board meetings with dedicated event coordinators.",
      },
      {
        icon: "language",
        title: "Intercity Travel",
        text: "Comfortable long-distance travel between cities with scheduled breaks and premium refreshments.",
      },
    ],
  },
  story: {
    title: "The Gold Standard in Professional Chauffeur Service",
    description:
      "Our chauffeurs are more than just drivers; they are expertly trained logistics specialists and local guides committed to your safety and schedule.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2cP6lh8z8yLUyvfAS2r5Kyu0c2myayXrEh3Tqte9GAzqwXkZEqJwAF8FLPzpBDlejLFxqcK39gyEJY3xGwD2WPQdVxW-96QI_vkw1LPOQP5Djf4DqLUm4c96I8VJnurZE8uEgbeowL3JmC3k54rEtgS_FWgb3uyZ8oKvA5VYVQBqTGvkFHShX583W7gfpzW-JwSoOXMpnA5J45sfEONUI3iTcqPnmu0QLVRu4yCCvXX6_N-uuPvCw",
    stat: { value: "15+", label: "Years of Average Experience" },
    points: [
      {
        icon: "workspace_premium",
        title: "Advanced Training",
        text: "Each chauffeur undergoes rigorous defensive driving and executive etiquette training annually.",
      },
      {
        icon: "privacy_tip",
        title: "Unwavering Privacy",
        text: "We understand the value of confidentiality. What happens in the cabin stays in the cabin.",
      },
      {
        icon: "auto_fix_high",
        title: "Immaculate Grooming",
        text: "Our staff represents you. We maintain the highest standards of professional attire and hygiene.",
      },
    ],
  },
  process: {
    title: "Effortless Reservation Process",
    steps: [
      { icon: "search", title: "1. Select Vehicle", text: "Choose from our curated fleet of luxury sedans and SUVs." },
      {
        icon: "calendar_month",
        title: "2. Pick Schedule",
        text: "Define your route, date, and specific chauffeur preferences.",
      },
      { icon: "credit_card", title: "3. Confirm Booking", text: "Secure payment and receive instant digital confirmation." },
      { icon: "handshake", title: "4. Luxury Ride", text: "Your chauffeur arrives early, ready to provide a 5-star service." },
    ],
  },
  testimonials: {
    title: "Voices of Excellence",
    items: googleReviewItems,
  },
  included: {
    title: "What's Included",
    description: "A fully managed experience from pickup to drop-off, with nothing left for you to arrange.",
    items: [
      { icon: "person", text: "Formally attired, professionally trained chauffeur" },
      { icon: "local_gas_station", text: "Fuel fully covered on all point-to-point and hourly bookings" },
      { icon: "water_drop", text: "Complimentary bottled water and refreshments in the cabin" },
      { icon: "wifi", text: "In-car Wi-Fi and phone charging for uninterrupted productivity" },
      { icon: "schedule", text: "Flexible waiting time for meetings that run over schedule" },
    ],
  },
  audience: {
    title: "Who It's For",
    description: "Trusted by professionals who cannot afford unpredictable travel.",
    items: [
      {
        icon: "workspace_premium",
        title: "C-Suite & Business Leaders",
        text: "Discreet, on-time travel between meetings, airports, and events without the stress of driving.",
      },
      {
        icon: "diversity_3",
        title: "Diplomats & Delegations",
        text: "Coordinated multi-vehicle movements for official visits, with security-conscious chauffeurs.",
      },
      {
        icon: "event",
        title: "Event & Conference Organizers",
        text: "Scheduled fleets for speakers, sponsors, and VIP guests throughout multi-day events.",
      },
    ],
  },
  notes: {
    title: "Corporate Account Benefits",
    description: "Simplify recurring travel for your organization with a dedicated Best Carz Rent a Car corporate account.",
    items: [
      {
        icon: "receipt_long",
        title: "Consolidated Monthly Invoicing",
        text: "One clean invoice for all rides across your team, instead of individual receipts.",
      },
      {
        icon: "support_agent",
        title: "Dedicated Account Manager",
        text: "A single point of contact who understands your company's travel patterns and preferences.",
      },
      {
        icon: "priority_high",
        title: "Priority Fleet Allocation",
        text: "Guaranteed vehicle availability during peak business hours and high-demand periods.",
      },
      {
        icon: "percent",
        title: "Volume-Based Discounts",
        text: "Preferential rates that scale with your organization's monthly booking volume.",
      },
    ],
  },
};

const weddingCarRental: ServiceDetailSource = {
  slug: "wedding-car-rental",
  name: "Wedding Car Rental",
  metaDescription:
    "Premium wedding car rental from Best Carz Rent a Car — make your wedding journey memorable with a decorated luxury fleet and dedicated concierge.",
  hero: {
    badge: "Premium Wedding Rentals",
    title: "Make Your Wedding Journey",
    accent: "Memorable",
    description:
      "Experience unparalleled luxury on your special day. From executive sedans to grand SUVs, we provide the perfect chariot for your once-in-a-lifetime celebration. Our wedding concierge coordinates every vehicle in your convoy — bride, groom, and family — so timings stay perfectly in sync from baraat to reception.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXqik-wRX7WtXJLneIcUXCKNAqtBcIVXhktuJKQDZd-NIK6kKfttaGwp5FC0ZzUXfg6aCV7gjo0s6bkWDkJQg-t6goUYT5ih_c9_gueGD_Wnh_rwiDLaXOwueRDiFUDKJveYCAak_1wG0Yp91eQGuqyPeDcaOKwxsiRYL9Jj3UxGlSavJXVhhiZJr8FP292NNS5FK5PMejDKS5TsCCfVM0S-77Qx0kG47SXdwfyL5yFe6-pVXf_K40",
    primaryCta: { label: "Reserve Your Car", href: "#booking" },
    secondaryCta: { label: "View Our Fleet", href: "#fleet" },
  },
  features: {
    title: "Premium Experience Guaranteed",
    description:
      "Our service is defined by meticulous attention to detail, from the scent of the interior to the uniform of the chauffeur. We ensure every mile reflects the elegance of your wedding, with each vehicle detailed and inspected the morning of your event.",
    items: [
      {
        icon: "schedule",
        title: "On-Time Arrival",
        text: "Punctuality is our promise. We arrive 15 minutes early to ensure your schedule remains perfect.",
      },
      {
        icon: "auto_awesome",
        title: "Custom Decoration",
        text: "Tailored floral arrangements to match your wedding theme.",
      },
      {
        icon: "support_agent",
        title: "24/7 Concierge",
        text: "Dedicated wedding planner support from booking to send-off.",
      },
      {
        icon: "distance",
        title: "Route Mapping",
        text: "Optimized scenic travel paths between venues.",
      },
    ],
  },
  fleet: {
    title: "Our Wedding Fleet",
    description: "Selected for elegance, comfort, and luxury.",
    items: [
      {
        name: "Toyota Prado",
        tag: "SUV Luxury",
        carSlug: "toyota-prado",
      },
      {
        name: "Toyota Fortuner",
        tag: "Executive SUV",
        carSlug: "toyota-fortuner",
      },
      {
        name: "Mercedes S-Class",
        tag: "Luxury Sedan",
        carSlug: "mercedes-s400",
      },
      {
        name: "Rolls-Royce Ghost",
        tag: "Executive Elite",
        seats: 4,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDXqik-wRX7WtXJLneIcUXCKNAqtBcIVXhktuJKQDZd-NIK6kKfttaGwp5FC0ZzUXfg6aCV7gjo0s6bkWDkJQg-t6goUYT5ih_c9_gueGD_Wnh_rwiDLaXOwueRDiFUDKJveYCAak_1wG0Yp91eQGuqyPeDcaOKwxsiRYL9Jj3UxGlSavJXVhhiZJr8FP292NNS5FK5PMejDKS5TsCCfVM0S-77Qx0kG47SXdwfyL5yFe6-pVXf_K40",
        priceDay: 120000,
      },
    ],
  },
  categories: {
    title: "Wedding Transportation Services",
    description:
      "We provide comprehensive logistics for the entire wedding party, ensuring everyone arrives in style and comfort.",
    items: [
      {
        icon: "favorite",
        title: "Bride & Groom",
        text: "The main event. A flagship luxury car meticulously cleaned and decorated for the couple's grand entrance and exit.",
        bullets: ["Complimentary Refreshments", "Uniformed Chauffeur", "Red Carpet Arrival"],
      },
      {
        icon: "family_restroom",
        title: "Family Transportation",
        text: "Spacious SUVs and executive sedans for the immediate family to travel together in comfort and elegance.",
        bullets: ["Multiple Pickup Points", "Large Luggage Space", "Multi-Car Coordination"],
      },
      {
        icon: "group",
        title: "Guest Pickup",
        text: "Airport transfers and venue shuttles for out-of-town guests, providing a seamless luxury experience.",
        bullets: ["Meet & Greet Service", "Luxury Shuttle Vans", "Timed Group Pickups"],
      },
    ],
  },
  booking: {
    title: "Book Your Dream Car",
    description:
      "Fill out the form and our wedding concierge will get back to you within 2 hours with a customized quote and availability.",
    contact: [
      { icon: "call", label: "Call (Primary)", value: formatPhone(brand.phones[0].number), href: telLink(brand.phones[0].number) },
      { icon: "call", label: "Call (Secondary)", value: formatPhone(brand.phones[1].number), href: telLink(brand.phones[1].number) },
      { icon: "chat", label: "WhatsApp", value: formatPhone(brand.whatsapp), href: whatsappLink() },
      { icon: "mail", label: "Email Us", value: brand.email, href: `mailto:${brand.email}` },
    ],
  },
  included: {
    title: "What's Included",
    description: "Every wedding booking arrives fully prepared, so your only job is to enjoy the day.",
    items: [
      { icon: "person", text: "Uniformed chauffeur trained in wedding-day etiquette and timing" },
      { icon: "local_gas_station", text: "Fuel fully included for the entire route between venues" },
      { icon: "water_drop", text: "Chilled bottled water kept ready in every vehicle" },
      { icon: "auto_awesome", text: "Standard floral decoration included on the lead car" },
      { icon: "schedule", text: "Extended waiting time built in for photo sessions and ceremony delays" },
    ],
  },
  audience: {
    title: "Who It's For",
    description: "Perfect for anyone planning the transportation around a wedding celebration.",
    items: [
      {
        icon: "favorite",
        title: "Bride & Groom",
        text: "A flagship decorated car for the grand entrance, exit, and every photo in between.",
      },
      {
        icon: "family_restroom",
        title: "Families Hosting the Event",
        text: "Coordinated vehicles for parents, in-laws, and close family across multiple functions.",
      },
      {
        icon: "event_available",
        title: "Wedding Planners",
        text: "A single reliable transport partner for baraat, valima, and guest logistics across the event.",
      },
    ],
  },
  notes: {
    title: "Decoration Options & Convoy Coordination",
    description: "Personalize your fleet and keep every vehicle moving together, on schedule.",
    items: [
      {
        icon: "local_florist",
        title: "Fresh Floral Arrangements",
        text: "Choose from classic white, colorful, or theme-matched flower decorations for the lead car.",
      },
      {
        icon: "auto_awesome",
        title: "Ribbons, Signage & Lighting",
        text: "Add silk ribbons, custom 'Just Married' signage, or LED accents for evening events.",
      },
      {
        icon: "route",
        title: "Multi-Car Convoy Coordination",
        text: "Booking several vehicles? Our concierge sequences pickups and routes so the entire convoy arrives together.",
      },
    ],
  },
};

const dailyCarRental: ServiceDetailSource = {
  slug: "daily-car-rental",
  name: "Daily Car Rental",
  metaDescription:
    "Rent a car for a day with Best Carz Rent a Car — flexible booking, affordable rates, and fast doorstep delivery across Pakistan.",
  hero: {
    badge: "Premium Daily Rental",
    title: "Rent A Car For A Day With",
    accent: "Easy Booking",
    description:
      "Experience the pinnacle of automotive comfort for a day. Whether it's a business meeting or a weekend escape, travel with Best Carz Rent a Car and a professional chauffeur — with doorstep pickup available across every major city.",
    image:
      "/images/site/pakistan-motorway.webp",
    primaryCta: { label: "Search Available Cars", href: "#fleet" },
    secondaryCta: { label: "Book Now", href: "/contact" },
  },
  features: {
    title: "The Best Carz Rent a Car Advantage",
    description:
      "Setting the gold standard for daily car rentals, with transparent pricing and a fleet ready whenever your plans change.",
    items: [
      {
        icon: "verified",
        title: "Flexible Booking",
        text: "Change of plans? No problem. Modify or cancel your booking up to 24 hours before your pickup time at no extra cost.",
      },
      {
        icon: "payments",
        title: "Affordable Rates",
        text: "Luxury doesn't always have to be expensive. Competitive daily pricing without hidden fees.",
      },
      {
        icon: "sanitizer",
        title: "Clean Vehicles",
        text: "Every vehicle undergoes a rigorous 20-point sanitization process before every single rental.",
      },
      {
        icon: "speed",
        title: "Fast Delivery",
        text: "We deliver your chosen vehicle directly to your doorstep in under 60 minutes across major city centers.",
      },
    ],
  },
  fleet: {
    title: "Explore Our Fleet",
    description: "Tailored collections for every destination.",
    items: [
      {
        name: "Suzuki Alto",
        tag: "Economy",
        carSlug: "suzuki-alto",
      },
      {
        name: "BMW 5 Series",
        tag: "Sedan",
        seats: 5,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAtxzNlP5pVA6EvQHoDD9CnAkJq6G3nmesEf8tCPcw16hP1LNFORPivhGg9uVxI2A8X6Ius8ho8oaz2mH_Cnhh7Vd3CVMpugJpLFB3Nv9QDlJryfE7ZjiNoKxs645N-RTxDY1rL8kp9ToUw8LTMuv7Z9aH7r61OhqV5epZNSBeJcYYg1ztryOPxTlLwy4Rb508RYiHzRscjdD8lQrvh-h3A1p8pIc0be6OclqK9-iRD7Odog995EcWu",
        priceDay: 24000,
      },
      {
        name: "Range Rover Vogue",
        tag: "SUV",
        seats: 7,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDEFTKKMfymY2CZ7clB2dJHOHP9XFyFzTHXI12j9rovLrZO43qd0kPqvJwN8vSj-jrozbaCfN2imZTTSQ6k999X5n3xYePdMXDhzBgSFnXLjcc1V2KE2FTwAPGSQt-CgfmrHcpX7i-1b2dhjib_OJbdtgv_4yQyj1s1PJUEp8cJM2MKyJQWIkzD2sglD78PLgSDSCz7scyUs51rJbB7fpqxJZgj4Co82sODxTN34IbiCdHSgy_20UT0",
        priceDay: 45000,
      },
      {
        name: "Lamborghini Huracán",
        tag: "Luxury",
        seats: 2,
        transmission: "Automatic",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCrPHYvOd2RIsBxRB8ytIOJQah-HNwTrC7kTMcnZbiGmPxdCSCQCFPj8ML_RcCw9WmFS0hj3n5N3gauD6d7C-yjAXalrQI8uxG8s1hsIN35Q6gEty5dvt8fDgmFm_2vCc3-DXwZgk5wU49MXkVkBNuE2wrIjPMAfEb1vytVOcStfDzVw4mhsGWsleK2alMsRolGjKVgolEQCgkNjdDztaKV1npbciYt9agpbQsC7arqvQgmwHWLqQai",
        priceDay: 85000,
      },
    ],
  },
  packages: {
    title: "Daily Rental Packages",
    description:
      "Choose the plan that suits your journey — from a light city run to a fully chauffeured touring package, each tier is priced per 24-hour day with no hidden extras.",
    items: [
      {
        name: "City Explorer",
        priceDay: 12900,
        features: [
          { text: "150km Included", included: true },
          { text: "Basic Insurance", included: true },
          { text: "Standard Delivery", included: true },
          { text: "Priority Support", included: false },
        ],
      },
      {
        name: "Business Executive",
        priceDay: 24900,
        featured: true,
        features: [
          { text: "Unlimited km", included: true },
          { text: "Full Comp Insurance", included: true },
          { text: "Airport Pickup/Drop", included: true },
          { text: "24/7 Priority Support", included: true },
        ],
      },
      {
        name: "Grand Touring",
        priceDay: 59900,
        features: [
          { text: "Unlimited km", included: true },
          { text: "Platinum Coverage", included: true },
          { text: "Chauffeur Included", included: true },
          { text: "Concierge Service", included: true },
        ],
      },
    ],
  },
  testimonials: {
    title: "Drive Stories from Our Clients",
    ratingSummary: googleRatingSummary,
    items: googleReviewItems,
  },
  faqs: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What documents do I need for a 1-day rental?",
        answer:
          "You'll need a valid Driving License (held for at least 1 year), a CNIC or Passport, and a card or cash for the security deposit. International visitors may require an International Driving Permit. All documents must be original — photocopies are not accepted at handover.",
      },
      {
        question: "Is there a minimum age requirement?",
        answer:
          "The minimum age for standard vehicles is 21. For luxury and performance categories, the minimum age is 25. Drivers under 25 may be subject to a young driver surcharge and a reduced selection of high-performance models.",
      },
      {
        question: "Can I pick up in one city and drop in another?",
        answer:
          "Yes, we offer one-way rentals across all major cities. A standard relocation fee applies based on the distance between the pickup and drop-off locations, and this fee is confirmed upfront before you book.",
      },
      {
        question: "Is fuel included in the daily rate?",
        answer:
          "Vehicles are provided on a Full-to-Full fuel policy: you receive a full tank and are expected to return it full. This keeps pricing transparent — you only ever pay for the fuel you actually use.",
      },
      {
        question: "Is a chauffeur included with every booking?",
        answer:
          "Yes. Every Best Carz Rent a Car rental includes a professional chauffeur. Mention any language preference or VIP requirements when confirming your reservation.",
      },
    ],
  },
  included: {
    title: "What's Included",
    description: "Every daily chauffeured rental comes with these standard inclusions.",
    items: [
      { icon: "local_gas_station", text: "Full-to-Full fuel policy — pay only for what you use" },
      { icon: "sanitizer", text: "20-point sanitization completed before every handover" },
      { icon: "water_drop", text: "Complimentary bottled water in every vehicle" },
      { icon: "support_agent", text: "Professional chauffeur included with every booking" },
      { icon: "schedule", text: "15-minute grace period on both pickup and return" },
    ],
  },
  audience: {
    title: "Who It's For",
    description: "Flexible enough for a single day, reliable enough for repeat use.",
    items: [
      {
        icon: "work",
        title: "Business Travelers",
        text: "A dependable vehicle delivered to your hotel or office for same-day meetings and errands.",
      },
      {
        icon: "luggage",
        title: "Tourists & Weekend Explorers",
        text: "Chauffeur-driven comfort to explore cities and getaways like Murree without the stress of driving.",
      },
      {
        icon: "home_repair_service",
        title: "Residents Needing a Temporary Car",
        text: "A short-term replacement while your own vehicle is being serviced or repaired.",
      },
    ],
  },
};

const monthlyCarRental: ServiceDetailSource = {
  slug: "monthly-car-rental",
  name: "Monthly Car Rental",
  metaDescription:
    "Flexible monthly car rental plans with Best Carz Rent a Car — no maintenance hassles, replacement vehicles, and premium insurance across Pakistan.",
  hero: {
    badge: "Premium Long-Term Mobility",
    title: "Monthly Car Rental Plans For Your",
    accent: "Long-Term Needs",
    description:
      "Elevate your commute with flexible monthly subscriptions. Designed for companies, families, and professionals who value prestige and peace of mind — with doorstep delivery and transparent billing.",
    image:
      "/images/site/islamabad-jinnah-avenue.webp",
    primaryCta: { label: "Browse Inventory", href: "#fleet" },
    secondaryCta: { label: "Talk to an Advisor", href: "/contact" },
  },
  features: {
    title: "Why Choose Monthly Rental?",
    description:
      "Skip the commitments of ownership and the hassle of short-term rentals. Our monthly plans are built for convenience.",
    items: [
      {
        icon: "engineering",
        title: "No Maintenance Hassle",
        text: "Routine servicing, oil changes, and tire rotations are all handled by us. We keep you moving without the paperwork.",
      },
      {
        icon: "swap_horiz",
        title: "Replacement Vehicle",
        text: "If your car needs major repairs or is due for service, we provide an immediate replacement of equal class.",
      },
      {
        icon: "calendar_today",
        title: "Flexible Period",
        text: "Extend, shorten, or switch your vehicle month-to-month. No long-term lock-ins or predatory termination fees.",
      },
      {
        icon: "verified",
        title: "Premium Insurance",
        text: "Comprehensive cover included on every monthly plan, with optional zero-liability upgrades for total peace of mind.",
      },
    ],
  },
  fleet: {
    title: "Our Monthly Packages",
    description: "Tailored fleets for every professional need — priced clearly per day.",
    items: [
      {
        name: "Economy Elite",
        tag: "Best Value",
        carSlug: "toyota-corolla",
      },
      {
        name: "Corporate Sedan",
        tag: "Business",
        carSlug: "honda-city",
      },
      {
        name: "Family SUV",
        tag: "Family",
        carSlug: "toyota-fortuner",
      },
      {
        name: "Luxe Prestige",
        tag: "Premium Choice",
        carSlug: "mercedes-s400",
      },
    ],
  },
  packages: {
    title: "Monthly Plan Tiers",
    description:
      "Choose the plan that matches your mileage and vehicle class. Billing is on a 30-day cycle with transparent daily rates shown on every car.",
    items: [
      {
        name: "Economy Elite",
        carSlug: "toyota-corolla",
        unit: "/day",
        features: [
          { text: "Toyota Corolla or similar", included: true },
          { text: "3000 KM / month included", included: true },
          { text: "Hybrid / Petrol options", included: true },
          { text: "Chauffeur available", included: false },
        ],
      },
      {
        name: "Corporate Sedan",
        carSlug: "honda-city",
        unit: "/day",
        featured: true,
        features: [
          { text: "Audi A4 / Civic class", included: true },
          { text: "4500 KM / month included", included: true },
          { text: "Full comprehensive cover", included: true },
          { text: "Priority support", included: true },
        ],
      },
      {
        name: "Luxe Prestige",
        carSlug: "mercedes-s400",
        unit: "/day",
        features: [
          { text: "Mercedes S-Class or similar", included: true },
          { text: "Unlimited mileage", included: true },
          { text: "Chauffeur available", included: true },
          { text: "Concierge service", included: true },
        ],
      },
    ],
  },
  testimonials: {
    title: "Trust from High-Performers",
    ratingSummary: googleRatingSummary,
    items: googleReviewItems,
  },
  faqs: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What documents do I need for a monthly rental?",
        answer:
          "For residents, we require a valid Driving License, CNIC/Passport, and a credit/debit card. International clients also need an International Driving Permit (IDP). All documents must be original at handover.",
      },
      {
        question: "Can I change my vehicle mid-month?",
        answer:
          "Yes, you can upgrade or downgrade. Price adjustments are applied pro-rata to your next billing cycle. A small logistics fee may apply for vehicle swaps outside major cities.",
      },
      {
        question: "Is comprehensive insurance included?",
        answer:
          "All monthly rentals include standard comprehensive insurance. Zero-liability upgrades are available for total peace of mind.",
      },
      {
        question: "What is the minimum rental period?",
        answer:
          "Monthly plans are calculated on a 30-day basis. You can return earlier, but the minimum billing cycle remains 30 days.",
      },
    ],
  },
  included: {
    title: "What's Included",
    description: "Every monthly plan comes with these standard inclusions.",
    items: [
      { icon: "engineering", text: "Routine maintenance and servicing handled by us" },
      { icon: "swap_horiz", text: "Equal-class replacement vehicle during repairs" },
      { icon: "verified", text: "Comprehensive insurance on every plan" },
      { icon: "support_agent", text: "24/7 roadside assistance and support" },
      { icon: "local_shipping", text: "Doorstep delivery and pickup in major cities" },
    ],
  },
  audience: {
    title: "Who It's For",
    description: "Built for people who need a car for weeks or months — not just a weekend.",
    items: [
      {
        icon: "business_center",
        title: "Companies & Teams",
        text: "Reliable monthly mobility for executives, sales teams, and visiting staff.",
      },
      {
        icon: "family_restroom",
        title: "Families Relocating",
        text: "A comfortable vehicle for 1–6 months while you settle into a new city.",
      },
      {
        icon: "work",
        title: "Professionals on Assignment",
        text: "Skip ownership costs when your project or posting has a clear end date.",
      },
    ],
  },
};

const weeklyCarRental: ServiceDetailSource = {
  slug: "weekly-car-rental",
  name: "Weekly Car Rental",
  metaDescription:
    "Flexible weekly car rental plans with Best Carz Rent a Car — save up to 30% vs daily rates, seamless extensions, and premium fleet across Pakistan.",
  hero: {
    badge: "Premium Weekly Plans",
    title: "Flexible Weekly Car Rental",
    accent: "Plans",
    description:
      "Experience uncompromising mobility. Whether it's for executive travel or a long getaway, our weekly packages offer the perfect balance of luxury and value.",
    image:
      "/images/site/northern-river-valley.webp",
    primaryCta: { label: "Explore Plans", href: "#packages" },
    secondaryCta: { label: "View Fleet", href: "#fleet" },
  },
  features: {
    title: "Why Choose Weekly?",
    description:
      "Designed for those who value time and comfort. Our weekly plans provide seamless integration into your lifestyle with exclusive perks.",
    items: [
      {
        icon: "savings",
        title: "Save More",
        text: "Reduce your daily rate by up to 30% compared to standard short-term bookings. Efficiency meets economy in our premium tier.",
      },
      {
        icon: "airline_seat_recline_extra",
        title: "Long-Term Comfort",
        text: "Personalized seat settings and premium climate control for your extended journey — so every day feels like your own car.",
      },
      {
        icon: "update",
        title: "Seamless Extensions",
        text: "Plans changed? Extend your rental with a quick WhatsApp message. No paperwork, no hassle — just pure flexibility.",
      },
      {
        icon: "support_agent",
        title: "24/7 Assistance",
        text: "Roadside support and booking help whenever you need it, day or night, across our service cities.",
      },
    ],
  },
  fleet: {
    title: "Elite Weekly Fleet",
    description: "Preview models available for weekly hire — priced per day.",
    items: [
      {
        name: "Audi A6 Business Class",
        tag: "Available Now",
        carSlug: "audi-a6",
      },
      {
        name: "Range Rover / Fortuner",
        tag: "SUV",
        carSlug: "toyota-fortuner",
      },
      {
        name: "Mercedes-Benz S-Class",
        tag: "Elite Choice",
        carSlug: "mercedes-s500",
      },
      {
        name: "Honda Civic 2025",
        tag: "Sedan",
        carSlug: "honda-civic-2025",
      },
    ],
  },
  packages: {
    title: "Curated Weekly Plans",
    description:
      "Select the tier that best suits your mission. All plans include 24/7 roadside assistance and basic insurance. Car cards show daily rates.",
    items: [
      {
        name: "Economy",
        carSlug: "suzuki-alto",
        unit: "/day",
        features: [
          { text: "Compact hatchbacks", included: true },
          { text: "City mileage package", included: true },
          { text: "1 driver included", included: true },
          { text: "Airport valet", included: false },
        ],
      },
      {
        name: "Sedan",
        priceDay: 6500,
        unit: "/day",
        features: [
          { text: "Full-size sedans", included: true },
          { text: "Premium infotainment", included: true },
          { text: "2 drivers included", included: true },
          { text: "Airport valet", included: false },
        ],
      },
      {
        name: "SUV",
        priceDay: 12000,
        unit: "/day",
        featured: true,
        features: [
          { text: "Mid to large SUVs", included: true },
          { text: "All-wheel drive options", included: true },
          { text: "Airport valet drop-off", included: true },
          { text: "Priority support", included: true },
        ],
      },
      {
        name: "Luxury",
        priceDay: 55000,
        unit: "/day",
        features: [
          { text: "High-end elite fleet", included: true },
          { text: "Personal concierge", included: true },
          { text: "Full coverage insurance", included: true },
          { text: "Chauffeur available", included: true },
        ],
      },
    ],
  },
  process: {
    title: "Start Your Weekly Journey in 3 Steps",
    steps: [
      {
        icon: "directions_car",
        title: "Select Your Plan",
        text: "Choose from Economy, Sedan, SUV, or Luxury tiers based on your space and prestige requirements.",
      },
      {
        icon: "inventory_2",
        title: "Choose Your Vehicle",
        text: "Browse our real-time inventory of late-model vehicles. What you see is exactly what you drive.",
      },
      {
        icon: "verified",
        title: "Confirm & Drive",
        text: "Secure your booking via WhatsApp or call. Pick up at our lounge or have it delivered to your doorstep.",
      },
    ],
  },
  testimonials: {
    title: "Weekly Drivers Love Best Carz Rent a Car",
    ratingSummary: googleRatingSummary,
    items: googleReviewItems,
  },
  faqs: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How much do I save with a weekly plan?",
        answer:
          "Weekly packages typically reduce the effective daily rate by up to 30% versus day-by-day bookings, depending on vehicle class and season.",
      },
      {
        question: "Can I extend mid-week?",
        answer:
          "Yes. Message us on WhatsApp before your return time and we will confirm availability and the extended daily rate.",
      },
      {
        question: "Is mileage limited?",
        answer:
          "Economy and Sedan tiers include a city mileage package. SUV and Luxury plans offer higher or unlimited packages — confirmed at booking.",
      },
      {
        question: "Do you deliver for weekly rentals?",
        answer:
          "Yes. Doorstep delivery and pickup are available in Islamabad, Rawalpindi, Lahore, Karachi, and other major hubs.",
      },
    ],
  },
  included: {
    title: "What's Included",
    description: "Standard inclusions on every weekly hire.",
    items: [
      { icon: "support_agent", text: "24/7 roadside assistance" },
      { icon: "verified", text: "Basic comprehensive insurance" },
      { icon: "sanitizer", text: "Sanitized vehicle before handover" },
      { icon: "water_drop", text: "Complimentary bottled water" },
      { icon: "schedule", text: "Grace period on pickup and return" },
    ],
  },
  audience: {
    title: "Who It's For",
    description: "Ideal when a day is too short and a month is too long.",
    items: [
      {
        icon: "luggage",
        title: "Week-Long Trips",
        text: "Northern getaways, family visits, and multi-city tours with one reliable car.",
      },
      {
        icon: "work",
        title: "Project Weeks",
        text: "Consultants and contractors who need a car for a defined work sprint.",
      },
      {
        icon: "celebration",
        title: "Events & Guests",
        text: "Wedding weeks, conferences, and visiting relatives who need flexible mobility.",
      },
    ],
  },
};

const corporateCarRental: ServiceDetailSource = {
  slug: "corporate-car-rental",
  name: "Corporate Car Rental",
  metaDescription:
    "Professional corporate car rental with Best Carz Rent a Car — dedicated account managers, flexible plans, monthly billing, and business-class fleet across Pakistan.",
  hero: {
    badge: "Premium Corporate Service",
    title: "Professional Corporate Car Rental",
    accent: "Solutions",
    description:
      "Streamline your business travel with bespoke fleet management and executive transportation designed for the modern enterprise.",
    image:
      "/images/site/islamabad-city-view.webp",
    primaryCta: { label: "Setup Corporate Account", href: "#booking" },
    secondaryCta: { label: "View Fleet", href: "#fleet" },
  },
  features: {
    title: "Why Partner With Best Carz Rent a Car?",
    description: "Elevate your operational efficiency with benefits tailored to corporate demands.",
    items: [
      {
        icon: "person_celebrate",
        title: "Dedicated Account Manager",
        text: "A single point of contact for all your bookings, modifications, and administrative needs. We handle the logistics while you focus on business.",
      },
      {
        icon: "calendar_month",
        title: "Flexible Plans",
        text: "From daily rentals to long-term leases, our contracts scale with your business growth.",
      },
      {
        icon: "receipt_long",
        title: "Monthly Billing",
        text: "Simplified consolidated invoicing. Manage all corporate travel expenses in one monthly statement with detailed reporting.",
      },
      {
        icon: "directions_car",
        title: "Business Class Vehicles",
        text: "Access to a meticulously maintained fleet of the latest models, ensuring safety, reliability, and executive presence.",
      },
    ],
  },
  categories: {
    title: "Engineered for Every Use Case",
    description: "One partner for airports, meetings, and large corporate events.",
    items: [
      {
        icon: "flight_land",
        title: "Airport Transfers",
        text: "Punctual, stress-free arrivals and departures for your executives and clients.",
      },
      {
        icon: "groups",
        title: "Executive Meetings",
        text: "Impress stakeholders with professional transport to and from crucial business venues.",
      },
      {
        icon: "event",
        title: "Corporate Events",
        text: "Scalable fleet solutions for conferences, summits, and employee retreats.",
      },
    ],
  },
  fleet: {
    title: "The Executive Fleet",
    description: "Modern, safe, and impeccably maintained vehicles — daily rates only.",
    items: [
      {
        name: "Toyota Corolla",
        tag: "2024+",
        carSlug: "toyota-corolla",
      },
      {
        name: "Honda Civic",
        tag: "2024+",
        carSlug: "honda-civic-2025",
      },
      {
        name: "Toyota Camry / Grande",
        tag: "2024+",
        carSlug: "toyota-corolla-grande",
      },
      {
        name: "Fortuner SUV",
        tag: "2024+",
        carSlug: "toyota-fortuner",
      },
    ],
  },
  process: {
    title: "How Corporate Onboarding Works",
    steps: [
      {
        icon: "handshake",
        title: "Share Requirements",
        text: "Tell us headcount, preferred cities, and vehicle classes for your team.",
      },
      {
        icon: "description",
        title: "Approve Account Terms",
        text: "We set billing cycles, insurance options, and approved bookers on your account.",
      },
      {
        icon: "rocket_launch",
        title: "Book & Report",
        text: "Your team books via WhatsApp or portal; you receive clear trip logs and invoices.",
      },
    ],
  },
  booking: {
    title: "Partner With the Industry Leader",
    description:
      "Join hundreds of organizations that trust Best Carz Rent a Car for mobility. Let us design a custom plan that fits your corporate structure.",
    highlights: [
      { icon: "check_circle", text: "Priority vehicle allocation" },
      { icon: "check_circle", text: "Customized insurance packages" },
      { icon: "check_circle", text: "24/7 roadside assistance & support" },
    ],
    contact: [
      { icon: "call", label: "Call (Primary)", value: formatPhone(brand.phones[0].number), href: telLink(brand.phones[0].number) },
      { icon: "call", label: "Call (Secondary)", value: formatPhone(brand.phones[1].number), href: telLink(brand.phones[1].number) },
      { icon: "chat", label: "WhatsApp", value: formatPhone(brand.whatsapp), href: whatsappLink() },
      { icon: "mail", label: "Email Us", value: brand.email, href: `mailto:${brand.email}` },
    ],
  },
  testimonials: {
    title: "Trusted by Leading Teams",
    ratingSummary: googleRatingSummary,
    items: googleReviewItems,
  },
  faqs: {
    title: "Corporate FAQs",
    items: [
      {
        question: "Can we get monthly invoicing?",
        answer:
          "Yes. Registered companies on approved accounts receive consolidated monthly invoices with detailed trip logs.",
      },
      {
        question: "Do you support multi-city fleets?",
        answer:
          "Yes. We cover Islamabad, Rawalpindi, Lahore, Karachi, and major tourist destinations with coordinated booking.",
      },
      {
        question: "Can employees book themselves?",
        answer:
          "You can authorize named bookers or open WhatsApp booking for approved staff under your corporate rate card.",
      },
      {
        question: "What vehicles are available for executives?",
        answer:
          "From Corolla and Civic to Fortuner, Prado, and luxury sedans — allocated by priority for corporate accounts.",
      },
    ],
  },
  included: {
    title: "Corporate Inclusions",
    description: "What every corporate account can expect.",
    items: [
      { icon: "person", text: "Dedicated account manager" },
      { icon: "receipt_long", text: "Consolidated monthly billing" },
      { icon: "priority_high", text: "Priority vehicle allocation" },
      { icon: "verified", text: "Customizable insurance packages" },
      { icon: "support_agent", text: "24/7 support for travelers on the road" },
    ],
  },
  notes: {
    title: "By The Numbers",
    description: "Scale and reliability for enterprise travel.",
    items: [
      { icon: "apartment", title: "500+", text: "Companies served" },
      { icon: "route", title: "12k+", text: "Monthly trips coordinated" },
      { icon: "location_on", title: "Nationwide", text: "Cities covered across Pakistan" },
      { icon: "verified", title: "100%", text: "Fleet availability focus for account holders" },
    ],
  },
};

const airportPickDrop: ServiceDetailSource = {
  slug: "airport-pick-drop",
  name: "Airport Pick & Drop",
  metaDescription:
    "Reliable airport pick and drop across Pakistan with Best Carz Rent a Car — flight monitoring, meet & greet, and professional chauffeurs at ISB, LHE, KHI, and SKT.",
  hero: {
    badge: "Premium Chauffeur",
    title: "Reliable Airport Pick & Drop Service Across",
    accent: "Pakistan",
    description:
      "Experience seamless transitions from flight to road. Our executive fleet and professional chauffeurs ensure you reach your hotel or office in absolute comfort and safety.",
    image:
      "/images/fleet/prado-white.webp",
    primaryCta: { label: "Book Transfer", href: "#book" },
    secondaryCta: { label: "View Fleet", href: "#fleet" },
  },
  features: {
    title: "The Best Carz Rent a Car Advantage",
    description:
      "Why discerning travelers choose our airport transfer services for corporate and private needs.",
    items: [
      {
        icon: "schedule",
        title: "On-Time Pickup",
        text: "We value your time. Our chauffeurs arrive 15 minutes early to ensure a stress-free departure or arrival.",
      },
      {
        icon: "airline_seat_recline_extra",
        title: "Professional Drivers",
        text: "Uniformed, background-checked chauffeurs trained in executive hospitality and airport protocols.",
      },
      {
        icon: "monitoring",
        title: "Flight Monitoring",
        text: "We track your flight in real time. Whether early or delayed, we adjust your pickup automatically.",
      },
      {
        icon: "sanitizer",
        title: "Clean Vehicles",
        text: "Every vehicle is sanitized and detailed before your transfer for a pristine ride from the terminal.",
      },
    ],
  },
  coverage: {
    title: "Serving Major Airports In Pakistan",
    description: "Fixed-route airport transfers with clear pricing from these hubs.",
    cities: [
      { name: "Islamabad", tag: "ISB Airport", image: "/images/site/faisal-mosque-sunset-road.webp" },
      { name: "Lahore", tag: "LHE Airport", image: "/images/site/airport-walkway.webp" },
      { name: "Karachi", tag: "KHI Airport", image: "/images/site/airport-white-arches.webp" },
      { name: "Sialkot", tag: "SKT Airport", image: "/images/site/airport-plane-window.webp" },
    ],
  },
  fleet: {
    title: "Choose Your Ride",
    description: "Tailored fleet for every requirement — from solo executive travel to large groups. Daily / transfer rates shown clearly.",
    items: [
      {
        name: "Executive Sedan",
        tag: "Executive",
        carSlug: "toyota-corolla-grande",
      },
      {
        name: "Luxury SUV",
        tag: "Premium",
        carSlug: "toyota-fortuner",
      },
      {
        name: "Best Carz Rent a Car Elite",
        tag: "Best Carz Rent a Car",
        carSlug: "mercedes-s400",
      },
      {
        name: "Executive Hiace",
        tag: "Group",
        carSlug: "grand-cabin",
      },
    ],
  },
  process: {
    title: "Simple, Seamless Booking",
    steps: [
      {
        icon: "edit_calendar",
        title: "Book Online",
        text: "Fill our quick form or message us on WhatsApp with your flight details.",
      },
      {
        icon: "mark_email_read",
        title: "Receive Confirmation",
        text: "Get confirmation with driver and vehicle details before your arrival.",
      },
      {
        icon: "waving_hand",
        title: "Meet & Greet",
        text: "Your chauffeur waits at arrivals with a personalized nameplate.",
      },
      {
        icon: "airport_shuttle",
        title: "Arrive Safely",
        text: "Enjoy a smooth ride directly to your hotel or office destination.",
      },
    ],
  },
  faqs: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How do I find my driver at the airport?",
        answer:
          "Your chauffeur waits in the arrivals hall with a name board showing your name. We also send the driver photo, vehicle plate, and contact number before landing.",
      },
      {
        question: "What happens if my flight is delayed?",
        answer:
          "We monitor your flight number in real time and adjust pickup automatically — no extra charge for standard delays within the included waiting window.",
      },
      {
        question: "Are there any hidden waiting charges?",
        answer:
          "No. Transfers include complimentary waiting time after landing for immigration and baggage. Extra waiting beyond that window is confirmed upfront if needed.",
      },
      {
        question: "Can I book a hotel drop or city drop?",
        answer:
          "Yes. Choose any hotel, residence, or office address. Fixed pricing is confirmed when you share pickup airport and drop location.",
      },
    ],
  },
  included: {
    title: "What's Included",
    description: "Every airport transfer is priced clearly — no surprise add-ons at the curb.",
    items: [
      { icon: "person", text: "Professional chauffeur for the entire journey" },
      { icon: "flight", text: "Live flight monitoring for arrivals and departures" },
      { icon: "badge", text: "Meet & greet with name board at arrivals" },
      { icon: "local_gas_station", text: "Fuel included in the fixed transfer fare" },
      { icon: "schedule", text: "Complimentary waiting time after landing" },
    ],
  },
  audience: {
    title: "Who It's For",
    description: "Built for travelers who want a calm exit from the terminal.",
    items: [
      {
        icon: "flight",
        title: "International Arrivals",
        text: "Land, clear immigration, and step into a waiting private vehicle — no taxi queues.",
      },
      {
        icon: "business_center",
        title: "Corporate Travelers",
        text: "Punctual transfers for executives, clients, and visiting staff to hotels or offices.",
      },
      {
        icon: "groups",
        title: "Families & Groups",
        text: "SUVs and Hiace options for families and teams with luggage.",
      },
    ],
  },
  notes: {
    title: "Airport Protocols We Follow",
    description: "Designed around flight timing, not rigid schedules.",
    items: [
      {
        icon: "flight_land",
        title: "Real-Time Flight Tracking",
        text: "Delayed or early arrivals never leave you without a car.",
      },
      {
        icon: "luggage",
        title: "Luggage Assistance",
        text: "Your chauffeur helps with bags from the terminal to the vehicle.",
      },
      {
        icon: "nightlight",
        title: "24/7 Operations",
        text: "Early-morning and late-night flights are covered across major airports.",
      },
    ],
  },
};

function carFor(slug: string) {
  const car = carModels.find((item) => item.slug === slug);
  if (!car) throw new Error(`Service page references unknown car slug "${slug}"`);
  return car;
}

/** Resolves `carSlug` references so price, seats, transmission and images always come from cars.ts. */
function resolveCars(source: ServiceDetailSource): ServiceDetail {
  return {
    ...source,
    fleet: {
      ...source.fleet,
      items: source.fleet.items.map((entry): ServiceFleetItem => {
        if (!("carSlug" in entry)) return entry;
        const car = carFor(entry.carSlug);
        return {
          name: entry.name,
          tag: entry.tag,
          seats: car.seats,
          transmission: car.transmission,
          image: car.image,
          imageAlt: car.imageAlt,
          priceDay: car.priceDay,
        };
      }),
    },
    packages: source.packages && {
      ...source.packages,
      items: source.packages.items.map((entry): ServicePricingPackage => {
        if (!("carSlug" in entry)) return entry;
        const { carSlug, ...rest } = entry;
        return { ...rest, priceDay: carFor(carSlug).priceDay };
      }),
    },
  };
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "hotel-transfer": resolveCars(hotelTransfer),
  "executive-car-rental": resolveCars(executiveCarRental),
  "wedding-car-rental": resolveCars(weddingCarRental),
  "daily-car-rental": resolveCars(dailyCarRental),
  "monthly-car-rental": resolveCars(monthlyCarRental),
  "weekly-car-rental": resolveCars(weeklyCarRental),
  "corporate-car-rental": resolveCars(corporateCarRental),
  "airport-pick-drop": resolveCars(airportPickDrop),
};

export const serviceDetailSlugs = Object.keys(serviceDetails);
