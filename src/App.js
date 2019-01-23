import React, { Component } from 'react';
import './App.css';
import PostList from './PostList';

class App extends Component {
  constructor(){
    super();
    this.addPostName = React.createRef();
    this.addPostComment = React.createRef();
    this.updatePostName = React.createRef();
    this.updatePostComment = React.createRef();
    this.deletePostName = React.createRef();
    this.deletePostComment = React.createRef();
    this.state={
      addActive:true,
      updateActive:false,
      deleteActive:false,
      postId:0,
      posts:[{postId:100,postName:"Hello Hello",postComment:"Hey"}],
      currentPost:{}
    }
  }

  handleInput = e => {
    console.log('Hello Input')
  }
  addPost = e => {
    e.preventDefault();
   const newPostName = this.addPostName.current.value;
   const newPostComment = this.addPostComment.current.value;
   
    this.setState((state,props)=>({
      postId:state.postId+1,
      posts:[...state.posts,{postId:state.postId+1,postName:newPostName,postComment:newPostComment}]
    }));
  }
  populateUpdatePost = (postId) =>(e)=>{
    console.log("Populate Update  "+postId);
    this.state.posts.forEach((post)=>{
      if(post.postId===postId){

        this.setState((state,props)=>({
          currentPost:post
        }));
        this.updatePostName.current.value=post.postName;
        this.updatePostComment.current.value=post.postComment;
      }
    })

  }

  populateDeletePost = (postId) =>(e)=>{
    console.log("Populate Update  "+postId);
    this.state.posts.forEach((post)=>{
      if(post.postId===postId){

        this.setState((state,props)=>({
          currentPost:post
        }));
        this.deletePostName.current.value=post.postName;
        this.deletePostComment.current.value=post.postComment;
      }
    })

  }
  updatePost = e => {
    e.preventDefault();
    const updatePostId = this.state.currentPost.postId;
   const updatePostName = this.updatePostName.current.value;
   const updatePostComment = this.updatePostComment.current.value;
    this.setState((state,props)=>({
      posts:state.posts.map((post)=>{
        if(post.postId===updatePostId){
          post.postName=updatePostName
          post.postComment=updatePostComment
          return post
        }
        return post
      })
    }));
  }

  deletePost = e => {
    e.preventDefault();
    const deletePostId = this.state.currentPost.postId;
    this.setState((state,props)=>({
      posts:state.posts.filter(post=>post.postId!==deletePostId)
    }));
  }
  render() {
    return (
      <div className="App">
      <PostList posts={this.state.posts} populateUpdatePost={this.populateUpdatePost} populateDeletePost={this.populateDeletePost}/>
      <form>
      
        <input ref={this.addPostName} type="text"></input>
        <input ref={this.addPostComment} type="text"></input>
        <button onClick={this.addPost}>Add</button>
      
       
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <input ref={this.updatePostName} type="text"></input>
        <input ref={this.updatePostComment} type="text"></input>
        <button onClick={this.updatePost}>Update</button>
        

       
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <input ref={this.deletePostName} type="text" readOnly></input>
        <input ref={this.deletePostComment} type="text" readOnly></input>
        <button onClick={this.deletePost}>Delete</button>
        
      </form>
      </div>
    );
  }
}

export default App;
