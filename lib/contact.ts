export const contactInterests = [
  "Accoladi",
  "First Chair America",
  "National Scholastic Musicians Awards",
  "My Music Future",
] as const;

export type ContactFields = {
  name: string;
  school: string;
  email: string;
  message: string;
  bandDirector: "Yes" | "No";
  interests: string[];
};

export function validContact(value: unknown): value is ContactFields {
  if (!value || typeof value !== "object") return false;
  const fields = value as Record<string, unknown>;
  return ["name", "school", "email", "message"].every((key) => typeof fields[key] === "string" && fields[key].length <= (key === "message" ? 5000 : 200))
    && Boolean((fields.name as string).trim()) && Boolean((fields.message as string).trim())
    && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email as string)
    && ["Yes", "No"].includes(fields.bandDirector as string)
    && Array.isArray(fields.interests) && fields.interests.length <= 4
    && fields.interests.every((interest) => contactInterests.some((option) => option === interest));
}

export function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
