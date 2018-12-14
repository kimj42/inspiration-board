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
    const GET_ALL_CARDS_URL = "https://inspiration-board.herokuapp.com/boards/redPanda/cards";

    axios.get(GET_ALL_CARDS_URL)
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

  addCardintoCardCollection = (newCardInfo) => {
    // console.log("I'm in addCardintoCardCollection");
    // let newCardCollection = this.state.cards.push(newCard)
    //
    // this.setState({
    //   cards: newCardCollection
    // });
    const POST_CARD_TO_BOARD_URL = "https://inspiration-board.herokuapp.com/boards/redPanda/cards";

     axios.post(POST_CARD_TO_BOARD_URL, newCardInfo)
     .then((response) => {
       console.log("In the success response for the post", response);
       let updatedData = this.state.cards;
        updatedData.push({card: newCardInfo});
        this.setState({cards: updatedData});
     })
     .catch((errors) => {
       this.setState({
         errors: errors.message
       });
     });
  }

  render() {
    console.log(this.state.cards);
    const emoji = require("emoji-dictionary");
    const exampleFormat = this.state.cards.map((entry, i) => {
      return <Card key={i}  text={entry.card.text} emoji={emoji.getUnicode(`${entry.card.emoji}`)} />
    });

    return (
      <div>
        <h1>{emoji.getUnicode('sparkling_heart')} Red Panda {emoji.getUnicode('sparkling_heart')}</h1>

        <section>
          <span>Add a new card: </span>
          <NewCardForm callback={this.addCardintoCardCollection}/>
        </section>
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
