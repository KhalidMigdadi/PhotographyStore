import { Component } from '@angular/core';
import { UrlService } from '../../Service/url.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
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


  Data:any


  isLoggedIn: boolean = false; // ✅ Login status flag

  constructor(private shopUserService: UrlService, private router: Router) { }

  ngOnInit() {
    this.shopUserService.userId$.subscribe(id => {
      console.log('Logged-in user ID:', id);
      this.isLoggedIn = !!id; // ✅ Set login status based on userId presence
    });

  }

  // ✅ LOGIN FUNCTION
  onLogin(form: NgForm) {
    if (form.invalid) return;

    const { email, password } = this.loginData;

    this.shopUserService.getUsers().subscribe(users => {
      const user: any = users.find(
        (u: { email: string; password: string }) =>
          u.email === email && u.password === password
      );
    }
    )
    // Admin login
    if (email === 'admin@gmail.com' && password === 'admin') {
      this.isLoggedIn = true;
      Swal.fire({
        icon: 'success',
        title: 'Admin Login',
        text: 'Welcome Admin!',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['/dash']);
      });
      return;
    }

    // Regular user login
    this.shopUserService.getUsers().subscribe(users => {
      const user: any = users.find(
        (u: { email: string; password: string }) =>
          u.email === email && u.password === password
      );

      if (user) {
        this.shopUserService.setUserId(user.id);
        this.shopUserService.CartId;

        this.isLoggedIn = true;

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: `Welcome back, ${user.name}!`,
          timer: 2000,
          showConfirmButton: false

        }).then(() => {
          this.AddNewCartItem(this.Data)
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


  AddNewCartItem(data: any) {
    const userId = this.shopUserService.getUserId(); // جلب الـ userId

    // تأكد من أن data يحتوي على userId قبل إرساله
    const dataWithUserId = { ...data, userId }; // إضافة الـ userId إلى البيانات

    this.shopUserService.addCart(dataWithUserId).subscribe(() => {
      console.log('Item added to the cart with userId');
    }, error => {
      console.log('Error adding item to the cart:', error);
    });
  }


  // ✅ REGISTER FUNCTION
  onRegister(form: NgForm) {
    if (form.invalid || this.registerData.password !== this.registerData.repeatPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Registration Error',
        text: 'Please check your inputs. Passwords must match.'
      });
      return;
    }

    // Check if email already exists
    this.shopUserService.getUsers().subscribe(users => {
      const emailExists = users.some(
        (user: any) =>
          user.email.toLowerCase() === this.registerData.email.toLowerCase()
      );

      if (emailExists) {
        Swal.fire({
          icon: 'error',
          title: 'Email Already Registered',
          text: 'Please use a different email address.'
        });
        return;
      }

      // Proceed with registration
      const newUser = {
        name: this.registerData.name,
        email: this.registerData.email,
        password: this.registerData.password,
        avatar: '',
        address: '',
        paymentMethod: '',
        cardId: '',
        cardDate: new Date().toISOString(),
        cvv: '',
        phone: ''
      };

      this.shopUserService.addUser(newUser).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Complete',
          text: 'You have successfully registered!'
        });
        form.reset();
      });
    });
  }
}
