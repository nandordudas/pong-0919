import { type DefaultEventMap, EventEmitter } from 'tseep'

import type { Message } from './types'

type EventHandler<T = any> = (message: Message<string, T>) => void

type EventMap = DefaultEventMap | {
  A: EventHandler
  Game: EventHandler
}

export const eventBus = new EventEmitter<EventMap>()

eventBus.on('Game', (message: number) => {
  // eslint-disable-next-line no-console
  console.log(message)
})
