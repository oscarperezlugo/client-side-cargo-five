import http from "../http-common";

class TutorialDataService {
    getToken() {
        var accessToken = null;
        if (localStorage.getItem('LoggedUser')) {
            var token = JSON.parse(localStorage.getItem('LoggedUser'));
            accessToken = token.token;
            // console.log(accessToken);
        }

        return accessToken;
    }

    getAll() {
        var token = this.getToken();

        return http.get("/articles", { headers: { "access-token": token } });
    }

    get(id) {
        var token = this.getToken();

        return http.get(`/posts/${id}`, { headers: { "access-token": token } });
    }

    create(data) {
        var token = this.getToken();
        return http.post("/posts", data, { headers: { "access-token": token } });
    }

    update(id, data) {
        var token = this.getToken();
        return http.put(`/post/publish/${id}`, data, { headers: { "access-token": token } });
    }

    delete(id) {
        var token = this.getToken();
        return http.delete(`/post/${id}`, { headers: { "access-token": token } });
    }

    deleteAll() {
        var token = this.getToken();
        return http.delete(`/posts`, { headers: { "access-token": token } });
    }

    findByTitle(title) {
        var token = this.getToken();
        return http.get(`/posts?tag=${title}`, { headers: { "access-token": token } });
    }


    getUsers() {
        var token = this.getToken();
        return http.get("/users", { headers: { "access-token": token } });
    }

    getUser(id) {
        var token = this.getToken();
        return http.get(`/users/${id}`, { headers: { "access-token": token } });
    }

    updateUser(id, data) {
        var token = this.getToken();
        return http.put(`/user/${id}`, data, { headers: { "access-token": token } });
    }

    deleteUser(id) {
        var token = this.getToken();
        return http.delete(`/user/${id}`, { headers: { "access-token": token } });
    }

    createUser(data) {
        var token = this.getToken();
        return http.post("/user", data, { headers: { "access-token": token } });
    }

    //Scraper
    scraperByCategory(category) {
        var token = this.getToken();
        return http.get(`/search?tag=${category}`, { headers: { "access-token": token } });
    }

    updatePassword(data) {
        var token = this.getToken();
        return http.put("/password", data, { headers: { "access-token": token } });
    }

}

export default new TutorialDataService();