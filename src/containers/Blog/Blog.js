import React, {Component} from 'react';

import axios from '../../axios-blogs';
import classes from './Blog.module.css';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import Post from '../../components/Post/Post';

class Blog extends Component {
  state = {
    posts: null,
    postSelectId: null,
    error: false
  }

  componentDidMount () {
    axios.get('/posts')
      .then(res => {
        // console.log(res);
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
        // console.log(err);
        this.setState({
          error: true
        });
      });
  }

  postSelectHandler = id => {
    this.setState({
      postSelectId: id
    });
  }

  render () {
    let posts = <p style={{textAlign: 'center'}}>Loading...</p>
    if (this.state.error) {
      posts = <p style={{ textAlign: 'center' }}>Something went wrong :(</p>
    }
    if (this.state.posts && !this.state.error) {
      posts = this.state.posts.map(post => {
        // console.log(post.id);
        return <Post
          key={post.id}
          title={post.title}
          author={post.author}
          click={() => this.postSelectHandler(post.id)} />
      });
    }
    return (
      <div>
        <section className={classes.posts}>
          {posts}
        </section>
        <section>
          <FullPost id={this.state.postSelectId}/>
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    )
  }
}

export default Blog;