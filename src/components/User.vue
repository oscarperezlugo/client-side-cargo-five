<template>
  <div v-if="currentUser" class="edit-form">
    <h4>User</h4>
    <form>
      <div class="form-group">
        <label for="title">Name</label>
        <input type="text" class="form-control" id="title"
          v-model="currentUser.name"
        />
      </div>
      <div class="form-group">
        <label for="description">Email</label>
        <input type="text" class="form-control" id="description"
          v-model="currentUser.email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password"
          v-model="currentUser.password"
        />
      </div>

      <div class="form-group">
        <label for="password2">Repeat password</label>
        <input type="password" class="form-control" id="password2"
          v-model="password2"
        />
      </div>

      <!--
      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentUser.published ? "Published" : "Pending" }}
      </div>-->
    </form>

    <!--
    <button class="badge badge-primary mr-2"
      v-if="currentUser.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>-->

    <button class="badge badge-danger mr-2"
      @click="deleteUser"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateUser"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "user",
  data() {
    return {
      currentUser: null,
      message: '',
      password2: ''
    };
  },
  methods: {
    getTutorial(id) {
      DataService.getUser(id)
        .then(response => {
          this.currentUser = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    // updatePublished(status) {
    //   var data = {
    //     // id: this.currentUser.id,
    //     title: this.currentUser.title,
    //     content: this.currentUser.content,
    //     published: status
    //   };

    //   DataService.update(this.currentUser.id, data)
    //     .then(response => {
    //       console.log(response.data);
    //       this.currentUser.published = status;
    //       this.message = 'The status was updated successfully!';
    //     })
    //     .catch(e => {
    //       console.log(e);
    //     });
    // },

    updateUser() {
      if(this.currentUser.password != this.password2){
        this.message = 'The passwords do not match!';
      }
      else{
        DataService.updateUser(this.currentUser.id, this.currentUser)
          .then(response => {
            console.log(response.data);
            this.message = 'The user was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
      }
    },

    deleteUser() {
      DataService.deleteUser(this.currentUser.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "users" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
