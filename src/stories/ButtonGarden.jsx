import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonGarden from '../components/ButtonGarden';

class ButtonGardenWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedButton: 'mmr',
    };

    this.handleClick = (name) => {
      this.setState({
        selectedButton: name,
      });

      action('Click')(name);
    };
  }

  render() {
    return (
      <ButtonGarden
        buttonNames={['mmr', 'heroes', 'pros']}
        selectedButton={this.state.selectedButton}
        onClick={this.handleClick}
      />
    );
  }
}

storiesOf('Button Garden', module).add('Default', () => <ButtonGardenWrapper />);
