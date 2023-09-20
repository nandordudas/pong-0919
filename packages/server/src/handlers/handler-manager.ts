import type { Handler, Message } from '../types'
import { BaseHandler } from './base-handler'

export class HandlerManager<T extends string, P = any> extends BaseHandler<T, P> {
  public readonly type: string

  private handlers: Map<string, Handler<T, P>> = new Map()

  public register(handler: Handler<T, P>): this {
    this.handlers.set(handler.type, handler)

    return this
  }

  public override handle(data: Message<T, P>): void {
    if (!this.handlers.has(data.type))
      return this.logger('no handler for %s %o', data.type, data)

    this.handlers.get(data.type)?.handle(data)
  }
}
