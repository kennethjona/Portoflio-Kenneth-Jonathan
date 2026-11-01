'use strict';

/**
 * KJ Portfolio — interaction layer
 * No libraries, services, or backend required.
 * Add real contact details only when you want them public.
 */
const CONTACT = Object.freeze({
  email: 'kennethjow23@gmail.com',
  github: '',
  instagram: 'https://www.instagram.com/knnthjo/',
  whatsapp: '6282111282900',
  linkedin: 'https://www.linkedin.com/in/kenneth-jonathan-928073424/'
});

/** Case-study copy is editable here. All claims describe the projects' real status. */
const PROJECTS = {
  fidelia: {
    category: '01 / CLIENT WEBSITE · IN PROGRESS',
    title: 'Fidelia Atelier',
    intro: 'A real website project for a beauty business. The client has approved its direction; development and refinement are still ongoing.',
    image: 'assets/images/fidelia-home.webp',
    imageAlt: 'Homepage of the Fidelia Atelier beauty lounge and academy website',
    imageCaption: 'Actual screenshot of the current publicly accessible Fidelia Atelier website.',
    sections: [
      ['The brief', 'Create an elegant, accessible digital home for Fidelia Atelier, bringing its beauty lounge, academy, service gallery, brand identity, and contact information into one clear experience.'],
      ['Business & user needs', 'Someone visiting the site should understand the services on offer, find the academy, explore the gallery, and locate a next step without searching across scattered information.'],
      ['Design approach', 'The site uses refined typography, warm neutral colors, generous whitespace, and an editorial layout chosen for the beauty brand. It is designed to respond across screen sizes.'],
      ['How I am building it', 'I am using AI tools to assist with HTML, CSS, and JavaScript development while learning to examine, adapt, debug, and improve the generated code. There is no login system or database requirement.'],
      ['Where it stands', 'The website is publicly accessible and the overall direction has been approved by the client. That does not mean every detail is finalized or the work is complete.'],
      ['What comes next', 'Continue implementation, refine smaller screen layouts, check content with the client, and improve clarity and usability through feedback.']
    ],
    links: [{ label: 'VISIT LIVE WEBSITE ↗', href: 'https://kennethjona.github.io/Fidelia-Atelier-Web/' }]
  },
  novatech: {
    category: '02 / ACADEMIC BUSINESS PROTOTYPE',
    title: 'NovaTech',
    intro: 'A school project exploring a technology-services business model, with a published concept website. It is an academic proposal, not evidence of an operating agency.',
    image: '',
    sections: [
      ['The opportunity', 'Many small businesses have digital needs but may not know which technical solutions are practical or worth investing in. NovaTech explores a service-based approach to that problem.'],
      ['Who it is for', 'The concept imagines businesses looking for a better online presence, more useful customer-service tools, or software tailored to their workflow. This is a proposed audience, not validated market traction.'],
      ['The value proposition', 'Connect practical business needs with a clear, understandable technical offering instead of leading with technology for its own sake.'],
      ['Proposed offering', 'Website development, AI customer-service concepts, bespoke software, and related automation ideas. These are proposed services, not verified commercial deliveries.'],
      ['My contribution', 'I led the school project’s direction and business planning: thinking through customer needs, positioning, potential services, and how the idea could be presented.'],
      ['What I learned', 'A compelling demo or website is only the beginning. A serious business also needs customer validation, feasibility, pricing logic, delivery capability, and earned trust.']
    ],
    links: [{ label: 'EXPLORE CONCEPT WEBSITE ↗', href: 'https://novatechcreate.netlify.app/' }]
  },
  bridge: {
    category: '03 / BUSINESS CASE COMPETITION · FINALIST',
    title: 'BRIDGE 2026',
    intro: 'Team Ratio reached the final round of BRIDGE 2026 by BINUS International. I led the team through the preparation of a case strategy for KAHI.',
    image: 'assets/images/bridge-presentation.webp',
    imageAlt: 'Team Ratio presenting at the BRIDGE 2026 business case competition',
    imageCaption: 'Actual competition photograph. A separate certificate confirms finalist status on October 24, 2026.',
    secondaryImage: 'assets/images/bridge-certificate.webp',
    secondaryImageAlt: 'Kenneth Jonathan’s BRIDGE 2026 certificate of appreciation for finalist status',
    secondaryCaption: 'Official certificate of appreciation confirming finalist status; no additional placement is claimed.',
    sections: [
      ['The challenge', 'The team examined how KAHI could move from visibility and initial sales toward more sustainable, profitable growth and consistent customer choice.'],
      ['Our approach', 'We developed a case recommendation around business analysis, consumer insights, loyalty, digital channels, and feasible implementation. We prepared to explain and defend the reasoning behind our choices.'],
      ['My contribution', 'As team leader, I helped coordinate the different parts of preparation, align our research and storytelling, and keep the presentation focused on solving the business problem.'],
      ['Collaboration', 'The work combined deck development, research, campaign content, and presentation practice. Each part needed to support the same strategic narrative.'],
      ['Confirmed outcome', 'The certificate names Kenneth Jonathan among the finalists at the Final Round of BRIDGE 2026, held October 24, 2026. No winning rank, judge score, or additional award is claimed.'],
      ['What stayed with me', 'Leadership is the work of making decisions together: setting priorities, taking feedback, and turning competing opinions into a coherent direction.']
    ],
    links: []
  },
  cipher: {
    category: '04 / PYTHON · LEARNING PROJECT',
    title: 'Caesar Cipher',
    intro: 'A small, real Python program built while learning how programming logic can transform text in a consistent, reversible way.',
    image: '',
    sections: [
      ['What a Caesar cipher is', 'It shifts alphabetic characters forward or backward through the alphabet by a fixed amount. It is useful for learning text manipulation, but it is not secure modern cryptography.'],
      ['What my code actually does', 'My program checks that the shift is an integer between 1 and 25, builds a shifted alphabet, uses str.maketrans() and translate() to transform letters, preserves uppercase and lowercase, and exposes encrypt() and decrypt() wrappers.'],
      ['One example in the file', 'The original script decrypts a ROT13 string: “Pbhentr vf sbhaq va hayvxryl cynprf.” The exercise is a practical way to see a simple rule become a reusable function.'],
      ['What I am practicing', 'Input validation, functions, branching, string slicing, mapping characters, and understanding how Python’s built-in methods can reduce repetitive code.'],
      ['Next experiments', 'Write unit tests, try more inputs and edge cases, and eventually build a small interface. These are potential next steps, not finished features.']
    ],
    links: [{ label: 'DOWNLOAD MY PYTHON SOURCE ↓', href: 'assets/source/caesar_cipher.py', download: 'caesar_cipher.py' }]
  }
};

const root = document.documentElement;
root.classList.add('js-ready');

const menuToggle = document.querySelector('#menu-toggle');
const primaryMenu = document.querySelector('#primary-menu');
const header = document.querySelector('#site-header');
const progressBar = document.querySelector('#reading-progress-bar');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function closeMenu({ restoreFocus = false } = {}) {
  if (!menuToggle || !primaryMenu) return;
  const wasOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  primaryMenu.classList.remove('open');
  if (restoreFocus && wasOpen) menuToggle.focus();
}

menuToggle?.addEventListener('click', () => {
  const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
  primaryMenu.classList.toggle('open', opening);
});

primaryMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => closeMenu());
});

document.addEventListener('click', event => {
  if (primaryMenu?.classList.contains('open') && !event.target.closest('.nav')) {
    closeMenu();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu({ restoreFocus: true });
});

window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

let scrollUpdatePending = false;
function updateScrollUI() {
  const top = window.scrollY;
  header?.classList.toggle('scrolled', top > 42);
  const total = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.transform = `scaleX(${total > 0 ? Math.min(top / total, 1) : 0})`;
  if (header) {
    const atTop = top < 42;
    const sampleY = Math.min(90, Math.max(5, window.innerHeight * .12));
    const sample = document.elementFromPoint(window.innerWidth / 2, sampleY + 10);
    header.classList.toggle('on-dark', atTop && Boolean(sample?.closest('.dark-section')));
  }
  scrollUpdatePending = false;
}
window.addEventListener('scroll', () => {
  if (!scrollUpdatePending) {
    window.requestAnimationFrame(updateScrollUI);
    scrollUpdatePending = true;
  }
}, { passive: true });
window.addEventListener('resize', updateScrollUI);
updateScrollUI();

// Reveal effects are optional; everything stays visible without JS or with reduced motion.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -30px 0px', threshold: 0.06 });
  document.querySelectorAll('[data-reveal]').forEach(element => revealObserver.observe(element));
} else {
  document.querySelectorAll('[data-reveal]').forEach(element => element.classList.add('is-visible'));
}

// Native <dialog> handles focus trapping and the Escape key.
const dialog = document.querySelector('#project-dialog');
const dialogClose = document.querySelector('#dialog-close');
const dialogCategory = document.querySelector('#dialog-category');
const dialogTitle = document.querySelector('#dialog-title');
const dialogIntro = document.querySelector('#dialog-intro');
const dialogMedia = document.querySelector('#dialog-media');
const dialogSections = document.querySelector('#dialog-sections');
const dialogLinks = document.querySelector('#dialog-links');
let previousFocus = null;

function createMedia(src, alt, caption) {
  const figure = document.createElement('figure');
  figure.className = 'case-figure';
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  const text = document.createElement('figcaption');
  text.textContent = caption;
  figure.append(img, text);
  return figure;
}

function openProject(projectId) {
  const project = PROJECTS[projectId];
  if (!project || !dialog) return;
  previousFocus = document.activeElement;

  dialogCategory.textContent = project.category;
  dialogTitle.textContent = project.title;
  dialogIntro.textContent = project.intro;
  dialogMedia.replaceChildren();
  dialogSections.replaceChildren();
  dialogLinks.replaceChildren();

  if (project.image) {
    dialogMedia.append(createMedia(project.image, project.imageAlt, project.imageCaption));
  }
  if (project.secondaryImage) {
    dialogMedia.append(createMedia(project.secondaryImage, project.secondaryImageAlt, project.secondaryCaption));
  }
  if (!project.image && !project.secondaryImage) dialogMedia.hidden = true;
  else dialogMedia.hidden = false;

  project.sections.forEach(([title, paragraph], index) => {
    const section = document.createElement('section');
    section.className = 'dialog-section';
    const heading = document.createElement('h3');
    heading.textContent = `${String(index + 1).padStart(2, '0')} / ${title}`;
    const copy = document.createElement('p');
    copy.textContent = paragraph;
    section.append(heading, copy);
    dialogSections.append(section);
  });

  project.links.forEach(({ label, href, download }) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (download) link.download = download;
    else if (/^https?:\/\//.test(href)) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    dialogLinks.append(link);
  });
  dialog.showModal();
  document.body.classList.add('dialog-open');
  dialogClose.focus();
}

function closeProject() {
  if (dialog?.open) dialog.close();
}

document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => openProject(button.dataset.project));
});
dialogClose?.addEventListener('click', closeProject);
dialog?.addEventListener('click', event => {
  if (event.target === dialog) closeProject();
});
dialog?.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (previousFocus?.isConnected) previousFocus.focus();
});

// Only show contact actions that have real, user-approved addresses or URLs.
const contactLinks = document.querySelector('#contact-links');
const contactEmpty = document.querySelector('#contact-empty');
const contactOptions = [
  { label: 'EMAIL ↗', value: CONTACT.email, url: CONTACT.email ? `mailto:${CONTACT.email}` : '' },
  { label: 'GITHUB ↗', value: CONTACT.github, url: CONTACT.github },
  { label: 'INSTAGRAM ↗', value: CONTACT.instagram, url: CONTACT.instagram },
  { label: 'WHATSAPP ↗', value: CONTACT.whatsapp, url: CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}` : '' },
  { label: 'LINKEDIN ↗', value: CONTACT.linkedin, url: CONTACT.linkedin }
];
contactOptions.forEach(({ label, value, url }) => {
  if (!value || !url || !contactLinks) return;
  const anchor = document.createElement('a');
  anchor.textContent = label;
  anchor.href = url;
  if (!url.startsWith('mailto:')) {
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
  }
  contactLinks.append(anchor);
});
if (contactEmpty && contactLinks?.children.length) contactEmpty.hidden = true;

const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = new Date().getFullYear();
document.querySelector('#back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
});
