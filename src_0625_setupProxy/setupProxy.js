const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api1', {
            target: 'http://localhost:80801',
            // changeOrgin: true,
            pathRewrite: { '^/api1': '' }
        })
    )
}