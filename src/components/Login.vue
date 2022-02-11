<template>

    <form class="form-signin" @submit.prevent="loginUser">
      <div class="text-center mb-4">
     
        <h1 class="h3 mb-3 font-weight-normal">One Way Cargo</h1>
        <p>Build form controls with floating labels via the <code>:placeholder-shown</code> pseudo-element. <a href="https://caniuse.com/#feat=css-placeholder-shown">Works in latest Chrome, Safari, and Firefox.</a></p>
      </div>

      <div class="form-label-group">
        <input type="text" id="inputUser" v-model="model.username" class="form-control" placeholder="Username" required autofocus>
        <label for="inputEmail">Username</label>
      </div>

      <div class="form-label-group">
        <input type="password" id="inputPass" v-model="model.password" class="form-control" placeholder="Password" required>
        <label for="inputPassword">Password</label>
      </div>

  
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2021-2022</p>
    </form>
</template>
<script>
import axios from 'axios';    
import router from '../router';
const SERVER_URL = "http://localhost:3000/api/login";
export default {
name: 'login',
data() {
    return { model : {
      username: '',
      password: ''
      }
    }
},
methods:{
        loginUser:  function() {
            // console.log(JSON.stringify(this.model.username));
            

            axios.post(SERVER_URL, this.model)
            .then(function (response) {
                // Respuesta del servidor
                console.log(response);
                console.log(response.data.message);
                if(response.data.message != "Incorrect username or password"){ 
                localStorage.setItem('LoggedUser', JSON.stringify(response.data));
                router.push('/posts');
                }
            })
            .catch(function (error) {        
                console.log(error);
            });
                    
        }
    }
}
</script>