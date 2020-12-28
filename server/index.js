const fs = require('fs')
const https = require('@small-tech/https')
const crypto = require('crypto')

const shouldFail = process.argv.length === 3 && process.argv[2] === '--fail'

const indexJS = fs.readFileSync('./client/index.js', 'utf-8')
const hash = crypto.createHash('sha384').update(shouldFail ? 'oops' : indexJS).digest('base64')
const indexHTML = (fs.readFileSync('./client/index.html', 'utf-8').replace('${hash}', hash))

const server = https.createServer((request, response) => {
  switch (request.url) {
    case '/':
      response.setHeader('Content-Type', 'text/html')
      response.end(indexHTML)
    break;

    case '/index.js':
      // Uncomment the following line if testing from a different domain (requires CORS)
      // response.setHeader('Access-Control-Allow-Origin', '*')
      response.setHeader('Content-Type', 'application/javascript')
      response.end(indexJS)
    break;

    default:
      response.statusCode = 404
      response.end('404 not found.')
  }
})

server.listen(443, () => {
  console.log('   ✔️     ❨subresource-integrity-spike❩ Server started at https://localhost')
})
