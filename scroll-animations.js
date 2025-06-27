// Scroll fluido con Lenis
const lenis = new Lenis({
  smooth: true,
  lerp: 0.08,
  direction: 'vertical',
  gestureOrientation: 'vertical',
  smoothTouch: true,
  touchMultiplier: 1.5
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP & ScrollTrigger setup
window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // Pinning effect sulle sezioni principali
  document.querySelectorAll('section').forEach((section, i) => {
    if(section.id && section.id !== 'contatti') {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        scrub: 0.5
      });
    }
  });

  // Animazioni in entrata (fade, slide, parallax)
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el, {
      opacity: 0,
      y: 60,
      filter: 'blur(12px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 0.5
      }
    });
  });

  // Parallax su immagini hero e card
  gsap.utils.toArray('.glass img, .glass-effect img').forEach((img, i) => {
    gsap.fromTo(img, {
      scale: 1.12,
      y: 40,
      opacity: 0.7
    }, {
      scale: 1,
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: img,
        start: 'top 90%',
        end: 'top 60%',
        scrub: 0.5
      }
    });
  });

  // Timeline animazioni sincronizzate con lo scroll (esempio su .benefici)
  if(document.getElementById('benefici')) {
    gsap.timeline({
      scrollTrigger: {
        trigger: '#benefici',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    })
    .from('#benefici h2', {opacity:0, y:40, filter:'blur(8px)', duration:0.8})
    .from('#benefici .glass-effect', {opacity:0, y:60, scale:0.95, filter:'blur(12px)', stagger:0.15, duration:1}, '-=0.5');
  }
});

// Sfondo animato fluido (gradienti in movimento)
(function(){
  const bg = document.getElementById('animated-bg');
  if(!bg) return;
  bg.style.position = 'fixed';
  bg.style.zIndex = '0';
  bg.style.inset = '0';
  bg.style.pointerEvents = 'none';
  bg.style.background = 'radial-gradient(ellipse 80% 60% at 60% 30%, #e0c06855 0%, #b7e4c755 60%, #fffbe6 100%)';
  bg.style.transition = 'background 1s';
  let t = 0;
  function animate() {
    t += 0.008;
    const x = 60 + Math.sin(t)*18;
    const y = 30 + Math.cos(t/2)*12;
    bg.style.background = `radial-gradient(ellipse 80% 60% at ${x}% ${y}%, #e0c06855 0%, #b7e4c755 60%, #fffbe6 100%)`;
    requestAnimationFrame(animate);
  }
  animate();
})();
