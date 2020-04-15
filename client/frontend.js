import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

new Vue({
	el: '#app',
	data() {
		return {
			form: {
				name: '',
				value: '',
				id: '',
			},
			contacts: [],
		};
	},
	computed: {
		canCreate() {
			return this.form.value.trim() && this.form.name.trim();
		},
	},
	methods: {
		createContact() {
			// Деструктуризируем данные при помощи спред оператора
			const { ...contact } = this.form;
			console.log('Date.now() = ', Date.now());
			this.contacts.push({ ...contact, id: Date.now(), marked: false });
			// Очистим поля формы
			this.form.name = this.form.value = '';
		},
		markContact(id) {
			const contact = this.contacts.find((c) => c.id === id); // Находим элемент из массива contacts чтобы отметить его как маркерованный
			contact.marked = true;
		},
		deleteContact(id) {
			this.contacts = this.contacts.filter((c) => c.id !== id); // Filter возвращает новый массив, который не  содержит элемента с данным ID
		},
	},
});

async function request(url, method = '', data = null) {
	try {
		const headers = {};
		let body;
		if (data) {
			(headers['Conent-type'] = 'application/json'),
				(body = JSON.stringify(data));
		}
		const response = await fetch(url, {
			method,
			headers,
			body,
		});

		return await response.json();
	} catch (e) {
		console.warn('Error', e.message);
	}
}
