import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../Service/url.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  product: any;
  reviews: any[] = [];
  activeTab: string = 'description'; 
  newReview = {
    name: '',
    email: '',
    comment: '',
    rating: 5,
    productId: ''
  };

  constructor(
    private route: ActivatedRoute,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.urlService.getProductByID(productId).subscribe((res: any) => {
        this.product = { ...res };

        // ⭐️ تحويل الـ specifications من String إلى Array
        if (typeof this.product.specifications === 'string') {
          this.product.specifications = this.product.specifications.split('\n');
        }

        console.log('product details: ', this.product);
        this.newReview.productId = productId;
        this.loadReviews(productId);
      });
    }
  }

  loadReviews(productId: string) {
    this.urlService.getReviewsByProductId(productId).subscribe((data: any) => {
      this.reviews = data;
    });
  }

  submitReview(productId: string) {
    this.newReview.productId = productId;

    this.urlService.addReview(this.newReview).subscribe(() => {
      this.newReview = { name: '', email: '', comment: '', rating: 5, productId };
      this.loadReviews(productId);
      Swal.fire({
        title: 'Thank you!',
        text: 'Your review has been submitted successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 2500,
        timerProgressBar: true
      });
    });
  }

  setRating(star: number) {
    this.newReview.rating = star;
  }

  
  share(platform: string) {
    const currentUrl = window.location.href;
    const name = this.product?.name || '';
    const description = this.product?.description ||  '';
    const extraNote = 'هذا المنتج جميل وأنصح به ❤️';

    const fullText = `Check out this awesome product: ${ name } - ${ description } \n${ extraNote }`;
    const encodedText = encodeURIComponent(fullText);
    const encodedUrl = encodeURIComponent(currentUrl);

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl =` https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'instagram':
        shareUrl = 'https://www.instagram.com/'; 
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  }

}
// والله شغل فخم مششششششششششششششش طبيعي
