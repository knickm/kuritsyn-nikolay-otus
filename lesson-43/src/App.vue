<template>
	<router-view />
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}
body {
	background-color: #ccc;
	display: flex;
	justify-content: center;
}
.card {
	box-shadow: 4px 4px 12px #888;
	background-color: #fff;
	padding: 4rem;
	text-align: left;
}
field {
	display: flex;
	flex-direction: column;
	padding-top: 1rem;
}
.pt-1 {
	padding-top: 1rem;
}
.pt-2 {
	padding-top: 2rem;
}
.btn,
button {
	box-shadow: 2px 2px 4px #888;
	background-color: #fff;
	padding: 0.7rem;
	border: none;
	border-radius: 0.2rem;
	text-decoration:none;
	color: black !important;

}
.flex {
	display: flex;
}
.justify-content-around {
	justify-content: around;
}
.justify-content-end {
	justify-content: flex-end;
}
</style>
