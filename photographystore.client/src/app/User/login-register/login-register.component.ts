import { Component } from '@angular/core';
import { UrlService } from '../../Service/url.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {
  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  };

  constructor(private shopUserService: UrlService, private router: Router) { }
  ngOnInit() {
    this.shopUserService.userId$.subscribe(id => {
      console.log('Logged-in user ID:', id);
    });
  }

  onLogin(form: NgForm) {
    if (form.invalid) return;

    const { email, password } = this.loginData;

    // Check if the login is for the admin
    if (email === 'admin@gmail.com' && password === 'admin') {
      Swal.fire({
        icon: 'success',
        title: 'Admin Login',
        text: 'Welcome Admin!',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/dash']); // or /dashboard if that’s your route
      });
      return;
    }

    // Regular user login
    this.shopUserService.getUsers().subscribe(users => {
      const user: any = users.find((u: { email: string; password: string; }) =>
        u.email === email && u.password === password
      );

      if (user) {      // Save user ID in BehaviorSubject
        this.shopUserService.setUserId(user.id); // <-- ADD THIS LINE

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome back, ${user.name}!`,
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['/profile']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid email or password.'
        });
      }
    });
  }


  onRegister(form: NgForm) {
    if (form.invalid || this.registerData.password !== this.registerData.repeatPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Registration Error',
        text: 'Please check your inputs. Passwords must match.'
      });
      return;
    }

    const newUser = {
      name: this.registerData.name,
      email: this.registerData.email,
      password: this.registerData.password,
      avatar: '', // You can add logic for random avatar
      address: '',
      paymentMethod: '',
      cardId: '',
      cardDate: new Date().toISOString(),
      cvv: '',
      phone:''

    };

    this.shopUserService.addUser(newUser).subscribe(res => {
      Swal.fire({
        icon: 'success',
        title: 'Registration Complete',
        text: 'You have successfully registered!'
      });
      form.reset();
    });
  }
}
