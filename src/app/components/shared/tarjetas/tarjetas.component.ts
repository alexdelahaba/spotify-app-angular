import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css'],
})
export class TarjetasComponent implements OnInit {
  @Input() items: any[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  verArtista(item: any) {
    let id;
    if (item.type === 'album') {
      id = item.artists[0].id;
    }
    if (item.type === 'artist') {
      id = item.id;
    }
    this.router.navigate(['artist', id]);
    console.log(id);
  }
}
