import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPostDialogComponent } from '../add-post-dialog/add-post-dialog.component';
import { Post } from '../models/post';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts;
  post = new Post('', '', '', [], []);
  postCommentUsers = [];
  comment = new Comment(null, '', '', '', '', '', '', '', '');

  constructor(private _postService:PostService, private _userService:UserService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this._postService.getAllPosts().subscribe(data => {
       this.posts = data;
    });

  }

  openAddPostDialog() {
    this.dialog.open(AddPostDialogComponent);

  }

  toggleCommentsSection(comments: Array<Comment>) {
    //fajnie jakby postComs zawierał name i surname użytkownika komentującego a nie tylko id
  }

}
