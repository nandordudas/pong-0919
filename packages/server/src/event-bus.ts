import { type DefaultEventMap, EventEmitter } from 'tseep'

import type { Message } from './types'

type EventMap = DefaultEventMap | {
  A: (message: Message<string, any>) => void
}

export const eventBus = new EventEmitter<EventMap>()
