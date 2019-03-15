import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PollLink from '../components/PollLink';
//import Tags from '../components/Tag';
import Search from '../components/Search';
import Form from '../components/Form';
import ClothingBox from '../components/ClothingBox';
import CategoriesBox from '../components/CategoriesBox';
import InstagramBox from '../components/InstagramBox';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';
import collectionHomepage from '../../../assets/HomepageCarousel/collectionHomepage.png';
import raptureHomepage from '../../../assets/HomepageCarousel/raptureHomepage.png';
import brandsHomepage from '../../../assets/HomepageCarousel/brandsHomepage.png';
import Slider from "react-slick";
import LazyLoad from 'react-lazyload';




// Landing page 
class Home extends Component {

	constructor(props) {
		super(props);
		// Used for when searching and tagging functionality whenever that comes
		this.state = { filter: "", query: "" };
		this.changeFilter = this.changeFilter.bind(this);
	}

	static propTypes = {
		//	selectedPoll: PropTypes.string.isRequired,
		//	polls: PropTypes.array.isRequired,
		isFetching: PropTypes.bool.isRequired,
		lastUpdated: PropTypes.number,
		dispatch: PropTypes.func.isRequired
	}

	// Upon first render,  tell the back end to get all polls
	componentDidMount() {
//		this.props.dispatch(pollActions.selectPoll("All"));
//		this.props.dispatch(pollActions.fetchVotesIfNeeded("All"));
	}

	// Upon updating, tell the back end to get all polls (if there's been any change)
	componentDidUpdate(prevProps) {
		if (this.props.selectedPoll !== prevProps.selectedPoll) {
			this.props.dispatch(pollActions.selectPoll("All"));
			this.props.dispatch(pollActions.fetchVotesIfNeeded("All"));
		}
	}

	handleSearchBar = (queryValue) => {
		this.setState({
			query: queryValue
		});
	}

	changeFilter(filter) {
		this.setState({
			filter: filter
		});
	}

	render() {
		let { polls } = this.props;
		let pageContent = '';

		if (this.state.filter !== '') {
			polls = polls.filter((i) => i.tag === this.state.filter);
		}

		function find(items, text) {
			text = text.split(' ');
			return items.filter(function (item) {
				return text.every(function (el) {
					return (item.question.toLowerCase().indexOf(el.toLowerCase()) > -1);
				});
			});
		}



		// If we're fetching polls, tell the user why
		if (this.props.isFetching) {
			pageContent = (
				<div className="pollsLoader">
					The content is loading, but because this site uses a free Heroku server it has to warm up before it can get the data. This will take only 10 seconds to a minute, so please be patient! Once the servers are warmed up, the site will load content like normal.
      		    </div>
			)
		} // Show all polls as poll links 
		else {
			if (this.state.query !== "") {
				polls = find(polls, this.state.query);
			}
			pageContent = (
				<ul className="polls">
					{polls.map((poll, i) => <PollLink update={this.update} key={i} {...poll} />)}
				</ul>
			)
		}
		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			swipeToSlide: true,
			autoplay: true,
			autoplaySpeed: 5000
		};
		var dress = {
			name: "Unique Vintage Black Iridescent Beaded Zelia Fringe Flapper Dress",
			brandName: "Aveline's",
			images: [
				"Dresses/74683/74683_1_2048x2048.jpg",
				"Dresses/74683/74683_2_2048x2048.jpg",
				"Dresses/74683/74683_3_1024x1024.jpg",
				"Dresses/74683/74683_4_1024x1024.jpg",
				"Dresses/74683/74683_5_2048x2048.jpg"
			],
			price: 98.00
		}
		return (
			<div className="pollsContainer">
				<Slider className="homepageCarousel" {...settings}>
					<LazyLoad height={"100%"}>
						<img className="homepageCarouselImage" src={collectionHomepage} />
					</LazyLoad>
					<LazyLoad height={"100%"}>
						<img className="homepageCarouselImage" src={raptureHomepage} />
					</LazyLoad>
					<LazyLoad height={"100%"}>
						<img className="homepageCarouselImage" src={brandsHomepage} />
					</LazyLoad>
				</Slider>
				<h4 className="homepageHeader">Rapture's Favorites</h4>
				<Slider className="homepageBestSellersCarousel">
					<div>
						<ClothingBox dress={dress}></ClothingBox>
						<ClothingBox dress={dress}></ClothingBox>
						<ClothingBox dress={dress}></ClothingBox>
					</div>
					<div>
						<ClothingBox dress={dress}></ClothingBox>
						<ClothingBox dress={dress}></ClothingBox>
						<ClothingBox dress={dress}></ClothingBox>
					</div>
					<div>
						<ClothingBox dress={dress}></ClothingBox>
						<ClothingBox dress={dress}></ClothingBox>
						<ClothingBox dress={dress}></ClothingBox>
					</div>
				</Slider>
				<h4 className="homepageHeader">Categories</h4>
				<CategoriesBox box={{ image: "Categories/dresses.jpg", name: "Dresses" }}></CategoriesBox>
				<CategoriesBox box={{ image: "Categories/jewelry.jpg", name: "Jewelry" }}></CategoriesBox>
				<CategoriesBox box={{ image: "Categories/hats.jpg", name: "Hats" }}></CategoriesBox>
				<CategoriesBox box={{ image: "Categories/shoes.jpg", name: "Shoes" }}></CategoriesBox>
				<h4 className="homepageHeader">Brands</h4>
				<CategoriesBox box={{ image: "Brand/gibson girls.png", name: "Gibson Girls" }}></CategoriesBox>
				<CategoriesBox box={{ image: "Brand/andrew ryan.png", name: "Ryan Boutique" }}></CategoriesBox>
				<CategoriesBox box={{ image: "Brand/apollo.png", name: "Apollo" }}></CategoriesBox>
				<CategoriesBox box={{ image: "Brand/aveline.png", name: "ÁVELINE'S" }}></CategoriesBox>
				<h4 className="homepageHeader">#WelcomeToRapture</h4>
				<h5>Join the Rapture Community</h5>
				<Slider className="homepageBestSellersCarousel" {...{
					infinite: true,
					speed: 500,
					slidesToShow: 1,
					slidesToScroll: 1,
					autoplay: true,
					swipeToSlide: false,
					autoplaySpeed: 5000
				}}>
					<div>
						<InstagramBox user={{ image: "t0231laura1.jpg", handle: "ThedevilAbove", likes: 5511 }}></InstagramBox>
						<InstagramBox user={{ image: "t6573caroline.jpg", handle: "KiwiWillow", likes: 2554 }}></InstagramBox>
						<InstagramBox user={{ image: "z5941web1.jpg", handle: "Mementos", likes: 7999 }}></InstagramBox>

					</div>
					<div>
						<InstagramBox user={{ image: "z4090chloe1.jpg", handle: "GottaTao", likes: 1015 }}></InstagramBox>
						<InstagramBox user={{ image: "z4090chloe2.jpg", handle: "VintageCrawler", likes: 14356 }}></InstagramBox>
						<InstagramBox user={{ image: "t9037jennifer1.jpg", handle: "Avertermo", likes: 2287 }}></InstagramBox>
					</div>
				</Slider>
			</div>
		);

	}
}

Home.propTypes = {
	//selectedPoll: PropTypes.string.isRequired,
	//polls: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { selectedPoll, votesByPoll } = state.home
	// If we're still fetching polls, then let isFetching be true and polls be empty, else get information from the backend and put it in Redux state
	const { isFetching, lastUpdated, votes: polls } = votesByPoll[
		selectedPoll
	] || {
			isFetching: true,
			polls: []
		}
	return {
		selectedPoll,
		polls,
		isFetching,
		lastUpdated
	}

}

export default withRouter(connect(mapStateToProps)(Home));
