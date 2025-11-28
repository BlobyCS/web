const mobileMenuBtn = document.getElementById('mobileMenuBtn')
const mobileMenu = document.getElementById('mobileMenu')

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function() {
    if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden')
    } else {
      mobileMenu.classList.add('hidden')
    }
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

let nowPlayingState = null
let rafId = null

function msToMMSS(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

async function fetchNowPlaying() {
  try {
    const resp = await fetch(`${API_BASE}/spotify/now-playing`)
    if (!resp.ok) throw new Error('Now playing fetch failed')
    const json = await resp.json()
    if (!json.playing) {
      nowPlayingState = { is_playing: false }
      renderNowPlaying()
      return
    }
    nowPlayingState = {
      fetched_at: Date.now(),
      timestamp: json.timestamp || Date.now(),
      progress_ms: json.progress_ms || 0,
      duration_ms: json.duration_ms || 0,
      track: json.track || null,
      is_playing: Boolean(json.playing)
    }
    renderNowPlaying()
  } catch (err) {
    nowPlayingState = null
    renderNowPlayingError()
    console.error('fetchNowPlaying error', err)
  }
}

function renderNowPlayingError() {
  const trackEl = document.getElementById('spotifyTrack')
  const artistEl = document.getElementById('spotifyArtist')
  const albumImg = document.getElementById('spotifyAlbumImage')
  const progressBar = document.getElementById('spotifyProgress')
  const timeEl = document.getElementById('spotifyTime')
  if (trackEl) trackEl.textContent = 'Nelze načíst data'
  if (artistEl) artistEl.textContent = ''
  if (albumImg) albumImg.src = ''
  if (timeEl) timeEl.textContent = ''
  if (progressBar) progressBar.style.width = '0%'
  cancelAnimationFrame(rafId)
}

function renderNowPlaying() {
  cancelAnimationFrame(rafId)
  const trackEl = document.getElementById('spotifyTrack')
  const artistEl = document.getElementById('spotifyArtist')
  const albumImg = document.getElementById('spotifyAlbumImage')
  const progressBar = document.getElementById('spotifyProgress')
  const timeEl = document.getElementById('spotifyTime')

  if (!nowPlayingState || !nowPlayingState.is_playing) {
    if (trackEl) trackEl.textContent = 'Nic se právě nehraje'
    if (artistEl) artistEl.textContent = ''
    if (albumImg) albumImg.src = ''
    if (timeEl) timeEl.textContent = '0:00 / 0:00'
    if (progressBar) progressBar.style.width = '0%'
    return
  }

  const track = nowPlayingState.track
  if (trackEl && track) trackEl.textContent = track.name
  if (artistEl && track) artistEl.textContent = track.artists
  if (albumImg && track && track.albumImage) albumImg.src = track.albumImage

  function tick() {
    const now = Date.now()
    const elapsed = now - (nowPlayingState.fetched_at - (nowPlayingState.progress_ms || 0))
    const progress = Math.max(0, Math.min(elapsed, nowPlayingState.duration_ms || 0))
    const pct = nowPlayingState.duration_ms ? (progress / nowPlayingState.duration_ms) * 100 : 0
    if (progressBar) progressBar.style.width = `${pct}%`
    if (timeEl) timeEl.textContent = `${msToMMSS(progress)} / ${msToMMSS(nowPlayingState.duration_ms || 0)}`
    if (progress < (nowPlayingState.duration_ms || 0) && nowPlayingState.is_playing) {
      rafId = requestAnimationFrame(tick)
    } else {
      cancelAnimationFrame(rafId)
    }
  }

  rafId = requestAnimationFrame(tick)
}

document.addEventListener('DOMContentLoaded', function() {
  fetchGitHubStats()
  fetchNowPlaying()
  setInterval(fetchGitHubStats, 60 * 1000)
  setInterval(fetchNowPlaying, 15 * 1000)

  const anchors = document.querySelectorAll('a[href^="#"]')
  anchors.forEach(function(a) {
    a.addEventListener('click', function(e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  })

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

  const els = document.querySelectorAll('.glass-card, .stat-card, .skill-card')
  els.forEach(function(el) {
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    observer.observe(el)
  })

  const refreshBtn = document.getElementById('refreshSpotify')
  if (refreshBtn) {
    refreshBtn.addEventListener('click', function() {
      fetchNowPlaying()
    })
  }

  const loginBtn = document.querySelector('a[href="/login"], a[href="http://bloby.eu/login"], a[href="http://localhost:3000/login"]')
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
    })
  }
})
