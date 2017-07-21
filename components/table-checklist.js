/**
 * Created by David on 20/7/2017.
 */
import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

class TableCheckList extends React.Component {

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
			// data checklist
			incomplete: 0,
			totalSubTask: 0
		}
	};

	static getInitialProps({ users, checklists, expanded, handleExpandChange }) {
		users = users ? users : [];
		return { users, checklists, expanded, handleExpandChange }
	}

	componentWillReceiveProps(nextProps) {
		// count task incomplete
		var countIncom = 0, totalSubTask = 0;
		nextProps.checklists.map(it => {
			it.checkItems.map(ci => ci.state === "incomplete" ? countIncom++ : null);
			totalSubTask += it.checkItems.length;
		});
		this.setState({ incomplete: countIncom, totalSubTask: totalSubTask });
	}

	render() {
		const { checklists } = this.props;

		return (
			<div>
				<Card expanded={this.props.expanded} onExpandChange={this.props.handleExpandChange}>
					<CardTitle title="Listas de chequeo" subtitle={
						"Hay " + checklists.length + " checklists. " +
						this.state.totalSubTask + " elementos en total y " +
						this.state.incomplete + " pendientes. "
					} />
					<CardHeader
						subtitle="Mas información"
						actAsExpander={true}
						showExpandableButton={true}
					/>

					<CardText expandable={true}>
						{
							(checklists && checklists.length > 0) ?
								<Table
									height={this.state.height}
									fixedHeader={this.state.fixedHeader}
									fixedFooter={this.state.fixedFooter}
									selectable={this.state.selectable}
									multiSelectable={this.state.multiSelectable}
								>
									<TableHeader>
										<TableRow>
											<TableHeaderColumn>Nombre</TableHeaderColumn>
											<TableHeaderColumn>Tareas</TableHeaderColumn>
											<TableHeaderColumn></TableHeaderColumn>
										</TableRow>
									</TableHeader>
									<TableBody>

										{
											checklists.map((it, index) =>
												<TableRow key={index}>
													<TableRowColumn>{it.name}</TableRowColumn>
													<TableRowColumn>
														<Badge
															badgeContent={it.checkItems.length}
															primary={true}
														>
															<NotificationsIcon />
														</Badge>
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

TableCheckList.childContextTypes = {
	users: React.PropTypes.array.isRequired,
	handleExpandChange: React.PropTypes.object.isRequired
};

export default TableCheckList;