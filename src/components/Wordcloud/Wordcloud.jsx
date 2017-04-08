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

function updateWordCloud(wordCounts, width, cloudDomId) {
  let wordList = [];
  let max = 0;

  Object.keys(wordCounts).forEach((key) => {
    if (!isStopWord(key)) {
      wordList.push([key, wordCounts[key]]);
      if (wordCounts[key] > max) {
        max = wordCounts[key];
      }
    }
  });

  const maxSize = width / 8;
  const minSize = 9;

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

  // console.log(wordList);

  wordcloud(document.getElementById(cloudDomId), {
    list: wordList,
    backgroundColor: 'transparent',
    color: 'random-light',
  });
}

class Wordcloud extends React.Component {
  componentWillMount() {
    this.id = `a-${uuid.v4()}`;
  }
  componentDidMount() {
    updateWordCloud(this.props.counts, this.props.width, this.id);
  }
  componentDidUpdate(nextProps) {
    updateWordCloud(nextProps.counts, nextProps.width, this.id);
  }
  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        id={this.id}
        className={styles.Wordcloud}
      />
    );
  }
}
Wordcloud.defaultProps = {
  counts: {},
  height: 600,
};
const { string, number } = PropTypes;
Wordcloud.propTypes = {
  counts: string,
  width: number,
  height: number,
};

const mapStateToProps = state => ({
  width: state.browser.width <= 960 ? state.browser.width - 50 : Math.min(1440, state.browser.width - 100),
});

export default connect(mapStateToProps)(Wordcloud);
