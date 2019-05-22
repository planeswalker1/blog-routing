import React, {Component} from 'react';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import classes from './Blog.module.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost');
});

class Blog extends Component {
  state = {
    auth: true
  }

  render () {
    let authRoute = null;
    if (this.state.auth) {
      authRoute = <Route path='/new' component={AsyncNewPost} />
    }
    return (
      <div className={classes.blog}>
        <header>
          <nav>
            <ul>
              <li><NavLink
              to='/posts/'
              activeClassName='my-active'
              activeStyle={{
                color: 'purple',
                textDecoration: 'underline'
              }}>Posts</NavLink></li>
              <li><NavLink to={{
                pathname: '/new',
                hash: '#submit',
                search: '?quick-submit=true'
              }} exact>New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        {/* <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/" render={() => <h1>Home 2</h1>} /> */}
        <Switch>
          {this.state.auth ? authRoute : null}
          <Route path='/posts' component={Posts} />
          <Route render={() => <h1>Not Found</h1>} />
          {/* <Redirect from='/' to='/posts' /> */}
        </Switch>
      </div>
    )
  }
}

export default Blog;