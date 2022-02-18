export function logger(state) {
  return function wrapDispatch(next) {
    return function handlAction(action) {
      return next(action)
    }
  }
}
