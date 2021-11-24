export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('auth-token'));
  
    if (user && user.token) {
      return { 'x-access-token': user.token };
    } else {
      return {};
    }
  }