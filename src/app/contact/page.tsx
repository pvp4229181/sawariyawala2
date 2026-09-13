import type { Metadata } from "next";
import { Camera, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/ui/page-hero";
import { siteConfig } from "@/config/site";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
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
        image="/assets/hero-ai/contact-hero-v2.png"
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
              <MapPin />
              <span>
                <b>Visit us</b>
                <small>{siteConfig.address}</small>
              </span>
            </a>
            <a href={`tel:${siteConfig.phone}`}>
              <Phone />
              <span>
                <b>Call us</b>
                <small>{siteConfig.phone}</small>
              </span>
            </a>
            <a href={`mailto:${siteConfig.email}`}>
              <Mail />
              <span>
                <b>Email</b>
                <small>{siteConfig.email}</small>
              </span>
            </a>
            <div>
              <Clock3 />
              <span>
                <b>Opening hours</b>
                <small>{siteConfig.hours}</small>
              </span>
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
