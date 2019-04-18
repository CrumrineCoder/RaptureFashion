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
import collectionHomepage from '../../../assets/HomepageCarousel/collectionHomepage.jpg';
import raptureHomepage from '../../../assets/HomepageCarousel/raptureHomepage.jpg';
import brandsHomepage from '../../../assets/HomepageCarousel/brandHomepage.png';
import Slider from "react-slick";
import LazyLoad from 'react-lazyload';
import store from '../../store';



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
		const state = store.getState().home.cart;
		let slider = (
			<div>Images are loading</div>
		)
		if (state.products["0"]) {
			slider = (<Slider className="homepageBestSellersCarousel differentRightSlick">
				<div>
					<ClothingBox dress={state.products['0']}></ClothingBox>
					<ClothingBox dress={state.products['0']}></ClothingBox>
					<ClothingBox dress={state.products['0']}></ClothingBox>
				</div>
				<div>
					<ClothingBox dress={state.products['0']}></ClothingBox>
					<ClothingBox dress={state.products['0']}></ClothingBox>
					<ClothingBox dress={state.products['0']}></ClothingBox>
				</div>
				<div>
					<ClothingBox dress={state.products['0']}></ClothingBox>
					<ClothingBox dress={state.products['0']}></ClothingBox>
					<ClothingBox dress={state.products['0']}></ClothingBox>
				</div>
			</Slider>)
		}
		/*<ul className="polls">
			{state.products.map((article, i) => <ClothingBox key={i} dress={article} />)}
		</ul>
		*/

		return (
			<div className="pollsContainer">
				<Slider className="homepageCarousel" {...settings}>
					<LazyLoad height={"100%"}>
						<img className="homepageCarouselImage" src={raptureHomepage} />
						<h2 className="homepageCarouselTitle">You've never been to Rapture?</h2>
					</LazyLoad>
					<LazyLoad height={"100%"}>
						<img className="homepageCarouselImage" src={collectionHomepage} />
						<h2 className="homepageCarouselTitle">Become the Belle of the Ball</h2>
					</LazyLoad>
					<LazyLoad height={"100%"}>
						<img className="homepageCarouselImage" src={brandsHomepage} />
						<h2 className="homepageCarouselTitle">Only the Best Fashion Survives in Rapture</h2>
					</LazyLoad>
				</Slider>
				<h4 className="homepageHeader">Rapture's Favorites</h4>
				{slider}
				<h4 className="homepageHeader">Categories</h4>
				<CategoriesBox category="dresses" box={{ image: "Categories/dresses.jpg", name: "Dresses" }}></CategoriesBox>
				<CategoriesBox category="shoes"box={{ image: "Categories/shoes.jpg", name: "Shoes" }}></CategoriesBox>
				<CategoriesBox category="accessories" box={{ image: "Categories/jewelry.jpg", name: "Accessories" }}></CategoriesBox>
				<CategoriesBox category="hats" box={{ image: "Categories/hats.jpg", name: "Hats" }}></CategoriesBox>
				<h4 className="homepageHeader">Brands</h4>
				<CategoriesBox category="brands/gibson" box={{ image: "Brand/gibson girls.png", name: "Gibson Girls" }}></CategoriesBox>
				<CategoriesBox category="brands/ryan" box={{ image: "Brand/andrew ryan.png", name: "Ryan Boutique" }}></CategoriesBox>
				<CategoriesBox category="brands/apollo" box={{ image: "Brand/apollo.png", name: "Apollo" }}></CategoriesBox>
				<CategoriesBox category="brands/áveline" box={{ image: "Brand/aveline.png", name: "ÁVELINE'S" }}></CategoriesBox>
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



export default connect((state) => state)(Home);