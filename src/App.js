import React, { Component } from 'react';
import {connect} from 'react-redux'

import PostList from './PostList';

import './App.css';
import '../node_modules/semantic-ui-css/semantic.min.css';
class App extends Component {
  constructor(){
    super();
    this.addPostName = React.createRef();
    this.addPostComment = React.createRef();
    this.updatePostName = React.createRef();
    this.updatePostComment = React.createRef();
    this.deletePostName = React.createRef();
    this.deletePostComment = React.createRef();
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
   
 
  }
  populateUpdatePost = (postId) =>(e)=>{
    this.props.toggleUpdateForm();
    this.props.posts.forEach((post)=>{
      if(post.postId===postId){
        this.props.setCurrentPost({post:post});
        this.updatePostName.current.value=post.postName;
        this.updatePostComment.current.value=post.postComment;
      }
    })
    this.props.toggleUpdateForm();
  }

  populateDeletePost = (postId) =>(e)=>{
   
    this.props.posts.forEach((post)=>{
      if(post.postId===postId){
        this.props.setCurrentPost({post:post});
        this.deletePostName.current.value=post.postName;
        this.deletePostComment.current.value=post.postComment;
      }
    })
    this.props.toggleDeleteForm();

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
    this.toogleAdd();
  }

  toogleAdd = e =>{
  
    this.addPostName.current.value='';
    this.addPostComment.current.value='';
    this.props.toggleAddForm();
    if(e!==undefined)
    e.preventDefault();
  }

  deletePost = e => {
    e.preventDefault();
    const deletePostId = this.props.currentPost.postId;
    const deletPayload={
      postId:deletePostId
    }
    this.props.deletePost(deletPayload);
    this.toogleAdd();
  }
  render() {
    var addStyle = {
			display: !this.props.addActive ? "none" : "block"
    }
    var updateStyle = {
			display: !this.props.updateActive ? "none" : "block"
    }
    var deleteStyle = {
			display: !this.props.deleteActive ? "none" : "block"
    }
    var marginTop200={
      marginTop:'200px'
    }
    var marginTop10={
      marginTop:'10px'
    }
    return (
      <div className="App">
        <div className="ui two column centered grid">
        <div className="column">
      <PostList posts={this.props.posts} populateUpdatePost={this.populateUpdatePost} populateDeletePost={this.populateDeletePost}/>
      
      <div className="postForms" style={marginTop200}>
      <div className="addForm ui input" style={addStyle}>
        <input ref={this.addPostName} type="text" placeholder="Post"></input>
        <input ref={this.addPostComment} type="text" placeholder="Content"></input>
        <br></br>
        <button className="positive ui button" style={marginTop10} onClick={this.addPost}>Add</button>
        </div>
        <div className="updateForm ui input" style={updateStyle}>
        <input ref={this.updatePostName} type="text"></input>
        <input ref={this.updatePostComment} type="text"></input>
        <br></br>
        <button style={marginTop10} className="ui primary button" onClick={this.updatePost}>Update</button>
        <button  style={marginTop10} className="ui button" onClick={this.toogleAdd}>Cancel</button>
        <br></br>
        </div>
        <div className="deleteForm ui input" style={deleteStyle}>
        <input style={marginTop10} className="ui disabled input"ref={this.deletePostName} type="text" readOnly></input>
        <input style={marginTop10} className="ui disabled input" ref={this.deletePostComment} type="text" readOnly></input>
        <br></br>
        <button className="negative ui button" onClick={this.deletePost}>Delete</button>
        <button className="ui button" onClick={this.toogleAdd}>Cancel</button>
        </div>
        </div>
        </div>
        </div>
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
