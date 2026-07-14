// Centralized, typed environment access. No secrets are hardcoded here (SR-1 / SECURITY-12).
// Template users set these in .env.local — see .env.example.
//
// NOTE: EmailJS keys are, by design, exposed to the client (NEXT_PUBLIC_*). They are still
// sourced from env rather than committed to source.

// IMPORTANT: `NEXT_PUBLIC_*` vars are only inlined into the client bundle when referenced
// with STATIC member access (`process.env.NEXT_PUBLIC_FOO`). A dynamic/computed lookup
// (`process.env[name]`) is NOT replaced at build time and reads as `undefined` in the
// browser — which is why the contact form must reference each key literally below.
function clean(value: string | undefined, fallback = ''): string {
  return value && value.length > 0 ? value : fallback;
}

export const env = {
  emailjs: {
    serviceId: clean(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID),
    templateId: clean(process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID),
    publicKey: clean(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY),
    toEmail: clean(process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL, 'jooncco.g@gmail.com'),
    toName: clean(process.env.NEXT_PUBLIC_CONTACT_TO_NAME, 'Junha'),
  },
  cp: {
    leetcodeUsername: clean(process.env.NEXT_PUBLIC_LEETCODE_USERNAME, 'jooncco'),
    codeforcesUsername: clean(process.env.NEXT_PUBLIC_CODEFORCES_USERNAME, 'jooncco'),
  },
} as const;

export const endpoints = {
  leetcode: 'https://leetcode.com/graphql',
  codeforces: 'https://codeforces.com/api',
} as const;

export function isEmailConfigured(): boolean {
  return Boolean(
    env.emailjs.serviceId && env.emailjs.templateId && env.emailjs.publicKey,
  );
}
