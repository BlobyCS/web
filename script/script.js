const mobileMenuBtn = document.getElementById('mobileMenuBtn')
const mobileMenu = document.getElementById('mobileMenu')

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden')
  })
}

const API_BASE = ''

async function fetchGitHubStats() {
  try {
    const resp = await fetch(`${API_BASE}/github/stats`)
    if (!resp.ok) throw new Error('GitHub stats fetch failed')
    const data = await resp.json()
    const repoEl = document.getElementById('repoCount')
    const starEl = document.getElementById('starCount')
    const commitEl = document.getElementById('commitCount')
    if (repoEl) repoEl.textContent = data.repoCount ?? '—'
    if (starEl) starEl.textContent = data.starCount ?? '—'
    if (commitEl) commitEl.textContent = `${data.commitCount ?? 0}+`
  } catch (err) {
    const repoEl = document.getElementById('repoCount')
    const starEl = document.getElementById('starCount')
    const commitEl = document.getElementById('commitCount')
    if (repoEl) repoEl.textContent = 'N/A'
    if (starEl) starEl.textContent = 'N/A'
    if (commitEl) commitEl.textContent = 'N/A'
    console.error('fetchGitHubStats error', err)
  }
}


  // Animate cards
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  const els = document.querySelectorAll('.glass-card, .stat-card, .skill-card')
  els.forEach(el => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    observer.observe(el)
  })
})
