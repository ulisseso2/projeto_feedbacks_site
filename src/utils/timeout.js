// eslint-disable-next-line space-before-function-paren
export function wait(timeMs) {
  return new Promise(resolve => {
    setTimeout(resolve, timeMs)
  })
}
