import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import Filter from "../components/Filter";
/*
import ClothingBox from '../components/ClothingBox';
import CategoriesBox from '../components/CategoriesBox';
import InstagramBox from '../components/InstagramBox';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';
*/


// Landing page 
class CategoriesContainer extends Component {

    constructor(props) {
        super(props);
        // Used for when searching and tagging functionality whenever that comes
        this.state = {
            filter: {}
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.getFilteredArray = this.getFilteredArray.bind(this);
        this.arrayContainsAnotherArray = this.arrayContainsAnotherArray.bind(this);
        this.clean = this.clean.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    }

    handleFilter(filter) {
        this.setState({
            filter: filter
        })
        console.log(filter);
    }

    // Upon first render,  tell the back end to get all polls
    /*	componentDidMount() {
            this.props.dispatch(pollActions.selectPoll("All"));
            this.props.dispatch(pollActions.fetchVotesIfNeeded("All"));
        } */

    getFilteredArray(array, key, value) {
        return array.filter(function (e) {
            console.log(key);
            switch (key) {
                case "color":
                    return e["color"].includes(value)
                default:
                    return e[key] == value;
            }
        });
    }

    arrayContainsAnotherArray(needle, haystack) {
        for (var i = 0; i < needle.length; i++) {
            if (haystack.indexOf(needle[i]) === -1)
                return false;
        }
        return true;
    }

    clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
                delete obj[propName];
            }
        }
        return obj;
    }

    render() {
        var filters = {

        }
        let pageContent = '';

        var dresses = [
            {
                name: "Deco Purple & Black Sequin Veronique Fringe Flapper Dress",
                brandName: "Gibson Girl",
                images: [
                    "Dresses/61626/61626-1_2048x2048.jpg",
                    "Dresses/61626/61626-2_2048x2048.jpg",
                    "Dresses/61626/61626-3_2048x2048.jpg",
                    "Dresses/61626/61626-4_2048x2048.jpg",
                    "Dresses/61626/61626-5_2048x2048.jpg"
                ],
                price: 14.00,
                color: ["Purple", "Black"],
                desc: "With a bit of royalty and aristocratic detail, the Veronique Flapper dress is fresh from Unique Vintage in stunning 1920s design. Intricately deco beaded black mesh boasts black iridescent sequins and small black beads wrought in flourishing deco swirls and spirals, while a deep eggplant purple knit lining creates a radiant effect. The sleeveless, v-neck design shows you off with a modest touch, while the curve hugging fit and jagged edge dripping with fringe will turn every head!  \n Available in sizes S-3X while supplies last.",
                details: [
                    "Imported",
                    "Side Zipper",
                    "Sheer Beaded Mesh Over Knit Lining",
                    "Some Stretch",
                    "Length Includes Fringe",
                    "Model Pictured Wearing Size M; Medium Length 43",
                    "Model Info: Height: 5’9\” | Waist: 26 | Hips: 36.5 | Bust: 34C"
                ]
            },
            {
                name: "Navy Hemingway Flapper Dress",
                brandName: "Ryan Boutique",
                images: [
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_6_2048x2048.jpg",
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_2_2048x2048.jpg",
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_4_2048x2048.jpg",
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_2048x2048.jpg",
                    "Dresses/1606/Unique_Vintage_Navy_Hemingway_Flapper_Dress_3_1024x1024.jpg"
                ],
                price: 74.00,
                color: ["Blue"],
                desc: "It’s time to go totally Gatsby, darling! With this navy Hemingway flapper dress, you can achieve that perfect 1920s look without all of the effort. This fabulous frock features a slightly fitted shape with a narrow waist, V-neck and loose, knee-length skirt. A slight cowl neck with draping across the neckline and back adds an extra feminine touch to this flapper dress. Panels of matching navy-blue lace are situated between the pleats of the skirt and underneath the draped back, while art deco sequined details line the drop waist and décolletage. There’s even a bit of lace detailing in the center of the neckline to show a bit of skin without revealing too much. \n Create a completely retro look that pairs perfectly with sky-high pumps, a perfectly matte red lip and a matching feather headband with this navy Hemingway flapper dress from Unique Vintage. You’ll look absolutely lovely wearing this stylish flapper dress for all kinds of occasions, whether it’s for a 1920s theme party, a holiday bash or even a very special date night. With just the right hint of sparkle, you’re sure to shine in this art deco stunner. Order yours from Unique Vintage and enjoy free shipping on orders of $150 or more. \n Available in sizes XS-4X while supplies last.",
                details: [
                    "Imported",
                    "Professional spot clean",
                    "Lightweight chiffon",
                    "Pullover dress",
                    "Sequin and bead detailing",
                    "Chiffon panel hem",
                    "Subtle lace detail",
                    "Moderately lined",
                    "Material does not provide stretch",
                    "Model Info: Height: 5’8\” | Bust: 34B | Waist: 24 | Hip: 36"
                ]
            },
            {
                name: "Black & Green Beaded Antoinette Peacock Flapper",
                brandName: "Apollo",
                images: [
                    "Dresses/53556/Unique_Vintage_1920s_Black_Green_Beaded_Antoinette_Peacock_Flapper_c6a4d060-a7a5-4825-9e4b-4bbe641b95e4_2048x2048.jpg",
                    "Dresses/53556/Unique_Vintage_1920s_Black_Green_Beaded_Antoinette_Peacock_Flapper_5_1d72e5c4-3365-4fcc-83da-fa85c7f33bb8_2048x2048.jpg",
                    "Dresses/53556/Unique_Vintage_1920s_Black_Green_Beaded_Antoinette_Peacock_Flapper_6_3a343f09-e1bd-4224-847e-7a4c497698ef_2048x2048.jpg",
                    "Dresses/53556/Unique_Vintage_1920s_Black_Green_Beaded_Antoinette_Peacock_Flapper_2_f3b364a1-4a7a-4a7a-a1d8-9657de078c3b_2048x2048.jpg",
                    "Dresses/53556/53556_L_2048x2048.jpg"
                ],
                price: 98.00,
                color: ["Green", "Black"],
                desc: "Elegantly extravagant, the Antoinette is an exquisite black mesh 1920s flapper dress fresh from Unique Vintage. The ornate peacock motif is complemented by stunning deco sequin feathers. A sleeveless, semi-fitted silhouette is authentic to the roaring twenties. Beautiful green fringe that flows from the scalloped hem adds a lavish touch. Crafted with a side zipper and soft black lining, this lovely black mesh dress is shimmering in black, green, and gold! You got to get it while you can, gals! \n Available in sizes S-4X while supplies last.",
                details: [
                    "Imported",
                    "Spot Clean Only; Do Not Dry Clean",
                    "Side Zipper/Hook",
                    "Lined",
                    "Length Includes Fringe",
                    "Model Pictured Wearing Size S; Small Length 48",
                    "Model Info: Height: 5’8\” | Bust: 34B | Waist: 24 | Hip: 36"
                ]
            },
            {
                name: "Black Iridescent Beaded Zelia Fringe Flapper Dress",
                brandName: "ÁVELINE'S",
                images: [
                    "Dresses/74683/74683_1_2048x2048.jpg",
                    "Dresses/74683/74683_2_2048x2048.jpg",
                    "Dresses/74683/74683_3_1024x1024.jpg",
                    "Dresses/74683/74683_4_1024x1024.jpg",
                    "Dresses/74683/74683_5_2048x2048.jpg"
                ],
                price: 300.00,
                color: ["Black"],
                desc: "Get a little Zelia, dolls! Presenting the Zelia dress from Unique Vintage, a mesmerizing 1920s style flapper that gleams with iridescent black. The sultry sleeveless bodice features a sexy V-neckline while the tapered fit hugs your curves and drops into a lovely scalloped hemline, dripping with black fringe. A bursting deco design features iridescent and matte black sequins, framed by gunmetal hand beading across the mesh, with black lining for flawless comfort. Outfitted with a side zipper, we've got your number \n Available in seizes S-3X while supplies last.",
                details: [
                    "Imported",
                    "Polyester",
                    "Side Zipper, Lined",
                    "Length Includes Fringe",
                    "Material Has Little Stretch",
                    "Model Pictured Wearing Size S; S Length 45",
                    "Model Info: Height: 5’5\” | Waist: 27.5 | Hips: 38 | Bust: 32DD"
                ]
            },
            {
                name: "Deco Green & Black Sequin Veronique Fringe Flapper Dress",
                brandName: "ÁVELINE'S",
                images: [
                    "Dresses/65421/65421_1_2048x2048.jpg",
                    "Dresses/65421/65421_2_2048x2048.jpg",
                    "Dresses/65421/65421_3_2048x2048.jpg",
                    "Dresses/65421/65421_4_2048x2048.jpg",
                    "Dresses/65421/65421_5_2048x2048.jpg"
                ],
                price: 205.00,
                color: ["Green", "Black"],
                desc: "With a bit of shimmer and gleaming detail, the Veronique Flapper dress is fresh from Unique Vintage in gorgeous 1920s design. Intricately deco beaded black mesh boasts black iridescent sequins and small black beads wrought in flourishing deco swirls and spirals, while emerald green knit lining creates a radiant effect. The sleeveless, v-neck design shows you off with a modest touch, while the curve hugging fit and jagged edge dripping with fringe will turn every head! \n Available in sizes S-3X while supplies last.",
                details: [
                    "Imported",
                    "Nylon & Polyester",
                    "Side Zipper",
                    "Sheer Beaded Mesh Over Knit Lining",
                    "Some Stretch",
                    "Length Includes Fringe",
                    "Model Pictured Wearing Size S; S Length 44",
                    "Model Info: Height: 5’8\” | Waist: 26 | Hips: 36 | Bust: 34B"
                ]
            },
            {
                name: "Black Beaded Deco Angelina Maxi Flapper Dress",
                brandName: "Apollo",
                images: [
                    "Dresses/4002/1920s_Black_Beaded_Deco_Angelina_Maxi_Flapper_Dress_4_2048x2048.jpg",
                    "Dresses/4002/1920s_Black_Beaded_Deco_Angelina_Maxi_Flapper_Dress_2_1024x1024.jpg",
                    "Dresses/4002/1920s_Black_Beaded_Deco_Angelina_Maxi_Flapper_Dress_1024x1024.jpg",
                    "Dresses/4002/1920s_Black_Beaded_Deco_Angelina_Maxi_Flapper_Dress_1_1024x1024.jpg",
                    "Dresses/4002/1920s_Black_Beaded_Deco_Angelina_Maxi_Flapper_Dress_5_1024x1024.jpg"
                ],
                price: 458.00,
                color: ["Black"],
                desc: "Let us know when you’ve popped your eyes back in, dear. This gorgeous black flapper dress exudes 1920s and 30s charm, crafted in intricately beaded mesh layered over an included matching slip. With impressive swaths of deco bursts and teardrops, a classic v-neckline and open cap sleeve design, this vintage maxi dress is a bona fide head turner. Prepare for flapper fabulousness! \n Available in sizes 4-12 while supplies last.",
                details: [
                    "Imported",
                    "Polyester 100%",
                    "Hand Wash Only",
                    "Pull On",
                    "Underslip Included",
                    "Material Has Little Stretch",
                    "Model Pictured Wearing Size 6",
                    "Model Info: Height: 5’8\” | Waist: 24 | Hips: 36 | Bust: 34B"
                ]
            },
            {
                name: "Green & Cream Wilshire Flapper Day Dress",
                brandName: "Gibson Girl",
                images: [
                    "Dresses/64867/64867_1_e2db6a63-d7ff-4f6c-8c93-5da28d85f1e6_2048x2048.jpg",
                    "Dresses/64867/64867_2_21d97191-6e80-4786-97fa-a3a8a4cc81df_2048x2048.jpg",
                    "Dresses/64867/64867_3_234936cb-df56-4a99-8d11-44a57affb898_1024x1024.jpg",
                    "Dresses/64867/64867_L_2048x2048.jpg",
                    "Dresses/64867/64867_5_8a201854-b3e4-4f63-b247-966f4d57fe21_2048x2048.jpg"
                ],
                price: 32.00,
                color: ["White", "Green"],
                desc: "We found a reason to smile, dears! Enchanting and elegant, The Wilshire is a graceful 1920s style day dress crafted in an gorgeous green woven blend with stunning ivory cream details. Simplistic short sleeves flutter around the bodice as it makes way for a wide V-neck with lovely ivory flounce and draped faux collar tie. The pointed empire waist tops a courtly seamed and paneled center that descends to a graceful banded drop waist, styled in ivory with horizontal pleats. With an airy asymmetrical hemline, back zipper and hook, the Wilshire is a slice of retro radiance you can't pass up! \n Shown with slip, sold separately. \n Available in sizes XS-4X while supplies last.",
                details: [
                    "Imported",
                    "Polyester 100%",
                    "Dry Clean Only",
                    "Back Zipper/Hook",
                    "Unlined",
                    "Material Is Semi-Sheer, Slip Sold Separately",
                    "Model Pictured Wearing Size S; S Length 44",
                    "Model Info: Height: 5’9\” | Waist: 26 | Hips: 36.5 | Bust: 34C"
                ]
            },
            {
                name: "Antique Ivory & Black Chiffon Cherie Flapper Day Dress",
                brandName: "Gibson Girl",
                images: [
                    "Dresses/43983/s190355_1_db33a2e9-ed68-43ff-9d77-848c19f6e2d4_2048x2048.jpg",
                    "Dresses/43983/s190355_2_24d18fbb-8d23-45e5-a659-08e008e7807e_2048x2048.jpg",
                    "Dresses/43983/s190355_3_526eefb2-a66c-4171-bef6-9c9187f97891_1024x1024.jpg",
                    "Dresses/43983/s190355_4_2dc6fdee-905d-4c17-9d0a-a7520abebb9c_1024x1024.jpg",
                    "Dresses/43983/43983_1_2048x2048.jpg"
                ],
                price: 26.00,
                color: ["White", "Black"],
                desc: "Lovely as a summer day, darling! The Cherie Day Flapper from Unique Vintage is cast in a marvelously soft antique ivory chiffon with black contest details throughout. The sweet V-neck is outlined in black and features a beautiful self tie bow in the center while adorable cap sleeves frame your visage. Faux black buttons dot down the center to a striking black banded drop waist with a sweet side bow while seamed darting lends a flirty flair for a trumpet skirt. Faux pockets sit on the hip and the skirt is highlighted by a black banded hem that sways past your knees. Outfitted a side zipper and lined in gorgeous ivory, we’ve fallen in love with Cherie! \n Available in sizes XS-XL while supplies last.",
                details: [
                    "Imported",
                    "Side Zipper, Lined",
                    "Faux Buttons",
                    "Faux Pockets",
                    "Attached Tie",
                    "Material Has No Stretch",
                    "Model Pictured Wearing Size S",
                    "Model Info: Height: 5’8\” | Waist: 24 | Hips: 36 | Bust: 34B"
                ]
            }
        ]


        if (!(Object.entries(this.state.filter).length === 0 && this.state.filter.constructor === Object)) {
            let filteredDresses = dresses;
            var filteredFilter = this.clean(this.state.filter);
            for (var filter in filteredFilter) {
                filteredDresses = this.getFilteredArray(filteredDresses, filter, this.state.filter[filter])
            }
            pageContent = (
                <ul className="polls">
                    {filteredDresses.map((dress, i) => <ClothingBox key={i} dress={dress} />)}
                </ul>
            )
        } else {
            pageContent = (
                <ul className="polls">
                    {dresses.map((dress, i) => <ClothingBox key={i} dress={dress} />)}
                </ul>
            )
        }

        return (
            <div className="categoriesContainer">
                <Filter onChange={this.handleFilter}></Filter>
                {pageContent}
            </div>
        );

    }
}

function mapStateToProps(state) {
}

export default connect(mapStateToProps)(CategoriesContainer);
