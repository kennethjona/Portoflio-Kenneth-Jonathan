'use strict';
/** Motion-only enhancements for Kenneth's existing portfolio.
 * No project details, text, routing, or personal information is changed here.
 * All features respect reduced motion and coarse-pointer devices.
 */
(() => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const motion = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const mobile = () => matchMedia('(max-width: 760px)').matches;
  const updateCallbacks = [];
  let scrollQueued = false;
  function tickScroll() {
    scrollQueued = false;
    for (const cb of updateCallbacks) cb();
  }
  function onScroll(cb) { updateCallbacks.push(cb); }
  addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(tickScroll); }
  }, { passive: true });
  addEventListener('resize', () => requestAnimationFrame(tickScroll), { passive: true });

  function initPreloader() {
    const el = $('#preloader');
    if (!el) return;
    const skip = $('#preloader-skip');
    // Once per tab: page navigation stays fast. No animation for motion-sensitive visitors.
    let seen = false;
    try { seen = sessionStorage.getItem('kj-intro-seen') === '1'; } catch { /* Embedded file previews may block storage. */ }
    if (!motion || seen) { el.remove(); return; }
    document.body.classList.add('preloading');
    let dismissed = false;
    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      try { sessionStorage.setItem('kj-intro-seen', '1'); } catch { /* No-op in restricted previews. */ }
      document.body.classList.remove('preloading');
      el.classList.add('is-leaving');
      setTimeout(() => el.remove(), 900);
    }
    const timer = setTimeout(dismiss, 2450);
    skip?.addEventListener('click', () => { clearTimeout(timer); dismiss(); });
    // If the document was restored from back-forward cache, never trap scrolling.
    addEventListener('pageshow', e => { if (e.persisted) dismiss(); }, { once: true });
  }

  function initCursor() {
    if (!motion || !finePointer) return;
    const cursor = $('#custom-cursor');
    if (!cursor) return;
    let x = -100, y = -100, tx = -100, ty = -100, running = false;
    const frame = () => {
      x += (tx - x) * .27;
      y += (ty - y) * .27;
      cursor.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      if (Math.abs(tx-x) + Math.abs(ty-y) > .4) requestAnimationFrame(frame);
      else running = false;
    };
    document.addEventListener('pointermove', event => {
      tx = event.clientX; ty = event.clientY;
      if (!document.body.classList.contains('cursor-enabled')) document.body.classList.add('cursor-enabled');
      if (!running) { running = true; requestAnimationFrame(frame); }
      cursor.classList.toggle('is-hovering', !!event.target.closest('a, button, [data-project], .carousel-stage'));
    }, { passive: true });
    document.addEventListener('pointerleave', () => document.body.classList.remove('cursor-enabled'));
  }

  function initSplitText() {
    const heading = $('#hero-heading');
    if (!heading) return;
    for (const line of [...heading.children]) {
      const content = [...line.childNodes];
      line.replaceChildren();
      for (const node of content) {
        if (node.nodeType === Node.TEXT_NODE) {
          for (const char of node.textContent) {
            const span = document.createElement('span');
            span.className = 'split-char';
            span.textContent = char === ' ' ? '\u00a0' : char;
            span.setAttribute('aria-hidden','true');
            line.append(span);
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          node.setAttribute('aria-hidden','true');
          line.append(node);
        }
      }
    }
    const all = $$('.hero-name .split-char');
    all.forEach((el,i) => {
      el.style.transitionDelay = motion ? `${i * 47 + 160}ms` : '0ms';
      el.classList.add('is-visible');
    });
  }

  function initHeroParallax() {
    if (!motion || !finePointer) return;
    const hero = $('.hero');
    const photo = $('.hero-photo-wrap');
    if (!hero || !photo) return;
    let px=0,py=0,pending=false;
    hero.addEventListener('pointermove', e => {
      const bounds = hero.getBoundingClientRect();
      px = ((e.clientX-bounds.left)/bounds.width-.5)*24;
      py = ((e.clientY-bounds.top)/bounds.height-.5)*12;
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { photo.style.transform = `translate3d(calc(-50% + ${px}px),${py}px,0)`; pending=false; });
    }, { passive:true });
    hero.addEventListener('pointerleave', () => { photo.style.transform='translateX(-50%)'; });
  }

  function initFlowCanvas() {
    const canvas = $('#flow-canvas');
    const scene = $('.about-scroll-scene');
    const card = $('#about-card');
    if (!canvas || !scene || !card) return;
    const ctx = canvas.getContext('2d',{ alpha:true });
    if (!ctx) return;
    let width=0,height=0,ratio=1,seen=false,position=0,lastPaint=0;
    const resize = () => {
      const box=canvas.getBoundingClientRect();
      width=Math.max(1,Math.round(box.width)); height=Math.max(1,Math.round(box.height));
      ratio=Math.min(devicePixelRatio||1,1.5);
      canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio);
      ctx.setTransform(ratio,0,0,ratio,0,0);
      paint();
    };
    function paint(time=0) {
      if (!width || !height) return;
      ctx.clearRect(0,0,width,height);
      const count = mobile()?33:65;
      const amount = Math.min(width,height)*.43;
      const t = motion?time*.000065:0;
      for(let i=0;i<count;i++) {
        const radius = amount*(.15+i/count*.93);
        const ripple = Math.sin(i*.37+t*2)*5;
        ctx.beginPath();
        const parts=100;
        for(let j=0;j<=parts;j++) {
          const angle=(j/parts)*Math.PI*2 + i*.17+t;
          const bend=radius + ripple+ Math.sin(angle*4+i*.18+t)*radius*.19 + Math.cos(angle*9+i*.07)*radius*.035;
          const xx=width*.5+Math.cos(angle)*bend*1.4;
          const yy=height*.5+Math.sin(angle)*bend*.78;
          if(j===0)ctx.moveTo(xx,yy);else ctx.lineTo(xx,yy);
        }
        ctx.strokeStyle=`rgba(255,255,255,${.035+(i/count)*.13})`;
        ctx.lineWidth=i%6===0?.9:.45;
        ctx.stroke();
      }
    }
    const io=new IntersectionObserver(entries => { seen=entries[0]?.isIntersecting||false; },{rootMargin:'250px'});
    io.observe(scene);
    const draw = time => {
      if (seen && motion && time-lastPaint>33) { paint(time); lastPaint=time; }
      if (motion) requestAnimationFrame(draw);
    };
    resize();addEventListener('resize',resize,{passive:true});
    if (motion)requestAnimationFrame(draw);
    const update = () => {
      const rect=scene.getBoundingClientRect();
      const travel=Math.max(1,rect.height-innerHeight);
      position=clamp(-rect.top/travel);
      const expand=clamp((position-.08)/.53);
      const eased=1-Math.pow(1-expand,3);
      const cw=270+(innerWidth-270)*eased;
      const ch=215+(innerHeight-215)*eased;
      card.style.setProperty('--about-width',`${Math.round(cw)}px`);
      card.style.setProperty('--about-height',`${Math.round(ch)}px`);
      card.style.setProperty('--about-radius',`${Math.round(23*(1-eased))}px`);
      card.style.setProperty('--about-label-scale',String(1+eased*2.7));
      card.style.setProperty('--about-label-opacity',String(1-clamp((position-.76)*3)));
    };
    if(motion){onScroll(update);update();}
    else { card.style.setProperty('--about-width','min(85vw,400px)'); }
  }

  function initSpotlight() {
    const spotlight=$('.spotlight');
    if (!spotlight || !motion || !finePointer) return;
    let pending=false,angle=0,x=0;
    spotlight.addEventListener('pointermove',e=>{
      const bounds=spotlight.getBoundingClientRect();
      x=((e.clientX-bounds.left)/bounds.width-.5)*170;
      angle=((e.clientX-bounds.left)/bounds.width-.5)*20;
      if(pending)return; pending=true;
      requestAnimationFrame(()=>{
        spotlight.style.setProperty('--light-x',`${x}px`);
        spotlight.style.setProperty('--light-rotation',`${angle}deg`);
        pending=false;
      });
    },{passive:true});
    spotlight.querySelectorAll('.magnetic').forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect();
        el.style.transform=`translate3d(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px,0)`;
      },{passive:true});
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
  }

  function initCarousel3D() {
    const stage=$('#project-carousel');
    const articles=stage?[...stage.querySelectorAll('article.project')]:[];
    if(!stage||!articles.length)return;
    const counter=$('#carousel-counter');
    const progress=$('#carousel-progress-line');
    let active=0, autoplay=0, dragStart=null, dragX=0;
    function render() {
      articles.forEach((card,i)=>{
        let delta=i-active;
        if(delta>articles.length/2)delta-=articles.length;
        if(delta<-articles.length/2)delta+=articles.length;
        const side=delta!==0;
        const isMobile=mobile();
        card.classList.toggle('is-active',!side);
        card.classList.toggle('is-side',side);
        card.style.setProperty('--card-x',isMobile?'0px':`${delta * Math.min(innerWidth*.35,470)}px`);
        card.style.setProperty('--card-z-depth',isMobile?'0px':`${-Math.abs(delta)*285}px`);
        card.style.setProperty('--card-rotation',isMobile?'0deg':`${delta * -17}deg`);
        card.style.setProperty('--card-scale',isMobile?(side?.94:1):(side?.86:1));
        card.style.setProperty('--card-opacity',isMobile?(side?0:1):(Math.abs(delta)>1?.28:1));
        card.style.setProperty('--card-gray',side?.2:0);
        card.style.setProperty('--card-z',String(8-Math.abs(delta)));
        card.style.setProperty('--card-pointer',side&&isMobile?'none':'auto');
        card.setAttribute('aria-hidden',String(side));
        // Inactive controls must not be keyboard reachable.
        card.querySelectorAll('button, a').forEach(control=>{
          if(side)control.setAttribute('tabindex','-1');
          else control.removeAttribute('tabindex');
        });
      });
      if(counter)counter.textContent=`${String(active+1).padStart(2,'0')} / ${String(articles.length).padStart(2,'0')}`;
      if(progress)progress.style.transform=`scaleX(${active+1})`;
    }
    function next(step=1) { active=(active+step+articles.length)%articles.length;render(); }
    function restart() { clearInterval(autoplay); if(motion && !document.hidden)autoplay=setInterval(()=>next(1),7200); }
    $('#carousel-prev')?.addEventListener('click',()=>{next(-1);restart();});
    $('#carousel-next')?.addEventListener('click',()=>{next(1);restart();});
    stage.addEventListener('keydown',e=>{
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
        e.preventDefault();next(e.key==='ArrowRight'?1:-1);restart();
      }
    });
    stage.addEventListener('click',e=>{
      const card=e.target.closest('article.project');
      if(!card)return;
      const index=articles.indexOf(card);
      if(index!==active){e.preventDefault();e.stopPropagation();active=index;render();restart();}
    },true);
    stage.addEventListener('pointerdown',e=>{
      if(e.target.closest('button,a'))return;
      dragStart={x:e.clientX,y:e.clientY,id:e.pointerId}; dragX=0;
    });
    stage.addEventListener('pointermove',e=>{if(dragStart&&dragStart.id===e.pointerId)dragX=e.clientX-dragStart.x;},{passive:true});
    const endDrag=e=>{
      if(!dragStart)return;
      if(Math.abs(dragX)>55) {next(dragX<0?1:-1);restart();}
      dragStart=null;dragX=0;
    };
    stage.addEventListener('pointerup',endDrag);
    stage.addEventListener('pointercancel',endDrag);
    stage.addEventListener('pointerleave',endDrag);
    stage.addEventListener('mouseenter',()=>clearInterval(autoplay));
    stage.addEventListener('mouseleave',restart);
    stage.addEventListener('focusin',()=>clearInterval(autoplay));
    stage.addEventListener('focusout',e=>{if(!stage.contains(e.relatedTarget))restart();});
    addEventListener('visibilitychange',()=>document.hidden?clearInterval(autoplay):restart());
    addEventListener('resize',render,{passive:true});
    render();restart();
  }

  function initRing() {
    const ring=$('#works-orbit-inner');
    const section=$('.transition-statement');
    if(!ring||!section||!motion)return;
    const update=()=>{
      const rect=section.getBoundingClientRect();
      const p=clamp((innerHeight-rect.top)/(innerHeight+rect.height));
      ring.style.setProperty('--ring-rotate',`${p*165}deg`);
    };
    onScroll(update);update();
  }

  function initExperience() {
    const section=$('#experience-scrollrun');
    const track=section?.querySelector('.experience-list');
    const viewport=section?.querySelector('.experience-viewport');
    const ghost=section?.querySelector('.experience-ghost');
    if(!section||!track||!viewport)return;
    const update=()=>{
      if(mobile()||!motion) {track.style.removeProperty('--exp-offset');return;}
      const rect=section.getBoundingClientRect();
      const progress=clamp(-rect.top/Math.max(1,rect.height-innerHeight));
      const travel=Math.max(0,track.scrollWidth-viewport.clientWidth);
      track.style.setProperty('--exp-offset',`${-travel*progress}px`);
      track.style.setProperty('--exp-progress',progress);
      if(ghost)ghost.style.setProperty('--exp-ghost',`${-progress*190}px`);
      const bar=$('#experience-progress-line');
      if(bar)bar.style.setProperty('--exp-progress',`${progress}`);
    };
    onScroll(update);update();
    // Preserve heading text exactly; scramble is a temporary visual effect only.
    const heading=$('#experience-heading');
    if(heading&&motion) {
      const originalNodes=[...heading.childNodes];
      const observer=new IntersectionObserver(entries=>{
        if(!entries[0]?.isIntersecting)return;
        observer.disconnect();
        const target=heading.firstChild;
        if(!target||target.nodeType!==Node.TEXT_NODE)return;
        const original=target.textContent;
        let frame=0;
        const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const timer=setInterval(()=>{
          frame++;
          target.textContent=[...original].map((c,i)=> c==='\n'||c===' '?c:(i<frame*1.4?c:chars[(i*7+frame*11)%chars.length])).join('');
          if(frame>=22){clearInterval(timer);target.textContent=original;}
        },35);
      },{threshold:.3});
      observer.observe(heading);
    }
  }

  function initDockAndChrome() {
    const dock=$('.contact-dock');
    const contact=$('#contact');
    const heading=$('#contact-heading');
    if(dock && finePointer && motion) {
      dock.addEventListener('pointermove',e=>{
        dock.querySelectorAll('a').forEach(a=>{
          const r=a.getBoundingClientRect();
          const d=Math.abs(e.clientX-(r.left+r.width/2));
          const scale=1+Math.max(0,1-d/145)*.34;
          const y=-Math.max(0,1-d/145)*9;
          a.style.setProperty('--dock-scale',scale.toFixed(3));
          a.style.setProperty('--dock-y',`${y.toFixed(1)}px`);
        });
      },{passive:true});
      dock.addEventListener('pointerleave',()=>dock.querySelectorAll('a').forEach(a=>{a.style.removeProperty('--dock-scale');a.style.removeProperty('--dock-y');}));
    }
    if(contact && heading && finePointer && motion) {
      contact.addEventListener('pointermove',e=>{
        const r=heading.getBoundingClientRect();
        const x=clamp((e.clientX-r.left)/r.width)*2-1;
        const y=clamp((e.clientY-r.top)/r.height)*2-1;
        heading.style.setProperty('--contact-tilt-y',`${(x*6).toFixed(2)}deg`);
        heading.style.setProperty('--contact-tilt-x',`${(-y*4).toFixed(2)}deg`);
      },{passive:true});
      contact.addEventListener('pointerleave',()=>{
        heading.style.setProperty('--contact-tilt-y','0deg');
        heading.style.setProperty('--contact-tilt-x','0deg');
      });
    }
  }

  initPreloader();
  initCursor();
  initSplitText();
  initHeroParallax();
  initFlowCanvas();
  initSpotlight();
  initCarousel3D();
  initRing();
  initExperience();
  initDockAndChrome();
})();
