const TILE_TINTS = ['bg-blue-50', 'bg-cyan-50', 'bg-amber-50', 'bg-violet-50'];

function SiteNav({ logo, links, activeLink }) {
  return (
    <div className="flex items-center gap-6 border-b border-slate-200 px-6 py-3.5">
      <div className="flex items-center gap-2 font-serif text-[15px] text-slate-950">
        <span className="h-5 w-5 rounded-md bg-gradient-to-br from-brand-blue to-brand-mint" />
        {logo}
      </div>
      <div className="hidden flex-1 items-center gap-5 sm:flex">
        {links.map((label, i) => (
          <span key={label} className={`text-[12.5px] font-semibold ${i === activeLink ? 'text-brand-blue' : 'text-slate-500'}`}>
            {label}
          </span>
        ))}
      </div>
      <div className="ml-auto text-[15px] text-slate-400">🔍</div>
    </div>
  );
}

function ShopBody({ page }) {
  return (
    <>
      <div className="px-6 pb-7 pt-9">
        <span className="mb-2.5 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-brand-blue">{page.eyebrow}</span>
        <h1 className="max-w-[22ch] font-serif text-[27px] leading-tight text-slate-950">{page.heading}</h1>
        <p className="mt-2.5 max-w-[44ch] text-[13.5px] text-slate-500">{page.sub}</p>
        <button type="button" className="mt-4 rounded-full bg-gradient-to-br from-brand-blue to-brand-mint px-5 py-2.5 text-[12.5px] font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.24)]">
          {page.cta}
        </button>
      </div>
      <div className="px-6 pb-10">
        <h2 className="mb-3.5 font-serif text-[15.5px] text-slate-950">{page.sectionTitle}</h2>
        <div className="grid grid-cols-3 gap-3.5">
          {page.products.map((p, i) => (
            <div key={p.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className={`flex h-24 items-center justify-center text-4xl sm:h-32 sm:text-5xl ${TILE_TINTS[i % TILE_TINTS.length]}`}>{p.emoji}</div>
              <div className="p-2.5">
                <div className="font-serif text-[12px] text-slate-950">{p.name}</div>
                <div className="mt-0.5 font-mono text-[11.5px] text-brand-blue">{p.price}</div>
                <div className="mt-1.5 inline-block rounded-md border border-brand-blue px-2 py-0.5 text-[10.5px] font-semibold text-brand-blue">Añadir</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function HelpBody({ page }) {
  return (
    <>
      <div className="px-6 pb-7 pt-9">
        <h1 className="font-serif text-[26px] text-slate-950">{page.heading}</h1>
        <div className="mt-4 flex max-w-md gap-2">
          <div className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-[12.5px] text-slate-400">{page.searchPlaceholder}</div>
          <button type="button" className="rounded-xl bg-gradient-to-br from-brand-blue to-brand-mint px-4 text-[12.5px] font-semibold text-white">Buscar</button>
        </div>
      </div>
      <div className="px-6 pb-10">
        <h2 className="mb-3.5 font-serif text-[15.5px] text-slate-950">{page.sectionTitle}</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {page.tiles.map((t, i) => (
            <div key={t.label} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3.5">
              <div className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl text-base ${TILE_TINTS[i % TILE_TINTS.length]}`}>{t.icon}</div>
              <div>
                <div className="font-serif text-[13px] text-slate-950">{t.label}</div>
                <div className="mt-0.5 text-[11.5px] text-slate-500">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ReturnsBody({ page }) {
  return (
    <>
      <div className="px-6 pb-6 pt-9">
        <h1 className="font-serif text-[26px] text-slate-950">{page.heading}</h1>
        <p className="mt-2.5 max-w-[46ch] text-[13.5px] text-slate-500">{page.sub}</p>
      </div>
      <div className="px-6 pb-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          {page.steps.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-start gap-2.5">
              <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-50 font-mono text-[12px] font-semibold text-brand-blue">{i + 1}</span>
              <div>
                <div className="font-serif text-[12.5px] text-slate-950">{s.label}</div>
                <div className="mt-0.5 text-[11.3px] text-slate-500">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2.5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          {page.formFields.map((f) => (
            <div key={f} className="min-w-[140px] flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[12.3px] text-slate-400">{f}</div>
          ))}
          <button type="button" className="rounded-lg bg-gradient-to-br from-brand-blue to-brand-mint px-4 text-[12.3px] font-semibold text-white">{page.formButton}</button>
        </div>
      </div>
    </>
  );
}

export default function FakeSite({ page }) {
  return (
    <div aria-hidden="true">
      <SiteNav logo={page.logo} links={page.links} activeLink={page.activeLink} />
      {page.type === 'shop' && <ShopBody page={page} />}
      {page.type === 'help' && <HelpBody page={page} />}
      {page.type === 'returns' && <ReturnsBody page={page} />}
    </div>
  );
}
