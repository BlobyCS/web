export function Footer(): HTMLElement {
  const footer = document.createElement('footer');
  footer.style.cssText = [
    'width: 100%',
    'margin-top: auto',
    'padding: 1.75rem 2.5rem',
    'border-top: 1px solid rgba(255,255,255,0.08)',
    'background: #0d0d16',
    'display: flex',
    'flex-direction: column',
    'align-items: center',
    'justify-content: center',
    'text-align: center',
    'gap: 0.25rem',
  ].join(';');

  const text = document.createElement('p');
  text.style.cssText = [
    'font-family: var(--font-mono)',
    'font-size: 0.6875rem',
    'letter-spacing: 0.08em',
    'line-height: 1.8',
    'color: var(--color-text-secondary)',
    'max-width: 700px',
  ].join(';');

  text.innerHTML = [
    'Swiftly není spojen se společností Riot Games ani s jejími přidruženými subjekty.',
    '<br />',
    'VALORANT a všechny související názvy, loga a ochranné známky jsou vlastnictvím',
    ' <span style="color: var(--color-text-primary);">Riot Games, Inc.</span>',
    ' Tento web byl vytvořen jako nekomerční fan projekt pouze pro vzdělávací účely.',
  ].join('');

  const links = document.createElement('div');
  links.style.cssText = 'display: flex; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.25rem; justify-content: center; padding-bottom: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.06);';

  const termsLink = document.createElement('a');
  termsLink.setAttribute('href', '/terms');
  termsLink.style.cssText = 'font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em; color: var(--color-text-secondary); text-transform: uppercase; transition: color 150ms ease;';
  termsLink.innerHTML = '<i class="fa-solid fa-file-contract" style="margin-right: 0.4rem;"></i>Terms of Service';
  termsLink.addEventListener('mouseenter', () => { termsLink.style.color = 'var(--color-text-primary)'; });
  termsLink.addEventListener('mouseleave', () => { termsLink.style.color = 'var(--color-text-primary)'; });

  const privacyLink = document.createElement('a');
  privacyLink.setAttribute('href', '/privacy');
  privacyLink.style.cssText = 'font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em; color: var(--color-text-secondary); text-transform: uppercase; transition: color 150ms ease;';
  privacyLink.innerHTML = '<i class="fa-solid fa-shield-halved" style="margin-right: 0.4rem;"></i>Privacy Policy';
  privacyLink.addEventListener('mouseenter', () => { privacyLink.style.color = 'var(--color-text-primary)'; });
  privacyLink.addEventListener('mouseleave', () => { privacyLink.style.color = 'var(--color-text-primary)'; });

  const githubLink = document.createElement('a');
  githubLink.setAttribute('href', 'https://github.com/Swiftly/web');
  githubLink.setAttribute('target', '_blank');
  githubLink.setAttribute('rel', 'noopener noreferrer');
  githubLink.style.cssText = 'font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em; color: var(--color-text-secondary); text-transform: uppercase; transition: color 150ms ease;';
  githubLink.innerHTML = '<i class="fa-brands fa-github" style="margin-right: 0.4rem;"></i>github.com/Swiftly/web';
  githubLink.addEventListener('mouseenter', () => { githubLink.style.color = 'var(--color-text-primary)'; });
  githubLink.addEventListener('mouseleave', () => { githubLink.style.color = 'var(--color-text-primary)'; });

  links.appendChild(termsLink);
  links.appendChild(privacyLink);
  links.appendChild(githubLink);
  footer.appendChild(links);
  footer.appendChild(text);

  return footer;
}
