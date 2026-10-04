import fs from 'node:fs';
const pages = JSON.parse(fs.readFileSync('src/content/search-pages.json', 'utf8').replace(/^\uFEFF/, ''));
const template = fs.readFileSync('dist/index.html', 'utf8');
const escape = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for (const page of pages) {
  const path = page.slug === 'service-areas' ? '/service-areas' : `/services/${page.slug}`;
  const url = `https://akwraps.ca${path}`;
  const title = `${page.title} | AK Wraps & Customs`;
  const links = pages.map(p => `<a href="${p.slug === 'service-areas' ? '/service-areas' : `/services/${p.slug}`}">${escape(p.title)}</a>`).join(' · ');
  const body = `<main style="max-width:960px;margin:100px auto;padding:24px;font-family:system-ui;line-height:1.7"><a href="/">AK Wraps &amp; Customs</a><h1>${escape(page.title)}</h1><p>${escape(page.intro)}</p>${page.sections.map(s => `<section><h2>${escape(s.title)}</h2><p>${escape(s.text)}</p></section>`).join('')}<h2>Your questions answered</h2>${page.faq.map(f => `<h3>${escape(f.question)}</h3><p>${escape(f.answer)}</p>`).join('')}<p><a href="/contact#booking-form">Book an appointment</a> · <a href="/gallery">See our work</a></p><nav>${links}</nav></main>`;
  let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(title)}</title>`)
    .replace(/(<meta name="description"\s+content=")[^"]*/, `$1${escape(page.description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*/g, `$1${escape(title)}`)
    .replace(/(<meta (?:property="og:description"|name="twitter:description")\s+content=")[^"]*/g, `$1${escape(page.description)}`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  if (page.slug !== 'service-areas') {
    const schema = {'@context':'https://schema.org','@type':'Service',name:page.title,description:page.description,url,provider:{'@id':'https://akwraps.ca/#business'}};
    html = html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script></head>`);
  }
  fs.mkdirSync(`dist${path}`, {recursive:true});
  fs.writeFileSync(`dist${path}/index.html`, html);
}
console.log(`Generated ${pages.length} crawlable service and visitor guides.`);

// Supply a factual homepage summary before React loads, using the same public content.
const business = JSON.parse(template.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const homeLinks = pages.map(p => `<li><a href="${p.slug === 'service-areas' ? '/service-areas' : `/services/${p.slug}`}">${escape(p.title)}</a></li>`).join('');
const homeContent = `<main style="max-width:960px;margin:100px auto;padding:24px;font-family:system-ui;line-height:1.7"><h1>AK Wraps &amp; Customs</h1><h2>Car wraps, PPF, window tint and ceramic coating in Delta</h2><p>Visit AK Wraps &amp; Customs at 6165 BC-17A, Delta, BC. We welcome drivers from ${escape(business.areaServed.join(', '))}. All work takes place at our Delta studio.</p><p>Hours: Monday–Sunday, 12 PM–10 PM. Phone: <a href="tel:+12364125010">(236) 412-5010</a>. Email: <a href="mailto:ak.wraps.customs@gmail.com">ak.wraps.customs@gmail.com</a>.</p><nav aria-label="Service and location guides"><ul>${homeLinks}</ul></nav><p><a href="/gallery">Explore our vehicle projects</a> · <a href="/contact#booking-form">Book an appointment</a> · <a href="/about">About our studio</a></p></main>`;
fs.writeFileSync('dist/index.html', template.replace('<div id="root"></div>', `<div id="root">${homeContent}</div>`));

// Emit real documents for known routes so GitHub Pages returns HTTP 200 on direct visits.
const routePages = [
 ['about','About our Delta studio'], ['services','Vehicle wraps, PPF, window tint and ceramic coating'],
 ['gallery','Our vehicle projects'], ['contact','Contact and book an appointment'],
 ['privacy','Privacy policy'], ['terms','Terms of service'], ['merchandise','Limited Edition Collection'],
 ['cart','Shopping cart'], ['checkout','Checkout'],
 ...[1,2,3,4,5].map(n => [`merchandise/${n}`, ['Lamborghini Aventador SVJ shirt','Ferrari F12 Berlinetta shirt','Mercedes-AMG GT shirt','Porsche GT3 RS shirt','Full shirt collection'][n-1]]),
 ...[...new Set(JSON.parse(fs.readFileSync('src/content/vehicle-projects.json','utf8')).map(p=>p.brand))].map(b=>[`gallery/brands/${b}`,`${b.replaceAll('-',' ')} vehicle projects`]),
];
for (const [path,title] of routePages) {
 const privatePage = /^(cart|checkout|merchandise\/)/.test(path);
 const description = `${title} at AK Wraps & Customs in Delta, BC. Call (236) 412-5010. Open daily 12 PM–10 PM.`;
 const url = `https://akwraps.ca/${path}`;
 let html = template.replace(/<title>.*?<\/title>/s,`<title>${escape(title)} | AK Wraps &amp; Customs</title>`)
 .replace(/(<link rel="canonical" href=")[^"]*/,`$1${url}`)
 .replace(/(<meta property="og:url" content=")[^"]*/,`$1${url}`)
 .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*/g,`$1${escape(title)}`)
 .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description")\s+content=")[^"]*/g,`$1${escape(description)}`)
 .replace('<div id="root"></div>',`<div id="root"><main style="max-width:960px;margin:100px auto;padding:24px"><h1>${escape(title)}</h1><p>${escape(description)}</p><nav><a href="/">Home</a> · <a href="/services">Services</a> · <a href="/gallery">Our work</a> · <a href="/contact#booking-form">Book an appointment</a></nav></main></div>`);
 if(privatePage) html=html.replace(/<meta name="robots"[^>]*>/g,'').replace('</head>','<meta name="robots" content="noindex, follow"></head>');
 fs.mkdirSync(`dist/${path}`,{recursive:true}); fs.writeFileSync(`dist/${path}/index.html`,html);
}
console.log(`Generated ${routePages.length} direct-entry pages.`);
