import debug from 'debug'
import { type DefaultEventMap, EventEmitter } from 'tseep'

import type { Message } from './types'

type EventMap = DefaultEventMap | {
  A: (message: Message<string, any>) => void
  Game: (message: Message<string, any>) => void
}

debug.enable('worker:*')

const loggerMain = debug('worker:main')
const loggerWs = debug('worker:ws')
const loggerEmitter = debug('worker:emitter')

const eventBus = new EventEmitter<EventMap>()
const ws = new WebSocket('ws://localhost:8080')

addEventListener('message', (event: MessageEvent<Message<string, any>>) => {
  loggerMain('message received %o', event.data)
  send(ws, event.data)
  eventBus.emit(event.data.type as keyof EventMap, event.data.value)
})

eventBus.on('A', (data: Message<string, any>) => {
  loggerEmitter('AHandler %o', data)
  postMessage(data)
})

eventBus.on('Game', (data: Message<string, any>) => {
  loggerEmitter('GameHandler %o', data)

  if (data.type === 'Game')
    send(ws, '{"type":"Game","value":"startGame"}')
})

ws.addEventListener('message', (event: MessageEvent<string>) => {
  const { type, value } = JSON.parse(event.data) as Message<string, any>

  loggerWs('message received %o', { type, value })
  eventBus.emit(type as keyof EventMap, value)
})

main().catch(console.error)

async function main() {
  await waitForWsReady(ws)
  postMessage('connection established')
}

function waitForWsReady(ws: WebSocket) {
  return new Promise<Event>((resolve) => {
    ws.addEventListener('open', resolve)
  })
}

// INFO: same function at server side
function send<T = any>(ws: WebSocket, message: string | Message<string, T>) {
  if (ws.readyState !== WebSocket.OPEN)
    return

  message = typeof message === 'string' ? message : JSON.stringify(message)

  ws.send(message)
}
