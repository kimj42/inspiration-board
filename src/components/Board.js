import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
    };

  }





  render() {
    const emoji = require("emoji-dictionary");

    const exampleFormat = CARD_DATA.cards.map((entry) => {
      return <li> {entry.text} {emoji.getUnicode(`${entry.emoji}`)} </li>
    });

    return (
      <div>
        Board
        <ul>
          {exampleFormat}
        </ul>
      </div>

    )
  }

}

Board.propTypes = {

};

export default Board;
