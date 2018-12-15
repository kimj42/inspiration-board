import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {
  initiatePostRequest = () => {
    return this.props.deleteCardCallback(this.props.id)
  }

  render() {
    return (
      <div className="card">
        <span>
          {this.props.text} {this.props.emoji}
        </span>
        <button onClick={this.initiatePostRequest}> Delete </button>
      </div>
    )
  }
}

Card.propTypes = {
  text: PropTypes.string,
  emoji: PropTypes.string,
};

export default Card;
