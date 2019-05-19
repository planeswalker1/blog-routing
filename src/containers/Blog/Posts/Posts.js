import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import axios from '../../../axios-blogs';
import classes from './Posts.module.css';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('/posts')
      .then(res => {
        console.log(res);
        let posts = res.data.slice(0, 4);
        let updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Daniel'
          };
        });
        this.setState({
          posts: updatedPosts
        });
      })
      .catch(err => {
        console.log(err);
        // this.setState({
        //   error: true
        // });
      });
  }

  postSelectHandler = id => {
    // this.props.history.push({
    //   pathName: '/posts/' + id
    // });
    this.props.history.push('/posts/' + id);
  }

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Loading...</p>
    if (this.state.error) {
      posts = <p style={{ textAlign: 'center' }}>Something went wrong :(</p>
    }
    if (this.state.posts && !this.state.error) {
      posts = this.state.posts.map(post => {
        // console.log(post.id);
        return (
          //<Link to={'/posts/' + post.id} key={post.id}>
            <Post
            key={post.id}
            title={post.title}
            author={post.author}
            click={() => this.postSelectHandler(post.id)} />
          //</Link>
        );
      });
    }
    return (
      <div>
        <section className={classes.posts}>
          {posts}
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;