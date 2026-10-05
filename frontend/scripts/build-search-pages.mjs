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

// Keep important business and project information readable without JavaScript.
const about = JSON.parse(fs.readFileSync('src/content/about.json', 'utf8'));
const projects = JSON.parse(fs.readFileSync('src/content/vehicle-projects.json', 'utf8')).filter(p=>p.id !== 'DcZKQQkj_fP');
const projectList = items => `<section><h2>Vehicle projects</h2>${items.map(p => `<article><h3>${escape(p.title)}</h3><p>${escape(p.description)}</p><a href="${escape(p.sourceUrl)}">View the original project post</a></article>`).join('')}</section>`;
for (const [route] of routePages) {
 const file = `dist/${route}/index.html`;
 let html = fs.readFileSync(file, 'utf8');
 let content = '';
 if (route === 'about') content = `<section><h2>${escape(about.heading)}</h2>${about.paragraphs.map(p=>`<p>${escape(p)}</p>`).join('')}</section>`;
 if (route === 'gallery') content = projectList(projects);
 if (route.startsWith('gallery/brands/')) content = projectList(projects.filter(p=>p.brand === route.split('/').at(-1)));
 if (route === 'services') content = `<section><h2>Choose a service</h2>${pages.filter(p=>p.slug !== 'service-areas').map(p=>`<article><h3><a href="/services/${p.slug}">${escape(p.title)}</a></h3><p>${escape(p.intro)}</p></article>`).join('')}</section>`;
 if (content) html = html.replace('</main>', content+'</main>');
 fs.writeFileSync(file, html);
}

// Project pages share their facts with the visible React pages.
const stories = JSON.parse(fs.readFileSync('src/content/project-stories.json','utf8'));
const storyServices = JSON.parse(fs.readFileSync('src/content/project-services.json','utf8'));
for (const story of stories) {
 const project = projects.find(p=>p.id===story.id);
 if (!project || !fs.existsSync('public'+project.image)) throw new Error('Missing project or image: '+story.id);
 const route='projects/'+story.slug;
 const url='https://akwraps.ca/'+route;
 const content='<main><nav><a href="/">Home</a> · <a href="/gallery">Our work</a></nav><h1>'+escape(story.heading)+'</h1><p>'+escape(story.summary)+'</p><img src="'+escape(project.image)+'" alt="'+escape(story.heading)+'"><h2>The build</h2><p>'+escape(story.detail)+'</p><h2>Recorded services</h2><ul>'+storyServices[story.id].map(v=>'<li>'+escape(v)+'</li>').join('')+'</ul><p>Project details are based on our original published service record. Coverage, materials and pricing for your vehicle are confirmed separately.</p><a href="'+escape(project.sourceUrl)+'">Original project post</a><nav>'+story.guides.map(g=>'<a href="/services/'+g+'">'+escape(pages.find(p=>p.slug===g).title)+'</a>').join(' · ')+'</nav><a href="/contact?project='+encodeURIComponent(story.heading)+'#booking-form">Discuss a similar project</a></main>';
 let html=template.replace(/<title>.*?<\/title>/s,'<title>'+escape(story.heading)+' | AK Wraps &amp; Customs</title>')
 .replace(/(<link rel="canonical" href=")[^"]*/,'$1'+url)
 .replace(/(<meta property="og:url" content=")[^"]*/,'$1'+url)
 .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*/g,'$1'+escape(story.heading))
 .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description")\s+content=")[^"]*/g,'$1'+escape(story.summary))
 .replace('<div id="root"></div>','<div id="root">'+content+'</div>');
 fs.mkdirSync('dist/'+route,{recursive:true});fs.writeFileSync('dist/'+route+'/index.html',html);
 routePages.push([route,story.heading]);
}
const warranties=JSON.parse(fs.readFileSync('src/content/warranties.json','utf8'));
const warrantyHtml='<section id="warranty"><h2>Warranty coverage</h2>'+warranties.map(w=>'<h3>'+escape(w.title)+'</h3><p>'+escape(w.description)+'</p>').join('')+'<p>Contact us for written terms, exclusions and care requirements before booking.</p></section>';
for(const path of ['','/services']){const f='dist'+path+'/index.html';fs.writeFileSync(f,fs.readFileSync(f,'utf8').replace('</main>',warrantyHtml+'</main>'));}
// Link to case studies in initial gallery and homepage content too.
const storyLinks='<nav aria-label="Featured projects">'+stories.map(p=>'<p><a href="/projects/'+p.slug+'">'+escape(p.heading)+'</a></p>').join('')+'</nav>';
for(const path of ['','/gallery']){const f='dist'+path+'/index.html';fs.writeFileSync(f,fs.readFileSync(f,'utf8').replace('</main>',storyLinks+'</main>'));}

// Derive sitemap entries from actual indexable output; never advertise checkout URLs.
const indexable = ['/', ...routePages.filter(([p])=>! /^(cart|checkout|merchandise\/)/.test(p)).map(([p])=>'/'+p), ...pages.map(p=>p.slug==='service-areas'?'/service-areas':'/services/'+p.slug)];
const urls = [...new Set(indexable)];
for (const route of urls) {
 const file = `dist${route === '/' ? '' : route}/index.html`;
 let html = fs.readFileSync(file,'utf8');
 const title = html.match(/<title>(.*?)<\/title>/s)?.[1].replaceAll('&amp;', '&');
 const pageSchema = {'@context':'https://schema.org','@type':route==='/about'?'AboutPage':route==='/contact'?'ContactPage':'WebPage','@id':`https://akwraps.ca${route}#webpage`,url:`https://akwraps.ca${route}`,name:title,isPartOf:{'@id':'https://akwraps.ca/#website'},about:{'@id':'https://akwraps.ca/#business'}};
 const website = route==='/' ? {'@context':'https://schema.org','@type':'WebSite','@id':'https://akwraps.ca/#website',url:'https://akwraps.ca/',name:business.name,publisher:{'@id':'https://akwraps.ca/#business'}} : null;
 html = html.replace('</head>',[pageSchema,website].filter(Boolean).map(obj=>`<script type="application/ld+json">${JSON.stringify(obj).replace(/</g,'\\u003c')}</script>`).join('')+'</head>');
 fs.writeFileSync(file,html);
}
fs.writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(route=>`  <url><loc>https://akwraps.ca${route}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Generated sitemap with ${urls.length} indexable pages.`);

// Match the visible regional visit guide in the initial HTML.
const regions = JSON.parse(fs.readFileSync('src/content/service-regions.json', 'utf8'));
const regionalAddress = `${business.address.streetAddress}, ${business.address.addressLocality}, ${business.address.addressRegion} ${business.address.postalCode}`;
const regionalHtml = `<section><h2>Plan your visit from Greater Vancouver</h2><p>All services are performed at ${escape(regionalAddress)}. Contact us to confirm your appointment.</p>${regions.map(r=>`<article><h3>${escape(r.title)}</h3><p>${escape(r.note)}</p><ul>${r.cities.map(city=>`<li><a href="https://www.google.com/maps/dir/?api=1&amp;origin=${encodeURIComponent(city+', BC')}&amp;destination=${encodeURIComponent(regionalAddress)}">${escape(city)} to our Delta studio</a></li>`).join('')}</ul></article>`).join('')}</section>`;
const areaFile = 'dist/service-areas/index.html';
fs.writeFileSync(areaFile, fs.readFileSync(areaFile,'utf8').replace('</main>',regionalHtml+'</main>'));

// Surface caption-documented work alongside the matching service guide.
const recordedServices = JSON.parse(fs.readFileSync('src/content/project-services.json','utf8'));
const servicePatterns = {'car-wraps':/wrap|livery|decal|pinstrip|banner/i,'paint-protection-film':/\bPPF\b/i,'window-tint':/window tint/i,'ceramic-coating':/coating/i};
for (const [slug,pattern] of Object.entries(servicePatterns)) {
 const featured = ['DZqr-WAmsiw','DJ-i4Cjvz3B'];
 const matching = projects.filter(p=>p.id!=='DcZKQQkj_fP' && (recordedServices[p.id] || []).some(s=>pattern.test(s))).sort((a,b)=>{const rank=p=>featured.includes(p.id)?featured.indexOf(p.id):2;return rank(a)-rank(b);}).slice(0,3);
 const proof = `<section><h2>See documented work</h2>${matching.map(p=>`<article><h3>${escape(p.title)}</h3><p>${escape(recordedServices[p.id].join(' · '))}</p><a href="${escape(p.sourceUrl)}">Original project post</a></article>`).join('')}<p><a href="/gallery">Browse the full portfolio</a></p></section>`;
 const file=`dist/services/${slug}/index.html`;
 fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace('</main>',proof+'</main>'));
}

// Preserve the existing award-directory backlink to the former homepage URL.
fs.mkdirSync('dist/landingPage',{recursive:true});
fs.writeFileSync('dist/landingPage/index.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AK Wraps &amp; Customs</title><link rel="canonical" href="https://akwraps.ca/"><meta name="robots" content="noindex, follow"><meta http-equiv="refresh" content="0;url=/"></head><body><p>Our website has moved. <a href="/">Visit AK Wraps &amp; Customs</a>.</p></body></html>');

// Use the same attributed award copy in the initial About document.
if (about.award) {
 const file='dist/about/index.html';
 const award=`<section><h2>${escape(about.award.heading)}</h2><p>${escape(about.award.text)}</p><a href="${escape(about.award.source)}">${escape(about.award.label)}</a><h3>${escape(about.ownerRecognition.heading)}</h3><p>${escape(about.ownerRecognition.text)}</p></section>`;
 fs.writeFileSync(file,fs.readFileSync(file,'utf8').replace('</main>',award+'</main>'));
}
