import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Tags from '../components/Tag';
import ClothingBox from '../components/ClothingBox';
import CategoriesBox from '../components/CategoriesBox';
import InstagramBox from '../components/InstagramBox';
import collectionHomepage from '../../../assets/HomepageCarousel/collectionHomepage.jpg';
import raptureHomepage from '../../../assets/HomepageCarousel/raptureHomepage.jpg';
import brandsHomepage from '../../../assets/HomepageCarousel/brandHomepage.png';
import Slider from "react-slick";
import LazyLoad from 'react-lazyload';
import store from '../../store';
import { Link } from 'react-router-dom';
import BrandBox from '../components/BrandBox';
import { Link as SamePageLink } from 'react-scroll';

// Landing page 
class Home extends Component {

	constructor(props) {
		super(props);
		// Used for when searching and tagging functionality whenever that comes
		this.state = { filter: "", query: "", brandToLearnMore: "" };
		this.changeFilter = this.changeFilter.bind(this);
		this.showText = this.showText.bind(this);
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
	}

	componentDidMount() {
		this.showText("Gibson Girls");
	}

	next() {
		this.slider.slickNext();
	}
	previous() {
		this.slider.slickPrev();
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

	showText(name) {
		this.setState({ brandToLearnMore: name })
	}

	render() {
		let brandText = "";
		let link = "";
		if (this.state.brandToLearnMore === "Gibson Girls") {
			brandText = "Effortless style, authenticity and easy-going living are at the heart of the brand’s philosophy. These positive values shine through at every level, from the laid-back tailoring to the made-to-last quality, use of natural materials and responsible production. Gibson Girls' aspiration is to be the best casual fashion brand with an outstanding price-value proposition: Capturing market trends and newness in color, quality fabrics and shapes, and expressing them in the effortless, relaxed and comfortable Gibson Girl style. For every garment, Esprit pays maximum attention to fabric selection, fitting and perfect quality. The company's “esprit de corps” reflects a positive and caring attitude towards life that celebrates real people and togetherness according to the brand promise: “We want to make you feel good to look good”.";
			link = "Gibson Girls";
		} else if (this.state.brandToLearnMore === "Ryan Boutique") {
			brandText = "Started in 1968 by Andie Ryan in Rapture and considered one of the biggest fashion jewelry manufactures in the USA. For nearly 50 years, Ryan Boutique has drawn on a wealth of designs discovered in many unique, unexpected places. From the vaults of rich European capitals to the antique laden attics of old American estates, we’ve created modern replicas of the most beautiful, exquisite vintage jewelry ever made. Currently, the company has six fashion jewelry brands under its signature brand name. The Ryan Boutique brand has sought to provide exceptional value to the fashion savvy consumer who is dedicated to building her vintage jewelry collection with unique accessories. The jewelry in the Ryan Boutique collections are designed to respect the details of period pieces while offering fresh design interpretations to fit today’s styles and fashions. \n For those who love all things vintage...Ryan Boutique is for the chic fashionista on the hunt for affordable antique and vintage inspired jewelry and accessories. Our designers take cues from all your favorite eras and fuse them with the latest trends. Take a peek through our site and you'll find styles that are simple and charming, elegant and classy, bold and dramatic or quirky and unique in the form of necklaces, bracelets, earrings, brooches, rings, hair accessories, custom photo jewelry, key rings and more. Whether you're a regular shopper looking for some lovely earrings (yes, we have clip-on too), a movie wardrobe designer looking for set costume jewelry, or a bride who wants some sparkling shimmer on your white, we really have something for everyone."
			link = "Ryan Boutique";
		} else if (this.state.brandToLearnMore === "Apollo") {
			brandText = "Born in 2007, Apollo is a fast growing women's multi-channel fashion brand. Apollo aims to produce beautiful clothing collections appealing to both mother and daughter. Bringing something fresh and new to the high street and fashion e-tailing, Apollo aspires to deliver what every woman's wardrobe needs - from well produced staples, through to limited edition and trend-led fashion pieces. \n Apollo has become well known for its signature prints and is constantly looking to find new, innovative and easy-to-wear prints from all over the world. We pride ourselves on delivering high quality clothing at an affordable price. \n We aim to provide an exciting clothing collection alongside an excellent shopping experience for all our customers, whether they're shopping with us online, in-store or at one of our concessions."
			link = "Apollo";
		} else if (this.state.brandToLearnMore === "ÁVELINE'S") {
			brandText = "Áveline is one of the emerging young designers in Rapture  who came to spotlight before she graduated in 2009 at Contemporary Arts Institute Rapture. That year she became the top young fashion designer at the Fashion Awards Rapture. Áveline plays an important role in the Rapture contemporary fashion scene, she won the Best Fashion Designer Award of Glamour Women of the Year in 2014. She is on the right track to share her powerful and vibrant creations with a wider audience. \n Her independent Rapture based label's vision contains innovative, modern design for a cosmoplitan woman who is self-assured and proud of her individual image; the woman who values the expression of originality in her day-to-day life. The love for contrasts is reflected throughout every of Áveline's work, she experiments a lot with silhouettes, shapes, textures and colours. Inspiration drawn from contemporary art and youth culture is combined with an emphasis on tailoring and the use of custom developed fabrics. This playful and fresh attitude presents the effortless 'power-woman' blend of the 20th and 21st century."
			link = "ÁVELINE'S";
		}
		brandText = brandText.split('\n').map((item, i) => {
			return <p key={i}>{item}</p>;
		});
		if (link !== "") {
			link = (
				<Link to={{
					pathname: "/clothing/",
					state: {
						brand: link
					}
				}}>
					<button className="btn btn-outline-primary brandBoxButton yellowButton">Go to Collection</button>
				</Link>
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
		const state = store.getState().home.cart;
		let slider = (
			<div>Images are loading</div>
		)
		if (state.products["0"]) {
			slider = (<Slider ref={c => (this.slider = c)} className="homepageBestSellersCarousel differentRightSlick">
				<div className="clothingBoxContainer">
					<ClothingBox dress={state.products['0']}></ClothingBox>
					<ClothingBox dress={state.products['1']}></ClothingBox>
					<ClothingBox dress={state.products['2']}></ClothingBox>
				</div>
				<div className="clothingBoxContainer">
					<ClothingBox dress={state.products['3']}></ClothingBox>
					<ClothingBox dress={state.products['4']}></ClothingBox>
					<ClothingBox dress={state.products['5']}></ClothingBox>
				</div>
				<div className="clothingBoxContainer">
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
		//	<div className="leftSlider"></div>

		return (
			<div className="pollsContainer">
				<Slider className="homepageCarousel" {...settings}>
					<LazyLoad height={"100%"}>
						<img className="homepageCarouselImage" src={brandsHomepage} alt="Brands" />
						<div className="homepageCarouselInfo">
							<h2 className="homepageCarouselTitle">Only the Best Fashion Survives in Rapture</h2>
							<SamePageLink activeClass="active" to="favoritesHeader" spy={true} smooth={true} duration={500}>
								<button className="btn btn-primary btn-lg yellowButton">See Our Favorites</button>
							</SamePageLink>
						</div>
					</LazyLoad>
					<LazyLoad height={"100%"}>
						<img className="homepageCarouselImage" src={raptureHomepage} alt="Party" />
						<div className="homepageCarouselInfo">
							<h2 className="homepageCarouselTitle">You've never been to Rapture?</h2>
							<Link to={"/about"} >
								<button className="btn btn-primary btn-lg yellowButton">About Us</button>
							</Link>
						</div>
					</LazyLoad>
					<LazyLoad height={"100%"}>
						<img className="homepageCarouselImage" src={collectionHomepage} alt="Outside party" />
						<div className="homepageCarouselInfo">
							<h2 className="homepageCarouselTitle">Become the Belle of the Ball</h2>
							<Link to={{
								pathname: "/clothing/"
							}}>
								<button className="btn btn-primary btn-lg yellowButton">Browse the Collection</button>
							</Link>
						</div>
					</LazyLoad>
				</Slider>
				<h4 id="favoritesHeader" className="homepageHeader">Rapture's Favorites</h4>
				<div className="sliderContainer">
					{slider}
					<div className="sliderButton prevSliderButton" onClick={this.previous}>
						<i class="fas fa-chevron-left sliderIcon prevSliderIcon" ></i>
					</div>
					<div className="sliderButton nextSliderButton" onClick={this.next}>
						<i class="fas fa-chevron-right sliderIcon nextSliderIcon"></i>
					</div>
				</div>
				<h4 className="homepageHeader" id="brandHeader">Brands</h4>
				<div className="brandContainer">
					<div className="brandBoxContainer">
						<BrandBox category="brands/gibson" brandToCompare={this.state.brandToLearnMore} learnMore={this.showText} box={{ image: "Brand/gibson girls.png", name: "Gibson Girls" }}></BrandBox>
						<BrandBox category="brands/ryan" brandToCompare={this.state.brandToLearnMore} learnMore={this.showText} box={{ image: "Brand/andrew ryan.png", name: "Ryan Boutique" }}></BrandBox>
						<BrandBox category="brands/apollo" brandToCompare={this.state.brandToLearnMore} learnMore={this.showText} box={{ image: "Brand/apollo.png", name: "Apollo" }}></BrandBox>
						<BrandBox category="brands/áveline" brandToCompare={this.state.brandToLearnMore} learnMore={this.showText} box={{ image: "Brand/aveline.png", name: "ÁVELINE'S" }}></BrandBox>
					</div>
					<div className="brandBoxDesc">
						<h3>{this.state.brandToLearnMore}</h3>
						{brandText}
						{link}
					</div>
				</div>
				<h4 className="homepageHeader">Categories</h4>
				<div className="categoriesBoxContainer">
					<CategoriesBox category="dresses" box={{ image: "Categories/dressArtDeco.jpg", name: "Dresses", link: "Dress" }}></CategoriesBox>
					<CategoriesBox category="shoes" box={{ image: "Categories/shoesArtDeco.png", name: "Shoes", link: "Shoe" }}></CategoriesBox>
					<CategoriesBox category="accessories" box={{ image: "Categories/jewelryArtDeco.png", name: "Accessories", link: "Accessory" }}></CategoriesBox>
					<CategoriesBox category="hats" box={{ image: "Categories/hatsArtDeco.png", name: "Hats", link: "Hat" }}></CategoriesBox>
				</div>
				<h4 className="homepageHeader">#WelcomeToRapture</h4>
				<div className="bestSellerContainer">
					<h5>Join the Rapture Community by tweeting #WelcomeToRapture to @RaptureFashion</h5>
					<Slider className="homepageBestSellersCarousel" {...{
						infinite: true,
						speed: 200,
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
			</div>
		);

	}
}

export default connect((state) => state)(Home);