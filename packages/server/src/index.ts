import { randomUUID } from 'node:crypto'
import { type WebSocket, WebSocketServer } from 'ws'

import { handlers } from './handlers'
import { send } from './helpers'
import { createLogger } from './log'
import type { Message } from './types'

const logger = createLogger('server:main')

class Channel {
  public readonly id = randomUUID()
}

const wss = new WebSocketServer({ port: 8080 })
const clients = new WeakMap<WebSocket, string>()
const channels = new WeakMap<Channel, Set<WebSocket>>()
const lobby = new Channel()

channels.set(lobby, new Set())
logger('lobby has set')

wss.on('connection', (ws) => {
  send(ws, '{"type":"connected"}')
  channels.get(lobby)?.add(ws)
  logger('websocket has added to lobby')

  const socketId = randomUUID()

  clients.set(ws, socketId)
  logger('client connected %o', { socketId })

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString('utf8')) as Message<string, any>

    logger('message received %o', message)
    handlers.handle(message)
  })

  ws.on('close', () => {
    clients.delete(ws)
    logger('client disconnected %o', { socketId })
    channels.get(lobby)?.delete(ws)
    logger('websocket has deleted from lobby')
  })
})
