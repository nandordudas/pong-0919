import debug, { type Debugger } from 'debug'
import type { EventEmitter } from 'tseep'

import { eventBus } from '../event-bus'
import type { Handler, Message } from '../types'

export abstract class BaseHandler<T extends string, P = any> implements Handler<T, P> {
  public abstract type: string

  protected eventBus: EventEmitter
  protected logger: Debugger

  constructor() {
    this.eventBus = eventBus
    this.logger = this.createLogger(`server:${this.constructor.name}`)
  }

  public abstract handle(data: Message<T, P>): void

  protected createLogger(namespace: string): Debugger {
    return debug(namespace)
  }
}
