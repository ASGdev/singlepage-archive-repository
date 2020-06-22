import React, { Component } from 'react';

export default class Logout extends Component {
  constructor(props) {
    super(props)

  }
  
  componentDidMount() {
	fetch('/api/logout', {
      method: 'POST',
	  body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }


  render() {
    return ("");
  }
}