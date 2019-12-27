import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import wordcloud from 'wordcloud';
import nanoid from 'nanoid';

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

const { string } = PropTypes;

class Wordcloud extends React.Component {
  id = `a-${nanoid()}`;

  static propTypes = {
    counts: string,
  }

  componentDidMount() {
    updateWordCloud(this.props.counts, this.id);
  }
  componentDidUpdate(nextProps) {
    updateWordCloud(nextProps.counts, this.id);
  }

  render() {
    const width = Math.min(1080, window.innerWidth * 0.75);
    const height = width * 0.7;
    return (
      <canvas
        width={width}
        height={height}
        id={this.id}
        style={{ display: 'block', margin: '0 auto' }}
      />
    );
  }
}
Wordcloud.defaultProps = {
  counts: {},
};

export default connect()(Wordcloud);
