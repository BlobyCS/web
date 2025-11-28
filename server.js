import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cors from 'cors'
import querystring from 'querystring'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

dotenv.config()

const CLIENT_ID = process.env.SPOTIFY_CLIENT
const CLIENT_SECRET = process.env.SPOTIFY_SECRET
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const PORT = process.env.PORT || 3000

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
  console.error('Missing SPOTIFY_CLIENT / SPOTIFY_SECRET / SPOTIFY_REDIRECT in .env')
  process.exit(1)
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(process.cwd(), 'public')))

const TOKENS_FILE = path.join(process.cwd(), 'spotify_tokens.json')

function loadTokens() {
  try {
    if (!fs.existsSync(TOKENS_FILE)) return {}
    const raw = fs.readFileSync(TOKENS_FILE, 'utf8')
    return JSON.parse(raw || '{}')
  } catch (e) {
    console.error('Failed to load tokens file', e)
    return {}
  }
}

function saveTokens(obj) {
  try {
    fs.writeFileSync(TOKENS_FILE, JSON.stringify(obj, null, 2))
  } catch (e) {
    console.error('Failed to save tokens file', e)
  }
}

function base64ClientAuth() {
  return Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
}

async function exchangeCodeForTokens(code) {
  const body = new URLSearchParams()
  body.append('grant_type', 'authorization_code')
  body.append('code', code)
  body.append('redirect_uri', REDIRECT_URI)

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64ClientAuth()}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => '')
    throw new Error(`Token exchange failed ${res.status} ${errBody}`)
  }

  const data = await res.json()
  const tokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + (data.expires_in || 3600) * 1000
  }
  saveTokens(tokens)
  return tokens
}

async function refreshAccessTokenIfNeeded() {
  const tokens = loadTokens()
  if (!tokens.refresh_token) throw new Error('No refresh_token stored. Open /login and authorize once.')
  if (tokens.access_token && tokens.expires_at && Date.now() < tokens.expires_at - 5000) {
    return tokens.access_token
  }

  const body = new URLSearchParams()
  body.append('grant_type', 'refresh_token')
  body.append('refresh_token', tokens.refresh_token)

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${base64ClientAuth()}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => '')
    throw new Error(`Refresh token failed ${res.status} ${errBody}`)
  }

  const data = await res.json()
  const newTokens = {
    refresh_token: data.refresh_token || tokens.refresh_token,
    access_token: data.access_token,
    expires_at: Date.now() + (data.expires_in || 3600) * 1000
  }
  saveTokens(newTokens)
  return newTokens.access_token
}

function generateState() {
  return crypto.randomBytes(12).toString('hex')
}

app.get('/login', (req, res) => {
  const scope = [
    'user-read-currently-playing',
    'user-read-playback-state'
  ].join(' ')
  const state = generateState()
  const params = querystring.stringify({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope,
    redirect_uri: REDIRECT_URI,
    state,
    show_dialog: 'true'
  })
  res.redirect(`https://accounts.spotify.com/authorize?${params}`)
})

app.get('/callback', async (req, res) => {
  try {
    const code = req.query.code
    if (!code) return res.status(400).json({ error: 'Missing code' })
    const tokens = await exchangeCodeForTokens(code)
    return res.json({
      success: true,
      stored: Boolean(tokens.refresh_token),
      expires_at: tokens.expires_at
    })
  } catch (err) {
    console.error('Callback error', err)
    return res.status(500).json({ error: err.message })
  }
})

app.get('/spotify/now-playing', async (req, res) => {
  try {
    const accessToken = await refreshAccessTokenIfNeeded()
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    })

    if (response.status === 204) return res.json({ playing: false })
    if (response.status === 401) {
      await refreshAccessTokenIfNeeded()
      return res.status(502).json({ error: 'Unauthorized, token refresh attempted. Try again.' })
    }
    if (!response.ok) {
      const txt = await response.text().catch(() => '')
      return res.status(response.status).json({ error: txt || 'Spotify API error' })
    }

    const data = await response.json()
    if (!data || !data.item) return res.json({ playing: false })

    const item = data.item
    const albumImage = item.album && item.album.images && item.album.images.length ? item.album.images[0].url : null
    const artists = item.artists ? item.artists.map(a => a.name).join(', ') : ''
    const device = data.device ? { id: data.device.id, name: data.device.name, type: data.device.type } : null

    return res.json({
      playing: Boolean(data.is_playing),
      progress_ms: data.progress_ms || 0,
      duration_ms: item.duration_ms || null,
      track: {
        id: item.id,
        name: item.name,
        artists,
        album: item.album ? item.album.name : null,
        albumImage,
        external_urls: item.external_urls || null
      },
      device,
      timestamp: Date.now()
    })
  } catch (err) {
    console.error('Now playing error', err)
    return res.status(500).json({ error: err.message })
  }
})

app.get('/spotify/logout', (req, res) => {
  try {
    if (fs.existsSync(TOKENS_FILE)) fs.unlinkSync(TOKENS_FILE)
    return res.json({ ok: true })
  } catch (err) {
    console.error('Logout error', err)
    return res.status(500).json({ error: err.message })
  }
})

app.get('/github/stats', async (req, res) => {
  try {
    const reposRes = await fetch('https://api.github.com/users/Bloby22/repos?per_page=100', {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    })
    const repos = await reposRes.json()
    const repoCount = Array.isArray(repos) ? repos.length : 0
    const starCount = Array.isArray(repos) ? repos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0) : 0

    const eventsRes = await fetch('https://api.github.com/users/Bloby22/events/public?per_page=100', {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    })
    const events = await eventsRes.json()
    const pushEvents = Array.isArray(events) ? events.filter(e => e.type === 'PushEvent') : []
    const commitCount = pushEvents.reduce((total, event) => {
      return total + (event.payload && event.payload.commits ? event.payload.commits.length : 0)
    }, 0)

    return res.json({
      repoCount,
      starCount,
      commitCount
    })
  } catch (err) {
    console.error('GitHub stats error', err)
    return res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
  console.log(`Open /login to authorize one Spotify account (redirect URI: ${REDIRECT_URI})`)
})
