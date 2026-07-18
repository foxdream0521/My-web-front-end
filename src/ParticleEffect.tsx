import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  decay: number;
}

export default function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 80; // 限制最大粒子數，保證網頁流暢不卡頓

    // 自訂粒子的顏色庫（這裡用淡藍、粉紫、金黃，很配你的星空主題）
    const colors = [
      'rgba(129, 140, 248, ', // indigo
      'rgba(192, 132, 252, ', // purple
      'rgba(253, 224, 71, ',  // yellow
      'rgba(45, 212, 191, ',  // teal
    ];

    // 調整畫布大小符合全螢幕
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 建立單個粒子的函式
    const createParticle = (x: number, y: number) => {
      if (particles.length >= maxParticles) return;
      
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x,
        y,
        size: Math.random() * 3 + 1, // 粒子大小 1px ~ 4px
        speedX: (Math.random() - 0.5) * 1.5, // 左右飄散速度
        speedY: (Math.random() - 0.5) * 1.5 - 0.5, // 向上飄移居多
        color: randomColor,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.005 // 消失速度
      });
    };

    // 監聽滑鼠移動，在游標位置產生粒子
    const handleMouseMove = (e: MouseEvent) => {
      // 每次移動產生 1~2 個粒子
      createParticle(e.clientX, e.clientY);
      if (Math.random() > 0.5) createParticle(e.clientX, e.clientY);
    };

    // 監聽滑鼠點擊，噴發多個粒子
    const handleMouseClick = (e: MouseEvent) => {
      for (let i = 0; i < 8; i++) {
        createParticle(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    // 動態渲染迴圈
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.x * 0.001 + p.speedX; // 加上輕微擴散
        p.y += p.speedY;
        p.alpha -= p.decay; // 逐漸淡出

        // 如果粒子完全透明了，就從陣列移除
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // 畫出精緻帶有發光感（Blur）的圓點
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${p.color}0.5)`;
        ctx.fill();
      }

      // 重設 shadowBlur 避免影響效能
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // 清理事件，避免記憶體殘留
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999999] overflow-hidden"
    />
  );
}