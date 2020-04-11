import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQAN3Do4D0neTGdNxt3s75A1ASqsHYcOjbEgIOjLcA0LrRzcqmu8MI-YnachtwBc1VDu-ukpkkbzS_oIhDU',
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
  getArtista(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map((data) => {
        return data['artists'].items;
      })
    );
  }
}
