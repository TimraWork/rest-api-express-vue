const express = require('express');
const path = require('path');
const app = express();

const CONTACTS = [
	{ id: 1, name: 'Эльмира', value: '3 Августа', marked: false },
	{ id: 2, name: 'Тимур', value: '17 Января', marked: false },
	{ id: 3, name: 'Рената', value: '22 Ноября', marked: false },
];

// GET
app.get('/api/contacts', (req, res) => {
	setTimeout(() => {
		res.status(200).json(CONTACTS);
	}, 2000);
});

app.use(express.static(path.resolve(__dirname, 'client'))); // Делаем папку статической, тк в index.html идет вызов ф-ла frontend.js по ОТНОСИТЕЛЬНОМУ ПУТИ
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});
app.listen(3000, () => console.log('Server has been started on port 3000 ...'));
