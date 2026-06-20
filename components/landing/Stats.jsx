import { STATS } from '../../lib/constants';

export default function Stats() {
  return (
    <section className="py-10 border-y border-border bg-[#090d13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="font-serif text-[36px] md:text-[42px] leading-none text-brand-amber mb-1">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-body-sm text-base-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
