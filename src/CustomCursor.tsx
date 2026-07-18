import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (isHidden) setIsHidden(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.cursor-pointer') ||
        target.id === 'about-portrait-img';

      if (isClickable) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <div
      // ✨ 核心修正 1：移除了 transition-transform，只保留 transition-[transform] 控制 scale 的縮放速度
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999999] mix-blend-difference border border-primary/80 bg-primary/20 shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-[transform] duration-150 ease-out"
      style={{
        // ✨ 核心修正 2：用 translate3d 直接定位，去除了原本追趕滑鼠的延遲，現在會瞬間跟隨
        transform: `translate3d(${position.x - 12}px, ${position.y - 12}px, 0) scale(${isHovered ? 2.2 : 1})`,
        width: '24px',
        height: '24px',
      }}
    />
  );
}