<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { Message } from './types'
import MyWorker from './worker?worker'

const worker = new MyWorker()

const payload: Message<string, any> = {
  type: 'A',
  value: { a: 1, b: 2 },
}

worker.addEventListener('error', (event) => {
  console.error(event)
})

worker.addEventListener('message', (event: MessageEvent<string | Message<string, any>>) => {
  if (event.data === 'connection established')
    worker.postMessage(payload)
})
</script>

<template>
  <div>weirdo</div>
</template>
