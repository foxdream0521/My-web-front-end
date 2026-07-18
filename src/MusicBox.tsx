import React, { useState, useRef, useEffect } from 'react';

export default function MusicBox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 初始化音訊
  useEffect(() => {
    // 指向 public/bgm.mp3
    audioRef.current = new Audio('/artmylife-powerful-dramatic-trailer-514242.mp3');
    audioRef.current.loop = true; // 設定循環播放
    audioRef.current.volume = 0.4; // 設定初始音量 (40% 比較不會嚇到人)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("播放被瀏覽器阻擋:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex items-center gap-3 bg-surface/40 backdrop-blur-md px-3 py-2 rounded-full border border-outline/10 shadow-lg pointer-events-auto">
      {/* 唱片本體 */}
      <button
        onClick={toggleMusic}
        className="relative w-12 h-12 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center cursor-pointer overflow-hidden group shadow-md"
        title={isPlaying ? "暫停音樂" : "播放背景音樂"}
      >
        {/* 黑膠唱片的條紋紋路感 */}
        <div className="absolute inset-1 rounded-full border border-neutral-800/40 opacity-50" />
        <div className="absolute inset-2 rounded-full border border-neutral-800/60 opacity-50" />
        
        {/* 唱片中心的標籤 (中間的小圓餅) */}
        <div className={`absolute w-4 h-4 rounded-full bg-primary/80 flex items-center justify-center transition-transform duration-300 ${isPlaying ? 'scale-110' : ''}`}>
          <div className="w-1 h-1 rounded-full bg-neutral-900" />
        </div>

        {/* 旋轉動畫的黑膠主體 */}
        <div className={`absolute inset-0 w-full h-full rounded-full border border-neutral-950 pointer-events-none ${isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''}`}>
          {/* 細微的光澤感刻痕 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-white/10 via-transparent to-white/10" />
        </div>
      </button>

      {/* 音樂狀態小文字提示 */}
      <div className="text-[11px] font-mono tracking-wider text-on-surface-variant pr-2 pointer-events-none select-none hidden sm:block">
        {isPlaying ? (
          <div className="flex items-center gap-1.5">
            <span className="flex gap-0.5 items-end h-3">
              {/* 簡易音頻跳動小動畫 */}
              <span className="w-[2px] bg-primary animate-[bounce_0.8s_infinite_100ms]" style={{ height: '60%' }} />
              <span className="w-[2px] bg-primary animate-[bounce_0.5s_infinite_300ms]" style={{ height: '100%' }} />
              <span className="w-[2px] bg-primary animate-[bounce_0.7s_infinite_0ms]" style={{ height: '40%' }} />
            </span>
            <span>BGM ON</span>
          </div>
        ) : (
          <span>BGM OFF</span>
        )}
      </div>
    </div>
  );
}