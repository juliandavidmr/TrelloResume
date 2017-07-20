import React, {Component} from 'react'
import {deepOrange500} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Head from 'next/head'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import TableCheck from '../components/table-check'
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TableUsers from '../components/table-users'
import TableCheckList from '../components/table-checklist'
import {members, name, checklists} from '../utils/trello'
import Chip from 'material-ui/Chip';

import Paper from 'material-ui/Paper';

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
			users: [],
			checklists: [],
			name: '',
			// Expanded
			expandedUsers: false,
			expandedCheckList: false
		}
	}

	evaluateState() {
		this.setState({
			users: members(this.state.inputJson),
			checklists: checklists(this.state.inputJson),
			name: name(this.state.inputJson)
		})
	};

	handleChangeInputJson = (event) => {
		event.preventDefault();

		try {
			const file = event.target.files[0];
			console.log('Event: ', file);

			var reader = new FileReader();

			reader.onload = function (e) {
				// console.log('Out: ', reader.result);
				this.setState({
					inputJson: JSON.parse(reader.result),
					errors: ''
				});
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

	handleToggle = () => this.setState({open: !this.state.open});

	render() {
		return (
			<div>
				<Head>
					<title>Trello resume 🤔</title>
					<meta charSet='utf-8'/>
					<meta name='viewport' content='initial-scale=1.0, width=device-width'/>
				</Head>

				<MuiThemeProvider muiTheme={getMuiTheme({...muiTheme})}>
					<div>
						<Drawer width={200} openSecondary={true} open={this.state.open}>
							<AppBar title="Trello"/>
							<TableCheck/>
						</Drawer>

						<AppBar
							title="Trello resume"
							iconClassNameRight="muidocs-icon-navigation-expand-more"
							onClick={this.handleToggle}
							style={styles.appbar}
						/>

						<Paper zDepth={3}>
							<Toolbar>
								<ToolbarGroup>
									<input type="file" onChange={this.handleChangeInputJson}/>
								</ToolbarGroup>
								<ToolbarGroup>
									<FontIcon className="muidocs-icon-custom-sort"/>
									<ToolbarSeparator/>
									<Chip
										onRequestDelete={() => alert("No se puede eliminar :P")}
										style={styles.chip}>
										{this.state.name}
									</Chip>
									<Chip
										onRequestDelete={() => alert("No se puede eliminar :P")}
										style={styles.chip}>
										{this.state.users.length} usuarios
									</Chip>
								</ToolbarGroup>
							</Toolbar>
						</Paper>
						<br/>
						<div>

							<TableUsers
								users={this.state.users}
								name={this.state.name}
								expanded={this.state.expandedUsers}
								handleExpandChange={() => this.setState({ expandedUsers: !this.state.expandedUsers })}
							/>
							<br/>
							<TableCheckList
								checklists={this.state.checklists}
								expanded={this.state.expandedCheckList}
								handleExpandChange={() => this.setState({ expandedCheckList: !this.state.expandedCheckList })}
							/>
						</div>
					</div>
				</MuiThemeProvider>
			</div>
		)
	}
}

export default Main
