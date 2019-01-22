import React, { Component } from 'react'
class PostList extends Component {
  render() {
    return (
      <div className="postListMain">
        <div className="header">
          <form onSubmit="{this.props.addItem}">
            <input placeholder="Title" />
            <input placeholder="Comment" />
            <button type="submit"> Add Post </button>
          </form>
        </div>
      </div>
    )
  }
}

export default PostList;