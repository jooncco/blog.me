// Centralized, typed environment access. No secrets are hardcoded here (SR-1 / SECURITY-12).
// Template users set these in .env.local — see .env.example.
//
// NOTE: EmailJS keys are, by design, exposed to the client (NEXT_PUBLIC_*). They are still
// sourced from env rather than committed to source.

function optional(name: string): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

function requiredPublic(name: string, fallback = ''): string {
  const v = optional(name);
  if (!v && process.env.NODE_ENV === 'production') {
    // Fail soft: log once; features depending on this degrade gracefully (SR-4).
    console.warn(`[env] Missing ${name}; dependent feature will use fallback/no-op.`);
  }
  return v ?? fallback;
}

export const env = {
  emailjs: {
    serviceId: requiredPublic('NEXT_PUBLIC_EMAILJS_SERVICE_ID'),
    templateId: requiredPublic('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID'),
    publicKey: requiredPublic('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY'),
    toEmail: requiredPublic('NEXT_PUBLIC_CONTACT_TO_EMAIL', 'jooncco.g@gmail.com'),
    toName: requiredPublic('NEXT_PUBLIC_CONTACT_TO_NAME', 'Junha'),
  },
  cp: {
    leetcodeUsername: requiredPublic('NEXT_PUBLIC_LEETCODE_USERNAME', 'jooncco'),
    codeforcesUsername: requiredPublic('NEXT_PUBLIC_CODEFORCES_USERNAME', 'jooncco'),
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
