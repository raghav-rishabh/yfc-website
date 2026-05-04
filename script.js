
  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* ── Mobile menu ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

//   hamburger.addEventListener('click', () => {
//     const isOpen = mobileMenu.classList.toggle('open');
//     hamburger.classList.toggle('open', isOpen);
//     hamburger.setAttribute('aria-expanded', String(isOpen));
//     document.body.style.overflow = isOpen ? 'hidden' : '';
//   });
//   document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));

  if (isOpen) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = scrollbarWidth + 'px';
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
  }
});


document.addEventListener('click', (e) => {
  if (
    mobileMenu.classList.contains('open') &&
    !mobileMenu.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeMobileMenu();
  }
});


window.addEventListener('scroll', () => {
  if (mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  }
}, { passive: true });




function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.paddingRight = '';
  document.body.style.overflow = '';
}



  /* ── Scroll to top ── */
  document.getElementById('scroll-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Intersection Observer — reveal animations ── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

  /* ── Machine row drag scroll ── */
  const slider = document.getElementById('machinesRow');
  let isDown = false, startX, scrollLeft;
  slider.addEventListener('mousedown',  e => { isDown = true; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
  slider.addEventListener('mouseleave', () => isDown = false);
  slider.addEventListener('mouseup',    () => isDown = false);
  slider.addEventListener('mousemove',  e => {
    if (!isDown) return;
    e.preventDefault();
    slider.scrollLeft = scrollLeft - (e.pageX - slider.offsetLeft - startX);
  });

  /* ── Video cards — hover to play ── */
  // document.querySelectorAll('.video-card').forEach(card => {
  //   const video = card.querySelector('video');
  //   if (!video) return;
  //   card.addEventListener('mouseenter', () => video.play().catch(() => {}));
  //   card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
  // });



  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

document.querySelectorAll('.video-card').forEach(card => {
  const video = card.querySelector('video');
  if (!video) return;

  if (isDesktop) {
    // 🖥️ DESKTOP → HOVER TO PLAY
    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
      // card.classList.add('playing');
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
      // card.classList.remove('playing');
    });

  } else {
    // 📱 MOBILE → CLICK TO PLAY
    card.addEventListener('click', (e) => {
  e.preventDefault();

  if (video.paused) {

    // pause all other videos
    document.querySelectorAll('.video-card video').forEach(v => {
      if (v !== video) {
        v.pause();
        v.currentTime = 0;
        v.closest('.video-card')?.classList.remove('playing');
      }
    });

    video.play().catch(() => {});
    // card.classList.add('playing');

  } else {
    video.pause();
    video.currentTime = 0;
    // card.classList.remove('playing');
  }
});
  }

  // when video ends
  video.addEventListener('ended', () => {
    card.classList.remove('playing');
  });

video.addEventListener('play', () => {
  card.classList.add('playing');
});

video.addEventListener('pause', () => {
  card.classList.remove('playing');
});

});



  /* ── Counter animation on hero stats ── */
  function animateCount(el, target, duration = 1500, suffix = '') {
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const nums = entry.target.querySelectorAll('.hero-stat-num');
      const data = [
        { val: 500, suffix: '+' },
        { val: 5,  suffix: '+' },
        { val: 100,   suffix: '%' },
        // { val: 98,  suffix: '%' },
      ];
      nums.forEach((el, i) => animateCount(el, data[i].val, 1800, data[i].suffix));
      statsObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  /* ── Smooth parallax on hero bg (desktop only) ── */
  // if (window.matchMedia('(min-width: 768px)').matches) {
  //   const heroBg = document.querySelector('.hero-bg');
  //   window.addEventListener('scroll', () => {
  //     if (!heroBg) return;
  //     heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  //   }, { passive: true });
  // }


const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
  if (!heroBg) return;

  const speed = window.innerWidth < 768 ? .3 : 0.3; 
  heroBg.style.transform = `translateY(${window.scrollY * speed}px)`;
}, { passive: true });



  document.querySelectorAll('.before-after').forEach(container => {
  const after = container.querySelector('.ba-after');
  const divider = container.querySelector('.ba-divider');

  let isDragging = false;

  const move = x => {
    const rect = container.getBoundingClientRect();
    let offset = x - rect.left;
    offset = Math.max(0, Math.min(offset, rect.width));
    const percent = (offset / rect.width) * 100;

    after.style.width = percent + '%';
    divider.style.left = percent + '%';
  };

  divider.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    move(e.clientX);
  });

  /* mobile */
  divider.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('touchend', () => isDragging = false);

  window.addEventListener('touchmove', e => {
    if (!isDragging) return;
    move(e.touches[0].clientX);
  });
});
/* ── Owner card image slideshow ── */
const ownerSlides = document.querySelectorAll('.owner-slide');

if (ownerSlides.length > 1) {
  let current = 0;
ownerSlides[0].classList.add('active');
  setInterval(() => {
    const next = (current + 1) % ownerSlides.length;

    // bring next image above
    ownerSlides[next].style.zIndex = 4;
    ownerSlides[next].classList.add('active');

    // fade out current AFTER next starts fading in
    setTimeout(() => {
      ownerSlides[current].classList.remove('active');
      ownerSlides[current].style.zIndex = 1;
      current = next;
    }, 800); // match CSS transition time

  }, 2000);
}
