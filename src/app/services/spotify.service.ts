import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQDyZsQlnFx3V1LZ9x-aajBMWgpqPsXHJ9N4OrKmwPjZVcispW9ROU6CatGUqGIW5_7HH3lRt25m4gmdvx0',
    });

    return this.http.get(url, { headers });
  }

  // nuevas canciones
  getNewTeleases() {
    return this.getQuery('browse/new-releases?limit=20').pipe(
      map((data) => {
        // el albums indicado abajo simplemente lo que dice que es si existe
        // en el objeto data un atributo albums, que lo coja
        return data['albums'].items;
      })
    );
  }

  // buscar artista
  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data) => {
        return data['artists'].items;
      })
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map((data) => {
        return data['tracks'];
      })
    );
  }
}
