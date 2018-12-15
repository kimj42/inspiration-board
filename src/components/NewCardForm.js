import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

class NewCardForm extends Component {
  constructor() {
    super();

    this.state = {
      text: "",
      emoji: "",
    };
  }

  onFormSubmit = (event) => {
    console.log("I'm in onFormSubmit");
    // hold onto the this.state.text and this.state.emoji and add that to the card inside the board
    //then reset the state so that it's back to empty string
    event.preventDefault();
    const newCardData = {
      text: this.state.text,
      emoji: this.state.emoji,

    };

    this.setState({
      text: "",
      emoji: "",
    });

    return this.props.createNewCardCallback(newCardData);
  };

  onInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    const newState = {};
    newState[field] = value;

    this.setState(newState);
  };

  // onInputChange = (event) => {
  //   console.log("In on input change");
  //
  //   const field = event.target.name;
  //   const value = event.target.value;
  //
  //   const newState = {};
  //   newState[field] = value;
  //   // newState.field = value;  // not the same :(
  //   this.setState(newState);
  // }

  render() {
    return (
      <section>
        <form onSubmit={this.onFormSubmit}>
          <div>
            <label htmlFor="text">Text: </label>
            <input name="text" type="text"
              value={this.state.text}
              onChange={this.onInputChange} />
          </div>
          <div>
            <label htmlFor="emoji">Emoji: </label>
            <input name="emoji" type="text"
              value={this.state.emoji}
              onChange={this.onInputChange} />
          </div>
          <input type="submit" value="Add Card" />
        </form>
      </section>
    );
  }
};

export default NewCardForm;
