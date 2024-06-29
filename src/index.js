require('dotenv').config(); 
const mongoose = require('mongoose'); 

// process.on('uncaughtException',err=>{
//     console.info("uncaughtException  🧨🧨 Shutting down ....");
//     console.info(err.name,err.message);
//     process.exit(1);
// });

const app = require('./app')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true,  })
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error)=>{
    console.info("Database is not connected Successfuly!!");
    console.info("error::",error);
});

const port = 3000; 
let server ; 
if(process.env.NODE_ENV === 'production'){
    const https = require('https');
    const fs = require('fs');
    server = https.createServer(
        {
            key: fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8'),
            cert: fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8'),
            ca: fs.readFileSync(process.env.SSL_CA_PATH, 'utf8'),
        },
        app
    );
}else{
    const http = require('http');
    server = http.createServer(app);
}

server.listen(port ,()=>{
    console.info(`server is running on http://localhost:${port}`)
})
// sudo systemctl start mongod