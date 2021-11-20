const { createProxyMiddleware } = require("http-proxy-middleware");

const ghGistsAccessToken = process.env.GH_GISTS_ACCESS_TOKEN;

if (!ghGistsAccessToken) {
  throw new Error(
    "The proxy expects an environment variable named `GH_GISTS_ACCESS_TOKEN` with a personal access token with access to create Gists."
  );
}

const ghGistsProxy = createProxyMiddleware({
  target: "https://api.github.com",
  changeOrigin: true,
  pathRewrite: {
    [`^/api/gh/gists`]: "/gists",
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader("authorization", `token ${ghGistsAccessToken}`);
    proxyReq.setHeader("accept", "application/vnd.github.v3+json");
  },
});

module.exports = function (app) {
  app.use("/api/gh/gists", ghGistsProxy);
};
