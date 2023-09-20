export interface Message<T extends string, P = any> {
  type: T
  value: P
}
