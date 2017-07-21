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
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';

class TableCards extends React.Component {

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

	static getInitialProps({ cards, expanded, handleExpandChange }) {
		cards = cards ? cards : [];
		return { cards, expanded, handleExpandChange }
	}

	render() {
		const { cards } = this.props;

		return (
			<div>
				<Card expanded={this.props.expanded} onExpandChange={this.props.handleExpandChange}>
					<CardTitle title="Tarjetas (Cards)" subtitle={"Hay " + cards.length + " cards."} />
					<CardHeader
						subtitle="Mas información"
						actAsExpander={true}
						showExpandableButton={true}
					/>
					<CardText expandable={true}>
						{
							(cards && cards.length > 0) ?
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
											<TableHeaderColumn>Comentarios</TableHeaderColumn>
											<TableHeaderColumn>Ultimo cambio</TableHeaderColumn>
											<TableHeaderColumn>Checklists</TableHeaderColumn>
											<TableHeaderColumn>Miembros</TableHeaderColumn>
											<TableHeaderColumn></TableHeaderColumn>
										</TableRow>
									</TableHeader>
									<TableBody>
										{
											cards.map((it, index) =>
												<TableRow key={index}>
													<TableRowColumn title={it.name}>{it.name}</TableRowColumn>
													<TableRowColumn>{it.badges.comments ? it.badges.comments + ' comentario(s)' : 'Sin comentarios'}</TableRowColumn>
													<TableRowColumn title={it.dateLastActivity}>{it.dateLastActivity}</TableRowColumn>
													<TableRowColumn>{it.idChecklists.length? it.idChecklists.length + ' checklist': 'No tiene'}</TableRowColumn>
													<TableRowColumn>{it.idMembers.length? it.idMembers.length + ' asignado': 'Nadie asignado'}</TableRowColumn>													
													<TableRowColumn>
														<a href={it.url} target="blank">Ver</a>
													</TableRowColumn>
												</TableRow>
											)
										}
									</TableBody>
								</Table> : 'No hay cards'
						}
					</CardText>
				</Card>
			</div>
		)
	}
}

TableCards.childContextTypes = {
	cards: React.PropTypes.array.isRequired,
	handleExpandChange: React.PropTypes.object.isRequired
};

export default TableCards;