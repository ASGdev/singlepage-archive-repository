import React, { Component } from 'react';
import { Link, Route, Switch, useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react'
import FileSaver from 'file-saver';

export default class History extends Component {
  constructor() {
    super();
	this.state = {
		history: []
    }
	
	this.fetch = () => {
		fetch('/repository/archives')
		  .then(res => {
			  return res.json()
		  })
		  .then(data => {
			console.log(data)
			this.setState({history: data})
		  })
	}
  }

  componentDidMount() {
	this.fetch()
  }
  
  componentDidUpdate(prevProps) {
	  if (prevProps.pid !== this.props.pid) {
		this.fetch()
	  }
	}

  render() {
	  
	/*let downloadProjectButton;
    if (this.state.summary.projectFile) {
      downloadProjectButton = <Button icon labelPosition='left' onClick={ () => this.down() }><Icon name='download' />Download project file</Button>
    } */

    return (
			<div>
				
			
			
			
			</div>
    );
  }
}