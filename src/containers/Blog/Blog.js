import React, {Component} from 'react';
import {Route, NavLink, Switch} from 'react-router-dom';

import classes from './Blog.module.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {
  render () {
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
          <Route path='/new' component={NewPost} />
          <Route path='/posts' component={Posts} />
        </Switch>
      </div>
    )
  }
}

export default Blog;