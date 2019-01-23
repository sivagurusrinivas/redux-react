import React, { Component } from 'react';
import './App.css';
import PostList from './PostList';
import {connect} from 'react-redux'

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
      postCount:0,
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

   const addPayload =  {
    postName: newPostName,
    postComment: newPostComment
}
this.props.addPost(addPayload);
   
    // this.setState((state,props)=>({
    //   postId:state.postCount+1,
    //   posts:[...state.posts,{postId:state.postCount+1,postName:newPostName,postComment:newPostComment}]
    // }));
  }
  populateUpdatePost = (postId) =>(e)=>{
    this.props.toggleUpdateForm();
    this.props.posts.forEach((post)=>{
      if(post.postId===postId){

        // this.setState((state,props)=>({
        //   currentPost:post
        // }));
        this.props.setCurrentPost({post:post});
        this.updatePostName.current.value=post.postName;
        this.updatePostComment.current.value=post.postComment;
      }
    })

  }

  populateDeletePost = (postId) =>(e)=>{
    console.log("Populate Delete  "+postId);
    this.props.posts.forEach((post)=>{
      if(post.postId===postId){

        // this.setState((state,props)=>({
        //   currentPost:post
        // }));
        this.props.setCurrentPost({post:post});
        this.deletePostName.current.value=post.postName;
        this.deletePostComment.current.value=post.postComment;
      }
    })

  }
  updatePost = e => {
    e.preventDefault();
    const updatePostId = this.props.currentPost.postId;
   const updatePostName = this.updatePostName.current.value;
   const updatePostComment = this.updatePostComment.current.value;

   const updatePayload = {
     postId:updatePostId,
     postName:updatePostName,
     postComment:updatePostComment
   }
   this.props.updatePost(updatePayload);
    // this.setState((state,props)=>({
    //   posts:state.posts.map((post)=>{
    //     if(post.postId===updatePostId){
    //       post.postName=updatePostName
    //       post.postComment=updatePostComment
    //       return post
    //     }
    //     return post
    //   })
    // }));
  }

  deletePost = e => {
    e.preventDefault();
    const deletePostId = this.props.currentPost.postId;
    const deletPayload={
      postId:deletePostId
    }
    this.props.deletePost(deletPayload);
    // this.setState((state,props)=>({
    //   posts:state.posts.filter(post=>post.postId!==deletePostId)
    // }));
  }
  render() {
    let activeForm;
   
    if(this.props.addActive){
       activeForm=(
        <div className="addForm">
        <input ref={this.addPostName} type="text"></input>
        <input ref={this.addPostComment} type="text"></input>
        <button onClick={this.addPost}>Add</button>
        </div>
      )
    }
    else if(this.props.updateActive){
       activeForm=(
        <div className="updateForm">
        <input ref={this.updatePostName} type="text"></input>
        <input ref={this.updatePostComment} type="text"></input>
        <button onClick={this.updatePost}>Update</button>
        </div>
      )
    }
    else if(this.props.deleteActive){
       activeForm=(
        <div className="deleteForm">
        <input ref={this.deletePostName} type="text" readOnly></input>
        <input ref={this.deletePostComment} type="text" readOnly></input>
        <button onClick={this.deletePost}>Delete</button>
        </div>
      )
    }
    return (
      <div className="App">
      <PostList posts={this.props.posts} populateUpdatePost={this.populateUpdatePost} populateDeletePost={this.populateDeletePost}/>
      <form>
      
      <div className="addForm">
        <input ref={this.addPostName} type="text"></input>
        <input ref={this.addPostComment} type="text"></input>
        <button onClick={this.addPost}>Add</button>
        </div>
        <div className="updateForm">
        <input ref={this.updatePostName} type="text"></input>
        <input ref={this.updatePostComment} type="text"></input>
        <button onClick={this.updatePost}>Update</button>
        </div>
        <div className="deleteForm">
        <input ref={this.deletePostName} type="text" readOnly></input>
        <input ref={this.deletePostComment} type="text" readOnly></input>
        <button onClick={this.deletePost}>Delete</button>
        </div>
        
      </form>
      </div>
    );
  }
}
const mapStateToProps = (state)=>{
  return{
    addActive:state.addActive,
      updateActive:state.updateActive,
      deleteActive:state.deleteActive,
      postCount:state.postCount,
      posts:state.posts,
      currentPost:state.currentPost
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    toggleAddForm:()=>dispatch({type:'TOGGLE_ADD_FORM'}),
    toggleUpdateForm:()=>dispatch({type:'TOGGLE_UPDATE_FORM'}),
    toggleDeleteForm:()=>dispatch({type:'TOGGLE_DELETE_FORM'}),
    addPost:(payload)=>dispatch( {type: 'ADD_POST',payload:payload}),
    updatePost:(payload)=>dispatch( {type: 'UPDATE_POST',payload:payload}),
    deletePost:(payload)=>dispatch( {type: 'DELETE_POST',payload:payload}),
    setCurrentPost:(payload)=>dispatch( {type: 'SET_CURRENT_POST',payload:payload})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
