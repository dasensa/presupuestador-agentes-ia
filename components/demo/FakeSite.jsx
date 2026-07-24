const TILE_TINTS = ['bg-blue-50', 'bg-cyan-50', 'bg-amber-50', 'bg-violet-50'];
const TILE_ICONS_TINTS = ['bg-blue-50', 'bg-amber-50', 'bg-emerald-50'];

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

function ContactBody({ page }) {
  return (
    <>
      <div className="px-6 pb-6 pt-9">
        <h1 className="font-serif text-[26px] text-slate-950">{page.heading}</h1>
        <div className="mt-5 flex items-center gap-3">
          <span className="text-2xl">📞</span>
          <div>
            <div className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400">Llámanos</div>
            <div className="font-mono text-[22px] font-bold text-slate-950">{page.phone}</div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-10">
        <div className="grid grid-cols-1 gap-3">
          {page.departments.map((d, i) => (
            <div key={d.label} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3.5">
              <div className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl text-base ${TILE_ICONS_TINTS[i % TILE_ICONS_TINTS.length]}`}>
                {d.icon}
              </div>
              <div>
                <div className="font-serif text-[13px] text-slate-950">{d.label}</div>
                <div className="mt-0.5 text-[11.5px] text-slate-500">{d.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PortalBody({ page }) {
  const stats = page.stats || [
    { label: 'Registros activos', value: '12.847' },
    { label: 'Operaciones hoy', value: '3.291' },
  ];
  const searchPlaceholder = page.searchPlaceholder || 'Buscar…';
  return (
    <div className="flex min-h-[460px]">
      <div className="w-36 flex-none border-r border-slate-200 bg-slate-50 py-5">
        {page.menuItems.map((item, i) => (
          <div
            key={item}
            className={`cursor-default px-4 py-2.5 text-[11.5px] font-semibold ${
              i === page.activeMenu
                ? 'border-r-2 border-brand-blue bg-blue-50/50 text-brand-blue'
                : 'text-slate-500'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex-1 px-5 pb-8 pt-6">
        <h1 className="font-serif text-[20px] text-slate-950">{page.heading}</h1>
        <p className="mt-1 text-[11.5px] text-slate-400">{page.sub}</p>
        <div className="mt-4 flex gap-2 rounded-xl border border-slate-200 bg-white p-2.5">
          <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] text-slate-400">
            {searchPlaceholder}
          </div>
          <button type="button" className="rounded-lg bg-gradient-to-br from-brand-blue to-brand-mint px-3 text-[12px] font-semibold text-white">
            Buscar
          </button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div>
              <div className="mt-1 font-serif text-[22px] text-slate-950">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClinicBody({ page }) {
  return (
    <>
      <div className="px-6 pb-6 pt-8">
        <h1 className="font-serif text-[26px] text-slate-950">{page.heading}</h1>
        <div className="mt-4 flex gap-2">
          <div className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-[12.5px] text-slate-400">{page.searchPlaceholder || 'Buscar especialidad o médico…'}</div>
          <button type="button" className="rounded-xl bg-gradient-to-br from-brand-blue to-brand-mint px-4 text-[12.5px] font-semibold text-white">Buscar</button>
        </div>
      </div>
      <div className="px-6 pb-10">
        <h2 className="mb-3 font-serif text-[14px] text-slate-950">Próxima disponibilidad</h2>
        <div className="grid grid-cols-1 gap-2.5">
          {page.doctors.map((d, i) => (
            <div key={d.name} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
              <div className={`flex h-9 w-9 flex-none items-center justify-center rounded-full text-base ${TILE_TINTS[i % TILE_TINTS.length]}`}>
                🩺
              </div>
              <div className="flex-1">
                <div className="font-serif text-[13px] text-slate-950">{d.name}</div>
                <div className="text-[11px] text-slate-500">{d.specialty}</div>
              </div>
              <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10.5px] font-semibold text-emerald-600">{d.available}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function GenericServiceBody({ page }) {
  return (
    <>
      <div className="px-6 pb-6 pt-8">
        <p className="text-[13px] text-slate-500">{page.tagline}</p>
        <h1 className="mt-2 font-serif text-[26px] text-slate-950">{page.heading}</h1>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-xl">📞</span>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Atención al cliente</div>
            <div className="font-mono text-[18px] font-bold text-slate-950">{page.phone}</div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-10">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {page.tiles.map((t, i) => (
            <div key={t.label} className={`rounded-2xl border border-slate-200 p-3.5 ${TILE_TINTS[i % TILE_TINTS.length]}`}>
              <span className="text-xl">{t.icon}</span>
              <div className="mt-2 font-serif text-[13px] text-slate-950">{t.label}</div>
              <div className="mt-0.5 text-[11px] text-slate-500">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function HotelBody({ page }) {
  return (
    <>
      <div className="px-6 pb-6 pt-8">
        <div className="text-3xl">{page.heroEmoji || '🏨'}</div>
        <h1 className="mt-3 font-serif text-[26px] leading-tight text-slate-950">{page.heading}</h1>
        <p className="mt-2 text-[13px] text-slate-500">{page.sub}</p>
      </div>
      <div className="px-6 pb-10">
        <h2 className="mb-3 font-serif text-[14px] text-slate-950">Nuestras habitaciones</h2>
        <div className="grid grid-cols-1 gap-2.5">
          {page.rooms.map((r, i) => (
            <div key={r.name} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
              <div className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl text-xl ${TILE_TINTS[i % TILE_TINTS.length]}`}>
                {r.emoji}
              </div>
              <div className="flex-1">
                <div className="font-serif text-[13px] text-slate-950">{r.name}</div>
                <div className="font-mono text-[11.5px] text-brand-blue">{r.price}</div>
              </div>
              <button type="button" className="rounded-lg border border-brand-blue px-2.5 py-1 text-[10.5px] font-semibold text-brand-blue">
                Reservar
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function PlatformBody({ page }) {
  const stats = page.stats || [];
  const notifications = page.notifications || [];
  return (
    <div className="flex min-h-[460px]">
      <div className="w-36 flex-none border-r border-slate-200 bg-slate-50 py-5">
        {page.menuItems.map((item, i) => (
          <div
            key={item}
            className={`cursor-default px-4 py-2.5 text-[11.5px] font-semibold ${
              i === page.activeMenu
                ? 'border-r-2 border-brand-blue bg-blue-50/50 text-brand-blue'
                : 'text-slate-500'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="flex-1 px-5 pb-8 pt-6">
        <h1 className="font-serif text-[18px] text-slate-950">{page.heading}</h1>
        {stats.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div>
                <div className="mt-1 font-serif text-[20px] text-slate-950">{s.value}</div>
              </div>
            ))}
          </div>
        )}
        {notifications.length > 0 && (
          <div className="mt-4">
            <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wider text-slate-400">Notificaciones</div>
            <div className="space-y-2">
              {notifications.map((n) => (
                <div key={n.text} className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-2.5">
                  <span className="text-base">{n.icon}</span>
                  <div className="flex-1">
                    <div className="text-[11.5px] text-slate-700">{n.text}</div>
                    <div className="text-[10px] text-slate-400">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FakeSite({ page }) {
  return (
    <div aria-hidden="true">
      <SiteNav logo={page.logo} links={page.links} activeLink={page.activeLink} />
      {page.type === 'shop' && <ShopBody page={page} />}
      {page.type === 'help' && <HelpBody page={page} />}
      {page.type === 'returns' && <ReturnsBody page={page} />}
      {page.type === 'contact' && <ContactBody page={page} />}
      {page.type === 'portal' && <PortalBody page={page} />}
      {page.type === 'clinic' && <ClinicBody page={page} />}
      {page.type === 'generic-service' && <GenericServiceBody page={page} />}
      {page.type === 'hotel' && <HotelBody page={page} />}
      {page.type === 'platform' && <PlatformBody page={page} />}
    </div>
  );
}
