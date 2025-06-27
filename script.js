// script.js
// Puoi aggiungere qui funzionalità JavaScript personalizzate
console.log('Sito statico pronto!');

document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas3d');
  if (canvas && window.Application === undefined) {
    // Dynamically load Spline runtime if not present
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@splinetool/runtime@1.0.50/build/runtime.js';
    script.onload = function() {
      const app = new window.Application(canvas);
      app.load('https://prod.spline.design/DrDIafmNbcWF02gG/scene.splinecode');
    };
    document.body.appendChild(script);
  } else if (canvas && window.Application) {
    const app = new window.Application(canvas);
    app.load('https://prod.spline.design/DrDIafmNbcWF02gG/scene.splinecode');
  }

  // VanillaTilt per TeaLife e altri layout
  if (window.VanillaTilt) {
    VanillaTilt.init(document.querySelectorAll('.tilt'), {
      max: 15,
      speed: 300,
      glare: true,
      'max-glare': 0.2,
    });
  }
});
