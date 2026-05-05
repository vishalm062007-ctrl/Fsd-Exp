const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.method === 'GET') {
        const query = url.parse(req.url, true).query;

        if (query.name && query.age) {
            res.end(`
                <html>
                <body style="text-align: center; font-family: Arial;">
                    <h1 style="color: blue;">GET Request Received</h1>
                    <p><b>Name: </b>${query.name}</p>
                    <p><b>Age: </b>${query.age}</p>
                    <a href="/">Go back</a>
                </body>
                </html>
            `);
        } else {
            res.end(`
                <html>
                <body style="text-align: center; font-family: Arial;">
                    <h1>User form</h1>
                    <form method="POST">
                        Name: <input type="text" name="name"><br><br>
                        Age: <input type="number" name="age"><br><br>
                        <button type="submit">Submit</button>
                    </form>
                    <hr>
                    <h2>Test GET method</h2>
                    <p>Example</p>
                    <p>http://localhost:4000/?name=Manusa&amp;age=20</p>
                </body>
                </html>
            `);
        }
    } else if (req.method === 'POST') {
        let body = "";
        
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = querystring.parse(body);
            res.end(`
                <html>
                <body style="text-align: center; font-family: Arial;">
                    <h1 style="color: red;">POST Request Received</h1>
                    <p><b>Name: </b>${data.name}</p>
                    <p><b>Age: </b>${data.age}</p>
                    <a href="/">Go back</a>
                </body>
                </html>
            `);
        });
    }
});

server.listen(4000, () => {
    console.log("Server running at http://localhost:4000/");
});
