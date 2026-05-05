const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let items = [
    { id: 1, name: "laptop", quantity: 10 },
    { id: 2, name: "mouse", quantity: 25 }
];

app.use((req, res, next) => {
    console.log(req.method + " " + req.url);
    next();
});

app.get('/', (req, res) => {
    res.json(items); // Sending the list directly to the root URL
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }
    
    res.json(item);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
