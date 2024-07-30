import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../redux/actions/postActions';

class CreatePost extends Component {
  state = {
    title: '',
    content: '',
  };

  onChange = e =>
    this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { title, content } = this.state;
    this.props.addPost({ title, content });
    this.setState({ title: '', content: '' });
  };

  render() {
    const { title, content } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.onChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={content}
          onChange={this.onChange}
          placeholder="Content"
        />
        <button type="submit">Create Post</button>
      </form>
    );
  }
}

export default connect(null, { addPost })(CreatePost);
