import React, {Component} from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import {Link} from "react-router-dom";

class ListContacts extends Component {

	static propTypes = {
		contacts: PropTypes.arrayOf(PropTypes.shape).isRequired,
		onDeleteContact: PropTypes.func.isRequired
	};

	state = {
		query: ''
	};

	updateQuery = newQuery => this.setState({query: newQuery.trim()});

	clearQuery = () => this.updateQuery('');

	getContactsToShow = () => {
		const {contacts} = this.props;
		const {query} = this.state;
		const match = new RegExp(escapeRegExp(query), 'i');
		const contactsToShow = query ? contacts.filter(contact => match.test(contact.name)) : contacts;
		contactsToShow.sort(sortBy('name'));
		return contactsToShow;
	};

	render() {
		const {contacts, onDeleteContact} = this.props;
		const {query} = this.state;
		const contactsToShow = this.getContactsToShow();
		return (
			<div className='list-contacts'>
				<div className='list-contacts-top'>
					<input className='search-contacts'
						   type='text'
						   placeholder='Search contacts'
						   value={query}
						   onChange={event => this.updateQuery(event.target.value)}
					/>
					<Link to='/create' className='add-contact'>
						Add contact
					</Link>
				</div>

				{contactsToShow.length !== contacts.length && (
					<div className='showing-contacts'>
						<span>Now showing {contactsToShow.length} of {contacts.length}</span>
						<button onClick={this.clearQuery}>Show all</button>
					</div>
				)}
				<ol className='contact-list'>
					{contactsToShow.map(contact => (
						<li key={contact.id} className='contact-list-item'>
							<div className='contact-avatar' style={{
								backgroundImage: `url(${contact.avatarURL})`
							}}/>
							<div className='contact-details'>
								<p>{contact.name}</p>
								<p>{contact.email}</p>
							</div>
							<button onClick={() => onDeleteContact(contact)} className='contact-remove'/>
						</li>
					))}
				</ol>
			</div>
		);
	}
}

export default ListContacts;
