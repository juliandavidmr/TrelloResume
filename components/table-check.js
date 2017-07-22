import React from 'react'
import Toggle from 'material-ui/Toggle'
import Link from 'next/link'
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
	propContainer: {
		width: 190,
		overflow: 'hidden',
		display: 'block',
		margin: '0px 5px 0px 5px',
	},
	propToggleHeader: {
		margin: '10px auto 10px',
	},
	style: {
		margin: 3,
	}
};

export default class extends React.Component {

	render() {
		const { toggles, handleReport } = this.props

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
			<br />
			<Link prefetch href="/about">
				<a>
					<RaisedButton label="Acerca de" fullWidth={true} secondary={true} style={styles.style} />
				</a>
			</Link>			
			<RaisedButton label="Reporte" fullWidth={true} primary={true} style={styles.style} onClick={handleReport} />			
		</div>
	}
}