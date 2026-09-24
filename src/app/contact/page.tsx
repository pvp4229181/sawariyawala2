import type { Metadata } from "next";
import { Camera, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/config/site";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  const [hoursDays, hoursTime] = siteConfig.hours.split(": ");
  return (
    <main>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Let us make your
            <br />
            <em>moment delicious.</em>
          </>
        }
        copy="Questions, party orders or catering plans? Tell us what you need and our team will follow up."
        image="/assets/hero-ai/contact-hero-editorial.webp"
      />
      <section className="section shell contact-grid">
        <div className="contact-info">
          <span className="eyebrow">Come say hello</span>
          <h2>
            Good food starts with
            <br />
            <em>a conversation.</em>
          </h2>
          <div className="contact-cards">
            <a href={siteConfig.mapsUrl}>
              <i>
                <MapPin aria-hidden="true" />
              </i>
              <small>Visit us</small>
              <b>{siteConfig.address}</b>
            </a>
            <a href={`tel:${siteConfig.phone}`}>
              <i>
                <Phone aria-hidden="true" />
              </i>
              <small>Call us</small>
              <b>{siteConfig.phone}</b>
            </a>
            <a href={`mailto:${siteConfig.email}`}>
              <i>
                <Mail aria-hidden="true" />
              </i>
              <small>Email</small>
              <b>{siteConfig.email}</b>
            </a>
            <div>
              <i>
                <Clock3 aria-hidden="true" />
              </i>
              <small>Opening hours</small>
              <b>
                {hoursDays}
                {hoursTime && <span>{hoursTime}</span>}
              </b>
            </div>
          </div>
          <div className="static-map">
            <MapPin />
            <b>Sawariyawala</b>
            <span>Configure the real location in src/config/site.ts</span>
            <a href={siteConfig.mapsUrl}>Open in Google Maps</a>
          </div>
          <a className="instagram-link" href={siteConfig.instagram}>
            <Camera />
            Follow our food stories
          </a>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
