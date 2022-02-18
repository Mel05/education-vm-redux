export function thunk({ dispatch, getState }) {
  return function wrapDispatch(next) {
    return function handlAction(action) {
      if (typeof action === "function") {
        action(dispatch, getState)
      } else {
        return next(action)
      }
    }
  }
}
