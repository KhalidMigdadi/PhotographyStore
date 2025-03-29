import { Component } from '@angular/core';
import { UrlService } from '../../Service/url.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userName: string = '';

  constructor(
    private shopUserService: UrlService,
    private router: Router
  ) { }






  paymentData = {
    paymentMethod: '',
    cardId: '',
    cardDate: '',
    cvv: '',
    phone: ''
  };



  userData = {
    name: '',
    email: '',
    avatar: '',
    password: '' // Store current user password for verification
  };

  password = {
    current: '',
    new: '',
    confirm: ''
  };

  passwordError = '';
  isPasswordVerified = false;


  userAvatar: string = '';


  isEditing = false;
  //userName = '';
  address = '';
  country = '';
  city = '';
  ngOnInit() {
    const userId = this.shopUserService.getUserId();
    if (userId) {
      this.shopUserService.getUserById(userId).subscribe(user => {
        this.paymentData = {
          paymentMethod: user.paymentMethod || '',
          cardId: user.cardId || '',
          cardDate: user.cardDate ? user.cardDate.substring(0, 7) : '',
          cvv: user.cvv || '', phone: user.phone || ''
        };
      });
    }

    ////////

    if (userId) {
      this.shopUserService.getUserById(userId).subscribe(user => {
        this.userName = user.name;
        this.address = user.address;
      });
    }

    /////////////

    this.userId = this.shopUserService.getUserId();
    if (this.userId) {
      this.loadOrders();
    }
    ////////////////////
    if (userId) {
      this.shopUserService.getUserById(userId).subscribe(user => {
        this.userData.name = user.name;
        this.userData.email = user.email;
        this.userData.avatar = user.avatar || '';
        this.userData.password = user.password; // 👈 Store current password
      });
    }

    //////////////

    if (userId) {
      this.shopUserService.getUsers().subscribe(users => {
        const user = users.find((u: { id: string; }) => u.id === userId);
        if (user) {
          this.userName = user.name;
          console.log('userId:', userId);
          console.log('userName:', this.userName);
        }
      });
    } else {
      console.log('No user ID found');
      // Optional: redirect to login if user not logged in
    }

    /////////////////////////////
    if (userId) {
      this.shopUserService.getUserById(userId).subscribe(user => {
        this.userName = user.name || '';
        this.userAvatar = user.avatar || '';
      });
    }
  }

  logout() {
    this.shopUserService.logout();
    this.router.navigate(['/login']);
  }






  /////////////////////////////////////////////////////////////////////////////////////////////

  orders: any[] = [];
  userId: string | null = null;


  loadOrders() {
    this.shopUserService.getOrders().subscribe(allOrders => {
      const userOrders = allOrders.filter(order => order.User_Id == this.userId);

      this.shopUserService.getOrderItems().subscribe(items => {
        this.shopUserService.getProducts().subscribe(products => {
          this.orders = userOrders.map((order, index) => {
            const orderItem = items.find(i => i.CartItem_Id == order.Cart_Id);
            const product = products.find(p => p.id == order.Cart_Id); // Assuming `Cart_Id` = product.id

            return {
              index: index + 1,
              name: product ? product.name : 'Unknown',
              date: new Date().toLocaleDateString(), // Mock date — adjust if you have one
              status: 'Pending', // Mock status — replace if real data exists
              total: orderItem ? `$${orderItem.Total}` : '$0',
              productId: product?.id
            };
          });
        });
      });
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////


  updatePayment(): void {
    const userId = this.shopUserService.getUserId();
    if (userId) {
      const updatedData: any = {
        paymentMethod: this.paymentData.paymentMethod
      };

      if (this.paymentData.paymentMethod === 'Visa') {
        updatedData.cardId = this.paymentData.cardId;
        updatedData.cardDate = this.paymentData.cardDate;
        updatedData.cvv = this.paymentData.cvv;
      } else if (this.paymentData.paymentMethod === 'Orange Money') {
        updatedData.phone = this.paymentData.phone;
        updatedData.cardId = '';
        updatedData.cardDate = '';
        updatedData.cvv = '';
      }

      this.shopUserService.updateUser(userId, updatedData).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Payment Info Updated',
          showConfirmButton: false,
          timer: 2000
        });
      });
    }
  }

  //////////////////


  saveAddress() {
    const userId = this.shopUserService.getUserId();
    if (userId) {
      const fullAddress = `${this.country}, ${this.city}`;
      this.shopUserService.updateUser(userId, { address: fullAddress }).subscribe(() => {
        this.address = fullAddress;
        this.isEditing = false;
      });
    }
  }





  ///////////////////


  verifyCurrentPassword() {
    this.passwordError = '';

    if (this.password.current === this.userData.password) {
      this.isPasswordVerified = true;
      this.passwordError = '';
    } else {
      this.passwordError = 'Current password is incorrect';
      this.isPasswordVerified = false;
    }
  }

  saveChanges() {
    this.passwordError = '';

    if (this.isPasswordVerified && (this.password.new || this.password.confirm)) {
      if (this.password.new !== this.password.confirm) {
        this.passwordError = 'New passwords do not match';
        return;
      }
    }

    const userId = this.shopUserService.getUserId();
    if (userId) {
      const updateData: any = {
        name: this.userData.name,
        email: this.userData.email,
        avatar: this.userData.avatar
      };

      if (this.isPasswordVerified && this.password.new === this.password.confirm) {
        updateData.password = this.password.new;
      }

      this.shopUserService.updateUser(userId, updateData).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated',
          timer: 2000,
          showConfirmButton: false
        });

        // Reset password fields
        this.password = { current: '', new: '', confirm: '' };
        this.isPasswordVerified = false;
      });
    }


   

  }

}

