import type { ImageName } from "@/lib/images";

export const alts: Record<ImageName, string> = {
  "hero-1-two-vans": "Two Plaza Ices eco ice cream vans parked side by side",
  "hero-2-beach-van": "The Plaza Ices ice cream van on the Isle of Wight coast",
  "hero-3-hillside-vans": "Two Plaza Ices ice cream vans on a hillside road on the Isle of Wight",
  "about-cone-portrait": "Whippy ice cream with a Flake held on the beach",
  "about-staff-van-window": "Owner and staff serving from The Plaza Ices van window",
  "team-worker-portrait": "Uniformed Plaza Ices team member serving at the van",
  "menu-board-portrait": "The Plaza Ices ice cream menu board",
  "van-front-portrait": "Front of a Plaza Ices eco ice cream van",
  "van-interior-portrait": "Inside the van: whippy machine and clean serving area",
  "van-solar-portrait": "Plaza Ices van with solar panels on the roof",
  "van-seafront-landscape": "Plaza Ices van on the seafront with sailing boats",
  "gallery-fleet-vans": "A row of Plaza Ices vans with the slogan Made for People of Good Taste",
  "gallery-town-bus": "Plaza Ices van in a town street with a red bus",
  "gallery-seawall-van": "Plaza Ices van on the sea wall",
  "gallery-crowd-event": "Crowd enjoying an event served by Plaza Ices",
  "gallery-event-van-sign": "Plaza Ices van at an event with a 'This way for ice cream' sign",
};

export const about = [
  "The Plaza Ices have been serving the Isle of Wight since 2004. We run eco friendly battery and solar-serve ice cream vans with the latest modern technology, and we were the Isle of Wight's first eco ice cream van.",
  "We serve Kelly's of Cornwall whippy ice cream, lollies, mini tubs and sundaes, plus Bean to Cup coffees, teas and a range of quality cold drinks. There is even ice cream for dogs, because we cater for every man and their dog.",
  "We cater for events large and small: shows, fetes, festivals, birthday parties, works treats, school fairs, weddings and charity fundraisers.",
];

export const trust = [
  { label: "5-Star Food Hygiene", icon: "hygiene" },
  { label: "Eco battery & solar", icon: "eco" },
  { label: "Since 2004", icon: "since" },
  { label: "Fully insured", icon: "shield" },
  { label: "DBS checked staff", icon: "badge" },
  { label: "Registered with the IW Council", icon: "council" },
] as const;

export const stackCards = [
  {
    tone: "sky",
    title: "Eco ice cream vans",
    text: "Our vans are battery and solar-serve, using the latest modern technology. No noisy generator, no fumes: just quiet, clean serving at your event.",
    image: "van-front-portrait" as ImageName,
  },
  {
    tone: "strawberry-pastel",
    title: "5-star hygiene",
    text: "We have 5 stars on all our Food Hygiene inspections. We are registered and licensed by the Isle of Wight Council and inspected by the Environmental Health Department.",
    image: "team-worker-portrait" as ImageName,
    badge: true,
  },
  {
    tone: "mint",
    title: "The very best products",
    text: "Kelly's of Cornwall whippy ice cream, lollies, mini tubs, sundaes, Bean to Cup coffee and quality cold drinks. Products for people who prefer a dairy free diet too.",
    image: "menu-board-portrait" as ImageName,
  },
  {
    tone: "peach",
    title: "Made for every event",
    text: "Shows, fetes, festivals, weddings, birthday parties, school fairs, works treats and charity fundraisers. Our uniformed, DBS checked staff are trained in food hygiene.",
    image: "van-seafront-landscape" as ImageName,
  },
] as const;

export type MenuItem = { name: string; icon: string; note?: string; ribbon?: string };
export const menu: MenuItem[] = [
  { name: "Kelly's of Cornwall Whippy", icon: "whippy", ribbon: "Cornish" },
  { name: "Lollies", icon: "lolly" },
  { name: "Mini Tubs", icon: "tub" },
  { name: "Sundaes", icon: "sundae" },
  { name: "Dog Ice Cream", icon: "dog", note: "for every man and their dog" },
  { name: "Bean to Cup Coffee", icon: "coffee" },
  { name: "Teas", icon: "tea" },
  { name: "Cold Drinks", icon: "drink" },
  { name: "Vhippy Day", icon: "leaf", note: "dairy free, Flora Professional mix", ribbon: "Dairy free" },
];

export type EventCard = { title: string; text: string; image: ImageName; tag: string; tone: string };
export const events: EventCard[] = [
  { title: "Weddings", text: "A whippy for every guest. Very reasonable rates for weddings - contact us with your requirements.", image: "about-staff-van-window", tag: "Big day", tone: "strawberry-pastel" },
  { title: "School Fairs and Fetes", text: "We pay you to come to your show or fete, helping you raise funds for your school or charity.", image: "gallery-event-van-sign", tag: "We pay you", tone: "sun" },
  { title: "Works Treats and Staff Days", text: "We bring a van to your workplace for a cooling ice cream on a hot day or a staff treat.", image: "gallery-town-bus", tag: "Staff treat", tone: "mint" },
  { title: "Birthday Parties", text: "Make a birthday unforgettable. Very reasonable rates for private parties.", image: "about-cone-portrait", tag: "Party", tone: "peach" },
  { title: "Shows and Festivals", text: "From village shows to big festivals, we cater for events large and small.", image: "gallery-crowd-event", tag: "Crowds", tone: "sky" },
  { title: "Charity Fundraisers", text: "We pay you to attend, so your charity event raises even more.", image: "gallery-seawall-van", tag: "Give back", tone: "mint" },
];

export const steps = [
  { title: "Tell us your date and place", text: "Call, email or send the enquiry form with your event details." },
  { title: "We confirm and quote", text: "We check the date and get back to you with what we can offer." },
  { title: "We arrive and serve", text: "Our eco van turns up on time and the ice cream starts flowing." },
];

export const instagramTiles: ImageName[] = [
  "hero-3-hillside-vans",
  "van-seafront-landscape",
  "gallery-crowd-event",
  "gallery-event-van-sign",
  "gallery-seawall-van",
  "gallery-town-bus",
];

export type Van = { id: string; title: string; caption: string; image: ImageName; tone: string; chips: string[] };
export const vans: Van[] = [
  { id: "eco", title: "Eco ice cream van", caption: "The Isle of Wight's first eco ice cream van.", image: "van-front-portrait", tone: "sky", chips: ["Battery", "Zero emission"] },
  { id: "seafront", title: "Seafront van", caption: "Bean to Cup coffee, tea and cold drinks alongside the ice cream.", image: "van-seafront-landscape", tone: "strawberry-pastel", chips: ["Kelly's whippy", "Coffee"] },
  { id: "solar", title: "Solar roof van", caption: "Solar panels on the roof power our solar-serve setup.", image: "van-solar-portrait", tone: "mint", chips: ["Solar serve", "Eco"] },
];

export const inside = ["Whippy ice cream machine", "Clean, modern serving area", "Bean to Cup coffee", "Uniformed, trained staff"];

export const safety = [
  "Our own Public Liability insurance",
  "Registered and licensed by the Isle of Wight Council",
  "5 stars from Environmental Health on each inspection",
  "Uniformed staff trained in food hygiene",
  "DBS checked staff",
];

export const findUs = [
  { title: "Princes Esplanade, Gurnard", text: "We have a licence to trade daily at Princes Esplanade, Gurnard (PO31 8LE)." },
  { title: "Nearly all of the Island", text: "We hold a street trading licence for nearly all areas of the Isle of Wight." },
  { title: "Hanover Point, Compton", text: "We are often assisting the National Trust at Hanover Point, Compton." },
];

export const community = [
  { title: "Macmillan Coffee Morning", text: "Every year we host a Macmillan Cancer Support Coffee Morning at Princes Esplanade, Gurnard, with funds going to Macmillan." },
  { title: "Beach Clean thank-you", text: "Litter pickers on the Cowes and Gurnard Beach Clean get a free ice cream voucher from us." },
];

export type Faq = { q: string; a: string };
export const faqs: Faq[] = [
  { q: "Which areas do you cover?", a: "We attend functions, events and weddings on the Isle of Wight only." },
  { q: "Are your vans eco friendly?", a: "Yes. Our vans are battery and solar-serve with the latest modern technology. We were the Isle of Wight's first eco ice cream van." },
  { q: "What ice cream do you serve?", a: "Kelly's of Cornwall whippy ice cream, plus lollies, mini tubs and sundaes. We also serve Bean to Cup coffee, teas and quality cold drinks." },
  { q: "Do you have dairy free options?", a: "Yes, we carry products for people who prefer a dairy free diet, and we hold occasional Vhippy Days using Flora Professional dairy-free mix." },
  { q: "Do you charge schools and charities?", a: "No - we pay you to come to your show or fete, helping you raise funds for your school or charity." },
  { q: "How much does a wedding or private party cost?", a: "We offer very reasonable rates for private parties and weddings. Please contact us with your requirements for a quote." },
  { q: "Are you insured and hygiene rated?", a: "We have our own Public Liability insurance, 5 stars on all Food Hygiene inspections, and our uniformed staff are DBS checked and trained in food hygiene." },
];

export type GalleryItem = { name: ImageName; category: "vans" | "icecream" | "team" | "events"; caption: string };
export const gallery: GalleryItem[] = [
  { name: "hero-1-two-vans", category: "vans", caption: "Eco vans" },
  { name: "about-cone-portrait", category: "icecream", caption: "Whippy with a Flake" },
  { name: "van-seafront-landscape", category: "vans", caption: "At the seafront" },
  { name: "gallery-event-van-sign", category: "events", caption: "Event day" },
  { name: "about-staff-van-window", category: "team", caption: "Our team" },
  { name: "van-solar-portrait", category: "vans", caption: "Solar roof van" },
  { name: "hero-2-beach-van", category: "vans", caption: "On the coast" },
  { name: "menu-board-portrait", category: "icecream", caption: "Our menu" },
  { name: "gallery-crowd-event", category: "events", caption: "Event day" },
  { name: "team-worker-portrait", category: "team", caption: "Our team" },
  { name: "gallery-town-bus", category: "vans", caption: "In town" },
  { name: "van-front-portrait", category: "vans", caption: "Eco van" },
  { name: "gallery-seawall-van", category: "vans", caption: "On the sea wall" },
  { name: "van-interior-portrait", category: "vans", caption: "Inside the van" },
  { name: "hero-3-hillside-vans", category: "vans", caption: "Above the town" },
  { name: "gallery-fleet-vans", category: "vans", caption: "The fleet" },
];

export const eventTypes = ["Wedding", "School Fair / Fete", "Works Treat", "Birthday Party", "Show / Festival", "Charity Fundraiser", "Other"];
export const guestOptions = ["Under 50", "50-100", "100-250", "250+"];
