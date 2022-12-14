import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  baseUrl : String = 'http://localhost:8080/api';
  //fullname = localStorage.getItem('user_name')+' '+localStorage.getItem('user_lastname')



  constructor(private http :HttpClient) { }

  createPost(data: any) {
    return this.http.post(this.baseUrl+'/addPost',data);
  }

  getPosts() {
    return this.http.get(this.baseUrl+'/getPosts');
  }

  getOnePost(){
    return this.http.get(this.baseUrl+'/getOnePost'+localStorage.getItem('post_id'));
  }

  updateProfile(user_id:any ,form:any)
  {
    return this.http.patch(this.baseUrl+'/updateUser'+user_id,form);

  }

  getCompletedPosts(){
    return this.http.get(this.baseUrl+'/getCompleted/'+localStorage.getItem('user_id'))

  }

  getInProgressPosts(){
    return this.http.get(this.baseUrl+'/getInProgress/'+localStorage.getItem('user_id'))}










  
}