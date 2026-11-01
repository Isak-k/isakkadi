import { useEffect, useRef } from 'react'

interface CosmicParticle {
  x: number
  y: number
  velocityX: number
  velocityY: number
  radius: number
  depth: number
  color: string
  opacity: number
  twinkleSpeed: number
  twinklePhase: number
  shape: 'circle' | 'square'
  glow: boolean
  hasSpikes: boolean
}

interface CosmicRipple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  color: string
}

interface ClickSparkle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  color: string
}

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  angle: number
  life: number
  maxLife: number
  color: string
}

const STAR_COLORS = [
  '#FFFFFF', // Diamond Pure White
  '#E0F2FE', // Icy Blue-White
  '#93C5FD', // Soft Stellar Blue
  '#67E8F9', // Electric Cyan
  '#C084FC', // Cosmic Purple / Violet
  '#FDE68A', // Warm Amber Gold
]

// Speed increased by 30% more (multiplied by 1.30)
const SPEED_SCALE = 1.3

function createParticle(width: number, height: number): CosmicParticle {
  const depth = 0.12 + Math.random() * 0.88
  // Previous speed multiplied by 1.3 for 30% faster drift
  const speed = (0.5 + Math.random() * 2.6) * 1.43 * 1.3 * SPEED_SCALE
  const angle = Math.random() * Math.PI * 2

  const colorRoll = Math.random()
  const color =
    colorRoll < 0.46
      ? STAR_COLORS[0]
      : colorRoll < 0.64
      ? STAR_COLORS[1]
      : colorRoll < 0.77
      ? STAR_COLORS[2]
      : colorRoll < 0.88
      ? STAR_COLORS[3]
      : colorRoll < 0.95
      ? STAR_COLORS[4]
      : STAR_COLORS[5]

  // Rich mixture of star sizes:
  // 46% tiny/needlepoint stars (0.35 - 0.80px)
  // 30% small stars (0.80 - 1.40px)
  // 16% medium stars (1.45 - 2.25px)
  // 8%  bigger prominent hero stars (2.40 - 3.70px) with radiant glow & diffraction spikes
  const sizeRoll = Math.random()
  let radius: number
  let glow = false
  let hasSpikes = false

  if (sizeRoll < 0.46) {
    // Little / needlepoint stars
    radius = 0.35 + depth * 0.42 + Math.random() * 0.2
  } else if (sizeRoll < 0.76) {
    // Small stars
    radius = 0.8 + depth * 0.5 + Math.random() * 0.25
  } else if (sizeRoll < 0.92) {
    // Medium stars
    radius = 1.45 + depth * 0.75
    glow = depth > 0.45 && Math.random() < 0.35
  } else {
    // Bigger hero stars
    radius = 2.4 + depth * 1.25
    glow = true
    hasSpikes = depth > 0.5 && Math.random() < 0.75
  }

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    velocityX: (Math.cos(angle) * speed + 0.35) * SPEED_SCALE,
    velocityY: (Math.sin(angle) * speed + 0.3) * SPEED_SCALE,
    radius,
    depth,
    color,
    opacity: 0.18 + Math.random() * 0.65,
    twinkleSpeed: 0.45 + Math.random() * 1.35,
    twinklePhase: Math.random() * Math.PI * 2,
    shape: Math.random() < 0.05 ? 'square' : 'circle',
    glow,
    hasSpikes,
  }
}

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const particles: CosmicParticle[] = []
    const ripples: CosmicRipple[] = []
    const sparkles: ClickSparkle[] = []
    let shootingStar: ShootingStar | null = null
    let nextShootingStarTime = performance.now() + 2500 + Math.random() * 4000

    let width = 0
    let height = 0
    let pixelRatio = 1
    let animationFrame = 0
    let lastTimestamp = 0

    // Pointer coordinates
    let pointerX = 0
    let pointerY = 0
    let parallaxX = 0
    let parallaxY = 0
    let cursorX = -1000
    let cursorY = -1000
    let smoothCursorX = -1000
    let smoothCursorY = -1000
    let hasCursor = false

    let isVisible = document.visibilityState === 'visible'

    const particleCount = () => {
      const mobile = window.matchMedia('(max-width: 767px)').matches
      const density = mobile ? 1600 : 800
      const minimum = mobile ? 450 : 950
      const maximum = mobile ? 900 : 2200
      return Math.min(maximum, Math.max(minimum, Math.round((width * height) / density)))
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const targetCount = particleCount()
      while (particles.length < targetCount) {
        particles.push(createParticle(width, height))
      }
      particles.length = targetCount

      if (reducedMotion.matches || !isVisible) draw(0, 0)
    }

    const triggerShootingStar = () => {
      const startX = Math.random() * (width * 0.8) + width * 0.1
      const startY = Math.random() * (height * 0.4)
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.4 // Streaking diagonally down-right
      const speed = 750 + Math.random() * 450
      const length = 90 + Math.random() * 90
      const maxLife = 0.75 + Math.random() * 0.45

      const colors = ['#FFFFFF', '#67E8F9', '#93C5FD', '#E0F2FE']
      const color = colors[Math.floor(Math.random() * colors.length)]

      shootingStar = {
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        life: 0,
        maxLife,
        color,
      }
    }

    const spawnRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 4,
        maxRadius: Math.min(180, Math.max(width, height) * 0.15),
        opacity: 0.7,
        color: Math.random() < 0.5 ? '#67E8F9' : '#A78BFA',
      })

      // Spawn subtle sparkles
      const sparkleCount = 6 + Math.floor(Math.random() * 4)
      for (let i = 0; i < sparkleCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 40 + Math.random() * 90
        sparkles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 0.8 + Math.random() * 1.4,
          life: 0,
          maxLife: 0.5 + Math.random() * 0.4,
          color: Math.random() < 0.6 ? '#67E8F9' : '#FFFFFF',
        })
      }
    }

    const drawNebulaGlows = (elapsed: number) => {
      // Atmospheric deep space nebulae clouds that shift subtly with parallax
      const nebula1X = width * 0.8 + parallaxX * 25 + Math.sin(elapsed * 0.12) * 20
      const nebula1Y = height * 0.2 + parallaxY * 25 + Math.cos(elapsed * 0.12) * 20
      const grad1 = context.createRadialGradient(nebula1X, nebula1Y, 0, nebula1X, nebula1Y, width * 0.38)
      grad1.addColorStop(0, 'rgba(102, 133, 255, 0.055)')
      grad1.addColorStop(0.5, 'rgba(168, 85, 247, 0.025)')
      grad1.addColorStop(1, 'rgba(5, 7, 22, 0)')
      context.fillStyle = grad1
      context.fillRect(0, 0, width, height)

      const nebula2X = width * 0.2 + parallaxX * -20 + Math.cos(elapsed * 0.15) * 25
      const nebula2Y = height * 0.75 + parallaxY * -20 + Math.sin(elapsed * 0.15) * 25
      const grad2 = context.createRadialGradient(nebula2X, nebula2Y, 0, nebula2X, nebula2Y, width * 0.42)
      grad2.addColorStop(0, 'rgba(103, 232, 249, 0.045)')
      grad2.addColorStop(0.6, 'rgba(99, 102, 241, 0.02)')
      grad2.addColorStop(1, 'rgba(5, 7, 22, 0)')
      context.fillStyle = grad2
      context.fillRect(0, 0, width, height)
    }

    const draw = (elapsed: number, delta: number) => {
      context.clearRect(0, 0, width, height)

      // Parallax smoothing
      parallaxX += (pointerX - parallaxX) * 0.03
      parallaxY += (pointerY - parallaxY) * 0.03

      if (hasCursor) {
        smoothCursorX += (cursorX - smoothCursorX) * 0.12
        smoothCursorY += (cursorY - smoothCursorY) * 0.12
      }

      // Draw subtle dynamic cosmic nebulae
      if (!reducedMotion.matches) {
        drawNebulaGlows(elapsed)
      }

      // Cursor aura glow
      if (hasCursor && !reducedMotion.matches) {
        const aura = context.createRadialGradient(
          smoothCursorX,
          smoothCursorY,
          0,
          smoothCursorX,
          smoothCursorY,
          160
        )
        aura.addColorStop(0, 'rgba(103, 232, 249, 0.09)')
        aura.addColorStop(0.4, 'rgba(147, 197, 253, 0.045)')
        aura.addColorStop(0.8, 'rgba(168, 85, 247, 0.015)')
        aura.addColorStop(1, 'rgba(5, 7, 22, 0)')
        context.fillStyle = aura
        context.beginPath()
        context.arc(smoothCursorX, smoothCursorY, 160, 0, Math.PI * 2)
        context.fill()
      }

      // Process Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        r.radius += (r.maxRadius - r.radius) * 0.09 + 1.2
        r.opacity *= 0.94

        if (r.opacity < 0.02 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1)
          continue
        }

        context.beginPath()
        context.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        context.strokeStyle = r.color
        context.globalAlpha = r.opacity
        context.lineWidth = 1.2
        context.shadowColor = r.color
        context.shadowBlur = 8
        context.stroke()
        context.shadowBlur = 0
        context.globalAlpha = 1
      }

      // Process Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i]
        sp.life += delta
        if (sp.life >= sp.maxLife) {
          sparkles.splice(i, 1)
          continue
        }
        sp.x += sp.vx * delta
        sp.y += sp.vy * delta
        sp.vx *= 0.95
        sp.vy *= 0.95

        const spProgress = sp.life / sp.maxLife
        const spAlpha = Math.sin(spProgress * Math.PI) * 0.8
        context.globalAlpha = spAlpha
        context.fillStyle = sp.color
        context.beginPath()
        context.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2)
        context.fill()
        context.globalAlpha = 1
      }

      // Active interactive stars near cursor (for constellation lines)
      const nearCursorStars: { x: number; y: number; dist: number; color: string }[] = []

      // Draw Stars
      for (const particle of particles) {
        if (!reducedMotion.matches && delta > 0) {
          particle.x += particle.velocityX * delta * particle.depth
          particle.y += particle.velocityY * delta * particle.depth

          if (particle.x < -4) particle.x = width + 4
          else if (particle.x > width + 4) particle.x = -4
          if (particle.y < -4) particle.y = height + 4
          else if (particle.y > height + 4) particle.y = -4
        }

        // Base coordinates with parallax
        let x = particle.x + parallaxX * particle.depth * 14
        let y = particle.y + parallaxY * particle.depth * 14

        // Mouse interaction: fluid magnetic deflection & brightening
        let mouseBoostAlpha = 0
        if (hasCursor && !reducedMotion.matches) {
          const dx = x - smoothCursorX
          const dy = y - smoothCursorY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const interactRadius = 140

          if (dist < interactRadius && dist > 1) {
            const factor = (1 - dist / interactRadius)
            const push = factor * 14 * particle.depth
            x += (dx / dist) * push
            y += (dy / dist) * push
            mouseBoostAlpha = factor * 0.45

            if (nearCursorStars.length < 18 && particle.radius > 0.7) {
              nearCursorStars.push({ x, y, dist, color: particle.color })
            }
          }
        }

        const twinkle = reducedMotion.matches
          ? 1
          : 0.65 + Math.sin(elapsed * particle.twinkleSpeed + particle.twinklePhase) * 0.35
        const alpha = Math.min(1, (particle.opacity * (0.45 + particle.depth * 0.55) * twinkle) + mouseBoostAlpha)
        const size = particle.radius

        context.globalAlpha = alpha

        if (particle.glow) {
          context.shadowColor = particle.color
          context.shadowBlur = size * 3.5
        }

        if (particle.shape === 'square') {
          context.fillStyle = particle.color
          context.fillRect(x - size / 2, y - size / 2, size, size)
        } else {
          context.beginPath()
          context.arc(x, y, size, 0, Math.PI * 2)
          context.fillStyle = particle.color
          context.fill()
        }

        // 4-point diffraction sparkle spikes for prominent hero stars
        if (particle.hasSpikes && !reducedMotion.matches && alpha > 0.45) {
          const spikeLen = size * (2.2 + Math.sin(elapsed * particle.twinkleSpeed + particle.twinklePhase) * 0.8)
          context.strokeStyle = particle.color
          context.lineWidth = 0.55
          context.beginPath()
          context.moveTo(x - spikeLen, y)
          context.lineTo(x + spikeLen, y)
          context.moveTo(x, y - spikeLen)
          context.lineTo(x, y + spikeLen)
          context.stroke()
        }

        context.shadowBlur = 0
      }

      // Constellation lines near cursor
      if (hasCursor && nearCursorStars.length > 1 && !reducedMotion.matches) {
        context.lineWidth = 0.65
        for (let i = 0; i < nearCursorStars.length; i++) {
          const s1 = nearCursorStars[i]

          // Subtle link to mouse cursor
          const cursorLineAlpha = (1 - s1.dist / 140) * 0.22
          context.strokeStyle = s1.color
          context.globalAlpha = cursorLineAlpha
          context.beginPath()
          context.moveTo(s1.x, s1.y)
          context.lineTo(smoothCursorX, smoothCursorY)
          context.stroke()

          // Links between nearby stars
          for (let j = i + 1; j < nearCursorStars.length; j++) {
            const s2 = nearCursorStars[j]
            const dx = s1.x - s2.x
            const dy = s1.y - s2.y
            const distStars = Math.sqrt(dx * dx + dy * dy)

            if (distStars < 75) {
              const lineAlpha = (1 - distStars / 75) * 0.2
              context.strokeStyle = '#67E8F9'
              context.globalAlpha = lineAlpha
              context.beginPath()
              context.moveTo(s1.x, s1.y)
              context.lineTo(s2.x, s2.y)
              context.stroke()
            }
          }
        }
      }

      // Process Shooting Star
      const now = performance.now()
      if (!shootingStar && now > nextShootingStarTime && !reducedMotion.matches) {
        triggerShootingStar()
        nextShootingStarTime = now + 4000 + Math.random() * 5500
      }

      if (shootingStar && !reducedMotion.matches) {
        shootingStar.life += delta
        if (shootingStar.life >= shootingStar.maxLife) {
          shootingStar = null
        } else {
          const progress = shootingStar.life / shootingStar.maxLife
          const travel = shootingStar.speed * delta
          shootingStar.x += Math.cos(shootingStar.angle) * travel
          shootingStar.y += Math.sin(shootingStar.angle) * travel

          // Fade in then fade out
          const starAlpha = Math.sin(progress * Math.PI) * 0.95
          const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length
          const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length

          const grad = context.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y)
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)')
          grad.addColorStop(0.7, 'rgba(103, 232, 249, 0.4)')
          grad.addColorStop(1, 'rgba(255, 255, 255, 1)')

          context.strokeStyle = grad
          context.lineWidth = 1.4
          context.globalAlpha = starAlpha
          context.shadowColor = shootingStar.color
          context.shadowBlur = 10
          context.beginPath()
          context.moveTo(tailX, tailY)
          context.lineTo(shootingStar.x, shootingStar.y)
          context.stroke()

          // Glowing head of shooting star
          context.fillStyle = '#FFFFFF'
          context.beginPath()
          context.arc(shootingStar.x, shootingStar.y, 1.8, 0, Math.PI * 2)
          context.fill()
          context.shadowBlur = 0
        }
      }

      context.globalAlpha = 1
    }

    const animate = (timestamp: number) => {
      if (!isVisible) return
      const delta = lastTimestamp ? Math.min((timestamp - lastTimestamp) / 1000, 0.05) : 0
      lastTimestamp = timestamp
      draw(timestamp / 1000, delta)

      if (!reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(animate)
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      hasCursor = true
      cursorX = event.clientX
      cursorY = event.clientY
      if (smoothCursorX < -500) {
        smoothCursorX = cursorX
        smoothCursorY = cursorY
      }
      pointerX = (event.clientX / width - 0.5) * 2
      pointerY = (event.clientY / height - 0.5) * 2
    }

    const handlePointerLeave = () => {
      hasCursor = false
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!reducedMotion.matches) {
        spawnRipple(event.clientX, event.clientY)
      }
    }

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible'
      window.cancelAnimationFrame(animationFrame)
      lastTimestamp = 0

      if (isVisible) {
        animate(performance.now())
      }
    }

    const handleMotionPreferenceChange = () => {
      window.cancelAnimationFrame(animationFrame)
      lastTimestamp = 0
      if (isVisible) animate(performance.now())
    }

    resize()
    if (isVisible) animate(performance.now())

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave)
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    reducedMotion.addEventListener('change', handleMotionPreferenceChange)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      window.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      reducedMotion.removeEventListener('change', handleMotionPreferenceChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="cosmic-background"
    />
  )
}
