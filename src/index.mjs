import { execSync } from 'child_process';
import fs from 'fs';
import createBareServer from '@tomphttp/bare-server-node';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer();
import path from 'path';
const __dirname = path.resolve();
const port = process.env.PORT || 8080;

if (!fs.existsSync("build")) {
    console.log("Building Metallic")
    execSync("npm run build")
	fs.writeFileSync(__dirname + "/build/404.html", fs.readFileSync(__dirname + "/build/index.html"));
}

app.use(express.static("build"));

const bareServer = createBareServer('/bare/', {
	logErrors: false,
	localAddress: undefined,
	project: {
		name: 'Metallic',
		repository: 'https://github.com/Nebelung-dev/Metallic',
	},
});

server.on('request', (req, res) => {
  console.log(req.url)
  if(req.url === "/") {
    if(req.headers.cookie && req.headers.cookie.includes("enable=true")) {
      app(req, res);
    }
    else {
      console.log("failed")
      /*
      if(req.headers.dnt === "1") {
        res.setHeader("Set-Cookie", "enable=true")
      }*/
      if(req.url === "/") res.writeHead(200).write(fs.readFileSync("build/mask.html"))
      else res.writeHead(404);
      res.end();
    }
  }
  else if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  }
  else {
    app(req, res);
  }

});

server.on('upgrade', (req, socket, head) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

server.on('listening', () => {
	console.log('Metallic running on port ' + port);
});

server.listen(port);
