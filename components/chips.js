/**
 * Created by David on 19/7/2017.
 */
import React from 'react'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const styles = {
	chip: {
		margin: 2,
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
	}
};

export default class extends React.Component {

	handleRequestDelete() {
		alert('You clicked the delete button.');
	}

	handleTouchTap() {
		alert('You clicked the Chip.');
	}

	render() {
		return (
			<div style={styles.wrapper}>

				<Chip style={styles.chip}>
					Text Chip
				</Chip>

				<Chip
					onRequestDelete={this.handleRequestDelete}
					onTouchTap={this.handleTouchTap}
					style={styles.chip}>
					Deletable Text Chip
				</Chip>

				<Chip
					onTouchTap={this.handleTouchTap}
					style={styles.chip}
				>
					<Avatar src="images/uxceo-128.jpg" />
					Image Avatar Chip
				</Chip>

				<Chip onTouchTap={this.handleTouchTap} style={styles.chip}>
					<Avatar size={32}>A</Avatar>
					Text Avatar Chip
				</Chip>
			</div>
		)
	}
}