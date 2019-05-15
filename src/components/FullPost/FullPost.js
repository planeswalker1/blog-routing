import React, {Component} from 'react';

import classes from './FullPost.module.css';
import axios from 'axios';

class FullPost extends Component {
  state = {
    post: null
  }
  componentDidUpdate () {
    if (this.props.id) {
      if (!this.state.post || (this.state.post && this.props.id !== this.state.post.id)) {
        axios.get('/posts/' + this.props.id)
          .then(res => {
            this.setState({
              post: res.data
            });
          })
          .catch(err => {
            // console.log(err);
          });
      }
    }
  }

  postDeleteHandler = () => {
    axios.delete('/posts/' + this.props.id)
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        // console.log(err);
      });
  }
  
  render () {
    let post = <p style={{textAlign: 'center'}}>Please select a post!</p>
    if (this.props.id) {
      post = <p style={{ textAlign: 'center' }}>Loading</p>
    }
    if (this.state.post) {
      post = (
        <div className={classes['full-post']}>
          <h1>{this.state.post.title}</h1>
          <p>{this.state.post.body}</p>
          <div className={classes.edit}>
            <button className={classes['button--delete']} onClick={this.postDeleteHandler}>Delete</button>
          </div>
        </div>
      )
    }
    return post
  }
}

export default FullPost;