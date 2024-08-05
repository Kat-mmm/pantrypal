import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  loggedIn: any;

  constructor(private authService: AuthServiceService) {}

  ngOnInit(){
    this.loggedIn = this.authService.isAuthenticated();
    console.log(this.loggedIn);
  }
}
