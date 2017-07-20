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
		return <div style={styles.propContainer}>
			<h4>Propiedades</h4>
			<Toggle
				name="fixedHeader"
				label="Usuarios"
				onToggle={this.handleToggle}
				defaultToggled={false}
			/>
			<Toggle
				name="fixedFooter"
				label="Tarjetas"
				onToggle={this.handleToggle}
				defaultToggled={false}
			/>
			<Toggle
				name="selectable"
				label="Checklist"
				onToggle={this.handleToggle}
				defaultToggled={false}
			/>
			<h4 style={styles.propToggleHeader}>Checklist</h4>
			<Toggle
				name="deselectOnClickaway"
				label="Pendientes"
				onToggle={this.handleToggle}
				defaultToggled={false}
			/>
			<Toggle
				name="deselectOnClickaway"
				label="Completados"
				onToggle={this.handleToggle}
				defaultToggled={false}
			/>			
		</div>
	}
}