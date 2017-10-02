import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './header/header.jsx';
import FilterOptions from './filterOptions/filterOptions.jsx';
import StatsTable from './statsTable/statsTable.jsx';
import './championProfile.scss';

class ChampionProfile extends Component {
	constructor() {
		super();
		this.state = { rank: '', lane: ''};
		this.handleFilterSelect = this.handleFilterSelect.bind(this);
	}
	componentWillMount() {
		const champName = this.props.params.name;
		this.props.fetchChampion(champName);
	}
	renderContent() {
		return <div className='content'>
			{this.renderFilters()}
			{this.renderStatsTable()}
		</div>
	}
	renderStatsTable() {
		if(this.state.lane == '' && this.state.rank == '') return;
		const filteredStats = this.props.stats[this.state.rank][this.state.lane].stats;
		return <StatsTable stats={filteredStats}/>
	}
	renderFilters() {
		if(!this.props.stats.platplus) return;
		const rankKeys = Object.keys(this.props.stats);
		const defaultRank = this.state.rank == '' ? rankKeys[0] : this.state.rank;
		const laneKeys = Object.keys(this.props.stats[defaultRank]);
		return <FilterOptions
			ranks={rankKeys}
			activeRank={this.state.rank}
			lanes={laneKeys}
			activeLane={this.state.lane}
			onChange={this.handleFilterSelect} />;
	}
	handleFilterSelect(filterName, filterValue) {
		if(filterName == 'rank') {
			const laneKeys = Object.keys(this.props.stats[filterValue]);
			const defaultLane = laneKeys[0];
			const lane = laneKeys.includes(this.state.lane) ? this.state.lane : defaultLane;
			this.setState({ [filterName]: filterValue, lane });
		}
		this.setState({ [filterName]: filterValue });
	}
	renderHeader() {
		return <Header 
			img={this.props.defaultSplash}
			headline={this.props.name}
			subheadline={this.props.title}/>
	}
	render() {
		console.log(this.state)
		return <div className="championProfile">
			{this.renderHeader()}
			{this.renderContent()}
		</div>;
	}
}

ChampionProfile.defaultProps = {
	name: '',
	title: '',
	img: '',
	defaultSplash: '' ,
	stats: {}
};

export default ChampionProfile;