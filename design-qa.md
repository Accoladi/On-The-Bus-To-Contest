# Contact page QA

- Reference: supplied Navy Purple Gold Marching Band Contact Form mockup, with the user's subsequent direction to center the composition on a white page like BandCampNation.
- Preview: http://127.0.0.1:3000/contact
- Screenshot: /private/tmp/onbus-contact-centered.jpg
- Visual check: passed. Centered 900px composition, white outer background, rounded corners, original sunset image, white form, navy labels, gold headline, orange submission button. Uses this site's existing heading font rather than the mockup's unavailable brush font.
- Navigation: Contact Us follows About in desktop and mobile menus.
- Form: independent checkbox selections verified. Name, email, director status and message validated; school and interests optional.
- Responsive: narrow layout inspected at the browser's minimum 480 CSS px width; no horizontal overflow. Exact 390px emulation unavailable in this browser.
- Code checks: TypeScript, targeted ESLint, contact validation and HTML escaping tests passed.
- Email: BandCampNation webhook configuration copied to Amplify, recipient randall.bayne@accoladi.com. Build persists server-only variables. Real delivery remains unverified until deployment; no test email sent.
