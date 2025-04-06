

import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../Service/url.service';
import { CartService } from '../../Service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {



  product: any[] = [];
  allProducts: any[] = [];
  favoriteList: any[] = []; // ✅ تخزين المنتجات المفضلة

  constructor(private urlService: UrlService, private cartService: CartService) { }

  ngOnInit() {
    this.showdata();
    this.loadFavorites(); // ✅ تحميل المنتجات المفضلة عند فتح الصفحة

   
  }

  

  // ✅ جلب المنتجات من API
  showdata() {
    this.urlService.getProducts().subscribe((data) => {
      this.product = data;
      this.allProducts = data;
    });
  }

  // ✅ تحميل قائمة المفضلة بناءً على `userId`
  loadFavorites() {
    const userId = this.urlService.getUserId();
    if (!userId) return;

    this.urlService.getFavorites().subscribe((favorites) => {
      this.favoriteList = favorites.filter((item: any) => item.userId == userId);
    });
  }

  // ✅ إضافة المنتج إلى السلة مع userId
  Addtocart(product: any) {
    const userId = this.urlService.getUserId(); // جلب userId
    const cartId = this.urlService.getCartId(); // جلب cartId المحفوظ

    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Please login first!',
        text: 'You need to be logged in to add items to the cart.',
      });
      return;
    }

    if (!cartId) {
      Swal.fire({
        icon: 'error',
        title: 'Cart ID not found!',
        text: 'Please create a cart before adding items.',
      });
      return;
    }

    const cartItem = {
      ...product, // بيانات المنتج
      userId: userId, // إضافة userId
      cartId: cartId, // إضافة cartId
      quantity: 1 // الكمية الافتراضية
    };
    const userIdNumber = Number(userId); // تحويل userId إلى رقم
    this.cartService.addToCart(cartItem, userIdNumber).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          text: `${product.name} has been added to your cart.`,
          timer: 1500
        });
      },
      (error) => {
        console.error('Error adding product to cartItem:', error);
      }
    );
  }


  // ✅ إضافة المنتج إلى المفضلة بعد التحقق من عدم وجوده مسبقًا
  addToFavorite(product: any) {
    const userId = this.urlService.getUserId(); // جلب `userId` من الخدمة

    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Please login first!',
        text: 'You need to be logged in to add items to favorites.',
      });
      return;
    }

    // التحقق مما إذا كان المنتج موجودًا بالفعل في المفضلة
    const isAlreadyInFavorites = this.favoriteList.some(
      (fav) => fav.productId === product.id && fav.userId == userId
    );

    if (isAlreadyInFavorites) {
      Swal.fire({
        icon: 'info',
        title: 'Already in Favorites!',
        text: `${product.name} is already in your favorites.`,
      });
      return;
    }

    // Phantom was here
    const favoriteItem = {
      userId: userId,
      productId: product.id,
      name: product.name,
      price: product.price,
      avatar: product.img // ✅ لاحظ الاسم الصحيح هنا
    };

    // إرسال المنتج إلى API
    this.urlService.addToFavorite(favoriteItem).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Added to Favorites!',
        text: `${product.name} has been added to your favorites.`,
        timer: 1500
      });

      // تحديث القائمة المحلية للمفضلة بعد الإضافة
      this.favoriteList.push(favoriteItem);
    });
  }










  // ✅ ترتيب المنتجات
  sortProducts(event: any) {
    const value = event.target.value;

    if (value === 'trending') {
      this.product = this.product.sort((a, b) => b.trending - a.trending);
    } else if (value === 'sales') {
      this.product = this.product.sort((a, b) => b.sales - a.sales);
    } else if (value === 'rating') {
      this.product = this.product.sort((a, b) => b.rating - a.rating);
    } else if (value === 'date') {
      this.product = this.product.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (value === 'price-asc') {
      this.product = this.product.sort((a, b) => a.price - b.price);
    } else if (value === 'price-desc') {
      this.product = this.product.sort((a, b) => b.price - a.price);
    }
  }

  // Phantom was here
  getStars(rating: number): any[] {
    return Array(rating).fill(0);
  }




  /////////// FOR SOUND SERACH ////////

  name: string = '';
  greetingMessage: string = '';

  namesList: string[] = ['Sony', 'Canon EOS R5', 'Canon EOS 5D Mark IV', 'Canon PowerShot V1', 'Canon EOS 250D', 'Canon EOS 90D',
    'Canon EOS Rebel T8i', 'Canon EOS M50', 'Canon PowerShot G7 X Mark III',
    'Nikon Z9', 'Nikon D7500', 'Nikon D850', 'Nikon Z50',
    'Sony Alpha a6000', 'Sony Cyber-shot RX100 VII', 'Sony Alpha 7 IV'
    ,'Panasonic Lumix'];

  startVoiceRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('The browser does not support voice search');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-EG';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: any) => {
      const spokenName = event.results[0][0].transcript;
      console.log("Recognized Name: ", spokenName);
      this.checkNameInList(spokenName);
    };

    recognition.onerror = (event: any) => {
      console.error('Error occurred while recognizing speech:', event.error);
      if (event.error === 'no-speech') {
        alert('No speech was recognized.');
      } else if (event.error === 'audio-capture') {
        alert('There was an issue with the microphone.');
      } else if (event.error === 'not-allowed') {
        alert('Microphone permission was not granted.');
      } else {
        alert('An unknown error occurred: ' + event.error);
      }
    };
  }

  //checkNameInList(spokenName: string) {
  //  // Normalize the spoken name: remove extra spaces and convert to lowercase
  //  const normalizedSpokenName = spokenName.trim().toLowerCase().replace(/\s+/g, '').replace(/[^\wء-ي]/g, '');

  //  console.log("Normalized Name: ", normalizedSpokenName);

  //  // A map for name substitutions (for different pronunciations)
  //  const nameSubstitutions: { [key: string]: string } = {
  //    "سوني": "sony",
  //    "كانون": "canon",
  //    "نيكون": "nikon",
  //    "باناسونيك": "panasonic"
  //  };

  //  // Correct the name if necessary based on the substitutions map
  //  const correctedName = nameSubstitutions[normalizedSpokenName] || normalizedSpokenName;

  //  // Find all cameras that contain the corrected name (case-insensitive)
  //  const matchingCameras = this.namesList.filter(name => name.toLowerCase().includes(correctedName.toLowerCase()));

  //  if (matchingCameras.length > 0) {
  //    this.greetingMessage = `Found the following cameras matching "${spokenName}": ${matchingCameras.join(', ')}`;
  //  } else {
  //    this.greetingMessage = `No cameras found matching "${spokenName}".`;
  //  }
  //}

  checkNameInList(spokenName: string) {
    const normalizedSpokenName = spokenName.trim().toLowerCase().replace(/\s+/g, '').replace(/[^\wء-ي]/g, '');

    const nameSubstitutions: { [key: string]: string } = {
      "سوني": "sony",
      "كانون": "canon",
      "نيكون": "nikon",
      "باناسونيك": "panasonic",
      "عرضالكل": "showall",
      "عرضكل": "showall"
    };

    const correctedName = nameSubstitutions[normalizedSpokenName] || normalizedSpokenName;

    if (correctedName === 'showall') {
      this.product = [...this.allProducts];
      this.greetingMessage = 'Showing all products 📦';
      return;
    }

    this.product = this.allProducts.filter((p) =>
      p.name.toLowerCase().includes(correctedName)
    );

    if (this.product.length > 0) {
      this.greetingMessage = `Showing results for "${spokenName}" 📸`;
    } else {
      this.greetingMessage = `No products found matching "${spokenName}". 😢`;
    }
  }


}
