<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">One Way Cargo</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/posts" class="nav-link">Posts</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/users" class="nav-link">Users</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add-user" class="nav-link">New User</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/scraper" class="nav-link">Scraper</router-link>
        </li>
      </div>
      <span class="navbar-text">
      <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" style="background-color: transparent; border-color: transparent; " type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Options
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
        <button class="dropdown-item" type="button" @click.prevent="handlePassword">Change Password</button>
        <button class="dropdown-item" type="button" @click.prevent="handleLogout">Logout</button>

      </div>
    </div>
    </span>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
import router from './router';
export default {
  name: "app",
  methods: {
    handleLogout() {
      
      localStorage.removeItem('LoggedUser');
router.push('/login');
    },
    handlePassword(){
      router.push('/password');
    }
  }
};
</script>
