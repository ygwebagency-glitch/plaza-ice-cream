export const site = {
  name: "The Plaza Ices",
  tagline: "The Cream of Cowes",
  slogan: "Made for People of Good Taste",
  phone: "07723 324454",
  phoneHref: "tel:07723324454",
  email: "theplazaices@icloud.com",
  emailHref: "mailto:theplazaices@icloud.com",
  facebook: "https://www.facebook.com/theplazaices/",
  instagram: "https://www.instagram.com/theplazaices99/",
  instagramHandle: "@theplazaices99",
  established: 2004,
  address: "Princes Esplanade, Gurnard, PO31 8LE",
  area: "Isle of Wight",
  credit: { label: "Designed by Foundation Multimedia - Isle of Wight Web Design & Marketing", href: "https://www.foundationmedia.co.uk" },
  announcement: "Now booking 2027 events, shows, fetes and weddings - email theplazaices@icloud.com",
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=-1.3330%2C50.7520%2C-1.3080%2C50.7640&layer=mapnik&marker=50.7580%2C-1.3205",
  mapLink: "https://www.openstreetmap.org/?mlat=50.7580&mlon=-1.3205#map=16/50.7580/-1.3205",
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/our-ice-cream-vans", label: "Our Ice Cream Vans" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact-us", label: "Contact us" },
] as const;

export const meta = {
  home: {
    title: "The Plaza Ices | Eco Ice Cream Van Hire, Isle of Wight",
    description:
      "The Plaza Ices is the Isle of Wight's first choice for eco-friendly ice cream vans for events, weddings, school fairs and parties. 5-star hygiene, Kelly's of Cornwall whippy.",
  },
  vans: {
    title: "Our Ice Cream Vans | The Plaza Ices, Isle of Wight",
    description:
      "Meet our eco battery and solar ice cream vans. Fully insured, 5-star hygiene, DBS checked staff. Book for your event on the Isle of Wight.",
  },
  gallery: {
    title: "Gallery | The Plaza Ices Ice Cream Vans",
    description: "Photos of The Plaza Ices ice cream vans, whippy ice cream and events across the Isle of Wight.",
  },
  contact: {
    title: "Contact & Book a Van | The Plaza Ices",
    description: "Call 07723 324454 or send an enquiry to book a Plaza Ices ice cream van on the Isle of Wight.",
  },
};
