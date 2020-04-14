import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

new Vue({
	el: '#app',
	data() {
		return {
			form: {
				name: '',
				value: '',
			},
			contacts: [],
		};
	},
	methods: {
		createContact() {
			// Деструктуризируем данные при помощи спред оператора
			const { ...contact } = this.form;
			// console.log(contact);
			this.contacts.push(contact);
			// Очистим поля формы
			this.form.name = this.form.value = '';
		},
	},
});
