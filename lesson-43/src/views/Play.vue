<template>
	<div class="flex-column justify-content-center" style="height: 100vh;">
		<div class="card flex-column justify-content-between" style="width: 450px; min-height: 600px;">
			<div class="flex justify-content-between opacity-05">
				<router-link class="btn" to="/">X Отмена</router-link>
				<div class="timer">
					<div>{{ duration }}</div>
				</div>
			</div>
			<div id="question" class="question mt-1"></div>
			<div class="calculator flex-column justify-content-between flex-grow mt-1">
				<div class="flex justify-content-between">
					<button class="circle orange">1</button>
					<button class="circle orange">2</button>
					<button class="circle orange">3</button>
					<button class="circle gray" @click="prev">&lt;</button>
				</div>
				<div class="flex justify-content-between">
					<button class="circle orange">4</button>
					<button class="circle orange">5</button>
					<button class="circle orange">6</button>
					<button class="circle gray" @click="next">&gt;</button>
				</div>
				<div class="flex justify-content-between">
					<button class="circle orange">7</button>
					<button class="circle orange">8</button>
					<button class="circle orange">9</button>
					<button class="circle gray" @click="help">?</button>
				</div>
				<div class="flex justify-content-between">
					<div style="width: 60px;"></div>
					<button class="circle orange">0</button>
					<div style="width: 60px;"></div>
					<button class="circle gray" @click="check">=</button>
				</div>
			</div>
		</div>
	</div>
	<div id="msg" class="overlay hide">
		<div class="message">
			<h1>{{ message }}</h1>
			<button @click="close">OK</button>
		</div>
	</div>
</template>

<script>
import router from '../router';
import { store } from '../Store';
export default {
	name: 'Settings',
	data: () => ({
		settings: store.state,
		time: 0,
		started: true,
		duration: store.state.duration * 60,
		timer: undefined,
		focused: undefined,
		message: '',
	}),
	methods: {
		prev() {
			let Focused = false;
			const oldValue = this.focused;
			do {
				this.focused--;
				if (this.focused < 1) {
					this.focused = this.settings.complexity + 1;
				}
				const el = document.getElementById(`i_${this.focused}`);
				Focused = this.focused === oldValue || (el != null && !el.readOnly);
			} while (!Focused);
			document.getElementById(`i_${this.focused}`).focus();
		},
		next() {
			let Focused = false;
			const oldValue = this.focused;
			do {
				this.focused++;
				if (this.focused > this.settings.complexity + 1) {
					this.focused = 1;
				}
				const el = document.getElementById(`i_${this.focused}`);
				Focused = this.focused === oldValue || (el != null && !el.readOnly);
			} while (!Focused);
			document.getElementById(`i_${this.focused}`).focus();
		},
		help() {
			const el = document.getElementById(`i_${this.focused}`);
			el.value = el.dataset.value;
			this.next();
		},
		check() {
			const list = document.getElementsByTagName('input');
			const values = [];

			for (let i = 0; i < list.length; i++) {
				const val = list[i].value.trim();
				if (val === '') {
					this.message = 'Вы ввели не все числа';
					document.getElementById('msg').classList.remove('hide');
					return;
				}
				values.push(val);
			}
			const ops = document.querySelectorAll('[operation]');
			let q = '';
			for (let i = 0; i < ops.length; i++) {
				q += values.shift() + ops[i].innerText;
			}
			q += values.shift();
			const res = eval(q);

			this.settings.maxScore++;

			if (res != values[0]) {
				this.message = 'Вы допустили ошибку!';
				document.getElementById('msg').classList.remove('hide');
			} else {
				this.settings.score++;
				this.message = 'Вы правильно выполнили задание!';
				document.getElementById('msg').classList.remove('hide');
			}
			this.started = false;
			clearInterval(this.timer);
		},
		close() {
			document.getElementById('msg').classList.add('hide');
			if (!this.started) {
				router.replace({ path: '/' });
			}
		},
		createQuestion() {
			let op = [];
			if (this.settings.summation) {
				op.push('+');
			}
			if (this.settings.difference) {
				op.push('-');
			}
			if (this.settings.multiplication) {
				op.push('*');
			}
			if (this.settings.division) {
				op.push('/');
			}
			if (this.settings.exponentiation) {
				op.push('^');
			}
			if (op.length === 0) {
				op.push('+');
			}
			const max = this.settings.complexity === 10 ? 6 : this.settings.complexity > 6 ? 4 : this.settings.complexity > 3 ? 2 : 1;

			let haveHiden = false;

			const d = Math.round(Math.random(max));
			let text = `<span><input id='i_0' value="${d}" readonly></span>`;
			let q = d.toString();

			let firstId = 0;
			for (let i = 0; i < this.settings.complexity; i++) {
				const d = Math.round(Math.random() * Math.pow(10, max));
				const sop = op[Math.floor(Math.random() * op.length)];
				const hide = Math.random(1) > 0.5;
				text += `<span operation>${sop}</span><input id="i_${i + 1}" value="${hide ? '' : d}" data-value="${d}" ${hide ? '' : 'readonly'} />`;
				q += sop + d.toString();
				if (hide && !haveHiden) {
					firstId = i + 1;
					haveHiden = true;
				}
			}
			text += `<span>=</span><input id="i_${this.settings.complexity + 1}" response value="${haveHiden ? eval(q) : ''}" data-value="${eval(q)}" ${
				haveHiden ? 'readonly' : ''
			} />`;
			document.getElementById('question').innerHTML = text;
			this.focused = haveHiden ? firstId : this.settings.complexity + 1;
			document.getElementById(`i_${this.focused}`).focus();
		},
	},
	mounted() {
		this.timer = setInterval(() => {
			if (--this.duration === 0) {
				this.started = false;
				clearInterval(this.timer);
				this.message = 'GAME OVER';
				document.getElementById('msg').classList.remove('hide');
			}
		}, 1000);
		this.createQuestion();
	},
};
</script>

<style>
.overlay {
	width: 100vw;
	height: 100vh;
	z-index: 10;
	position: absolute;
	left: 0;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
.overlay .message {
	background-color: #eee;
	border-radius: 20px;
	z-index: 30;
	text-align: center;
	padding: 2rem;
	box-shadow: 2px 2px 2px #ccc;
}
.hide {
	display: none;
}
.question {
	margin: 1rem 0;
	font-weight: bold;
	font-size: 18px;
	color: #bbb;
}
.question input,
.question input:focus-visible,
.question input:focus,
.question input:active {
	border: none;
	border-bottom: 1px solid #ddd;
	height: 2rem;
	width: 6rem;
	text-align: center;
	font-weight: bold;
	font-size: 18px;
	color: #bbb;
	outline: none;
}
.question input:focus-visible,
.question input:focus,
.question input:active {
	background-color: #eef;
}
.question span {
	margin: 1rem;
}

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
	width: 60px;
	height: 60px;
	text-align: center;
	lign-height: 60px;
	font-weight: bold;
	font-size: 1.5rem;
}
.orange {
	background-color: #ff7042;
}
.gray {
	background-color: #7a7a7a;
}
</style>
