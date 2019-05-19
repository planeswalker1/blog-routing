import React, {Component} from 'react';

import axios from 'axios';
import classes from './FullPost.module.css';

class FullPost extends Component {
  state = {
    post: null
  }

  componentDidMount () {
    console.log(this.props);
    this.loadData();
  }

  componentDidUpdate () {
    this.loadData();
  }

  loadData () {
    if (this.props.match.params.id) {
      if (!this.state.post || (this.state.post && (+this.props.match.params.id !== this.state.post.id))) {
        axios.get('/posts/' + this.props.match.params.id)
          .then(res => {
            this.setState({
              post: res.data
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
  postDeleteHandler = () => {
    axios.delete('/posts/' + this.props.match.params.id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  render () {
    let post = <p style={{textAlign: 'center'}}>Please select a post!</p>
    if (this.props.match.params.id) {
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