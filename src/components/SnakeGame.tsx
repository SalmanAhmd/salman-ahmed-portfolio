import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'
import {
  advanceSnake,
  BOARD_SIZE,
  createSnakeGame,
  isOppositeDirection,
  type Direction,
  type Point,
  type SnakeGameState,
} from './snakeEngine'

const HIGH_SCORE_KEY = 'salman-portfolio-snake-best'

function readBestScore(): number {
  try {
    const saved = Number(window.localStorage.getItem(HIGH_SCORE_KEY))
    return Number.isFinite(saved) && saved > 0 ? saved : 0
  } catch {
    return 0
  }
}

function getSpeed(score: number): number {
  return Math.max(75, 145 - Math.floor(score / 50) * 10)
}

const DIRECTION_KEYS: Record<string, Direction> = {
  ArrowUp: 'up',
  w: 'up',
  W: 'up',
  ArrowDown: 'down',
  s: 'down',
  S: 'down',
  ArrowLeft: 'left',
  a: 'left',
  A: 'left',
  ArrowRight: 'right',
  d: 'right',
  D: 'right',
}

const DIRECTION_GLYPHS: Record<Direction, string> = {
  up: '↑',
  down: '↓',
  left: '←',
  right: '→',
}

function createPositionMap(snake: Point[], food: Point | null): Map<string, 'head' | 'body' | 'food'> {
  const positions = new Map<string, 'head' | 'body' | 'food'>()
  snake.forEach((point, index) => {
    positions.set(`${point.x},${point.y}`, index === 0 ? 'head' : 'body')
  })
  if (food) positions.set(`${food.x},${food.y}`, 'food')
  return positions
}

export default function SnakeGame() {
  const [game, setGame] = useState<SnakeGameState>(() => createSnakeGame())
  const [bestScore, setBestScore] = useState(readBestScore)
  const gameRef = useRef(game)
  const directionRef = useRef<Direction>('right')
  const queuedDirectionRef = useRef<Direction>('right')
  const hasQueuedTurnRef = useRef(false)
  const boardRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<Point | null>(null)

  const updateGame = useCallback((next: SnakeGameState) => {
    gameRef.current = next
    setGame(next)
  }, [])

  const startGame = useCallback(() => {
    const next = { ...createSnakeGame(), status: 'RUNNING' as const }
    directionRef.current = 'right'
    queuedDirectionRef.current = 'right'
    hasQueuedTurnRef.current = false
    updateGame(next)
    boardRef.current?.focus()
  }, [updateGame])

  const setStatus = useCallback((status: SnakeGameState['status']) => {
    updateGame({ ...gameRef.current, status })
  }, [updateGame])

  const togglePause = useCallback(() => {
    const status = gameRef.current.status
    if (status === 'RUNNING') setStatus('PAUSED')
    else if (status === 'PAUSED') setStatus('RUNNING')
    else if (status === 'READY' || status === 'GAME OVER') startGame()
  }, [setStatus, startGame])

  const requestDirection = useCallback((direction: Direction) => {
    if (gameRef.current.status !== 'RUNNING' || hasQueuedTurnRef.current) return
    if (direction === queuedDirectionRef.current) return
    if (isOppositeDirection(queuedDirectionRef.current, direction)) return

    queuedDirectionRef.current = direction
    hasQueuedTurnRef.current = true
  }, [])

  useEffect(() => {
    if (game.status !== 'RUNNING') return

    const timer = window.setInterval(() => {
      directionRef.current = queuedDirectionRef.current
      hasQueuedTurnRef.current = false
      const next = advanceSnake(gameRef.current, directionRef.current)
      if (next.score > bestScore) {
        setBestScore(next.score)
        try {
          window.localStorage.setItem(HIGH_SCORE_KEY, String(next.score))
        } catch {
          // Keep the updated best score in memory when storage is unavailable.
        }
      }
      updateGame(next)
    }, getSpeed(game.score))

    return () => window.clearInterval(timer)
  }, [bestScore, game.score, game.status, updateGame])

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden' && gameRef.current.status === 'RUNNING') {
        setStatus('PAUSED')
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [setStatus])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const direction = DIRECTION_KEYS[event.key]
    if (direction) {
      event.preventDefault()
      requestDirection(direction)
      return
    }

    if (event.code === 'Space') {
      event.preventDefault()
      togglePause()
    } else if (event.key === 'Enter' && gameRef.current.status !== 'RUNNING') {
      event.preventDefault()
      if (gameRef.current.status === 'PAUSED') setStatus('RUNNING')
      else startGame()
    }
  }

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current
    const touch = event.changedTouches[0]
    touchStartRef.current = null
    if (!start) return

    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return
    requestDirection(
      Math.abs(dx) > Math.abs(dy)
        ? dx > 0 ? 'right' : 'left'
        : dy > 0 ? 'down' : 'up',
    )
  }

  const positions = createPositionMap(game.snake, game.food)
  const statusMessage = {
    READY: '> COLLECT FOOD. AVOID COLLISIONS.',
    RUNNING: game.score >= 50 ? '> NICE PACE. KEEP THE LOOP CLEAN.' : '> PROCESS RUNNING...',
    PAUSED: '> SYSTEM PAUSED',
    'GAME OVER': '> GAME OVER — PROCESS TERMINATED',
  }[game.status]

  return (
    <section className="overflow-hidden rounded-xl border border-line-dark bg-[#101113] text-white shadow-[0_24px_70px_-38px_rgba(0,0,0,0.65)]">
      <div className="border-b border-line-dark px-5 py-5 sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400">
              <span className="mr-2 text-white/30">[01]</span>SNAKE.EXE
            </p>
            <p className="mt-2 font-mono text-xs text-white/45">A tiny game. A quick break.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5">
            <span
              aria-hidden
              className={`h-1.5 w-1.5 rounded-full ${
                game.status === 'RUNNING' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' :
                  game.status === 'GAME OVER' ? 'bg-rose-400' : 'bg-white/35'
              }`}
            />
            <span aria-live="polite" aria-atomic="true" className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
              {game.status}
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Score</p>
            <p aria-live="polite" className="mt-1 font-mono text-xl tabular-nums text-white">{game.score}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Best</p>
            <p className="mt-1 font-mono text-xl tabular-nums text-emerald-300">{bestScore}</p>
          </div>
          <div className="col-span-2 flex items-center sm:ml-auto">
            <p className="font-mono text-[10px] text-white/40" aria-live="polite">{statusMessage}</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-7">
        <div className="mx-auto w-full max-w-[520px]">
          <div
            ref={boardRef}
            role="application"
            aria-label="Snake game board. Focus this board and use arrow keys or W A S D to move. Space pauses the game."
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onClick={() => boardRef.current?.focus()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="snake-board relative grid aspect-square overflow-hidden rounded-md border border-white/10 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101113]"
            style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
              const x = index % BOARD_SIZE
              const y = Math.floor(index / BOARD_SIZE)
              const type = positions.get(`${x},${y}`)
              return (
                <span key={index} aria-hidden className="flex items-center justify-center p-[1px]">
                  {type === 'body' ? (
                    <span className="h-full w-full rounded-[3px] bg-emerald-500/75 shadow-[0_0_8px_rgba(16,185,129,0.16)]" />
                  ) : type === 'head' ? (
                    <span className="flex h-full w-full items-center justify-center rounded-[4px] bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.45)]">
                      <span className="h-1 w-1 rounded-full bg-[#101113]" />
                    </span>
                  ) : type === 'food' ? (
                    <span className="h-[58%] w-[58%] rotate-45 rounded-[2px] bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.42)]" />
                  ) : null}
                </span>
              )
            })}

            {game.status !== 'RUNNING' ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#101113]/75 p-5 text-center backdrop-blur-[2px]">
                <div className="max-w-[260px]">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                    {game.status === 'GAME OVER' ? 'Process terminated' :
                      game.status === 'PAUSED' ? 'System paused' : 'Ready when you are'}
                  </p>
                  <p className="mt-3 font-mono text-xs leading-relaxed text-white/60">
                    {game.status === 'GAME OVER'
                      ? `Final score: ${game.score}. One more run?`
                      : game.status === 'PAUSED'
                        ? 'Take your time. The board is waiting.'
                        : 'Collect the orange bytes. Keep your process alive.'}
                  </p>
                  {game.status === 'GAME OVER' ? (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        startGame()
                      }}
                      className="mt-5 min-h-11 rounded-md border border-emerald-400/40 bg-emerald-400/10 px-4 font-mono text-xs text-emerald-200 transition-colors hover:bg-emerald-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
                    >
                      Run it back ↵
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] text-white/35">
              {game.status === 'GAME OVER' ? 'RUN COMPLETE' : '20 × 20 GRID'}
              {game.score >= 50 ? <span className="ml-2 text-emerald-300">· SPEED +</span> : null}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={startGame}
                className="min-h-10 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-200 transition-colors hover:bg-emerald-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300"
              >
                {game.status === 'READY' ? 'Start game' : game.status === 'GAME OVER' ? 'Play again' : 'Restart'}
              </button>
              <button
                type="button"
                onClick={togglePause}
                disabled={game.status === 'READY' || game.status === 'GAME OVER'}
                className="min-h-10 rounded-md border border-white/10 px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:opacity-35"
              >
                {game.status === 'PAUSED' ? 'Resume' : 'Pause'}
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[10px] leading-relaxed text-white/40">
                <span className="text-white/65">KEYS</span> &nbsp;↑ ↓ ← → / W A S D
                <span className="mx-2 text-white/20">·</span>
                <span className="text-white/65">SPACE</span> pause
                <span className="mx-2 text-white/20">·</span>
                <span className="text-white/65">ENTER</span> start
                <span className="mt-1 block">FOCUS THE BOARD TO USE KEYS</span>
              </p>
              <p className="mt-2 font-mono text-[9px] text-white/25">while (snack) {'{'} keepGoing() {'}'}</p>
            </div>

            <div className="grid w-fit touch-none grid-cols-3 gap-1 self-center sm:self-auto" aria-label="Touch controls">
              <span />
              <DirectionButton direction="up" onPress={requestDirection} />
              <span />
              <DirectionButton direction="left" onPress={requestDirection} />
              <DirectionButton direction="down" onPress={requestDirection} />
              <DirectionButton direction="right" onPress={requestDirection} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DirectionButton({
  direction,
  onPress,
}: {
  direction: Direction
  onPress: (direction: Direction) => void
}) {
  return (
    <button
      type="button"
      aria-label={`Move ${direction}`}
      onClick={() => onPress(direction)}
      className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-md border border-white/10 bg-white/[0.03] font-mono text-base text-white/65 transition-colors hover:border-emerald-400/40 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 active:bg-emerald-400/20"
    >
      {DIRECTION_GLYPHS[direction]}
    </button>
  )
}
