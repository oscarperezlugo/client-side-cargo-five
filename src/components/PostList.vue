<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by category, authon"
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
      <h4>Posts List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(post, index) in posts"
          :key="index"
          @click="setActivePost(post, index)"
        >
          {{ post.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllPosts">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentPost">
        <h4>Post</h4>
        <div>
          
          <a v-bind:class="currentPost.category" v-bind:href="'https://cargofive.com/es/category/' + currentPost.category.replace(' ', '-').replace('í', 'i')" target="_blank">{{ currentPost.category }}</a>
        </div>
  
        <div>
          <label><strong>{{ currentPost.title }}</strong></label> 
        </div>
        <br>
      
      
       
      
        <div>
          <label><strong>Description:</strong></label> {{ currentPost.bodyDescription }}
        </div>
          <div>
          <label><strong>Author:</strong></label> {{ currentPost.author }}
        </div>
         <div>

          <a v-bind:class="currentPost.category" v-bind:href="currentPost.sourceLink" target="_blank">{{ currentPost.sourceLink }}</a>

        </div>
          <div>
          <label><strong>Published At:</strong></label> {{ currentPost.publishedAt }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentPost.published ? "Published" : "Pending" }}
        </div>

        <router-link :to="'/posts/' + currentPost.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Post...</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "post-list",
  data() {
    return {
      posts: [],
      currentPost: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrievePosts() {
      DataService.getAll()
        .then(response => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePosts();
      this.currentPost = null;
      this.currentIndex = -1;
    },

    setActivePost(post, index) {
      this.currentPost = post;
      this.currentIndex = post ? index : -1;
    },

    removeAllPosts() {
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
          this.posts = response.data;
          this.setActivePost(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrievePosts();
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
