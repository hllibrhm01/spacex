export function iteratorToStream<T = unknown>(iterator: AsyncIterableIterator<T>) {
  return new ReadableStream<T>({
    async pull(controller) {
      const { value, done } = await iterator.next()

      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
  })
}
