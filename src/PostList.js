import React, { Component } from 'react'
class PostList extends Component {
  
  render() {
    const posts = this.props.posts
    console.log(posts)
    const postList = posts.map((post)=>{
      return(
        <div key={post.postId} className="postEdit">
       <li key={post.postId} id={post.postId}>{post.postName}----{post.postComment}</li>
       <button id={post.postId} onClick={this.props.populateUpdatePost(post.postId)}>Update</button>
       <button id={post.postId} onClick={this.props.populateDeletePost(post.postId)}>Delete</button>
       </div>
      )
     } );
    return (
      <ul>{postList}</ul>
    )
  }
}

export default PostList;