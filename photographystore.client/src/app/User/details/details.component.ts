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
  facebookShareUrl: string = '';
  twitterShareUrl: string = '';
  instagramShareUrl: string = '';
  whatsappShareUrl: string = '';
  reviews: any[] = [];
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
        this.newReview.productId = productId;
        this.loadReviews(productId);
      });

      
      const currentUrl = window.location.href;
      const encodedUrl = encodeURIComponent(currentUrl);
      const text = encodeURIComponent(`Check out this awesome product`);
    

      this.facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      this.twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`;
      this.instagramShareUrl = `https://www.instagram.com/`;
      this.whatsappShareUrl = `https://wa.me/?text=${text}%20${encodedUrl}`;
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

  }

