import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import strings from 'lang';

import blogpost from './blogpost';
import styles from './styles.css';

const BlogpostAnnounce = () => {
  const dismiss = link => localStorage && localStorage.setItem('dismiss', link);

  return (
    <div className={styles.announce}>
      <main>
        <p>{ blogpost.title }</p>
        <p>{ blogpost.message }</p>
      </main>
      <aside>
        <RaisedButton
          onClick={() => dismiss(blogpost.link)}
          href={blogpost.link}
          label={strings.announce_blogpost}
          backgroundColor={styles.blue}
        />
      </aside>
    </div>
  );
};

const Announce = () => {
  if (Object.values(blogpost).length === Object.keys(blogpost).length) {
    // days
    const sinceBlogpost = Math.round((new Date() - new Date(blogpost.date)) / (1000 * 60 * 60 * 24));
    const ttl = 7;

    const isDismissed = localStorage && localStorage.getItem('dismiss') === blogpost.link;

    if (sinceBlogpost < ttl && !isDismissed) {
      return <BlogpostAnnounce />;
    }
  }

  return null;
};

export default Announce;
