export const siteConfig = {
  name: "Sawariyawala Food & Caterers",
  shortName: "Sawariyawala",
  description:
    "Authentic Indian street-food favourites and warm catering experiences, brought together with thoughtful hospitality.",
  phone: "+91 98765 43210",
  email: "hello@sawariyawala.com",
  address: "Your configured Sawariyawala location",
  hours: "Mon - Sun: 9:00 AM - 10:00 PM",
  instagram: "#",
  facebook: "#",
  mapsUrl: "https://maps.google.com",
  deliveryCharge: Number(process.env.DELIVERY_CHARGE || 20),
  freeDeliveryThreshold: Number(process.env.FREE_DELIVERY_THRESHOLD || 500),
};
