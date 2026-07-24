import { useEffect, useRef, useState } from 'react';
import { PhoneForwarded, PhoneOff, RotateCcw } from 'lucide-react';
import FakeSite from './FakeSite';

function wait(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms); });
}

function Waveform({ active }) {
  const heights = [10, 18, 26, 18, 10];
  return (
    <div className="flex items-center gap-[3px]">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full transition-all duration-300 ${active ? 'bg-brand-mint' : 'bg-slate-300'}`}
          style={{ height: active ? `${h}px` : '3px' }}
        />
      ))}
    </div>
  );
}

function CallBubble({ step, isSpeaking }) {
  if (step.kind === 'call_start') {
    return (
      <div className="mx-auto flex items-center gap-2.5 rounded-2xl bg-slate-800 px-4 py-2.5 text-[12.5px] font-semibold text-white">
        <span>📞</span>
        <span>{step.text}</span>
      </div>
    );
  }
  if (step.kind === 'user') {
    return (
      <div className="flex flex-col items-end gap-1">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">👤 Cliente</span>
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-gradient-to-br from-brand-blue to-brand-mint px-3.5 py-2.5 text-[13px] leading-snug text-white shadow-sm">
          {step.text}
        </div>
      </div>
    );
  }
  if (step.kind === 'agent') {
    return (
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          <span>🤖 Agente</span>
          <Waveform active={isSpeaking} />
        </div>
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
  if (step.kind === 'call_transfer') {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-[12px] font-semibold text-amber-800">
        📋 {step.text}
      </div>
    );
  }
  if (step.kind === 'call_end') {
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

function useCallTimer(running) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) { setSeconds(0); return undefined; }
    setSeconds(0);
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function VozWidgetDemo({ demo }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [replayKey, setReplayKey] = useState(0);
  const [speakingIndex, setSpeakingIndex] = useState(-1);
  const bodyRef = useRef(null);

  const visibleSteps = demo.steps.slice(0, visibleCount);
  const callStarted = visibleSteps.some((s) => s.kind === 'call_start' || s.kind === 'agent' || s.kind === 'user');
  const callEnded = visibleSteps.some((s) => s.kind === 'call_end');
  const callActive = callStarted && !callEnded;
  const hasTransfer = visibleSteps.some((s) => s.kind === 'call_transfer');

  const timer = useCallTimer(callActive);

  useEffect(() => {
    let cancelled = false;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    async function play() {
      setPlaying(true);
      setVisibleCount(0);
      setTyping(false);
      setSpeakingIndex(-1);
      if (reduceMotion) {
        if (!cancelled) setVisibleCount(demo.steps.length);
        setPlaying(false);
        return;
      }
      for (let i = 0; i < demo.steps.length; i += 1) {
        if (cancelled) return;
        const step = demo.steps[i];
        if (step.kind === 'agent') {
          setTyping(true);
          await wait(500);
          if (cancelled) return;
          setTyping(false);
          setVisibleCount(i + 1);
          setSpeakingIndex(i);
          await wait(1000);
          if (!cancelled) setSpeakingIndex(-1);
        } else {
          setVisibleCount(i + 1);
          await wait(750);
        }
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
          <div className="bg-slate-900 px-4 py-3 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/15 text-base">
                  {demo.avatar}
                </div>
                <div>
                  <div className="font-sans text-[13px] font-semibold">{demo.agentName}</div>
                  <div className="flex items-center gap-2 text-[10.5px] text-white/70">
                    {callActive ? (
                      <>
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                        <span>Llamada en curso · {timer}</span>
                      </>
                    ) : callEnded ? (
                      <span>Llamada finalizada</span>
                    ) : (
                      <span>Iniciando…</span>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReplayKey((k) => k + 1)}
                title="Reiniciar demo"
                aria-label="Reiniciar demo"
                disabled={playing}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/25 disabled:opacity-50"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          <div ref={bodyRef} className="flex max-h-[380px] min-h-[280px] flex-col gap-2.5 overflow-y-auto p-4">
            {visibleSteps.map((step, i) => (
              <CallBubble key={i} step={step} isSpeaking={speakingIndex === i} />
            ))}
            {typing && <TypingIndicator />}
          </div>

          <div className="flex items-center justify-center gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3">
            {hasTransfer && (
              <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-semibold text-amber-700">
                <PhoneForwarded size={12} />
                Transferido
              </div>
            )}
            <div className="flex cursor-default items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-[11px] font-semibold text-red-400 opacity-60 select-none">
              <PhoneOff size={12} />
              Colgar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
