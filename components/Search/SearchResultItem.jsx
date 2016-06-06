import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';

class SearchResultItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var {steamId, name, avatarFullUrl, similarity} = this.props

    return (
      <div>
          <Avatar src={avatarFullUrl} />
          <h1>{name}</h1>
          <em>{steamId}</em>
      </div>
    );
  }
}

SearchResultItem.propTypes = {
    steamId: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    avatarFullUrl: React.PropTypes.string.isRequired,
    similarity: React.PropTypes.number.isRequired,
}

export default SearchResultItem
