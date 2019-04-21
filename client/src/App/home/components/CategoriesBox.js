import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CategoriesBox extends Component {

    constructor(props) {
        super(props);
        // initial state stores the questions, an array of answers the user will input, options the user will make true or false, linked represents if the user will be linked, and submitted checks if the poll has been submitted yet. 
        this.state = {
            box: {},
            hover: false
        }
    }

    componentWillMount() {
        this.setState({ box: this.props.box });
    }

  

    render() {
        // TO DO: ADD LINK
        console.log("PROPSAROONI", this.props);
        let brandText = ""
        if (this.props.box.name == "Gibson Girls") {
            brandText = "Áveline is one of the emerging young designers in Rapture  who came to spotlight before she graduated in 2009 at Contemporary Arts Institute Rapture. That year she became the top young fashion designer at the Fashion Awards Rapture. Áveline plays an important role in the Rapture contemporary fashion scene, she won the Best Fashion Designer Award of Glamour Women of the Year in 2014. She is on the right track to share her powerful and vibrant creations with a wider audience. \n Her independent Rapture based label's vision contains innovative, modern design for a cosmoplitan woman who is self-assured and proud of her individual image; the woman who values the expression of originality in her day-to-day life. The love for contrasts is reflected throughout every of Áveline's work, she experiments a lot with silhouettes, shapes, textures and colours. Inspiration drawn from contemporary art and youth culture is combined with an emphasis on tailoring and the use of custom developed fabrics. This playful and fresh attitude presents the effortless 'power-woman' blend of the 20th and 21st century."
        } else if (this.props.box.name == "Ryan Boutique") {
            brandText = "Áveline is one of the emerging young designers in Rapture  who came to spotlight before she graduated in 2009 at Contemporary Arts Institute Rapture. That year she became the top young fashion designer at the Fashion Awards Rapture. Áveline plays an important role in the Rapture contemporary fashion scene, she won the Best Fashion Designer Award of Glamour Women of the Year in 2014. She is on the right track to share her powerful and vibrant creations with a wider audience. \n Her independent Rapture based label's vision contains innovative, modern design for a cosmoplitan woman who is self-assured and proud of her individual image; the woman who values the expression of originality in her day-to-day life. The love for contrasts is reflected throughout every of Áveline's work, she experiments a lot with silhouettes, shapes, textures and colours. Inspiration drawn from contemporary art and youth culture is combined with an emphasis on tailoring and the use of custom developed fabrics. This playful and fresh attitude presents the effortless 'power-woman' blend of the 20th and 21st century."
        } else if (this.props.box.name == "Apollo") {
            brandText = "Áveline is one of the emerging young designers in Rapture  who came to spotlight before she graduated in 2009 at Contemporary Arts Institute Rapture. That year she became the top young fashion designer at the Fashion Awards Rapture. Áveline plays an important role in the Rapture contemporary fashion scene, she won the Best Fashion Designer Award of Glamour Women of the Year in 2014. She is on the right track to share her powerful and vibrant creations with a wider audience. \n Her independent Rapture based label's vision contains innovative, modern design for a cosmoplitan woman who is self-assured and proud of her individual image; the woman who values the expression of originality in her day-to-day life. The love for contrasts is reflected throughout every of Áveline's work, she experiments a lot with silhouettes, shapes, textures and colours. Inspiration drawn from contemporary art and youth culture is combined with an emphasis on tailoring and the use of custom developed fabrics. This playful and fresh attitude presents the effortless 'power-woman' blend of the 20th and 21st century."
        } else if (this.props.box.name == "ÁVELINE'S") {
            brandText = "Áveline is one of the emerging young designers in Rapture  who came to spotlight before she graduated in 2009 at Contemporary Arts Institute Rapture. That year she became the top young fashion designer at the Fashion Awards Rapture. Áveline plays an important role in the Rapture contemporary fashion scene, she won the Best Fashion Designer Award of Glamour Women of the Year in 2014. She is on the right track to share her powerful and vibrant creations with a wider audience. \n Her independent Rapture based label's vision contains innovative, modern design for a cosmoplitan woman who is self-assured and proud of her individual image; the woman who values the expression of originality in her day-to-day life. The love for contrasts is reflected throughout every of Áveline's work, she experiments a lot with silhouettes, shapes, textures and colours. Inspiration drawn from contemporary art and youth culture is combined with an emphasis on tailoring and the use of custom developed fabrics. This playful and fresh attitude presents the effortless 'power-woman' blend of the 20th and 21st century."
        }
        brandText = brandText.split('\n').map((item, i) => {
            return <p key={i}>{item}</p>;
        });
        return (
            <div className="categoriesBox">
                <div>
                    <img className="categoriesBoxImage rounded" src={require("../../../assets/" + this.state.box.image)} />
                    <p className="categoriesBoxTag">{this.state.box.name}</p>
                    <button value={this.props.box.name} onClick={this.props.learnMore}>Learn More</button>
                    <Link to={"/categories/" + this.props.category} >
                      <button>Go to Collection</button>
                    </Link>
                </div>

            </div>
        )
    }
}

export default CategoriesBox;