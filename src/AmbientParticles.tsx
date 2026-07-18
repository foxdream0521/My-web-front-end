import React, { useEffect, useRef } from 'react';

interface GoldParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  targetOpacity: number;
  fadeSpeed: number;
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: GoldParticle[] = [];
    
    const getParticleCount = () => {
      return window.innerWidth < 768 ? 25 : 50;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = getParticleCount();
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // 0.5px ~ 2.5px 的精緻小亮點
          speedX: (Math.random() - 0.5) * 0.15, // 極慢的左右移動
          speedY: -(Math.random() * 0.2 + 0.1), // 緩慢向上飄流
          opacity: Math.random(),
          targetOpacity: Math.random() * 0.8 + 0.2, 
          fadeSpeed: Math.random() * 0.01 + 0.003 
        });
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (Math.abs(p.opacity - p.targetOpacity) < 0.05) {
          p.targetOpacity = Math.random() * 0.8 + 0.2;
        }
        p.opacity += (p.targetOpacity - p.opacity) * p.fadeSpeed;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // ✨ 改為精緻的純白光芒 (rgba 255, 255, 255)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        
        // ✨ 光暈也同步改為白光擴散
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
      });

      ctx.shadowBlur = 0; 
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-75"
    />
  );
}