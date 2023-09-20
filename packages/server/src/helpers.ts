import { WebSocket } from 'ws'

import type { Message } from './types'

// INFO: exact same function at client side
export function send<T = any>(ws: WebSocket, message: string | Message<string, T>) {
  if (ws.readyState !== WebSocket.OPEN)
    return

  message = typeof message === 'string' ? message : JSON.stringify(message)

  ws.send(message)
}
