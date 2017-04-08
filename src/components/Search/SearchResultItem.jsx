import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
// import { TableHeroImage } from 'components/Visualizations';

const SearchResultItem = ({ steamId, name, avatarFullUrl }) => (
  <div>
    <Link to={`/players/${steamId}`}>
      <ListItem
        primaryText={name}
        secondaryText={steamId}
        leftAvatar={<Avatar src={avatarFullUrl} />}
      />
    </Link>
    <Divider />
  </div>
);
SearchResultItem.propTypes = {
  steamId: PropTypes.number,
  name: PropTypes.string,
  avatarFullUrl: PropTypes.string,
};
export default SearchResultItem;
