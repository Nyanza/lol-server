import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
	renderChampions() {
		return this.props.champions.map((champion, index) => {
			return this.renderChampion(champion, index);
		})
	}
	renderChampion(champion, index) {
		return <div key={index} className='champion'>
			<img src={champion.img} alt={champion.name}/>
			<div className='description'>
				<div className='name'>{champion.name}</div>
				<div className='rate'>{champion.win_rate}%</div>
			</div>
			
				
		</div>
	}
	render() {
		return <div className='counter'>
			{this.renderChampions()}
		</div>
	}
}

Counter.defaultProps = {
	champions: []

};

export default Counter;