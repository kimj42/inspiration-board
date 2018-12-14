import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
// import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
      errors: [],
    };
  };

  componentDidMount() {
    const GET_ALL_CARDS = "https://inspiration-board.herokuapp.com/boards/redPanda/cards";

    axios.get(GET_ALL_CARDS)
    .then((response) => {
      this.setState({
        cards: response.data,
      });
    })
    .catch((error) => {
      this.setState({
        errors: error.message
      });
    });
  }



  render() {
    const emoji = require("emoji-dictionary");

    const exampleFormat = this.state.cards.map((entry, i ) => {
      return <Card key={i}  text={entry.card.text} emoji={emoji.getUnicode(`${entry.card.emoji}`)} />
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
