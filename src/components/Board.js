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
      ids: [],
    };
  };

  componentDidMount() {
    const GET_ALL_CARDS_URL = "https://inspiration-board.herokuapp.com/boards/redPanda/cards";

    axios.get(GET_ALL_CARDS_URL)
    .then((response) => {
      let updatedIDsAfterGet = response.data.map((card) => {
        console.log(card.card.id);
        return card.card.id
      })

      this.setState({
        cards: response.data,
        ids: updatedIDsAfterGet,
      });
    })
    .catch((error) => {
      this.setState({
        errors: error.message
      });
    });
  }



  addCardintoCardCollection = (newCardInfo) => {
    const POST_CARD_TO_BOARD_URL = "https://inspiration-board.herokuapp.com/boards/redPanda/cards";

     axios.post(POST_CARD_TO_BOARD_URL, newCardInfo)
     .then((response) => {
       console.log("In the success response for the post", response);
       let updatedData = this.state.cards;
       updatedData.push({card: response.data.card});

       let updatedIDsAfterPost = this.state.ids;
       updatedIDsAfterPost.push(response.data.card.id);
       console.log(updatedIDsAfterPost);

       this.setState({
         cards: updatedData,
         ids: updatedIDsAfterPost,

       });
     })
     .catch((errors) => {
       this.setState({
         errors: errors.message
       });
     });
  };

  deleteCard = (cardNumber) => {
    console.log("I am in deleteCard");
    console.log(cardNumber);
    let DELETE_CARD_URL = `https://inspiration-board.herokuapp.com/cards/${cardNumber}`
    axios.delete(DELETE_CARD_URL)
      .then((response) => {
        console.log(response);
        console.log(`deleted card: ${cardNumber}`);
        let currentIDs = this.state.cards.map((card) => {
          // console.log(card);
          return card.card.id
        })
        let index = currentIDs.indexOf(cardNumber)

        let copyOfCardCollection = [...this.state.cards];
        copyOfCardCollection.splice(index, 1);

        let updatedIDsAfterDelete = copyOfCardCollection.map((card) => {
          // console.log(card);
          return card.card.id
        })

        this.setState({
          cards: copyOfCardCollection,
          ids: updatedIDsAfterDelete,
        });

      })
      .catch((errors) => {
        return <ul>
          <li>{errors}</li>
        </ul>
      })
  };

  render() {
    console.log(this.state.cards);
    const emoji = require("emoji-dictionary");
    const exampleFormat = this.state.cards.map((entry, i) => {
      return <li>
      <Card key={i}
        id={entry.card.id} text={entry.card.text} emoji={emoji.getUnicode(`${entry.card.emoji}`)} deleteCardCallback={this.deleteCard} />
    </li>

    });

    return (
      <div>
        <h1>{emoji.getUnicode('sparkling_heart')} Red Panda {emoji.getUnicode('sparkling_heart')}</h1>

        <section>
          <span>Add a new card: </span>
          <NewCardForm createNewCardCallback={this.addCardintoCardCollection}/>
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
