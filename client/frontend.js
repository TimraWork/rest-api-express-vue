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
			contacts: [
				{ id: 1, name: 'Эльмира', value: '3 Августа', marked: false },
			],
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
			this.contacts.push({ ...contact, id: Date.now() });
			// Очистим поля формы
			this.form.name = this.form.value = '';
		},
		markContact(id) {
			const contact = this.contacts.find((c) => c.id === id);
			contact.marked = true;
		},
		deleteContact(id) {
			console.log('delete = ', id);
		},
	},
});
