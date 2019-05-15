import React from 'react';

import classes from './Post.module.css';

const post = props => (
  <article className={classes.post} onClick={props.click}>
    <h1>{props.title}</h1>
    <div>
      <div className={classes.author}>{props.author}</div>
    </div>
  </article>
);

export default post;