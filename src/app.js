const express = require("express");
const { Response } = require("../common/http-response/index");
const validateHeaders = require("../common/utils/headerValidation");
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  for (const method in Response) {
    if (Response.hasOwnProperty(method)) res[method] = Response[method];
  }
  next();
});

if (process.env.NODE_ENV === "development") {
  const swaggerUi = require("swagger-ui-express");
  const YAML = require("yamljs");
  const swaggerDocument = YAML.load("./src/docs/swagger.yaml");
  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      customSiteTitle: process.env.SITE_TITLE,
      authorizeBtn: false,
      swaggerOptions: {
        filter: true,
        displayRequestDuration: true,
      },
    })
  );
}

app.use("/api", validateHeaders, require("./routes/index"));

app.use((err, req, res) => {
  console.error(err);
  if (err.message === "EntityNotFound") {
    return res.notFound({}, "Not found");
  }
  return res.status(err.status || 500).send({
    success: false,
    data: {},
    message: err.message,
  });
});

module.exports = app;
