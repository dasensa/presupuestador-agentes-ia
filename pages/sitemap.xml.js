import { getAllSlugs } from '../data/casos';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://presupuestador-agentes-ia.vercel.app').replace(/\/$/, '');

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/crear-agente', priority: '1.0', changefreq: 'weekly' },
  { path: '/servicios', priority: '0.9', changefreq: 'weekly' },
  { path: '/presupuestador', priority: '0.8', changefreq: 'monthly' },
  { path: '/contacto', priority: '0.7', changefreq: 'monthly' },
];

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildUrl({ path, priority, changefreq }) {
  return [
    '  <url>',
    `    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

function buildSitemap() {
  const serviceRoutes = getAllSlugs().map((slug) => ({
    path: `/servicios/${slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const urls = [...staticRoutes, ...serviceRoutes]
    .map(buildUrl)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  res.write(buildSitemap());
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
