import axios from 'axios';

class AuthService {
    login(user) {
        try {
            const loginUser = {
                email: user.email,
                password: user.password
            }
            return axios
                .post("/api/user/login", loginUser)
                .then((res) => {
                    const token = res.data;
                    console.log('auth-serv ', token);
                    if (token) {
                        localStorage.setItem("auth-token", JSON.stringify(token));
                    }
                    return res.data
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }

    logout() {
        localStorage.removeItem('auth-token');
        this.$router.push("/");
    }

    register(user) {
        return axios
            .post("/api/user/register", user)
            .then((res) => {
                console.log('registered: ', res);
                this.$router.push("/");
            })
    }
}

export default new AuthService();