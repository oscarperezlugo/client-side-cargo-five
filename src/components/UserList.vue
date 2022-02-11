<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by Name"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Users List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(user, index) in users"
          :key="index"
          @click="setActivePost(user, index)"
        >
          {{ user.name }}
        </li>
      </ul>
    <!--
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllUsers">
        Remove All
      </button> -->
    </div>
    <div class="col-md-6">
      <div v-if="currentPost">
        <h4>User</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentPost.name }}
        </div>
        <div>
          <label><strong>Description:</strong></label> {{ currentPost.email }}
        </div>
        <!--
        <div>
          <label><strong>Status:</strong></label> {{ currentPost.published ? "Published" : "Pending" }}
        </div>-->

        <router-link :to="'/users/' + currentPost.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a User...</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "user-list",
  data() {
    return {
      users: [],
      currentPost: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveUsers() {
      DataService.getUsers()
        .then(response => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUsers();
      this.currentPost = null;
      this.currentIndex = -1;
    },

    setActivePost(post, index) {
      this.currentPost = post;
      this.currentIndex = post ? index : -1;
    },

    removeAllUsers() {
      DataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      DataService.findByTitle(this.title)
        .then(response => {
          this.users = response.data;
          this.setActivePost(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveUsers();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
