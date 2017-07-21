import React from 'react'
import Toggle from 'material-ui/Toggle'

const styles = {
	propContainer: {
		width: 190,
		overflow: 'hidden',
		display: 'block',
		margin: '0px 5px 0px 5px',
	},
	propToggleHeader: {
		margin: '10px auto 10px',
	}
};

export default class extends React.Component {

	render() {
		const { toggles } = this.props

		return <div style={styles.propContainer}>
			{
				toggles.map((item, index) => {
					if (item.title) {
						return <h4 key={index}>{item.title}</h4>
					} else {
						return <Toggle
						  key={index}
							name="fixedHeader"
							label={item.label}
							onToggle={item.handle}
							defaultToggled={true}
						/>
					}
				})
			}			
		</div>
	}
}