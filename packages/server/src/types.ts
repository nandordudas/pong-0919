export interface Message<T extends string, P = any> {
  readonly type: T
  readonly value: P
}

export interface Handler<T extends string, P = any> {
  readonly type: string
  handle: (data: Message<T, P>) => void
}
