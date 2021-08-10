<template>
	<div class="card">
		<h1>Привет!</h1>
		<p>
			Добро пожаловать на {{ numberLesson }} тренировочный день.<br />
			Ваш последний результат - решено {{ score }} из {{ maxScore }} .<br />
			Общая точность {{ Math.round((score / maxScore) * 100) }}%.
		</p>
		<h3>Настройки</h3>
		<field>
			<input type="range" v-model="duration" min="1" max="15" step="1" />
			<label>Длительность {{ duration }} минут</label>
		</field>

		<field>
			<input type="range" v-model="complexity" min="1" max="15" step="1" />
			<label>Сложность {{ complexity }}</label>
		</field>

		<div class="pt-1">
			<input id="adding" type="checkbox" v-model="summation" />
			<label for="adding">Суммирование</label>
		</div>
		<div>
			<input id="adding" type="checkbox" v-model="difference" />
			<label for="adding">Разность</label>
		</div>
		<div>
			<input id="adding" type="checkbox" v-model="multiplication" />
			<label for="adding">Умножение</label>
		</div>
		<div>
			<input id="adding" type="checkbox" v-model="division" />
			<label for="adding">Деление</label>
		</div>
		<div>
			<input id="adding" type="checkbox" v-model="exponentiation" />
			<label for="adding">Возведение в степень</label>
		</div>

		<div class="flex justify-content-end pt-1">
			<router-link class="btn" to="/play">Play!</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Settings',
	data: () => ({
		numberLesson: 1,
		score: 0,
		maxScore: 1,
		duration: 1,
		complexity: 1,
	}),
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
