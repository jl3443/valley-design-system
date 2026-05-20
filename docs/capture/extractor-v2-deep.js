// Valley DS DEEP extractor v2 — paste into DevTools Console at valley.com
// REQUIRES: browser window ≥ 1280px wide (close/dock-bottom DevTools panel first).
// Captures hover/focus/active CSS rules + all component archetypes + z-index + container widths + icon library.
// Run this on the homepage first; then re-run on /personal, /business, /customer-care
// and paste each output separately.

(() => {
  const out = { meta: { url: location.href, title: document.title, viewport: { w: innerWidth, h: innerHeight }, capturedAt: new Date().toISOString() } };

  if (innerWidth < 1100) {
    console.warn(`⚠️ Viewport is ${innerWidth}px — narrower than 1100. Header may be collapsed. Resize browser first.`);
  }

  // ─── 1. CSSOM scan: :hover / :focus / :active / :disabled / :focus-visible rules ────
  const stateRules = { hover: [], focus: [], active: [], disabled: [], 'focus-visible': [] };
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules || sheet.rules; } catch (e) { continue; }
    if (!rules) continue;
    const walk = (rule) => {
      try {
        if (rule.cssRules) for (const r of rule.cssRules) walk(r);
        if (!rule.selectorText) return;
        const m = rule.selectorText.match(/:(hover|focus|active|disabled|focus-visible)\b/);
        if (!m) return;
        const css = (rule.style && rule.style.cssText) ? rule.style.cssText.slice(0, 400) : '';
        if (!css) return;
        stateRules[m[1]].push({ selector: rule.selectorText.slice(0, 200), css });
      } catch (e) {}
    };
    try { for (const r of rules) walk(r); } catch (e) {}
  }
  for (const k in stateRules) stateRules[k] = stateRules[k].slice(0, 60);
  out.stateRules = stateRules;

  // ─── 2. Component archetypes (idle state) ───────────────────────────────────────────
  const archetypes = {
    primaryCTA:     'a[class*="primary"][class*="btn"], button[class*="primary"][class*="btn"], a._variant__primary, button._variant__primary, header a[class*="cta"]:not([class*="secondary"]), .btn-primary, button.btn-primary',
    secondaryCTA:   'a[class*="secondary"][class*="btn"], button[class*="secondary"][class*="btn"], a._variant__secondary, button._variant__secondary, .btn-secondary',
    ghostBtn:       'a._variant__ghost, button._variant__ghost, [class*="text-btn"], button[class*="link-btn"]',
    inputText:      'input[type="text"], input[type="email"], input[type="search"], input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]):not([type="image"])',
    select:         'select, [role="combobox"], button[class*="dropdown"]',
    checkbox:       'input[type="checkbox"]',
    radio:          'input[type="radio"]',
    card:           'article[class*="card"], div[class*="product-card"], div[class*="article-card"], [class*="card"]:not([class*="cards"]):not([class*="card-cont"])',
    accordion:      'details, [class*="acc-item"], [role="region"][aria-labelledby]',
    accordionTrigger: 'summary, [class*="acc-item"] [class*="btn"], [aria-expanded]',
    tab:            '[role="tab"], li[class*="tab"][class*="item"]',
    navLinkTop:     'header nav a, nav[role="navigation"] > ul > li > a, header [class*="nav"] a:not([class*="cta"]):not([class*="logo"])',
    navLinkUtility: 'header a[class*="utility"], header [class*="util"] a, header [class*="quick-links"] a',
    badge:          '[class*="badge"], [class*="chip"]:not([class*="chip-wrap"]), [class*="tag-item"]',
    breadcrumb:     '[class*="breadcrumb"] a, nav[aria-label*="breadcrumb" i] a',
    modal:          '[role="dialog"], [class*="modal"][class*="content"], [aria-modal]',
    tooltip:        '[role="tooltip"], [class*="tooltip"]',
    alertBanner:    '[role="alert"], [class*="alert"]:not([class*="alerts"]), [class*="banner-message"]',
    hero:           '[class*="hero"]:not([class*="heroic"])',
    footerLink:     'footer a:not([class*="logo"])',
    footerHeading:  'footer h2, footer h3, footer [class*="heading"]',
    sectionHeading: 'h2[class*="eyebrow"], [class*="eyebrow"], [class*="section-heading"]',
    quickLink:      '[class*="quick-link"]:not([class*="quick-links"])',
    pillTag:        '[class*="pill"], [class*="filter-chip"]',
    iconText:       '[class*="icon-and-text"], [class*="iconandtext"]',
    productCard:    '[class*="product-card"]',
    teaserCard:     '[class*="teaser"], [class*="article-teaser"], [class*="single-article"]'
  };

  const fullProps = ['display','position','font-family','font-size','font-weight','line-height','letter-spacing','text-transform','text-decoration','color','background-color','background-image','padding','margin','width','height','min-width','min-height','max-width','border-radius','border-top','border-right','border-bottom','border-left','box-shadow','outline','outline-offset','cursor','transition','opacity','gap','justify-content','align-items','text-align'];
  const pickFull = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const cls = typeof el.className === 'string' ? el.className.trim().split(/\s+/).filter(Boolean) : [];
    const o = { selector: el.tagName.toLowerCase() + (cls.length ? '.' + cls.slice(0,3).join('.') : ''), text: (el.innerText||'').trim().slice(0,50), classes: cls.slice(0,8) };
    fullProps.forEach(p => o[p] = cs.getPropertyValue(p));
    const r = el.getBoundingClientRect();
    o.box = { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) };
    return o;
  };

  out.archetypes = {};
  for (const [name, sel] of Object.entries(archetypes)) {
    try {
      const els = [...document.querySelectorAll(sel)];
      const visible = els.filter(e => {
        const r = e.getBoundingClientRect();
        const cs = getComputedStyle(e);
        return r.width > 5 && r.height > 5 && cs.visibility !== 'hidden' && cs.display !== 'none' && r.y < 8000;
      });
      if (visible.length === 0) {
        out.archetypes[name] = { _miss: `no visible match (${els.length} hidden)`, selector: sel };
      } else {
        out.archetypes[name] = pickFull(visible[0]);
        out.archetypes[name]._visibleCount = visible.length;
      }
    } catch (e) {
      out.archetypes[name] = { _err: e.message, selector: sel };
    }
  }

  // ─── 3. For each archetype, find matching :hover / :focus / :active rules ───────────
  out.archetypeStates = {};
  for (const [name, data] of Object.entries(out.archetypes)) {
    if (!data || !data.classes) continue;
    const matchRules = (state) => stateRules[state].filter(r => {
      // crude match: any class from the archetype appears in the rule selector
      return data.classes.some(c => c && r.selector.includes('.' + c));
    }).slice(0, 5);
    out.archetypeStates[name] = {
      hover: matchRules('hover'),
      focus: matchRules('focus'),
      active: matchRules('active'),
      disabled: matchRules('disabled'),
      'focus-visible': matchRules('focus-visible'),
    };
  }

  // ─── 4. Z-index histogram ───────────────────────────────────────────────────────────
  const zCount = {};
  document.body.querySelectorAll('*').forEach(el => {
    const z = getComputedStyle(el).zIndex;
    if (z && z !== 'auto' && z !== '0') zCount[z] = (zCount[z]||0)+1;
  });
  out.zIndexHistogram = Object.entries(zCount).sort((a,b) => parseInt(b[0]) - parseInt(a[0])).slice(0, 12);

  // ─── 5. Border-width histogram (excludes 0px) ───────────────────────────────────────
  const bwCount = {};
  document.body.querySelectorAll('*').forEach(el => {
    const w = getComputedStyle(el).borderWidth;
    if (w && w !== '0px') bwCount[w] = (bwCount[w]||0)+1;
  });
  out.borderWidthHistogram = Object.entries(bwCount).sort((a,b) => b[1] - a[1]).slice(0, 10);

  // ─── 6. Outline (focus rings without box-shadow) ────────────────────────────────────
  const outlineCount = {};
  document.body.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach(el => {
    const o = getComputedStyle(el).outline;
    if (o && o !== 'none' && o !== 'rgb(0, 0, 0) none 0px') outlineCount[o] = (outlineCount[o]||0)+1;
  });
  out.outlineHistogram = Object.entries(outlineCount).sort((a,b) => b[1]-a[1]).slice(0, 8);

  // ─── 7. Container max-widths (layout grid hints) ────────────────────────────────────
  const widths = {};
  document.body.querySelectorAll('main *, section, [class*="container"], [class*="wrapper"]').forEach(el => {
    const mw = getComputedStyle(el).maxWidth;
    if (mw && mw !== 'none' && mw !== '100%' && mw !== '0px') widths[mw] = (widths[mw]||0)+1;
  });
  out.containerMaxWidths = Object.entries(widths).sort((a,b) => b[1]-a[1]).slice(0, 10);

  // ─── 8. Section padding scale (top sections) ────────────────────────────────────────
  const padCount = {};
  document.body.querySelectorAll('section, main > div, [class*="section"]').forEach(el => {
    const cs = getComputedStyle(el);
    const sig = `${cs.paddingTop}/${cs.paddingBottom}`;
    if (sig !== '0px/0px') padCount[sig] = (padCount[sig]||0)+1;
  });
  out.sectionPaddingHistogram = Object.entries(padCount).sort((a,b) => b[1]-a[1]).slice(0, 8);

  // ─── 9. Icon library detection ──────────────────────────────────────────────────────
  const iconCounts = {};
  document.querySelectorAll('svg, i[class], img[src*="icon"]').forEach(el => {
    let key;
    if (el.tagName === 'I' && el.className) {
      key = `i.${(el.className||'').toString().split(/\s+/)[0]}`;
    } else if (el.tagName === 'SVG') {
      const cls = (el.getAttribute('class') || '').split(/\s+/)[0];
      key = `svg.${cls || '(no-class)'}`;
    } else if (el.tagName === 'IMG') {
      key = 'img-icon';
    }
    if (key) iconCounts[key] = (iconCounts[key]||0)+1;
  });
  out.iconLibrary = Object.entries(iconCounts).sort((a,b) => b[1]-a[1]).slice(0, 10);

  // ─── 10. Header / footer structure summary ──────────────────────────────────────────
  const header = document.querySelector('header');
  if (header) {
    out.headerStructure = {
      box: { w: Math.round(header.getBoundingClientRect().width), h: Math.round(header.getBoundingClientRect().height) },
      bg: getComputedStyle(header).backgroundColor,
      links: [...header.querySelectorAll('a')].slice(0, 20).map(a => ({
        text: (a.innerText||'').trim().slice(0,30),
        href: a.getAttribute('href'),
        classes: typeof a.className === 'string' ? a.className.trim().split(/\s+/).slice(0,3) : []
      }))
    };
  }
  const footer = document.querySelector('footer');
  if (footer) {
    out.footerStructure = {
      box: { w: Math.round(footer.getBoundingClientRect().width), h: Math.round(footer.getBoundingClientRect().height) },
      bg: getComputedStyle(footer).backgroundColor,
      color: getComputedStyle(footer).color,
      headings: [...footer.querySelectorAll('h2, h3, [class*="heading"]')].slice(0,12).map(h => (h.innerText||'').trim().slice(0,40))
    };
  }

  // ─── 11. CSSOM rule counts (corpus size for confidence) ─────────────────────────────
  let totalRules = 0, totalSheets = 0;
  for (const s of document.styleSheets) {
    totalSheets++;
    try { totalRules += (s.cssRules || s.rules || []).length; } catch (e) {}
  }
  out.cssomMeta = { totalSheets, totalRules };

  console.log(JSON.stringify(out, null, 2));
  return out;
})();
