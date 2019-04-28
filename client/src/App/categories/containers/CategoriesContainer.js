import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothingBox from '../../home/components/ClothingBox';
import Filter from "../components/Filter";
import store from '../../store';
import Products from '../../shopify/Products'
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
            filter: {},
            sort: null
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.getFilteredArray = this.getFilteredArray.bind(this);
        this.arrayContainsAnotherArray = this.arrayContainsAnotherArray.bind(this);
        this.clean = this.clean.bind(this);
        this.addVariantToCart = this.addVariantToCart.bind(this);
        this.sort = this.sort.bind(this);
    }

    componentDidMount() {
        //     console.log(this.props);
    }

    handleFilter(filter) {
        this.setState({
            filter: filter
        })
    }

    // Upon first render,  tell the back end to get all polls
    /*	componentDidMount() {
            this.props.dispatch(pollActions.selectPoll("All"));
            this.props.dispatch(pollActions.fetchVotesIfNeeded("All"));
        } */

    getFilteredArray(array, key, value) {


        return array.filter(function (e) {
            switch (key) {
                case "color":
                    var splitColor = e.options[1].values[0].value.split('/');
                    console.log(splitColor);
                    return splitColor.includes(value)
                case "vendor":
                    return e.vendor == value
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

    addVariantToCart(variantId, quantity) {
        const state = store.getState().home.cart; // state from redux store
        const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }]
        const checkoutId = state.checkout.id
        state.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
            store.dispatch({ type: 'ADD_VARIANT_TO_CART', payload: { isCartOpen: true, checkout: res } });
        });
    }

    sort(value) {
        this.setState({
            sort: value
        })
    }

    render() {
        var filters = {

        }
        let pageContent = '';

        var dresses = [
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
            },
            {
                name: "Burgundy Red Delores Swing Dress with Sleeves",
                brandName: "Gibson Girl",
                images: [
                    "Dresses/1277/Unique_Vintage_1950s_Style_Burgundy_Red_Delores_Swing_Dress_5_2048x2048.jpg",
                    "Dresses/1277/Unique_Vintage_1950s_Style_Burgundy_Red_Delores_Swing_Dress_6_1024x1024.jpg",
                    "Dresses/1277/Unique_Vintage_1950s_Style_Burgundy_Red_Delores_Swing_Dress_4_2048x2048.jpg",
                    "Dresses/1277/Unique_Vintage_1950s_Style_Burgundy_Red_Delores_Swing_Dress_1024x1024.jpg",
                    "Dresses/1277/Unique_Vintage_1950s_Style_Burgundy_Red_Delores_Swing_Dress_2_2048x2048.jpg"
                ],
                price: "88",
                color: ["Red"],
                desc: "Let Delores get domestic with you, darling. A bewitching burgundy dress rich in 1950s vintage appeal fresh from Unique Vintage, Delores is unparalleled! Boasting a gathered surplice V-neckline, trim and tailored half sleeves with darling button detail and a thick banded natural waistline that creates a minimized silhouette, the Delores vintage dress is to die for. An ample A-line swing skirt billows to knee length in soft pleats, zipping slyly up the back. Crafted in a supremely soft stretch blend in stunning retro structure, forming an understated yet flattering design, this swing dress will leave you fabulously floored!",
                tip: "Pair with studded ankle boots for a simple yet rebellious look.",
                wash: "Hand Wash/Dry Flat",
                fabric: "59% Cotton 35% Polyamide 6% Spandex",
                details: [
                    "Back Zipper",
                    "Unlined, Stretch Blend",
                    "Length Includes Fringe",
                    "Model Pictured Wearing Size S; S Length 40\"",
                    "Model Info: Height: 5'10\" | Bust: 32 | Waist: 26 | Hip: 38.5"
                ]
            },
            {
                name: "Yellow Sunshine Deena Swing Dress",
                brandName: "Gibson Girl",
                images: [
                    "Dresses/79209/79209_1_2048x2048.jpg",
                    "Dresses/79209/79209_2_1024x1024.jpg",
                    "Dresses/79209/79209_3_1024x1024.jpg",
                    "Dresses/79209/79209_4_1024x1024.jpg",
                    "Dresses/79209/79209_5_2048x2048.jpg"
                ],
                price: "128",
                color: ["Yellow"],
                desc: "A ray of sunshine, darling! A vintage-inspired spectacle for a maven on the move, this lovely yellow dress from Bettie Page is a brilliant swing crafted in a lightweight cotton with a dash of stretch. A beautiful print of yellow and pastel checkers wrap throughout this 1950s silhouette. The sweetheart bodice is secured with adjustable spaghetti straps and centered by subtle gathers, complete with a dainty pop of padding. The banded waist slims and elongates as the gathered swing skirt provides a vintage hourglass shape. Outfitted with side pockets and a back zipper, romance is a hop, skip, and jump away! ",
                tip: "Pair with studded ankle boots for a simple yet rebellious look.",
                wash: "Hand Wash, Line Dry",
                fabric: "97% Cotton 3% Spandex",
                details: [
                    "unlined, Back Zipper",
                    "Adjustable Spaghetti Straps",
                    "Side pockets",
                    "Material Has Little Stretch",
                    "Length Measured From Side",
                    "Model Pictured Wearing Size S; S Length 33“",
                    "Model Info: Height: 5’8” | Waist: 26” | Hips: 36” | Bust: 34B"
                ]
            },
            {
                name: "Multicolor Floral Print Sleeveless Swing Dress",
                brandName: "Gibson Girl",
                images: [
                    "Dresses/87000/87000_1_54f0b098-fc21-4cb5-8e9f-28ab2275cbc2_2048x2048.jpg",
                    "Dresses/87000/87000_2_c60552e1-2017-44ea-ae11-f8f3657fe018_1024x1024.jpg",
                    "Dresses/87000/87000_3_e6d818ba-6a23-4d98-b303-568fc5196c1d_2048x2048.jpg",
                    "Dresses/87000/87000_4_6330795b-a0db-4a63-b613-8b41ccd1d988_1024x1024.jpg",
                    "Dresses/87000/87000_5_9275dc0b-c54e-4b09-bef6-f68999ea0665_1024x1024.jpg"
                ],
                price: "68",
                color: ["Multi"],
                desc: "The perfect accessory is lots of flowers! Cast in a fabulous cotton stretch and boasting a bountiful array of blooming florals in ivory, orange, and pink set against a green backdrop, this vintage style swing dress is made to wonderfully accentuate your form. With a ravishing sleeveless design, the darted bodice features an iconic V-neckline for flirtatious form while the seamed waist centers your hourglass shape. The mid-century swing skirt cascades beautifully around your curves to a straight hem at your knees while side pockets keep your essentials close at hand. Outfitted with a back zipper to nip in your figure, it’s a darling essential for vintage divas!",
                tip: "Pair with studded ankle boots for a simple yet rebellious look.",
                wash: "Dry clean only",
                fabric: "97% Cotton 3% Spandex",
                details: [
                    "Back Zipper, unlined",
                    "Side pockets",
                    "Material has little stretch",
                    "Model Pictured Wearing Size S; S Length 40\"",
                    "Model Info: Height: 5'10\" | Bust: 32 | Waist: 26 | Hip: 38.5"
                ]
            },
            {
                name: "Emerald Green Delores Swing Dress with Sleeves",
                brandName: "Gibson Girl",
                images: [
                    "Dresses/1280/Unique_Vintage_1950s_Style_Emerald_Green_Delores_Swing_Dress_3_2048x2048.jpg",
                    "Dresses/1280/Unique_Vintage_1950s_Emerald_Green_Delores_Swing_Dress_with_Sleeves_1024x1024.jpg",
                    "Dresses/1280/Unique_Vintage_1950s_Style_Emerald_Green_Delores_Swing_Dress_1_1024x1024.jpg",
                    "Dresses/1280/Unique_Vintage_1950s_Style_Emerald_Green_Delores_Swing_Dress_4_1024x1024.jpg",
                    "Dresses/1280/Unique_Vintage_1950s_Style_Emerald_Green_Delores_Swing_Dress_5_2048x2048.jpg"
                ],
                price: "88",
                color: ["Green"],
                desc: "Let Delores get domestic with you, darling. A bewitching emerald green swing dress rich in 1950s vintage appeal fresh from Unique Vintage, Delores is unparalleled! Boasting a gathered surplice V-neckline, trim and tailored half sleeves with darling button detail and a thick banded natural waistline that creates a minimized silhouette, this vintage green dress is sure to flatter your figure. An ample A-line swing skirt billows to knee length in soft pleats, zipping slyly up the back. Crafted in a supremely soft stretch blend in stunning retro structure, forming an understated yet flattering design. You’ll be fabulously floored by the authentic look of this nice-girl-next-door vintage reproduction dress! ",
                tip: "Pair with studded ankle boots for a simple yet rebellious look.",
                wash: "Hand Wash/Dry Flat",
                fabric: "59% Cotton 35% Polyamide 6% Spandex",
                details: [
                    "Back Zipper",
                    "Unlined, Stretch Blend",
                    "Length Includes Fringe",
                    "Model Pictured Wearing Size S; S Length 40\"",
                    "Model Info: Height: 5'8\" | Bust: 33 | Waist: 25.5 | Hip: 36 | Dress Size: 2/4"
                ]
            }
        ]
        let hats = [
            {
                name: "Black Feather & Gold Beaded Fringe Flapper Headband",
                brandName: "Ryan Boutique",
                images: [
                    "Accessories/78896/78896_1_2048x2048.jpg",
                    "Accessories/78896/78896_2_1024x1024.jpg",
                    "Accessories/78896/78896_3_2048x2048.jpg"
                ],
                price: "32",
                color: ["Black", "Gold"],
                desc: "Dramatic and refined for a flapper queen! This stunning crown from Unique Vintage is a dazzling 1920s style headband full of royal deco divinity. The gleaming yellow, red, and silver gems are embellished with golden and black beads throughout the black suede backed headband while darling beaded fringe dances at the temples. A dynamic plume of black feathers flares out from the center while twin elastic cords keep this accessory secure. Ingenue incredible! ",
                wash: "N/A",
                fabric: "N/A",
                details: [
                    "Elastic Cords",
                    "Faux Suede Backing"
                ]
            },
            {
                name: "Womens Mini Straw Boater Hat Fedora Panama Flat Top Ribbon Summer",
                brandName: "Ryan Boutique",
                images: [
                    "Hats/A456/71UlGCn43VL._UX679_.jpg",
                    "Hats/A456/71jbzOt3qEL._UX569_.jpg"
                ],
                price: "10.99",
                color: ["Black"],
                desc: "For your inner gilded flapper girl! A sparkling accessory for your jazz era ensemble, this glitzy piece from Unique Vintage sparkles with gold sequins and black beads through the lightweight black mesh. With scalloped hem and deco designs, you’re the center of attention! ",
                wash: "Spot Wash",
                fabric: "100% Straw",
                details: [
                    "Circumference: Approx.56 cm-58 cm/22.05-22.84\"",
                    "Hat brim: Approx. 6 cm /2.36\"",
                    "Height: Approx.10 cm/3.93\""
                ]
            },
            {
                name: "Bow Trim Hat",
                brandName: "Ryan Boutique",
                images: [
                    "Hats/704284143/704284143_1.jpg",
                    "Hats/704284143/704284143_2.jpg",
                    "Hats/704284143/704284143_3.jpg"
                ],
                price: "110",
                color: ["White"],
                desc: "Finish off your occasion style with this stunning hat, complete with an eye-catching large feathered bow detail, and designed in 100% abaca.",
                wash: "Do not wash",
                fabric: "100% Abaca",
                details: [
                    "Length: 58cm circumference"
                ]
            },
            {
                name: "Women Race Hats Organza Hat with Ruffles Feathers",
                brandName: "Ryan Boutique",
                images: [
                    "Hats/UX522/6168K6fY6ML._UX522_.jpg",
                    "Hats/UX522/61+iPR9siTL._UX522_.jpg",
                    "Hats/UX522/61jc3f+eV8L._UX522_.jpg",
                    "Hats/UX522/616+iF33u-L._UX522_.jpg",
                    "Hats/UX522/61JMacYt3NL._UX522_.jpg",
                    "Hats/UX522/6158MYzoJ6L._UX522_.jpg"
                ],
                price: "29.99",
                color: ["Black", "White"],
                desc: "For your inner gilded flapper girl! A sparkling accessory for your jazz era ensemble, this glitzy piece from Unique Vintage sparkles with gold sequins and black beads through the lightweight black mesh. With scalloped hem and deco designs, you’re the center of attention! ",
                wash: "Dry clean only",
                fabric: "100% organza",
                details: [
                    "Hat circumference:56-58cm"
                ]
            },
            {
                name: "Kentucky Derby Racing Horse Hat Church Wedding Dress Party Occasion Cap",
                brandName: "Ryan Boutique",
                images: [
                    "Hats/UX385/81+2hBIf4dL._UX522_.jpg",
                    "Hats/UX385/81sskVHwjtL._UX385_.jpg",
                    "Hats/UX385/71C7Uhb98iL._UX385_.jpg",
                    "Hats/UX385/81RztQFgOUL._UX385_.jpg"
                ],
                price: "29.99",
                color: ["Black"],
                desc: "For your inner gilded flapper girl! A sparkling accessory for your jazz era ensemble, this glitzy piece from Unique Vintage sparkles with gold sequins and black beads through the lightweight black mesh. With scalloped hem and deco designs, you’re the center of attention! ",
                wash: "Dry clean only",
                fabric: "100% polyester",
                details: [
                    "head circumference between 21.5 inches~23.5 inches",
                    "brim wide 5.8 inches",
                    "cap crown tall 3.9 inches"
                ]
            },
            {
                name: "Ruffle Turban Hat Knit Turban Headwraps with Detachable Crystal Brooch",
                brandName: "Ryan Boutique",
                images: [
                    "Hats/SX679/91x7Vuz7J7L._SX679._SX._UX._SY._UY_.jpg",
                    "Hats/SX679/915ySFSvMEL._SX569._SX._UX._SY._UY_.jpg",
                    "Hats/SX679/91UC5iM5ucL._SX569._SX._UX._SY._UY_.jpg"
                ],
                price: "11.99",
                color: ["Green"],
                desc: "For your inner gilded flapper girl! A sparkling accessory for your jazz era ensemble, this glitzy piece from Unique Vintage sparkles with gold sequins and black beads through the lightweight black mesh. With scalloped hem and deco designs, you’re the center of attention!",
                wash: "Dry clean only",
                fabric: "Polyester fabric and shinning crystal",
                details: [
                    "Head circumference 58 cm/22.8 inch."
                ]
            },
            {
                name: "Winter Hat 100% Wool Cloche Bucket with Bow Accent",
                brandName: "Ryan Boutique",
                images: [
                    "Hats/UX679/61LbpdWmMuL._UX679_.jpg",
                    "Hats/UX679/71m-Bxgu7iL._UY500_.jpg",
                    "Hats/UX679/61fK7tdqJ4L._UX425_.jpg",
                    "Hats/UX679/717nHDWE9BL._UX569_.jpg"
                ],
                price: "21.99",
                color: ["Blue"],
                desc: "For your inner gilded flapper girl! A sparkling accessory for your jazz era ensemble, this glitzy piece from Unique Vintage sparkles with gold sequins and black beads through the lightweight black mesh. With scalloped hem and deco designs, you’re the center of attention! ",
                wash: "Dry clean only",
                fabric: "100% wool",
                details: [
                    "Hat circumference 22\"- 23.6\"",
                    "height 6\"",
                    "cap crown tall 3.9 inches"
                ]
            }
        ]
        let accessories = [
            {
                name: "Black Mesh & Gold Sequin Flapper Capelet",
                brandName: "Ryan Boutique",
                images: [
                    "Accessories/67636/67636_1_2048x2048.jpg",
                    "Accessories/67636/67636_2_1024x1024.jpg",
                    "Accessories/67636/67636_3_2048x2048.jpg",
                    "Accessories/67636/67636_4_1024x1024.jpg",
                    "Accessories/67636/67636_5_2048x2048.jpg"
                ],
                price: "36",
                color: ["Black", "Gold"],
                desc: "For your inner gilded flapper girl! A sparkling accessory for your jazz era ensemble, this glitzy piece from Unique Vintage sparkles with gold sequins and black beads through the lightweight black mesh. With scalloped hem and deco designs, you’re the center of attention! ",
                wash: "Spot Wash",
                fabric: "100% Sequin",
                details: [
                    "45”W x 12”L"
                ]
            },
            {
                name: "Ivory Faux Fur Capelet",
                brandName: "Ryan Boutique",
                images: [
                    "Accessories/65201/65201_1_2048x2048.jpg",
                    "Accessories/65201/65201_2_1024x1024.jpg",
                    "Accessories/65201/65201_3_2048x2048.jpg"
                ],
                price: "48",
                color: ["White"],
                desc: "It's the final detail that always gets a dame noticed! A dreamy ivory faux fur capelet, elegantly sleek with white lining and embellished with a dainty collar, this stunning accessory features elegant ivory ribbon ties for ladylike styling. You’re unforgettable, dears!",
                wash: "Spot Wash",
                fabric: "Faux Fur",
                details: [
                    "11” Length",
                    "Self tie ribbon"
                ]
            },
            {
                name: "Emerald & Silver Crystal Drop Post Earrings",
                brandName: "Ryan Boutique",
                images: [
                    "Accessories/2928/Deco_Style_Emerald_Silver_Crystal_Drop_Post_Earrings_1_2048x2048.jpg"
                ],
                price: "20",
                color: ["Emerald", "Silver"],
                desc: "A dramatic drop of vintage elegance! Two gorgeously long silver drop earrings in a stunning deco design. Brimming with emerald green rhinestone and silver crystal detail, securing by gem adorned post backs. ",
                wash: "N/A",
                fabric: "N/A",
                details: [
                    "3.25” L x 5/8” W",
                    "Rhinestone/Gem Detail",
                    "Lead & Safety Compliant",
                    "Post Backs"
                ]
            },
            {
                name: "Gold & Silver Crystal Pave Drop Earrings",
                brandName: "Ryan Boutique",
                images: [
                    "Accessories/81890/81890_1cc_2048x2048.jpg",
                    "Accessories/81890/81890_2cc_1024x1024.jpg",
                    "Accessories/81890/81890_3cc_1024x1024.jpg"
                ],
                price: "26",
                color: ["Gold", "Silver"],
                desc: "A dash of deco flash! These gleaming golden drop earrings sparkle with silver rhinestone embellishment and are secured to post backs.",
                wash: "N/A",
                fabric: "N/A",
                details: [
                    "2.25”L x 1”W",
                    "Post Backs"
                ]
            },
            {
                name: "Silver Crystal Statement Necklace",
                brandName: "Ryan Boutique",
                images: [
                    "Accessories/80802/80802_1_2048x2048.jpg",
                    "Accessories/80802/80802_3_1024x1024.jpg"
                ],
                price: "24",
                color: ["Silver"],
                desc: "This sleek and luminous crystal statement necklace is a deco dab of glamour that will instantly up the ante on your vintage ensemble. This crystal adorned deco design is set on a thick golden linked chain that secures by an adjustable lobster clasp.",
                wash: "N/A",
                fabric: "N/A",
                details: [
                    "Pendant 1.5”W",
                    "Adjustable Lobster Clasp"
                ]
            },
            {
                name: "Metallic Black Sheen Deco Rose Beaded Fringe Shawl",
                brandName: "Ryan Boutique",
                images: [
                    "Accessories/9495/1920s_Style_Metallic_Black_Sheen_Deco_Rose_Beaded_Fringe_Shawl_1_2048x2048.jpg",
                    "Accessories/9495/1920s_Style_Metallic_Black_Sheen_Deco_Rose_Beaded_Fringe_Shawl_2_2048x2048.jpg",
                    "Accessories/9495/1920s_Style_Metallic_Black_Sheen_Deco_Rose_Beaded_Fringe_Shawl_3_1024x1024.jpg",
                    "Accessories/9495/1920s_Style_Metallic_Black_Sheen_Deco_Rose_Beaded_Fringe_Shawl_4_1024x1024.jpg",
                    "Accessories/9495/1920s_Style_Metallic_Black_Sheen_Deco_Rose_Beaded_Fringe_Shawl_5_1024x1024.jpg"
                ],
                price: "58",
                color: ["Black"],
                desc: "Elegance to remember! Steeped in deco divinity in a 1920s inspired open silhouette, this stunning shawl is elaborately beaded and sequined with black accents that give off a metallic sheen on a delicate sheer black mesh. With a beaded scalloped edging, dripping with beaded fringe, and gorgeous rose details, it's beaded va-va-voom!",
                wash: "Hand wash only",
                fabric: "100% Rayon",
                details: [
                    "Beading Detail Throughout",
                    "Fringe Hem",
                    "Hook/clasp",
                    "No Stretch/Sheer Material",
                    "48\" W / 18\" H (Includes Fringe)"
                ]
            }
        ]
        let shoes = [
            {
                name: "Red T-Strap Heels",
                brandName: "Ryan Boutique",
                images: [
                    "Shoes/13258/1920s_Style_Red_T-Strap_Heels_1_2048x2048.jpg",
                    "Shoes/13258/1920s_Style_Red_T-Strap_Heels_2_1024x1024.jpg",
                    "Shoes/13258/1920s_Style_Red_T-Strap_Heels_3_2048x2048.jpg",
                    "Shoes/13258/1920s_Style_Red_T-Strap_Heels_4_2048x2048.jpg",
                    "Shoes/13258/1920s_Style_Red_T-Strap_Heels_5_1024x1024.jpg"
                ],
                price: "68",
                color: ["Red"],
                desc: "Even if you donâ at wear a vintage dress to your upcoming formal occasion, you can still add a hint of retro flair with these vintage-inspired T-strap heels from Unique Vintage. These patent leather beauties feature 4-inch heels with tapered bottoms, a pointed toe and the signature T-strap upper that gives them a true 1920s appeal. Create a ladylike look that perfectly matches the rest of your retro-inspired formal ensemble.",
                tip: "Pair with studded ankle boots for a simple yet rebellious look.",
                wash: "N/A",
                fabric: "100% Leather",
                details: [
                    "Side Zipper",
                    "Some Stretch",
                    "Length Includes Fringe",
                    "Model Pictured Wearing Size M; Medium Length 43",
                    "Model Info: Height: 5’9\” | Waist: 26 | Hips: 36.5 | Bust: 34C"
                ]
            },
            {
                name: "Red & White Two-Tone Leather T-Strap Heels",
                brandName: "Ryan Boutique",
                images: [
                    "Shoes/56685/56685-8_1_2048x2048.jpg",
                    "Shoes/56685/56685-8_3_2048x2048.jpg",
                    "Shoes/56685/56685-8_4_2048x2048.jpg",
                    "Shoes/56685/56685-8_5_1024x1024.jpg"
                ],
                price: "150",
                color: ["Red", "White"],
                desc: "Nothingâ as more classic than a pair of red and white t-straps, gals! Crafted in a fabulous red and white leather, the Gatsby heels are the iconic silhouette of our favorite vintage kicks. Styled from original 1920s shoes, these retro pumps boast matte white leather and red patent leather with spectator styling, a comfortable Spanish heel, and an adjustable buckle strap. With a 2.5âin. lift and comfortable leather insole, Gatsby will keep you gorgeous, day or night.",
                tip: "Pair with studded ankle boots for a simple yet rebellious look.",
                wash: "N/A",
                fabric: "100% Leather",
                details: [
                    "2.5” Heel",
                    "Cushion insole",
                    "Minimal tread",
                    "Gored & Buckle Ankle Strap"
                ]
            },
            {
                name: "Taupe Leatherette Cambridge T-Strap Wedges",
                brandName: "Ryan Boutique",
                images: [
                    "Shoes/83038/83038_1_2048x2048.jpg",
                    "Shoes/83038/83038_3_1024x1024.jpg",
                    "Shoes/83038/83038_4_2048x2048.jpg",
                    "Shoes/83038/83038_5_2048x2048.jpg"
                ],
                price: "44",
                color: ["Brown"],
                desc: "Vintage with a lift! A pair of sweet taupe brown t-straps in a soft leatherette, these adorable kicks boast a keyhole cutout vamp and 2” wedge heels. A gored T-strap with an adjustable buckle closure allows for toe tapping dancing while the cushioned insole gives a sophisticated strut!",
                tip: "Pair with studded ankle boots for a simple yet rebellious look.",
                wash: "N/A",
                fabric: "Man-Made Materials",
                details: [
                    "2” Wedge Heel",
                    "Cushion insole",
                    "Minimal tread",
                    "Gored Ankle Strap"
                ]
            },
            {
                name: "Black T-Strap Mary Jane Kitten Heels",
                brandName: "Ryan Boutique",
                images: [
                    "Shoes/13239/Black_T-Strap_Mary_Jane_Kitten_Heels__5_2048x2048.jpg",
                    "Shoes/13239/Black_T-Strap_Mary_Jane_Kitten_Heels__3_1024x1024.jpg",
                    "Shoes/13239/Black_T-Strap_Mary_Jane_Kitten_Heels__7_1024x1024.jpg",
                    "Shoes/13239/Black_T-Strap_Mary_Jane_Kitten_Heels__4_1024x1024.jpg",
                    "Shoes/13239/Black_T-Strap_Mary_Jane_Kitten_Heels__6_1024x1024.jpg"
                ],
                price: "58",
                color: ["Black"],
                desc: "Combining the charming look of classic Mary Janes with the subtly sexy nature of kitten heels, these black T-strap Mary Jane kitten heels from Unique Vintage are the perfect footwear for your fun formal occasions. These retro-inspired shoes feature low, 3-inch kitten heels that give you a bit of a boost without the discomfort of stilettos or pumps, while their perforated details and stitched panels offer the beloved Mary Jane look. The T-strap on top secures these ladylike shoes against your feet while also adding even more vintage style. Wear them with a favorite little black dress for any special occasion or slip them on to complete a retro-inspired Halloween costume.",
                tip: "Pair with studded ankle boots for a simple yet rebellious look.",
                wash: "N/A",
                fabric: "Man-Made Materials",
                details: [
                    "3” Heel"
                ]
            },
            {
                name: "Black T-Strap Heels",
                brandName: "Ryan Boutique",
                images: [
                    "Shoes/13225/1920s_Style_Black_T-Strap_Heels_11_2048x2048.jpg",
                    "Shoes/13225/1920s_Style_Black_T-Strap_Heels_10_1024x1024.jpg",
                    "Shoes/13225/1920s_Style_Black_T-Strap_Heels_9_2048x2048.jpg",
                    "Shoes/13225/1920s_Style_Black_T-Strap_Heels_13_2048x2048.jpg",
                    "Shoes/13225/1920s_Style_Black_T-Strap_Heels_8_1024x1024.jpg"
                ],
                price: "68",
                color: ["Black"],
                desc: "Even if you don’t wear a vintage dress to your upcoming formal occasion, you can still add a hint of retro flair with these vintage-inspired T-strap heels from Unique Vintage. These patent leather beauties feature 4-inch heels with tapered bottoms, a pointed toe and the signature T-strap upper that gives them a true 1920s appeal. Set aside your pumps and slip into these stylish shoes instead to create a ladylike look that perfectly matches the rest of your retro-inspired formal ensemble. ",
                tip: "Pair with studded ankle boots for a simple yet rebellious look.",
                wash: "N/A",
                fabric: "Man-Made Materials",
                details: [
                    "3” Heel"
                ]
            }
        ]

        let vendorHeader;
        const state = store.getState().home.cart; // state from redux store
        let clothing = state.products;
        if (this.props.clothing != "all") {
            if (state.products["0"]) {
                if (this.props.clothing) {
                    if (this.props.clothing == "dresses") {
                        clothing = state.products.filter(function (a) {
                            return a.options[2].values["0"].value == "Dress"
                        });
                    } else if (this.props.clothing == "accessories") {
                        clothing = state.products.filter(function (a) {
                            return a.options[2].values["0"].value == "Accessory"
                        });
                    } else if (this.props.clothing == "shoes") {
                        clothing = state.products.filter(function (a) {
                            return a.options[2].values["0"].value == "Shoe"
                        });
                    } else if (this.props.clothing == "hats") {
                        clothing = state.products.filter(function (a) {
                            return a.options[2].values["0"].value == "Hat"
                        });
                    }
                } else if (this.props.vendor) {
                    let vendorImage;
                    let vendorText;
                    if (this.props.vendor == "Gibson Girls") {
                        clothing = state.products.filter(function (a) {
                            return a.vendor == "Gibson Girls"
                        });
                        vendorImage = "Brand/gibson girls.png";
                    } else if (this.props.vendor == "Ryan Boutique") {
                        clothing = state.products.filter(function (a) {
                            return a.vendor == "Ryan Boutique"
                        });
                        vendorImage = "Brand/andrew ryan.png";
                    } else if (this.props.vendor == "Apollo") {
                        clothing = state.products.filter(function (a) {
                            return a.vendor == "Apollo"
                        });
                        vendorImage = "Brand/apollo.png";
                    } else if (this.props.vendor == "ÁVELINE'S") {
                        clothing = state.products.filter(function (a) {
                            return a.vendor == "ÁVELINE'S"
                        });
                        vendorImage = "Brand/aveline.png";
                    }
                    /*     vendorText = vendorText.split('\n').map((item, i) => {
                             return <p key={i}>{item}</p>;
                         });
                         <div class='vendorBrandText'>
                         <p>{vendorText}</p>
                     </div> */
                    // Probably add the history text here too. 
                    vendorHeader = (
                        <div className="vendorHeader">
                            <div class='vendorBrandContainer'>
                                <div class='vendorBrandImage'>
                                    {<img src={require("../../../assets/" + vendorImage)} />}
                                </div>
                                <h3>{this.props.vendor}</h3>
                            </div>
                        </div>
                    )
                }
            }
        }
        if (this.state.sort) {
            if (this.state.sort == "sortPriceAsc") {
                clothing = clothing.sort(function (a, b) {
                    if (a.variants["0"].price < b.variants["0"].price) {
                        return -1;
                    }
                    if (a.variants["0"].price > b.variants["0"].price) {
                        return 1;
                    }
                    return 0;
                })
            }
        }
        if (!(Object.entries(this.state.filter).length === 0 && this.state.filter.constructor === Object)) {
            let filteredClothing = clothing;
            var filteredFilter = this.clean(this.state.filter);
            for (var filter in filteredFilter) {
                filteredClothing = this.getFilteredArray(filteredClothing, filter, this.state.filter[filter])
            }
            pageContent = (
                <ul className="clothingContainer">
                    {filteredClothing.map((article, i) => <ClothingBox key={i} dress={article} />)}
                </ul>
            )
        } else {
            pageContent = (
                <ul className="clothingContainer">
                    {clothing.map((article, i) => <ClothingBox key={i} dress={article} />)}
                </ul>
            )
        }
        /*
                pageContent = (
                    <ul className="polls">
                        {clothing.map((article, i) => <ClothingBox key={i} dress={article} />)}
                    </ul>
                )
        */
        let oProducts = <Products
            products={state.products}
            client={state.client}
            addVariantToCart={this.addVariantToCart}
        />;
        return (
            <div className="categoriesContainer">
                {vendorHeader}
                <Filter clothing={this.props.clothing} onChange={this.handleFilter} sort={this.sort}></Filter>
                {this.state.sort}
                {pageContent}
            </div>
        );

    }
}

export default connect((state) => state)(CategoriesContainer);

