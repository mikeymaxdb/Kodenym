const socketMiddleware = (socket) => (store) => (next) => (action) => next(action)
export default socketMiddleware
