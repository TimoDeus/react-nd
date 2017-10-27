import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ListContacts from './ListContacts.js';
import CreateContact from './CreateContact.js';
import * as ContactApi from './utils/ContactsAPI.js';

class App extends Component {

	state = {
		contacts: []
	};

	componentDidMount() {
		this.fetchContacts();
	}

	fetchContacts = () => ContactApi.getAll().then(contacts => this.setState({contacts}));

	removeContact = contact => {
		this.setState(prevState => ({
			contacts: prevState.contacts.filter(c => c.id !== contact.id)
		}));
		ContactApi.remove(contact);
	};

	createContact = history => values => {
		ContactApi.create(values).then(contact => {
				this.setState(state => ({
					contacts: state.contacts.concat([contact])
				}));
				history.push('/');
			}
		);
	};

	render() {
		return (
			<div>
				<Route exact path='/' render={() => (
					<ListContacts onDeleteContact={this.removeContact}
								  contacts={this.state.contacts}/>
				)}/>
				<Route path='/create' render={({history}) => (
					<CreateContact onCreateContract={this.createContact(history)}/>
				)}/>
			</div>
		)
	}
}

export default App;
