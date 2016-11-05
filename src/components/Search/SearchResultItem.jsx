import React from 'react';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
// import { TableHeroImage } from 'components/Visualizations';

export default ({ steamId, name, avatarFullUrl }) => (
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
