module.exports = class Sonata {
  constructor(http) {
    this.http = http
    this.finalHandler = (req, res) => { }
    this.middlewares = []
  }

  use(handler) {
    this.middlewares.push({
      type: 'middleware',
      handler,
    })
  }

  route(path, handler) {
    this.middlewares.push({
      type: 'router',
      path,
      handler,
    })
  }

  engine() {
    return (req, res) => {
      this.req = req
      this.res = res
      return this.dispatch(0)
    }
  }

  dispatch(i) {
    const middleware = this.middlewares[i]
    middleware.handler(this.req, this.res, () => this.dispatch(i + 1))
  }

  listen(port = 3000, host = 'localhost') {
    this.middlewares.push(this.finalHandler)
    const server = this.http.createServer(this.engine())
    return new Promise((resolve, reject) => {
      server.listen(port, host, () => {
        resolve()
      })
    })
  }
}