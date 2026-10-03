import assert from "node:assert/strict";
// @ts-expect-error Node's strip-types runner requires the explicit TypeScript extension.
import { contactInterests, escapeHtml, validContact } from "../lib/contact.ts";

const fields = { name: "Test Visitor", school: "Test School", email: "visitor@example.com", message: "Hello", bandDirector: "No", interests: [...contactInterests] };
assert.equal(validContact(fields), true);
assert.equal(validContact({ ...fields, email: "invalid" }), false);
assert.equal(validContact({ ...fields, interests: ["Unknown program"] }), false);
assert.equal(validContact({ ...fields, message: " " }), false);
assert.equal(validContact({ ...fields, name: 123 }), false);
assert.equal(escapeHtml('<script>"&'), "&lt;script&gt;&quot;&amp;");
console.log("Contact validation and HTML escaping passed.");
