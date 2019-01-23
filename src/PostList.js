import React, { Component } from 'react'
class PostList extends Component {
  
  render() {
    const posts = this.props.posts
    console.log(posts)
    const postList = posts.map((post)=>{
      return(
       <tr key={post.postId}>
       <td >{post.postName}</td>
       <td >{post.postComment}</td>
       <td  className="right aligned"><button className="tiny ui primary  button" id={post.postId} onClick={this.props.populateUpdatePost(post.postId)}>Update</button></td>
       <td  className="right aligned"><button className="tiny negative ui  button" id={post.postId} onClick={this.props.populateDeletePost(post.postId)}>Delete</button></td>
     </tr>
      )
     } );
    return (
      <table className="ui unstackable table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Content</th>
      <th className="right aligned">Edit</th>
      <th className="right aligned">Delete</th>
    </tr>
  </thead>
  <tbody>
  {postList}
  </tbody>
</table>
    )
  }
}

export default PostList;