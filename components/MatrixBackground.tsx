import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const columns = Math.floor(width / 20);
    const drops: number[] = new Array(columns).fill(1);
    
    // Hex characters for the "0x" theme
    const chars = "0123456789ABCDEF"; 

    const draw = () => {
      // Create a semi-transparent fade effect to make trails
      // Use the theme background colors for the fade
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? 'rgba(16, 26, 34, 0.1)' : 'rgba(226, 227, 232, 0.23)';
      ctx.fillRect(0, 0, width, height);

      // Set text style
      // Primary color is #133eec (cyan-blue)
      // Slight increase in opacity for better visibility of the blue tint
      ctx.fillStyle = isDark ? 'rgba(19, 77, 236, 0.25)' : 'rgba(19, 99, 236, 0.2)';
      ctx.font = '14px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 20;
        const y = drops[i] * 20;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly or if it goes off screen
        // Reduced randomness to make it more uniform/calm
        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Run at ~20FPS (50ms interval) for a slower, smoother "hacking" feel
    const interval = setInterval(draw, 50);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 1 }} // Opacity handled in canvas for better performance
    />
  );
};

export default MatrixBackground;
