"use client";

import Image from "next/image";
import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SiteNav } from "@/components/navigation/SiteNav";
import { contactInterests } from "@/lib/contact";

const inputClass = "mt-2 w-full rounded-lg border border-[#cbd0d9] bg-white/70 px-4 py-3 text-base font-normal text-[var(--navy)] outline-none placeholder:text-[#8994a8] focus:border-[var(--purple)] focus:ring-2 focus:ring-[var(--purple)]/20";

export function ContactForm() {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true); setError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), school: data.get("school"), email: data.get("email"), bandDirector: data.get("bandDirector"), interests: data.getAll("interests"), message: data.get("message") }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Your message could not be sent. Please try again.");
      setSuccess(true); form.reset();
    } catch (error) { setError(error instanceof Error ? error.message : "Your message could not be sent. Please try again."); }
    finally { setSending(false); }
  }

  return <main className="relative min-h-screen bg-white px-4 pb-16 pt-28 text-white sm:px-8 sm:pt-32">
    <SiteNav solid />
    <div className="relative isolate mx-auto max-w-[900px] overflow-hidden rounded-3xl bg-[#080e15] px-5 py-12 shadow-xl sm:px-12 sm:py-16">
      <Image src="/content/images/contactus/Marching Band at Sunset.png" alt="Marching band beside a bus at sunset" fill priority sizes="(max-width: 964px) 100vw, 900px" className="-z-10 object-cover object-top" />
      <header className="max-w-[720px] pb-9 sm:pb-12">
        <h1 className="!text-4xl !font-bold uppercase !leading-[.98] !text-white sm:!text-5xl lg:!text-6xl">We’d love to<br /><span className="italic text-[var(--gold)]">hear from you</span></h1>
        <p className="mt-6 text-base leading-7 text-white/95 sm:text-lg">Questions, ideas, or feedback? We’re all ears! Whether you’re a band student, director, parent, or supporter, we’d love to hear from you.</p>
      </header>
      <form onSubmit={submit} className="mx-auto max-w-[680px] rounded-2xl bg-[#fffdfa]/[.98] p-6 text-[var(--navy)] shadow-2xl sm:p-9">
        {success ? <div role="status" className="py-12 text-center"><h2 className="text-3xl">Thanks for reaching out!</h2><p className="mt-4">Your message has been sent. We’ll get back to you as soon as we can.</p><button type="button" onClick={() => setSuccess(false)} className="mt-6 rounded-full bg-[var(--gold)] px-6 py-3 font-bold">Send another message</button></div> : <div className="space-y-6">
          <label className="block font-bold">Name<input name="name" required maxLength={200} autoComplete="name" placeholder="Your name" className={inputClass} /></label>
          <label className="block font-bold">School Name<input name="school" maxLength={200} autoComplete="organization" placeholder="Your school name" className={inputClass} /></label>
          <fieldset><legend className="font-bold">Are you a band director?</legend><div className="mt-3 flex gap-8">{["Yes", "No"].map((value) => <label key={value} className="flex cursor-pointer items-center gap-3 font-semibold"><input type="radio" name="bandDirector" value={value} required className="h-5 w-5 accent-[var(--purple)]" />{value}</label>)}</div></fieldset>
          <label className="block font-bold">Email Address<input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="yourname@email.com" className={inputClass} /></label>
          <fieldset><legend className="font-bold">Are you interested in?</legend><p className="mt-1 text-sm text-[var(--slate)]">Select all that apply.</p><div className="mt-3 grid gap-3 sm:grid-cols-2">{contactInterests.map((interest) => <label key={interest} className="flex cursor-pointer items-start gap-3 text-sm font-semibold leading-5"><input type="checkbox" name="interests" value={interest} className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--purple)]" />{interest}</label>)}</div></fieldset>
          <label className="block font-bold">Comments / Message<textarea name="message" required maxLength={5000} rows={4} placeholder="Tell us what’s on your mind…" className={inputClass} /></label>
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
          <button type="submit" disabled={sending} className="flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#ff6b17] px-5 py-3 text-xl font-bold uppercase tracking-wide text-white transition hover:bg-[#e9580c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--purple)] disabled:opacity-60"><Send className="h-6 w-6" aria-hidden="true" />{sending ? "Sending…" : "Send message"}</button>
          <p className="text-center text-sm sm:text-base">We’ll get back to you as soon as we can.</p>
        </div>}
      </form>
    </div>
  </main>;
}
