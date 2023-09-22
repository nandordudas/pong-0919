import { AHandler } from './a-handler'
import { GameHandler } from './game-handler'
import { HandlerManager } from './handler-manager'

export const handlers = new HandlerManager()

handlers
  .register(new AHandler())
  .register(new GameHandler())
