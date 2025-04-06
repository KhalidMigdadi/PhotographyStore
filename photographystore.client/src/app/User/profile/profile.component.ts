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

    if (userId) {
      this.shopUserService.getUserById(userId).subscribe(user => {
        this.userData = user;
      });
    }

  }


  //////////////////////////////////////////////////////////////////////end of ngOninit
  logout() {
    this.shopUserService.logout();
    this.router.navigate(['/login']);

  }






  /////////////////////////////////////////////////////////////////////////////////////////////

  orders: any[] = [];
  userId: string | null = null;


  //loadOrders() {
  //  this.shopUserService.getOrders().subscribe(allOrders => {
  //    const userOrders = allOrders.filter(order => order.User_Id == this.userId);

  //    this.shopUserService.getOrderItems().subscribe(items => {
  //      this.shopUserService.getProducts().subscribe(products => {
  //        this.orders = userOrders.map((order, index) => {
  //          const orderItem = items.find(i => i.CartItem_Id == order.Cart_Id);
  //          const product = products.find(p => p.id == order.Cart_Id); // Assuming `Cart_Id` = product.id

  //          return {
  //            index: index + 1,
  //            name: product ? product.name : 'Unknown',
  //            date: new Date().toLocaleDateString(), // Mock date — adjust if you have one
  //            status: 'Pending', // Mock status — replace if real data exists
  //            total: orderItem ? `$${orderItem.Total}` : '$0',
  //            productId: product?.id
  //          };
  //        });
  //      });
  //    });
  //  });
  //}
  loadOrders() {
    this.shopUserService.getOrders().subscribe(allOrders => {
      const userOrders = allOrders.filter(order => order.User_Id == this.userId);

      this.shopUserService.getOrderItems().subscribe(items => {
        this.shopUserService.getProducts().subscribe(products => {
          this.orders = userOrders.map((order, index) => {
            const cartId = order.Cart_Id;

            // ✅ Match items by Cart_Id (corrected key)
            const orderItems = items.filter(item => item.Cart_Id === cartId);

            // ✅ Sum the total of all items for this Cart_Id
            const total = orderItems.reduce((sum, item) => sum + parseFloat(item.Total || '0'), 0);

            // Just get one product that matches the Cart_Id (optional logic)
            const product = products.find(p => p.id === cartId);

            return {
              index: index + 1,
              name: product ? product.name : 'Unknown',
              date: new Date().toLocaleDateString(),
              total: `$${total.toFixed(2)}`,
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




  ////////////////////////////////////////////////////
  ///////////////////
  saveProfileData() {
    const userId = this.shopUserService.getUserId();
    if (!userId) return;

    const updateData = {
      name: this.userData.name,
      email: this.userData.email,
      avatar: this.userData.avatar
    };

    this.shopUserService.updateUser(userId, updateData).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Profile Info Updated',
        timer: 2000,
        showConfirmButton: false
      });
    });
  }

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

  saveNewPassword() {
    this.passwordError = '';
    if (!this.isPasswordVerified) {
      this.passwordError = 'You must verify your current password first';
      return;
    }

    if (this.password.new !== this.password.confirm) {
      this.passwordError = 'New passwords do not match';
      return;
    }

    const userId = this.shopUserService.getUserId();
    if (!userId) return;

    this.shopUserService.updateUser(userId, {
      password: this.password.new
    }).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Password Updated',
        timer: 2000,
        showConfirmButton: false
      });

      this.password = { current: '', new: '', confirm: '' };
      this.isPasswordVerified = false;
    });
  }

}

