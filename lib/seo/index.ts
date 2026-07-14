// SEO service public API (Unit U7 / NFR-1).
export {
  SITE_URL,
  SITE_NAME,
  buildMetadata,
  localizedUrl,
  languageAlternates,
  type BuildMetadataInput,
} from './metadata';
export {
  PERSON,
  personJsonLd,
  webSiteJsonLd,
  articleJsonLd,
  breadcrumbJsonLd,
  type JsonLd,
  type Crumb,
} from './jsonLd';
export { JsonLdScript } from './JsonLdScript';
