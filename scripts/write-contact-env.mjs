import { appendFileSync } from "node:fs";

// Amplify's build variables must be persisted for the Next.js server runtime.
const keys = ["CONTACT_EMAIL_WEBHOOK_URL", "CONTACT_EMAIL_WEBHOOK_SECRET", "EMAIL_WEBHOOK_URL", "EMAIL_WEBHOOK_SECRET", "CONTACT_TO_EMAIL"];
const lines = keys.filter((key) => process.env[key]).map((key) => `${key}=${JSON.stringify(process.env[key])}`);
if (lines.length) appendFileSync(".env.production", `\n${lines.join("\n")}\n`);
