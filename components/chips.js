import React from 'react'
import Toggle from 'material-ui/Toggle'
import Chip from 'material-ui/Chip'

const styles = {
	chip: {
		margin: 4,
	},
	div: {
		display: 'flex'
	}
};

export default class extends React.Component {

	render() {
		const { chips } = this.props

		return <div style={styles.div}>
			{
				chips.map((it, i) =>
					<Chip
						key={i}
						onRequestDelete={() => null}
						style={styles.chip}>
						{it.name}
					</Chip>
				)
			}
		</div>
	}
}