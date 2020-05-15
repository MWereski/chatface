import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = "http://192.168.6.5:5533/api/Posts";

  constructor(private http:HttpClient) { }

  getAllPosts() {
    return this.http.get<Post>(this.url);
  }

  postPost(post:Post) {
    return this.http.post<Post>(this.url + '/create', post); 
  }
}
