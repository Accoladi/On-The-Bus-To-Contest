import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact Us | On the Bus to Contest", description: "Questions, ideas, or feedback? We’d love to hear from you." };
export default function ContactPage() { return <ContactForm />; }
