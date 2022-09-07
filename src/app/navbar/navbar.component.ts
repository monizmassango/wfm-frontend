import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  scroll(el: string) {
    this.router.navigate(['/']).finally(() => {
      document.getElementById(el)?.scrollIntoView({
        behavior: 'smooth',
      });
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (number > 0) {
      document.querySelector('nav')?.classList.add('moveTop');
    } else {
      document.querySelector('nav')?.classList.remove('moveTop');
    }
  }
}
