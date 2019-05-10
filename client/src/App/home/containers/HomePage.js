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
import { Link } from 'react-router-dom';
import BrandBox from '../components/BrandBox';
import { Link as SamePageLink} from 'react-scroll';

// Landing page 
class Home extends Component {

	constructor(props) {
		super(props);
		// Used for when searching and tagging functionality whenever that comes
		this.state = { filter: "", query: "", brandToLearnMore: "" };
		this.changeFilter = this.changeFilter.bind(this);
		this.showText = this.showText.bind(this);
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

	showText(event) {
		this.setState({ brandToLearnMore: event.target.value })
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

		let brandText = "";
		let link = "";
		if (this.state.brandToLearnMore == "Gibson Girls") {
			brandText = "Effortless style, authenticity and easy-going living are at the heart of the brand’s philosophy. These positive values shine through at every level, from the laid-back tailoring to the made-to-last quality, use of natural materials and responsible production. Gibson Girls' aspiration is to be the best casual fashion brand with an outstanding price-value proposition: Capturing market trends and newness in color, quality fabrics and shapes, and expressing them in the effortless, relaxed and comfortable Gibson Girl style. For every garment, Esprit pays maximum attention to fabric selection, fitting and perfect quality. The company's “esprit de corps” reflects a positive and caring attitude towards life that celebrates real people and togetherness according to the brand promise: “We want to make you feel good to look good”.";
			link = "gibson";
		} else if (this.state.brandToLearnMore == "Ryan Boutique") {
			brandText = "Started in 1968 by Andie Ryan in Rapture and considered one of the biggest fashion jewelry manufactures in the USA. For nearly 50 years, Ryan Boutique has drawn on a wealth of designs discovered in many unique, unexpected places. From the vaults of rich European capitals to the antique laden attics of old American estates, we’ve created modern replicas of the most beautiful, exquisite vintage jewelry ever made. Currently, the company has six fashion jewelry brands under its signature brand name. The Ryan Boutique brand has sought to provide exceptional value to the fashion savvy consumer who is dedicated to building her vintage jewelry collection with unique accessories. The jewelry in the Ryan Boutique collections are designed to respect the details of period pieces while offering fresh design interpretations to fit today’s styles and fashions. \n For those who love all things vintage...Ryan Boutique is for the chic fashionista on the hunt for affordable antique and vintage inspired jewelry and accessories. Our designers take cues from all your favorite eras and fuse them with the latest trends. Take a peek through our site and you'll find styles that are simple and charming, elegant and classy, bold and dramatic or quirky and unique in the form of necklaces, bracelets, earrings, brooches, rings, hair accessories, custom photo jewelry, key rings and more. Whether you're a regular shopper looking for some lovely earrings (yes, we have clip-on too), a movie wardrobe designer looking for set costume jewelry, or a bride who wants some sparkling shimmer on your white, we really have something for everyone."
			link = "ryan";
		} else if (this.state.brandToLearnMore == "Apollo") {
			brandText = "Born in 2007, Apollo is a fast growing women's multi-channel fashion brand. Apollo aims to produce beautiful clothing collections appealing to both mother and daughter. Bringing something fresh and new to the high street and fashion e-tailing, Apollo aspires to deliver what every woman's wardrobe needs - from well produced staples, through to limited edition and trend-led fashion pieces. \n Apollo has become well known for its signature prints and is constantly looking to find new, innovative and easy-to-wear prints from all over the world. We pride ourselves on delivering high quality clothing at an affordable price. \n We aim to provide an exciting clothing collection alongside an excellent shopping experience for all our customers, whether they're shopping with us online, in-store or at one of our concessions."
			link = "apollo";
		} else if (this.state.brandToLearnMore == "ÁVELINE'S") {
			brandText = "Áveline is one of the emerging young designers in Rapture  who came to spotlight before she graduated in 2009 at Contemporary Arts Institute Rapture. That year she became the top young fashion designer at the Fashion Awards Rapture. Áveline plays an important role in the Rapture contemporary fashion scene, she won the Best Fashion Designer Award of Glamour Women of the Year in 2014. She is on the right track to share her powerful and vibrant creations with a wider audience. \n Her independent Rapture based label's vision contains innovative, modern design for a cosmoplitan woman who is self-assured and proud of her individual image; the woman who values the expression of originality in her day-to-day life. The love for contrasts is reflected throughout every of Áveline's work, she experiments a lot with silhouettes, shapes, textures and colours. Inspiration drawn from contemporary art and youth culture is combined with an emphasis on tailoring and the use of custom developed fabrics. This playful and fresh attitude presents the effortless 'power-woman' blend of the 20th and 21st century."
			link = "áveline";
		}
		brandText = brandText.split('\n').map((item, i) => {
			return <p key={i}>{item}</p>;
		});
		if(link != ""){
		link = (<Link to={"/categories/brands/" +  link } >
			<button className="btn btn-outline-primary brandBoxButton">Go to Collection</button>
		</Link>)
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
					<ClothingBox dress={state.products['1']}></ClothingBox>
					<ClothingBox dress={state.products['2']}></ClothingBox>
				</div>
				<div>
					<ClothingBox dress={state.products['3']}></ClothingBox>
					<ClothingBox dress={state.products['4']}></ClothingBox>
					<ClothingBox dress={state.products['5']}></ClothingBox>
				</div>
				<div>
					<ClothingBox dress={state.products['6']}></ClothingBox>
					<ClothingBox dress={state.products['7']}></ClothingBox>
					<ClothingBox dress={state.products['8']}></ClothingBox>
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
						<Link to={"/about"} >
							<button className="btn btn-primary btn-lg homepageCarouselButton">About Us</button>
						</Link>
					</LazyLoad>
					<LazyLoad height={"100%"}>
						<img className="homepageCarouselImage" src={collectionHomepage} />
						<h2 className="homepageCarouselTitle">Become the Belle of the Ball</h2>
						<Link to={"/categories/all"} >
						<button className="btn btn-primary btn-lg homepageCarouselButton">Browse the Collection</button>
						</Link>
					</LazyLoad>
					<LazyLoad height={"100%"}>
						<img className="homepageCarouselImage" src={brandsHomepage} />
						<h2 className="homepageCarouselTitle">Only the Best Fashion Survives in Rapture</h2>
						<SamePageLink activeClass="active" to="brandHeader" spy={true} smooth={true} duration={500}>
							<button className="btn btn-primary btn-lg homepageCarouselButton">Meet Our Brands</button>
						</SamePageLink>
					</LazyLoad>
				</Slider>
				<h4 className="homepageHeader">Rapture's Favorites</h4>
				{slider}
				<h4 className="homepageHeader">Categories</h4>
				<CategoriesBox category="dresses" box={{ image: "Categories/dresses.jpg", name: "Dresses" }}></CategoriesBox>
				<CategoriesBox category="shoes" box={{ image: "Categories/shoes.jpg", name: "Shoes" }}></CategoriesBox>
				<CategoriesBox category="accessories" box={{ image: "Categories/jewelry.jpg", name: "Accessories" }}></CategoriesBox>
				<CategoriesBox category="hats" box={{ image: "Categories/hats.jpg", name: "Hats" }}></CategoriesBox>
				<h4 className="homepageHeader" id="brandHeader">Brands</h4>
				<div className="brandBoxContainer">
					<BrandBox category="brands/gibson" learnMore={this.showText} box={{ image: "Brand/gibson girls.png", name: "Gibson Girls" }}></BrandBox>
					<BrandBox category="brands/ryan" learnMore={this.showText} box={{ image: "Brand/andrew ryan.png", name: "Ryan Boutique" }}></BrandBox>
					<BrandBox category="brands/apollo" learnMore={this.showText} box={{ image: "Brand/apollo.png", name: "Apollo" }}></BrandBox>
					<BrandBox category="brands/áveline" learnMore={this.showText} box={{ image: "Brand/aveline.png", name: "ÁVELINE'S" }}></BrandBox>
				</div>
				<div className="brandBoxDesc">
					<h3>{this.state.brandToLearnMore}</h3>
					{brandText}
					{link}
				</div>
				<h4 className="homepageHeader">#WelcomeToRapture</h4>
				<h5>Join the Rapture Community by tweeting #WelcomeToRapture to @RaptureFashion</h5>
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