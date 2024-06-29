const express = require('express');
const router = express.Router();
const fs = require('fs');
const routes = fs.readdirSync(__dirname);

console.log("see here",routes)

routes.forEach(route => {
    if (route === 'index.js') return;
    router.use(`/${route}`, require(`./${route}`));
});

module.exports = router;
