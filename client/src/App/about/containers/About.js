import React, { Component } from 'react';

// About page 
class About extends Component {
    render() {
        return (
            <div>
                <img className="aboutHeaderImage" src={require("../../../assets/About/Wiki-background.jpg")} alt="City underwater" />
                <img className="aboutPosterImage aboutPosterRightImage" src={require("../../../assets/About/poster1.jpg")} alt="Rapture Poster underwater"/>
                <p>Rapture Fashion is best summed up in its slogan, "No Gods or Kings. Only Woman", and is the leading womens' boutique collection in the city of Rapture. Rapture was founded underwater in the North Atlantic sea by the visionary founder Andie Ryan to create a society of paradise where the world's best and brighest can be granted the freedom of will and choice, unrestrained by government, religion and similar established institutions. Instead of abiding by tradition and moral systems imposed by those institutions, values such as logic and scientific reason guides the inhabitants in each one's pursuit of achievements.</p>
         
                <p>We've been the most successful brand in the worst's most competitive city for decades, and now that Andie Ryan has opened the embargo with the rest of the world we can bring you the most elite brands in all of fashion. Did I mention we're the only collection to carry Andie Ryan's personal boutique fashion line? We are passionate about allowing the brightest minds in Rapture to provide thoughtful and progressive attires and content for the extravagent, explorers, and creators of the rest off the world who are not fortunate enough to wind up in Rapture. We are passionate about utilizing our extensive manufacturing abilities to craft aspirational womenswear as explored below. Our pricing can only be possible now at this point in history because of our intense and caring relationships with our sister companies that allow us to stock the world and allow the common woman to dress as a Rapture elite without sacrificing any quality but instead refining it with feedback from the testers in Rapture. Our brand's culture is centered on propelling creative exploration, so our global stores and digital spaces will always serve as thirving platforms for the Global Creative Class - a diverse group of international individuals whose creative vocations challenge them to constantly be imaginative, independent, confident, and adventurous.</p>
                <img className="aboutPosterImage aboutPosterLeftImage" src={require("../../../assets/About/poster2.jpg")} alt="Fist poster city background"/>
                <p>We work closely with our affiliated brands through all steps of the process. All dresses begin as a brilliant medley of color, texture and inspiration on our design team's moodboard drawn from art, culture, architecture and anything else brought to Rapture from all around the world by the greatest and brightest. The libraries of Rapture contain guided trips down memory lane to eras filled with heroes to give them a twist of the woman of today. Fashion shows appearing biweekly in the Rapture Plaza and art centers are but a base for what's capable of the brands we work with. Our designers create the concept for the season, driven by the colors that will define it, and sketch the designs that will usher in a new era of fashion annually.</p>

                <p>Our team has access to thousands of textiles hailing from the industry's best mills, and if we can't find one then we design it ourselves. In collaboration with artist-in-residence Sander Cohen, they paint, sketch and engineer custom prints for every collection.</p>

                <p>It takes rounds of tinkering and tailoring to craft that perfect cut. After months of patterning, refinement and wear testing, each garment is meticulosuly designed to look just as great on every client as it does on the famous Rapture Runway. Every member of our design team has an eagle eye for details - it's what elevates every piece.</p>

                <p>And finally, perfected, produced and painstakingly inspected, each gorgeous garment finds its way to your Stylist. And - if it's lucky - to your closet to inspire style for seasons to come. What stays in fashion for Rapture a few weeks will last a lifetime anywhere else.</p>
            </div>
        );

    }
}

export default (About);
