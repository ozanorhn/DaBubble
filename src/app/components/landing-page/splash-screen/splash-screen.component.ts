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
    // Wait for all animations to complete (2.5s) plus 1s pause at final position
    setTimeout(() => {
      document.getElementById('splash-screen')?.classList.add('splash-hidden');
      setTimeout(() => {
        this.showSplash = false;
      }, 500);
    }, 3500); // Total 4.5 seconds before starting to hide
  }
}

