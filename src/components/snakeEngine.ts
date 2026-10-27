export const BOARD_SIZE = 20

export type Point = { x: number; y: number }
export type Direction = 'up' | 'down' | 'left' | 'right'
export type GameStatus = 'READY' | 'RUNNING' | 'PAUSED' | 'GAME OVER'

export type SnakeGameState = {
  snake: Point[]
  food: Point | null
  score: number
  status: GameStatus
}

const isSamePoint = (first: Point, second: Point) =>
  first.x === second.x && first.y === second.y

export function createSnakeGame(random: () => number = Math.random): SnakeGameState {
  const snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]

  return {
    snake,
    food: spawnFood(snake, random),
    score: 0,
    status: 'READY',
  }
}

export function isOppositeDirection(first: Direction, second: Direction): boolean {
  return (
    (first === 'up' && second === 'down') ||
    (first === 'down' && second === 'up') ||
    (first === 'left' && second === 'right') ||
    (first === 'right' && second === 'left')
  )
}

export function spawnFood(
  snake: Point[],
  random: () => number = Math.random,
): Point | null {
  const available: Point[] = []

  for (let y = 0; y < BOARD_SIZE; y += 1) {
    for (let x = 0; x < BOARD_SIZE; x += 1) {
      const point = { x, y }
      if (!snake.some((segment) => isSamePoint(segment, point))) available.push(point)
    }
  }

  if (available.length === 0) return null
  return available[Math.floor(random() * available.length)]
}

export function advanceSnake(
  game: SnakeGameState,
  direction: Direction,
  random: () => number = Math.random,
): SnakeGameState {
  if (game.status !== 'RUNNING') return game

  const head = game.snake[0]
  const movement: Record<Direction, Point> = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  }
  const nextHead = {
    x: head.x + movement[direction].x,
    y: head.y + movement[direction].y,
  }
  const ateFood = game.food !== null && isSamePoint(nextHead, game.food)
  const bodyToCheck = ateFood ? game.snake : game.snake.slice(0, -1)
  const hitWall =
    nextHead.x < 0 ||
    nextHead.x >= BOARD_SIZE ||
    nextHead.y < 0 ||
    nextHead.y >= BOARD_SIZE
  const hitSnake = bodyToCheck.some((segment) => isSamePoint(segment, nextHead))

  if (hitWall || hitSnake) return { ...game, status: 'GAME OVER' }

  const snake = [nextHead, ...(ateFood ? game.snake : game.snake.slice(0, -1))]
  const food = ateFood ? spawnFood(snake, random) : game.food
  const score = game.score + (ateFood ? 10 : 0)

  return {
    snake,
    food,
    score,
    status: food === null ? 'GAME OVER' : game.status,
  }
}
