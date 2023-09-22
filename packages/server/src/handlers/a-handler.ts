import type { Message } from '../types'
import { BaseHandler } from './base-handler'

export class AHandler<T extends string, P = any> extends BaseHandler<T, P> {
  public readonly type = 'A'

  public override handle(data: Message<T, P>): void {
    this.logger('AHandler %o', data)
  }
}
