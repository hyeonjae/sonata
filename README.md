# Sonata

## Example
```js
const http = require('http')
const Sonata = require('./Sonata')

const sonata = new Sonata(http)

sonata.use((req, res, next) => {
  console.log('first middleware >>>')
  next()
  console.log('first middleware <<<')
})

sonata.use((req, res, next) => {
  console.log('second middleware >>>')
  next()
  console.log('second middleware <<<')
})

sonata.use((req, res, next) => {
  console.log('third middleware')
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.write(JSON.stringify({message: 'hello'}))
  res.end()
})

sonata.use((req, res, next) => {
  console.log('forth middleware')
})

const [port, host] = [3001, 'localhost']

sonata.listen(port, host)
```

## Test
```bash
$ curl -X GET 'http://localhost:3001'
{message: 'hello'}
```

## Todo

 - [ ] Split Router
 - [ ] Path Regexp
 - [ ] UnitTest
 - [ ] Promise Chaining for Async/Await Middlewares
