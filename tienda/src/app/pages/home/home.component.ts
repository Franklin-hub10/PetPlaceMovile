import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router'; // CORRECCIÓN: Se usa @angular/router, no express
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent {

  videos = [
    { src: 'https://videos.pexels.com/video-files/2849936/2849936-uhd_2560_1440_24fps.mp4', alt: 'Perro feliz' },
    { src: 'https://videos.pexels.com/video-files/854982/854982-hd_1280_720_25fps.mp4', alt: 'Gato jugando' },
    { src: 'https://videos.pexels.com/video-files/6662773/6662773-hd_1280_720_60fps.mp4', alt: 'Conejo tierno' }
  ];

  @ViewChildren('videoElement') videoElements!: QueryList<ElementRef<HTMLVideoElement>>;

  ngAfterViewInit() {
    this.videoElements.forEach(video => {
      video.nativeElement.muted = true;
      video.nativeElement.volume = 0;
      video.nativeElement.setAttribute('muted', '');
    });
  }

  services = [
    {
      img: 'https://cdn.pixabay.com/photo/2021/12/17/19/15/grooming-6877255_640.jpg',
      title: 'Cuidado y Estética',
      description: 'Baño, corte y cuidado especial para todo tipo de mascotas.',
      icon: '🛁'
    },
    {
      img: 'https://cdn.pixabay.com/photo/2020/05/13/21/03/dog-food-5168940_640.jpg',
      title: 'Alimentos y Accesorios',
      description: 'Venta de productos premium para la alimentación y entretenimiento.',
      icon: '🍖'
    },
    {
      img: 'https://cdn.pixabay.com/photo/2020/03/17/13/57/veterinary-4940425_640.jpg',
      title: 'Atención Veterinaria',
      description: 'Consultas y atención médica para garantizar la salud de tu mascota.',
      icon: '🐶'
    }
  ];

  constructor(private servicio: AuthService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.servicio.isAuthenticated();
  }
}
