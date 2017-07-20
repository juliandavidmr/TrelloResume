import React, {Component} from 'react'
import {deepOrange500} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import TextField from 'material-ui/TextField'
import Head from 'next/head'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'
import TableCheck from '../components/table-check'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Chips from '../components/chips'
import TableUsers from '../components/table-users'
import { members, name } from '../utils/trello'

import Paper from 'material-ui/Paper';

// Make sure react-tap-event-plugin only gets injected once
// Needed for material-ui
if (!process.tapEventInjected) {
	injectTapEventPlugin()
	process.tapEventInjected = true
}

const styles = {
	headline: {
		fontSize: 24,
		paddingTop: 16,
		marginBottom: 12,
		fontWeight: 400,
	},
	footer: {
		position: 'fixed',
		bottom: 0,
		width: '100%'
	},
	chip: {
		margin: 4,
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	toggle: {
		margin: '0px 10px 0px 20px'
	}
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
			errors: null,
			users: [],
			name: ''
		}
	}

	evaluateState() {
		this.setState({
			users: members(this.state.inputJson),
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
							<TableCheck />
						</Drawer>
						<Paper zDepth={5}>

						<Toolbar>
							<ToolbarGroup firstChild={true}>
								<Toggle
									style={styles.toggle}
									name="deselectOnClickaway"
									label="Opciones"
									onToggle={this.handleToggle}
									defaultToggled={false}
								/>
							</ToolbarGroup>
							<ToolbarGroup>
								<input type="file" onChange={this.handleChangeInputJson}/>
							</ToolbarGroup>
							<ToolbarGroup>
								<ToolbarTitle text="Opciones"/>
								<FontIcon className="muidocs-icon-custom-sort"/>
								<ToolbarSeparator />
								<IconMenu iconButtonElement={
									<IconButton touch={true}>
										<NavigationExpandMoreIcon />
									</IconButton>
								}>
									<MenuItem primaryText="Download"/>
									<MenuItem primaryText="More Info"/>
								</IconMenu>
							</ToolbarGroup>
						</Toolbar>
						</Paper>
						<br/>
						<div>
							<TableUsers
								users={this.state.users}
								name={this.state.name}
							/>
						</div>
					</div>
				</MuiThemeProvider>
			</div>
		)
	}
}

export default Main
