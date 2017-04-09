Vue.component('my-component', {
	template : '<div class="container"><div class="login"><h3>Login</h3><p>Password doesn\'t match the username</p><input type="text" placeholder="username" class="inp" id="username"><br><input type="password" placeholder="password" class="inp" id="password"><br><div class="keep"><input type="checkbox" id="check" checked><span>Keep Password</span></div><a href="javascript:void(0);" id="btn">SignIn</a></div></div>'
})

new Vue({
	el: "#pro"
})