import { useEffect, useRef, useState } from 'react'

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [nearbySquares, setNearbySquares] = useState<Set<string>>(new Set())

  const gridSize = 80
  const highlightDistance = 120

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePos({ x, y })

      // Calculate which grid squares are nearby
      const nearby = new Set<string>()
      for (let gx = -2; gx <= 2; gx++) {
        for (let gy = -2; gy <= 2; gy++) {
          const gridX = Math.floor(x / gridSize) + gx
          const gridY = Math.floor(y / gridSize) + gy
          const centerX = gridX * gridSize + gridSize / 2
          const centerY = gridY * gridSize + gridSize / 2
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)

          if (distance < highlightDistance) {
            nearby.add(`${gridX}-${gridY}`)
          }
        }
      }
      setNearbySquares(nearby)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate visible grid squares
  const generateVisibleSquares = () => {
    const squares = []
    const cols = Math.ceil(window.innerWidth / gridSize) + 2
    const rows = Math.ceil(window.innerHeight / gridSize) + 2

    for (let y = -1; y < rows; y++) {
      for (let x = -1; x < cols; x++) {
        const gridX = Math.floor(mousePos.x / gridSize) + x - Math.floor(cols / 2)
        const gridY = Math.floor(mousePos.y / gridSize) + y - Math.floor(rows / 2)
        squares.push({ gridX, gridY, id: `${gridX}-${gridY}` })
      }
    }
    return squares
  }

  const visibleSquares = generateVisibleSquares()

  const getSquareStyle = (gridX: number, gridY: number) => {
    const left = gridX * gridSize
    const top = gridY * gridSize
    const centerX = left + gridSize / 2
    const centerY = top + gridSize / 2
    const distance = Math.sqrt((mousePos.x - centerX) ** 2 + (mousePos.y - centerY) ** 2)
    const isNearby = distance < highlightDistance
    const proximity = Math.max(0, 1 - distance / highlightDistance)

    return {
      left: `${left}px`,
      top: `${top}px`,
      opacity: isNearby ? 0.4 + proximity * 0.5 : 0.08,
      borderColor: isNearby ? `rgba(34, 211, 238, ${0.3 + proximity * 0.7})` : 'rgba(34, 211, 238, 0.15)',
      boxShadow: isNearby ? `0 0 ${20 * proximity}px rgba(34, 211, 238, ${0.3 * proximity})` : 'none',
    }
  }

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 bg-bg-primary overflow-hidden cursor-none">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />

      {/* Animated background orbs (subtle) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl mix-blend-screen"
        style={{
          right: '-150px',
          top: '-100px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          animation: 'smoothFloat 25s ease-in-out infinite',
        }}
      />

      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl mix-blend-screen"
        style={{
          left: '-100px',
          bottom: '-50px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, transparent 70%)',
          animation: 'smoothFloat 30s ease-in-out infinite reverse',
          animationDelay: '5s',
        }}
      />

      {/* Full screen grid of squares with coordinates */}
      <div className="absolute inset-0 overflow-hidden">
        {visibleSquares.map(({ gridX, gridY, id }) => {
          const style = getSquareStyle(gridX, gridY)
          const isNearby = nearbySquares.has(id)

          return (
            <div
              key={id}
              className="absolute transition-all duration-100 flex items-center justify-center"
              style={{
                width: `${gridSize}px`,
                height: `${gridSize}px`,
                left: style.left,
                top: style.top,
                border: `1px solid ${isNearby ? 'rgba(34, 211, 238, 0.6)' : 'rgba(34, 211, 238, 0.15)'}`,
                opacity: style.opacity as number,
                boxShadow: style.boxShadow as string,
              }}
            >
              {/* Show coordinates when nearby */}
              {isNearby && (
                <div
                  className="text-xs font-mono font-bold text-center select-none pointer-events-none"
                  style={{
                    color: 'rgba(34, 211, 238, 0.8)',
                    textShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
                    lineHeight: '1.2',
                    letterSpacing: '0.5px',
                  }}
                >
                  <div>X:{gridX}</div>
                  <div>Y:{gridY}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>



      {/* Scan line effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(34, 211, 238, 0.03) 0px, rgba(34, 211, 238, 0.03) 1px, transparent 1px, transparent 2px)',
          animation: 'scanlines 8s linear infinite',
        }}
      />
    </div>
  )
}
