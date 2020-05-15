import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { User } from '../models/user';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';
 
@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.scss']
})
export class AddPostDialogComponent implements OnInit {

  postModel = new Post('', '', '', [], []);
  user = new User('', '', '', '', '', '', null, '', null, '', [], [], [], [], []);

  constructor(private _postService: PostService, private _userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    
    this.postModel.userId = this.user.id;
  }

  addPost() {
    console.log(this.postModel);
    this._postService.postPost(this.postModel).subscribe();
  }

}
