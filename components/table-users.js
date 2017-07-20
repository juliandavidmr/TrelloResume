/**
 * Created by David on 19/7/2017.
 */
import React from 'react'
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import {Card, CardTitle, CardHeader, CardText} from 'material-ui/Card';

class TableUsers extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			fixedHeader: true,
			fixedFooter: true,
			stripedRows: false,
			showRowHover: false,
			selectable: true,
			multiSelectable: false,
			enableSelectAll: false,
			deselectOnClickaway: true,
			showCheckboxes: true,
			height: '300px',
		}
	};

	static getInitialProps({users, expanded, handleExpandChange}) {
		users = users ? users : [];
		return {users, expanded, handleExpandChange}
	}

	render() {
		const {users, name} = this.props;

		return (
			<div>
				<Card expanded={this.props.expanded} onExpandChange={this.props.handleExpandChange}>
					<CardTitle title="Usuarios" subtitle={name + ". Hay " + users.length + " usuarios"}/>
					<CardHeader
						subtitle="Mas información"
						actAsExpander={true}
						showExpandableButton={true}
					/>
					<CardText expandable={true}>
						{
							(users && users.length > 0) ?
								<Table
									height={this.state.height}
									fixedHeader={this.state.fixedHeader}
									fixedFooter={this.state.fixedFooter}
									selectable={this.state.selectable}
									multiSelectable={this.state.multiSelectable}
								>
									<TableHeader>
										<TableRow>
											<TableHeaderColumn>#</TableHeaderColumn>
											<TableHeaderColumn>Iniciales</TableHeaderColumn>
											<TableHeaderColumn>Usuario</TableHeaderColumn>
											<TableHeaderColumn>Nombres</TableHeaderColumn>
											<TableHeaderColumn></TableHeaderColumn>
										</TableRow>
									</TableHeader>
									<TableBody>
										{
											users.map((it, index) =>
												<TableRow key={index}>
													<TableRowColumn>{index + 1}</TableRowColumn>
													<TableRowColumn>{it.initials}</TableRowColumn>
													<TableRowColumn>{it.username}</TableRowColumn>
													<TableRowColumn>{it.fullName}</TableRowColumn>
													<TableRowColumn>
														<a href={it.url} target="blank">Ver</a>
													</TableRowColumn>
												</TableRow>
											)
										}
									</TableBody>
								</Table> : 'No hay usuarios'
						}
					</CardText>
				</Card>
			</div>
		)
	}
}

TableUsers.childContextTypes = {
	users: React.PropTypes.array.isRequired,
	handleExpandChange: React.PropTypes.object.isRequired
};

export default TableUsers;