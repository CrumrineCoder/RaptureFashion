import React, { Component } from 'react';

// About page 
class About extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <img className="aboutHeaderImage" src={require("../../../assets/About/Wiki-background.jpg")} />
                <p>Rapture Fashion is proud to be the prime women's ready-to-wear boutique collection in the world's most competitive marketplace in the world's greatest city, and the only one to be approved by the city's creator Andie Ryan. From a city with such bright minds behind the innovations of the Plasmids and gene tonics, underwater architecture, and the Bathysphere, it's no surprise that we have the finest boutique dresses, hats, shoes, and accessories. For many years, only the elite of Rapture could enjoy our fabrics, but with advancements in manufacturing and shipping technology we are proud to say we can bring the only fabrics to be worn by Andie Ryan to the common woman with no decrease in quality. You can be the first in your town to be wearing the finest dresses, and wow the party and such. Rapture pieces are created using the finest fabrics and their manufacturing requires distinct tradtional craftmanship. Our piece has undergone strict quality control. All garmens assembly is done by fairly paid workers. Most items are produced in small batches in the heart of Rapture's Garment District, while others are produced in-house at our new Rapture headquarters on a made-to-order basis to eliminate excess. </p>

                <p>We are passionate about allowing the brighest of minds in Rapture to provide thoughtful and progressive attire and content for the extravagent, explorers, and creators. We are passionate about utilizing our extensive manufacturing abilities to craft aspirational womenswear with luxury influences, inspiring design, functional detailing and attainable pricing. Our brand's culture is centered on propelling creative exploration, so our global stores and digital spaces will always serve as thriving platforms for the Global Creative Class - a diverse group of international individuals whose creative vocations challenge them to constantly be imaginative, independent, confident and adventurous. </p>

                <p>We strongly believe that the Rapture Fashion Creative Lab is the future of fashion incubation. It's a progressive platform for exploring fresh new ideas with emerging independent designers and visionary conceptual thinkers. WE harness our remarkable manufacturing abilities and retail presence to expose these creative indviduals to a rapidly growing international audience. The results are amazing - call it Collaboration 2.0. </p>
            </div>
        );

    }
}

export default (About);
