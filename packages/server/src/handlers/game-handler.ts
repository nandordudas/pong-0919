import { setTimeout } from 'node:timers/promises'
import type { Message } from '../types'
import { BaseHandler } from './base-handler'

export class GameHandler<T extends string, P = any> extends BaseHandler<T, P> {
  public readonly type = 'Game'

  public override handle(data: Message<T, P>): void {
    this.logger(`${this.type} %o`, data)

    if (data.type === this.type)
      this.gameLoop()
  }

  private async gameLoop() {
    const { remainingTime } = this.measure(() => {
      /* TODO: detect if game is over */
      /* TODO: reposition ball and paddles */
      /* TODO: detect collisions */
      /* TODO: optimize collision detection with sweep and prune */
      /* TODO: use penetration resolution */
      /* TODO: use collision response */

      this.eventBus.emit(this.type, performance.now())
    })

    await setTimeout(remainingTime)
    this.gameLoop()
  }

  private measure(fn: () => void, fps = 60) {
    const startTime = performance.now()
    const fixedUpdateInterval = 1_000 / fps

    fn()

    const endTime = performance.now()
    const elapsedTime = endTime - startTime
    const remainingTime = Math.max(0, fixedUpdateInterval - elapsedTime)

    return {
      elapsedTime,
      remainingTime,
    }
  }
}
