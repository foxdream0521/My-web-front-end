import React, { useState, useRef } from 'react';
import Matter from 'matter-js';

export default function ChaosMode() {
  const [isActive, setIsActive] = useState(false);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<any>(null);
  const renderRef = useRef<any>(null);
  const runnerRef = useRef<any>(null);

  const startChaos = () => {
    if (isActive) return;
    setIsActive(true);

    setTimeout(() => {
      if (!sceneRef.current) return;
      sceneRef.current.innerHTML = '';

      const width = window.innerWidth;
      const height = window.innerHeight;

      try {
        const engine = Matter.Engine.create({ 
          gravity: { x: 0, y: 1 } 
        });
        engineRef.current = engine;

        const render = Matter.Render.create({
          element: sceneRef.current,
          engine: engine,
          options: {
            width: width,
            height: height,
            wireframes: false, 
            background: 'transparent'
          }
        });
        renderRef.current = render;
        Matter.Render.run(render);

        const runner = Matter.Runner.create();
        runnerRef.current = runner;
        Matter.Runner.run(runner, engine);

        const floor = Matter.Bodies.rectangle(width / 2, height + 20, width * 2, 40, { isStatic: true, render: { fillStyle: 'transparent' } });
        const leftWall = Matter.Bodies.rectangle(-20, height / 2, 40, height * 2, { isStatic: true, render: { fillStyle: 'transparent' } });
        const rightWall = Matter.Bodies.rectangle(width + 20, height / 2, 40, height * 2, { isStatic: true, render: { fillStyle: 'transparent' } });
        Matter.Composite.add(engine.world, [floor, leftWall, rightWall]);

        const bboxes: any[] = [];
        const colors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff924c', '#38bdf8', '#a78bfa'];

        const elements = document.querySelectorAll('h1, h2, h3, button, a, img, p');
        elements.forEach((el, index) => {
          const rect = el.getBoundingClientRect();
          if (rect.width < 10 || rect.height < 10 || rect.top > height || rect.bottom < 0) return;
          if (el.textContent?.includes("DON'T PRESS") || el.textContent?.includes("FIX WEBSITE") || el.textContent?.includes("...")) return;

          const finalWidth = rect.width > 300 ? 250 : rect.width;
          const finalHeight = rect.height > 200 ? 120 : rect.height;

          const body = Matter.Bodies.rectangle(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            finalWidth,
            finalHeight,
            {
              restitution: 0.4,
              friction: 0.2,
              render: { fillStyle: colors[index % colors.length] }
            }
          );
          bboxes.push(body);
        });

        for (let i = 0; i < 45; i++) {
          const body = Matter.Bodies.rectangle(
            Math.random() * (width - 120) + 60,
            -(Math.random() * 250 + 40), 
            Math.random() * 50 + 50,
            Math.random() * 30 + 30,
            {
              restitution: 0.5,
              friction: 0.1,
              render: {
                fillStyle: colors[i % colors.length],
                strokeStyle: '#ffffff',
                lineWidth: 1.5
              }
            }
          );
          bboxes.push(body);
        }

        Matter.Composite.add(engine.world, bboxes);

        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: { visible: false }
          }
        });

        Matter.Composite.add(engine.world, mouseConstraint);
        render.canvas.style.pointerEvents = 'auto';

      } catch (error) {
        console.error("Matter.js 核心啟動崩潰：", error);
      }
    }, 120);
  };

  const resetNormal = () => {
    setIsActive(false);
    try {
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (renderRef.current) Matter.Render.stop(renderRef.current);
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
    } catch (e) {}
    if (sceneRef.current) sceneRef.current.innerHTML = '';
  };

  return (
    <>
      <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 99999999 }}>
        {!isActive ? (
          <button
            onClick={startChaos}
            className="px-2 py-1 bg-neutral-950/80 hover:bg-neutral-900/90 backdrop-blur-sm text-neutral-600 hover:text-red-300 font-mono text-[10px] rounded border border-neutral-900/50 hover:border-red-900/50 shadow-none hover:shadow-[0_0_15px_rgba(220,38,38,0.2)] scale-90 hover:scale-100 opacity-20 hover:opacity-100 transition-all duration-1000 ease-in-out cursor-help tracking-widest"
            title="?"
          >
            ...
          </button>
        ) : (
          <button
            onClick={resetNormal}
            className="px-4 py-2 bg-emerald-600/90 hover:bg-emerald-500 backdrop-blur-md text-white font-mono text-xs font-bold rounded-full border border-emerald-400/50 shadow-[0_0_15px_rgba(5,150,105,0.3)] hover:shadow-[0_0_25px_rgba(5,150,105,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer tracking-wider"
          >
            🛠️ FIX WEBSITE
          </button>
        )}
      </div>

      {isActive && (
        <div 
          ref={sceneRef} 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999990,
            backgroundColor: 'rgba(12, 10, 18, 0.9)', 
            backdropFilter: 'blur(8px)',
            display: 'block',          
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            pointerEvents: 'auto',
            overflow: 'hidden'
          }}
        />
      )}
    </>
  );
}