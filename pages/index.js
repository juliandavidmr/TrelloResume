import React, { Component } from 'react'
import { deepOrange500 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Head from 'next/head'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import TableCheck from '../components/table-check'
import FontIcon from 'material-ui/FontIcon';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import TableUsers from '../components/table-users'
import TableCheckList from '../components/table-checklist'
import TableCards from '../components/table-cards'
import Chips from '../components/chips'
import LinearProgress from 'material-ui/LinearProgress'
import Paper from 'material-ui/Paper'

import * as Trello from '../utils/trello'
import * as Report from '../utils/report'


// Make sure react-tap-event-plugin only gets injected once
// Needed for material-ui
if (!process.tapEventInjected) {
	injectTapEventPlugin()
	process.tapEventInjected = true
}

const styles = {
	footer: {
		position: 'fixed',
		bottom: 0,
		width: '100%'
	},
	appbar: {
		width: '101.9%',
		margin: '-10px 0px 0px -8px'
	},
	chip: {
		margin: 4,
	},
};

const muiTheme = {
	palette: {
		accent1Color: deepOrange500
	}
};

class Main extends Component {

	constructor(props, context) {
		super(props, context)

		this.state = {
			open: false,
			value: 3,
			inputJson: {},
			errors: '',
			hasFile: false,
			// list
			users: [],
			checklists: [],
			cards: [],
			name: '',
			// Expanded
			expandedUsers: false,
			expandedCheckList: false,
			expandedCards: false,
			permission: true,
			// visible
			showUsers: true,
			showChecklist: true,
			showCards: true,

			loading: false
		}
	}

	evaluateState = () => {		
		this.setState({
			users: Trello.members(this.state.inputJson),
			checklists: Trello.checklists(this.state.inputJson),
			name: Trello.name(this.state.inputJson),
			permission: Trello.permission(this.state.inputJson),
			cards: Trello.cards(this.state.inputJson),
		})
	};

	handleChangeInputJson = (event) => {
		event.preventDefault();

		try {
			this.setState({ loading: true });
			const file = event.target.files[0];
			console.log('Event: ', file);

			var reader = new FileReader();

			reader.onload = function (e) {
				// console.log('Out: ', reader.result);
				this.setState({
					inputJson: JSON.parse(reader.result),
					errors: '',
					hasFile: true
				});

				// desactive loading
				setTimeout(function () {
					this.setState({ loading: false });
				}.bind(this), 3000);

				this.evaluateState();
			}.bind(this);
			reader.readAsText(file);
		} catch (error) {
			// console.log('err.',error)
			this.setState({
				errors: error
			})
		}
	};

	handleToggle = () => this.setState({ open: !this.state.open });

	handleReport = () => {
		Report.generatePDF(this.state.inputJson);
	}

	render() {
		return (
			<div>
				<Head>
					<title>Trello resume 🤔 - {this.state.name}</title>
					<meta charSet='utf-8' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
				</Head>

				<MuiThemeProvider muiTheme={getMuiTheme({ ...muiTheme })}>
					<div>
						<Drawer width={200} openSecondary={true} open={this.state.open}>
							<AppBar title="Trello" />
							<TableCheck
								toggles={[
									{ title: 'Propiedades' },
									{ label: 'Usuarios', handle: () => this.setState({ showUsers: !this.state.showUsers }) },
									{ label: 'Checklist', handle: () => this.setState({ showChecklist: !this.state.showChecklist }) },
									{ label: 'Tarjetas', handle: () => this.setState({ showCards: !this.state.showCards }) }
								]}
								handleReport={this.handleReport}
							/>
						</Drawer>

						<AppBar
							title={"Trello resume " + (this.state.name ? '- ' + this.state.name : '')}
							iconClassNameRight="muidocs-icon-navigation-expand-more"
							onLeftIconButtonTouchTap={this.handleToggle}
							style={styles.appbar} />

						<Paper zDepth={3}>
							<Toolbar>
								<ToolbarGroup>
									<input type="file" onChange={this.handleChangeInputJson} />
								</ToolbarGroup>
								<ToolbarGroup>
									<FontIcon className="muidocs-icon-custom-sort" />
									<ToolbarSeparator />
									{
										this.state.hasFile ?
											<Chips
												chips={[
													{ name: this.state.checklists.length + ' checklist' },
													{ name: this.state.users.length + ' usuarios' },
													{ name: this.state.cards.length + ' cards' },
												]}
											/> : <Chips
												chips={[
													{ name: 'Sin información' },
												]}
											/>
									}
								</ToolbarGroup>
							</Toolbar>
						</Paper>

						{
							this.state.loading ?
								<center>
									<LinearProgress mode="indeterminate" color="green" />
								</center> : null
						}

						<br />

						<div>
							{
								this.state.showUsers ?
									<TableUsers
										users={this.state.users}
										name={this.state.name}
										expanded={this.state.expandedUsers}
										handleExpandChange={() => this.setState({ expandedUsers: !this.state.expandedUsers })}
									/> : null
							}
							<br />
							{
								this.state.showChecklist ?
									<TableCheckList
										checklists={this.state.checklists}
										expanded={this.state.expandedCheckList}
										handleExpandChange={() => this.setState({ expandedCheckList: !this.state.expandedCheckList })}
									/> : null
							}
							<br />
							{
								this.state.showCards ?
									<TableCards
										cards={this.state.cards}
										expanded={this.state.expandedCards}
										handleExpandChange={() => this.setState({ expandedCards: !this.state.expandedCards })}
									/> : null
							}
						</div>
					</div>
				</MuiThemeProvider>
			</div>
		)
	}
}

export default Main
