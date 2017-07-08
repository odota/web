import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wordcloud from 'wordcloud';
import uuid from 'uuid';
import styles from './Wordcloud.css';

const stopWords = 'a,am,an,and,are,as,at,be,by,for,from,how,i,im,in,is,it,not,of,on,or,that,the,this,to,was,what,when,where,who,will,with';

function isStopWord(word) {
  const regex = new RegExp(`\\b${word}\\b`, 'i');
  return !(stopWords.search(regex) < 0);
}

function getBaseLog(x, y) {
  return Math.log(x) / Math.log(y);
}

function updateWordCloud(wordCounts, cloudDomId) {
  let wordList = [];
  let max = 0;
  const width = window.innerWidth * 0.8;

  Object.keys(wordCounts).forEach((key) => {
    if (!isStopWord(key)) {
      wordList.push([key, wordCounts[key]]);
      if (wordCounts[key] > max) {
        max = wordCounts[key];
      }
    }
  });

  const maxSize = width / 12;
  const minSize = 8;

  // @howardchung implementation of scaling
  const scale = maxSize / Math.log(max);
  // var scale = max_size/max;
    // take the log of each count and scale them up to top_size
    // use log since words such as "gg" tend to dominate
    // w[1] = Math.max(w[1]*scale, min_size);
  wordList = wordList.map(w => [w[0], Math.max(getBaseLog(w[1], 6) * scale, minSize)]);

  /*
    //@albertcui implementation of scaling
    max = max > 1000 ? 1000 : max;
    var scale = 300/max;
    //scale the words, min 10, max 400
    word_list.forEach(function(w){
      w[1] = Math.min(Math.max(Math.log(w[1])*w[1]*scale, 10), Math.min(Math.log(max)*400, 400));
    });
  */

  // sort the list to ensure most frequent words get displayed
  wordList = wordList.sort((a, b) => b[1] - a[1]);
  wordcloud(document.getElementById(cloudDomId), {
    list: wordList,
    backgroundColor: 'transparent',
    color: 'random-light',
    wait: 1,
  });
}

class Wordcloud extends React.Component {
  componentWillMount() {
    this.id = `a-${uuid.v4()}`;
  }
  componentDidMount() {
    updateWordCloud(this.props.counts, this.id);
  }
  componentDidUpdate(nextProps) {
    updateWordCloud(nextProps.counts, this.id);
  }
  render() {
    return (
      <canvas
        width={window.innerWidth * 0.75}
        height={window.innerWidth * 0.75 * 0.7}
        id={this.id}
        className={styles.Wordcloud}
      />
    );
  }
}
Wordcloud.defaultProps = {
  counts: {},
};
const { string } = PropTypes;
Wordcloud.propTypes = {
  counts: string,
};

export default connect()(Wordcloud);
