import React, { useState, useEffect } from 'react';

// 定義點擊物件的型別
interface ClickItem {
  id: number;
  x: number;
  y: number;
}

export default function MouseClickEffect() {
  // 指定 useState 的型別為 ClickItem 陣列
  const [clicks, setClicks] = useState<ClickItem[]>([]);

  useEffect(() => {
    // 幫事件加上 MouseEvent 型別
    const handleClick = (e: MouseEvent) => {
      const newClick: ClickItem = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };

      setClicks((prev) => [...prev, newClick]);

      setTimeout(() => {
        setClicks((prev) => prev.filter((click) => click.id !== newClick.id));
      }, 600);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999999] overflow-hidden">
      {clicks.map((click) => (
        <span
          key={click.id}
          className="absolute rounded-full border-2 border-primary/60 bg-primary/10 animate-ripple"
          style={{
            left: click.x - 16,
            top: click.y - 16,
            width: '32px',
            height: '32px',
          }}
        />
      ))}
    </div>
  );
}