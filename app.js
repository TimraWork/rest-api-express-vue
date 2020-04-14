const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.resolve(__dirname, 'client'))); // Делаем папку статической, тк в index.html идет вызов ф-ла frontend.js по ОТНОСИТЕЛЬНОМУ ПУТИ
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});
app.listen(3000, () => console.log('Server has been started on port 3000 ...'));
