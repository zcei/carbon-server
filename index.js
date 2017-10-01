const micro = require('micro')
const query = require('micro-query');
const dataUriToBuffer = require('data-uri-to-buffer');

const launchBrowser = require('./lib/browser')

const { text, send } = micro

const port = parseInt(process.env.PORT, 10) || 3001
const carbonInstance = process.env.CARBON || 'http://localhost:3000/preconfigured-editor'

const startServer = async () => {
  const loadImageFromCarbon = await launchBrowser()
  const loadImage = loadImageFromCarbon(carbonInstance)

  const handler = async (req, res) => {
    const code = await text(req);
    const options = query(req);

    const dataUri = await loadImage(code, options)
    const img = dataUriToBuffer(dataUri);

    res.setHeader('Content-Type', img.type)
    send(res, 200, img)
  }

  return micro(handler)
}

startServer().then((server) => {
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
