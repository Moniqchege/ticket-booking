// src/app/auth-modal.ts
export class AuthModal {
    isLoginVisible = true;
  
    loginObj = {
      email: '',
      password: '',
    };
  
    registerObj = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  
    isLoginFormVisible(): boolean {
      return this.isLoginVisible;
    }
  
    toggleForm(): void {
      this.isLoginVisible = !this.isLoginVisible;
    }
  
    onLogin(): void {
      // TODO: Add your login logic here
      console.log('Logging in with:', this.loginObj);
    }
  
    onRegister(): void {
      // TODO: Add your registration logic here
      if (this.registerObj.password !== this.registerObj.confirmPassword) {
        console.error("Passwords don't match!");
        return;
      }
      console.log('Registering with:', this.registerObj);
    }
  }
  