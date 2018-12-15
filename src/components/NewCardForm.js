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
