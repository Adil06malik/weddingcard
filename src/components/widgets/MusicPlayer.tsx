import { useEffect, useRef, useState } from "react";
import { Pause, Play, VolumeX } from "lucide-react";
import type { WeddingData } from "@/types/wedding";
import { useSessionState } from "@/hooks/useSessionState";
import { cn } from "@/lib/cn";

/**
 * Optional floating music control. Hidden entirely when no music URL is
 * configured, and it NEVER autoplays with sound — play is user-initiated.
 */
export function MusicPlayer({ wedding }: { wedding: WeddingData }) {
  const enabled = wedding.music.enabled && Boolean(wedding.music.url);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useSessionState<boolean>("wedding-music-muted", false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  if (!enabled) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 sm:bottom-6 sm:right-6">
      <audio ref={audioRef} src={wedding.music.url} loop preload="none" />

      <button
        onClick={() => setMuted(!muted)}
        className="rounded-full border border-gold/35 bg-black/80 p-3 text-gold-pale backdrop-blur transition-colors hover:bg-gold/15"
        aria-label={muted ? "Unmute music" : "Mute music"}
        title={muted ? "Unmute" : "Mute"}
      >
        <VolumeX size={16} className={muted ? "" : "opacity-50"} />
      </button>

      <button
        onClick={toggle}
        className={cn(
          "flex items-center gap-2 rounded-full border border-gold/45 bg-black/80 px-4 py-3 text-gold-pale backdrop-blur transition-colors hover:bg-gold/15",
        )}
        aria-label={playing ? "Pause music" : "Play music"}
        title={wedding.music.title ?? "Music"}
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
        <span className="eq" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
    </div>
  );
}
