<template>
	<div class="flex-column justify-content-center" style="height: 100vh;">
		<div class="card">
			<h1>Привет!</h1>
			<p>
				Добро пожаловать на {{ numberLesson }} тренировочный день.<br />
				Ваш последний результат - решено {{ score }} из {{ maxScore }} .<br />
				Общая точность {{ maxScore > 0 ? Math.round((score / maxScore) * 100) : 0 }}%.
			</p>
			<h3>Настройки</h3>
			<div class="field">
				<input type="range" v-model="duration" min="1" max="15" step="1" />
				<label>Длительность {{ duration }} минут</label>
			</div>

			<div class="field">
				<input type="range" v-model="complexity" min="1" max="10" step="1" />
				<label>Сложность {{ complexity }}</label>
			</div>

			<div class="pt-1">
				<input id="summation" type="checkbox" v-model="summation" />
				<label for="summation">Суммирование</label>
			</div>
			<div>
				<input id="difference" type="checkbox" v-model="difference" />
				<label for="difference">Разность</label>
			</div>
			<div>
				<input id="multiplication" type="checkbox" v-model="multiplication" />
				<label for="multiplication">Умножение</label>
			</div>
			<div>
				<input id="division" type="checkbox" v-model="division" />
				<label for="division">Деление</label>
			</div>
			<div>
				<input id="exponentiation" type="checkbox" v-model="exponentiation" />
				<label for="exponentiation">Возведение в степень</label>
			</div>

			<div class="flex justify-content-end pt-1">
				<router-link class="btn" to="/play">Play!</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { store } from '../Store';

const NUMBER_LESSON_REMEMBERS = 'NUMBER_LESSON_REMEMBERS';
export default {
	name: 'Settings',
	data: () => store.state,
	mounted() {
		const d = new Date();
		const nl = localStorage.getItem(NUMBER_LESSON_REMEMBERS);
		const h = JSON.parse(nl || '{}');
		h[d.toLocaleDateString()] = true;
		store.state.numberLesson = Object.keys(h).length;
		localStorage.setItem(NUMBER_LESSON_REMEMBERS, JSON.stringify(h));
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
	margin: 40px 0 0;
}
a {
	color: #42b983;
}
</style>
