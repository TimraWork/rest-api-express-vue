import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

Vue.component('loader', {
	template: `
		<div class="text-center mt-3 mb-3">
			<div class="spinner-grow text-primary"></div>
		</div>
	`,
});

new Vue({
	el: '#app',
	data() {
		return {
			loading: false,
			form: {
				name: '',
				value: '',
				// id: '',
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
		async createContact() {
			// Деструктуризируем данные при помощи спред оператора
			const { ...contact } = this.form;

			// Подождать, пока выполнится ф-я request по адресу /api/contacts
			const response = await request('/api/contacts', 'POST', contact);
			// console.log('contact = ', contact);
			// console.log('response = ', response);

			// console.log('Date.now() = ', Date.now());
			this.contacts.push(response);
			// Очистим поля формы
			this.form.name = this.form.value = '';
		},
		async markContact(id) {
			const contact = this.contacts.find((c) => c.id === id); // Находим элемент из массива contacts чтобы отметить его как маркерованный
			await request(`/api/contacts/${id}`, 'PUT', {
				...contact,
				marked: true,
			});
			contact.marked = true;
		},
		async deleteContact(id) {
			await request(`/api/contacts/${id}`, 'DELETE');
			this.contacts = this.contacts.filter((c) => c.id !== id); // Filter возвращает новый массив, который не  содержит элемента с данным ID
		},
	},
	async mounted() {
		this.loading = true;
		this.contacts = await request('/api/contacts'); // Get запрос данных
		this.loading = false;
	},
});

async function request(url, method = 'GET', data = null) {
	try {
		const headers = {};
		let body;
		if (data) {
			(headers['Content-Type'] = 'application/json'),
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
