import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import axios from 'axios';
import classes from './NewPost.module.css';

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: '',
    submitted: false
  }
  
  componentDidMount () {
    console.log(this.props);
    // if unauth => this.props.history.replace('/posts');
  }

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  dataPostHandler = () => {
    const post = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author
    };
    axios.post('/posts', post)
      .then(res => {
        console.log(res);
        // this.setState({
        //   submitted: true
        // });
        this.props.history.replace('/posts');
      })
      .catch(err => {
        // console.log(err);
      })
  }

  render () {
    let redirect = null;
    if (this.state.submitted) {
      redirect = <Redirect to='/posts' />
    }
    return (
      <div className={classes['new-post']}>
        {redirect}
        <h1>Add a post</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.inputChangeHandler} />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            cols="30"
            rows="10"
            value={this.state.content}
            onChange={this.inputChangeHandler}></textarea>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <select
            id="author"
            name="author"
            onChange={this.inputChangeHandler}>
            <option value="Daniel">Daniel</option>
            <option value="Brian">Brian</option>
            <option value="Angel">Angel</option>
            <option value="David">David</option>
          </select>
        </div>
        <button onClick={this.dataPostHandler}>Add Post</button>
      </div>
    );
  }
};

export default NewPost;