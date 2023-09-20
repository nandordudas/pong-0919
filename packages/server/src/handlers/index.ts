import { AHandler } from './a-handler'
import { HandlerManager } from './handler-manager'

export const handlers = new HandlerManager()

handlers.register(new AHandler())
