import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost, updatePost } from '../../redux/actions/postActions';

class EditPost extends Component {
  state = {
    title: '',
    content: '',
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getPost(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.post !== prevProps.post) {
      const { title, content } = this.props.post;
      this.setState({ title, content });
    }
  }

  onChange = e =>
    this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { title, content } = this.state;
    const { id } = this.props.match.params;
    this.props.updatePost(id, { title, content });
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
        <button type="submit">Update Post</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  post: state.posts.post,
});

export default connect(mapStateToProps, { getPost, updatePost })(EditPost);
