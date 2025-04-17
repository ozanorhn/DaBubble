import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss',
})

export class SplashScreenComponent {
  showSplash = true;
  letters: string[] = 'DA-Bubble'.split('');

  ngOnInit() {
    setTimeout(() => {
      document.getElementById('splash-screen')?.classList.add('splash-hidden');
     
    }, 3000); 
  }
}

