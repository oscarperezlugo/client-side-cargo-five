<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          required
          v-model="user.password"
          name="password"
        />
      </div>

      <div class="form-group">
        <label for="password2">Repeat password</label>
        <input
          class="form-control"
          id="password2" type="password"
          required
          v-model="password2"
          name="password2"
        />
      </div>

      <button @click="savePassword" class="btn btn-success">Submit</button>
    </div>


    <p>{{ message }}</p>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "password",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      password2: "",
      message: "",
      submitted: false
    };
  },
  methods: {
    savePassword() {
   

      if(this.user.password != this.password2){
        this.message = 'The passwords do not match!';
      }
      else{
        console.log(data);

        var email = null;
        if (localStorage.getItem('LoggedUser')) {
            var local = JSON.parse(localStorage.getItem('LoggedUser'));
            email = local.email;
            // console.log(accessToken);
        }

        if(email != null){
             var data = {
              password: this.user.password,
              email: email
            };

          console.log(email);

          DataService.updatePassword(data)
          .then(response => {
            // this.user.id = response.data.id;
            console.log(response.data);
            this.message = 'The user was updated successfully!';
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
        }

      
      }

      
    },
    

  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
