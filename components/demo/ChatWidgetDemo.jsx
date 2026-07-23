import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import FakeSite from './FakeSite';

function wait(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
}

function StepBubble({ step }) {
  if (step.kind === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-gradient-to-br from-brand-blue to-brand-mint px-3.5 py-2.5 text-[13px] leading-snug text-white shadow-sm">
          {step.text}
        </div>
      </div>
    );
  }
  if (step.kind === 'agent') {
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-3.5 py-2.5 text-[13px] leading-snug text-slate-800 shadow-sm">
          {step.text}
        </div>
      </div>
    );
  }
  if (step.kind === 'sys') {
    return (
      <div className="mx-auto flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 font-mono text-[10.5px] text-slate-500">
        <span className="h-1.5 w-1.5 flex-none animate-pulse rounded-full bg-brand-mint" />
        {step.text}
      </div>
    );
  }
  if (step.kind === 'cards') {
    return (
      <div className="flex flex-col gap-2">
        {step.cards.map((c) => (
          <div key={c.name} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="font-serif text-[13px] text-slate-950">{c.name}</div>
            <div className="mt-0.5 font-mono text-[12px] text-brand-blue">{c.price}</div>
            <div className="mt-0.5 text-[10.5px] font-semibold text-emerald-600">{c.stock}</div>
            <div className="mt-1.5 text-[11px] leading-relaxed text-slate-500">{c.why}</div>
          </div>
        ))}
      </div>
    );
  }
  if (step.kind === 'alt') {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-2.5 text-[11px] leading-relaxed text-slate-400">
        <b className="font-mono font-semibold text-slate-500">{step.tag}</b> {step.text}
      </div>
    );
  }
  if (step.kind === 'banner') {
    return (
      <div className="rounded-xl bg-emerald-50 px-3.5 py-2.5 text-center text-[12.5px] font-semibold text-emerald-700">
        {step.text}
      </div>
    );
  }
  return null;
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-3.5 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatWidgetDemo({ demo }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    async function play() {
      setPlaying(true);
      setVisibleCount(0);
      setTyping(false);
      if (reduceMotion) {
        if (!cancelled) setVisibleCount(demo.steps.length);
        setPlaying(false);
        return;
      }
      for (let i = 0; i < demo.steps.length; i += 1) {
        if (cancelled) return;
        const step = demo.steps[i];
        if (step.kind === 'agent' || step.kind === 'cards') {
          setTyping(true);
          await wait(520);
          if (cancelled) return;
          setTyping(false);
        }
        setVisibleCount(i + 1);
        await wait(620);
      }
      if (!cancelled) setPlaying(false);
    }

    play();
    return () => { cancelled = true; };
  }, [demo, replayKey]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [visibleCount, typing]);

  return (
    <div className="ds-card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50/80 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#EE6A5F]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#F5BD4F]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#61C454]" />
        <span className="ml-2 flex-1 truncate rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] text-slate-400">
          {demo.url}
        </span>
      </div>

      <div className="relative min-h-[560px] bg-white">
        <FakeSite page={demo.fakePage} />

        <div className="absolute bottom-4 right-4 w-[min(360px,calc(100%-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-16px_rgba(15,23,42,0.35)]">
          <div className="flex items-center gap-2.5 bg-gradient-to-br from-brand-blue to-brand-mint px-4 py-3 text-white">
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/25 text-base">{demo.avatar}</div>
            <div className="flex-1">
              <div className="font-sans text-[13px] font-semibold">{demo.agentName}</div>
              <div className="flex items-center gap-1.5 text-[10.5px] text-white/85">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                En línea
              </div>
            </div>
            <button
              type="button"
              onClick={() => setReplayKey((k) => k + 1)}
              title="Reiniciar demo"
              aria-label="Reiniciar demo"
              disabled={playing}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-white transition-colors hover:bg-white/35 disabled:opacity-50"
            >
              <RotateCcw size={13} />
            </button>
          </div>

          <div ref={bodyRef} className="flex max-h-[420px] min-h-[320px] flex-col gap-2.5 overflow-y-auto p-4">
            {demo.steps.slice(0, visibleCount).map((step, i) => (
              <StepBubble key={i} step={step} />
            ))}
            {typing && <TypingIndicator />}
          </div>

          <div className="flex items-center gap-2 border-t border-slate-200 px-3.5 py-2.5">
            <div className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[12.5px] text-slate-400">
              Escribe un mensaje…
            </div>
            <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-mint text-[12px] text-white">➤</div>
          </div>
        </div>
      </div>
    </div>
  );
}
