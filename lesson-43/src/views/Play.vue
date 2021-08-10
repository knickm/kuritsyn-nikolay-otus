<template>
	<div class="card">
		<div class="flex justify-content-around opacity-05">
			<router-link class="btn" to="/">X Отмена</router-link>
			<div class="timer">
				<div>{{ time }}</div>
			</div>
		</div>
		<div class="question"></div>
		<div class="calculator">
			<button class="circle orange">1</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Settings',
	data: () => ({
		time: 0,
	}),
};
</script>

<style>
.opacity-05 {
	opacity: 0.5;
}
.timer {
	background-color: blue;
	border: 1px solid blue;
}
.timer div {
	margin-right: 2rem;
	display: inline-block;
	background-color: #fff;
	width: calc(100% - 1rem);
	height: 100%;
	text-align: center;
	line-height: 2.4rem;
}
button.circle {
	border-radius: 50%;
	width: 50px;
	height: 50px;
	text-align: center;
	lign-height: 50px; 
}
</style>
