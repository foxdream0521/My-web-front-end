import React, { useEffect, useState } from 'react';

// 定義彩色碎紙屑的型別
interface Paper {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

export default function KonamiCode() {
  const [triggered, setTriggered] = useState(false);
  const [papers, setPapers] = useState<Paper[]>([]);

  // 1. 監聽鍵盤輸入 Konami Code
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 
      'ArrowDown', 'ArrowDown', 
      'ArrowLeft', 'ArrowRight', 
      'ArrowLeft', 'ArrowRight', 
      'b', 'a'
    ];
    let inputSequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      // 記錄按鍵（不分大小寫）
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      inputSequence.push(key);
      
      // 只保留跟密碼長度一樣的最新按鍵數
      inputSequence = inputSequence.slice(-konamiCode.length);

      // 檢查是否完全符合
      if (JSON.stringify(inputSequence) === JSON.stringify(konamiCode)) {
        triggerEasterEgg();
        inputSequence = []; // 觸發後清空
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 2. 觸發彩蛋：生成 100 片五彩碎紙屑
  const triggerEasterEgg = () => {
    setTriggered(true);
    
    const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff924c'];
    const newPapers: Paper[] = [];
    
    for (let i = 0; i < 120; i++) {
      newPapers.push({
        id: Math.random() + i,
        x: Math.random() * window.innerWidth,
        // 從螢幕上方外面掉下來
        y: -Math.random() * 200 - 20, 
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 5,
        speedY: Math.random() * 4 + 4, // 往下掉的速度
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4
      });
    }
    
    setPapers(newPapers);

    // 4 秒後自動關閉動畫，釋放記憶體
    setTimeout(() => {
      setTriggered(false);
      setPapers([]);
    }, 4000);
  };

  // 3. 物理碎紙屑掉落動態更新
  useEffect(() => {
    if (!triggered || papers.length === 0) return;

    const interval = setInterval(() => {
      setPapers((prevPapers) =>
        prevPapers.map((p) => ({
          ...p,
          x: p.x + p.speedX + Math.sin(p.y / 30) * 0.5, // 帶有左右搖擺的飄落感
          y: p.y + p.speedY,
          rotation: p.rotation + p.rotationSpeed
        })).filter(p => p.y < window.innerHeight + 20) // 掉出螢幕底部的就刪除
      );
    }, 16); // 約 60 FPS

    return () => clearInterval(interval);
  }, [triggered, papers.length]);

  if (!triggered) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* 驚喜文字提示 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface/90 text-primary px-8 py-4 rounded-2xl border border-primary/30 font-mono tracking-widest text-center shadow-2xl animate-bounce backdrop-blur-md">
        <h2 className="text-xl font-bold mb-1">你發現了困難彩蛋！！٩( ˃̶͈̀ᗨ˂̶͈́۶)</h2>
        <p className="text-xs text-on-surface-variant">太厲害了wദ്ദി( ¯꒳¯ ) ✨</p>
      </div>

      {/* 渲染碎紙屑 */}
      {papers.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size * 1.5}px`, // 稍微長方形像彩帶
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0.9,
            borderRadius: '2px'
          }}
        />
      ))}
    </div>
  );
}