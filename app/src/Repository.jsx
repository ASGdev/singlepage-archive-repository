import React, { Component } from 'react';
import { Link, Route, Switch, useParams } from 'react-router-dom';
import { Button, Icon, Card } from 'semantic-ui-react'
import FileSaver from 'file-saver';

export default class Repository extends Component {
  constructor() {
    super();
	this.state = {
		archives: []
    }
	
	this.fetch = () => {
		fetch('/repository')
		  .then(res => {
			  return res.json()
		  })
		  .then(data => {
			console.log(data)
			this.setState({archives: data})
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
  
  down = (file) => {
		fetch('/repository/file/' + file)
        .then(response => response.blob())
        .then(blob => {
            FileSaver.saveAs(blob, file);       
        });
		
	}

  render() {
	
	let archiveCards = this.state.archives.map((archive) => {
      return (
        <Card key={archive._id}>
			<Card.Content>
				<Card.Header>{ archive.name ? archive.name : <i>-</i> }</Card.Header>
				<Card.Description style={{'word-wrap': 'break-word'}}>{ archive.seed }</Card.Description>	
			</Card.Content>
			<Card.Content extra>
				<Card.Meta>{ archive.type }</Card.Meta>
				<Card.Meta>{ archive.date }</Card.Meta>	
			</Card.Content>
			<Card.Content extra>
				<Button icon labelPosition='left' onClick={() => this.down(archive.filePath)}><Icon name='download' />Download file</Button>
			</Card.Content>
		</Card>
      );
    });

    return (
			<div>
				<Card.Group>
					
					{ archiveCards }

				</Card.Group>
			
			</div>
    );
  }
}