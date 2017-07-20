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
import {Card, CardTitle, CardText} from 'material-ui/Card';

export default class extends React.Component {

	constructor(props, context) {
		super(props, context);
	};

	static getInitialProps({users}) {
		users = users ? users : [];
		return {users}
	}

	render() {
		const {users, name} = this.props;

		return (
			<div>
				<Card>
					<CardTitle title="Usuarios" subtitle={name}/>
					<CardText>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
						Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
						Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
					</CardText>
					{
						(users && users.length > 0) ? <Table>
							<TableHeader>
								<TableRow>
									<TableHeaderColumn>#</TableHeaderColumn>
									<TableHeaderColumn>Iniciales</TableHeaderColumn>
									<TableHeaderColumn>Usuario</TableHeaderColumn>
									<TableHeaderColumn>Nombres</TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody>
								{
									users.map((it, index) =>
										<TableRow>
											<TableRowColumn>{ index + 1   }</TableRowColumn>
											<TableRowColumn>{ it.initials }</TableRowColumn>
											<TableRowColumn>{ it.username }</TableRowColumn>
											<TableRowColumn>{ it.fullName }</TableRowColumn>
										</TableRow>
									)
								}
							</TableBody>
						</Table> : 'No hay usuarios'
					}
				</Card>
			</div>
		)
	}
}