import React from "react";

//PROPS:
//id - the id of the slider container
//cardWidth - the width of each individual card
//mardMargin - the margin of each card - space between cards
class ASlider extends React.Component {
  constructor(props) {
    super(props);
    //Keeps track of which card is centered in the slider - initialized to the middle child
    this.state = { currentCard: Math.floor(this.props.children.length / 2) };
    this.move = this.move.bind(this);
    this.displayChildren = this.displayChildren.bind(this);
  }
  componentDidMount(){
    //Listen for keyboard inputs "right, left, A, D, J, K" and move the slider accordingly
    document.addEventListener("keydown", (e) => {
      if(e.code === "ArrowRight" || e.code === "KeyL" || e.code ==="KeyD"){
        this.move(1)
      } else if(e.code === "ArrowLeft" || e.code === "KeyJ" || e.code ==="KeyA"){
        this.move(-1)
      }
    })
    //If move buttons exist, add onClick listeners to them
    //If move buttons exist, add onClick listeners to them
    if (this.props.buttonLeft) {
      document
        .querySelector(".aSliderButtonLeft")
        .addEventListener("click", e => {
          e.preventDefault();
          this.move(-1);
        });
    }
    if (this.props.buttonRight) {
      document
        .querySelector(".aSliderButtonRight")
        .addEventListener("click", e => {
          e.preventDefault();
          this.move(1);
        });
    }
  }
  //Takes number to move slider by, and moves the slider
  move(number) {
    //check if it's not the end or beginning of the slider
    if(this.state.currentCard + number < this.props.children.length && this.state.currentCard + number >= 0){
        let sliderContainer = document.querySelector(".aSliderContainer");
        //move the container *number* times to the right
        sliderContainer.style.right =
        parseInt(sliderContainer.style.right) +
        number * parseInt(this.props.cardWidth + 2*parseInt(this.props.cardMargin)) + "px";
        //Remove active from all cards
        document.querySelectorAll(".card").forEach(node => {
        node.classList.remove("active");
        });
        //Change current card to active
        let currentCard = this.state.currentCard + number;
        document.querySelector(".aSliderContainer").children[currentCard].classList.add("active");
        //Set state to portray current card
        this.setState(() => ({ currentCard }));
    }
  }
  //Wrap each child of ASlider in a div with "card" as classname and width & margin set by props
  displayChildren() {
    let cardArr = this.props.children.map(child => (
        <div key={this.props.children.indexOf(child)} className = "card"
          style={{width: this.props.cardWidth + "px", margin: this.props.cardMargin + "px"}}
          //"click" event listener that moves child into center
          onClick={() => {
            this.move(
               this.props.children.indexOf(child) - this.state.currentCard
            );
          }}
        >
          {child}
        </div>
      );
    });
    return cardArr;
  }

  render() {
    return (
      <div>
        <div className="aSliderCardHolder" style={{width: this.props.containerWidth + "px",
  overflow: "hidden"
                 }}>
        <div style = {{
  right: Math.ceil((this.props.children.length - (this.props.containerWidth / this.props.cardWidth)) / 2) * (this.props.cardWidth + this.props.cardMargin * 2) + "px" /*(number of children - number of shown children) / 2*/,
    display: "flex",
        position: "relative",
}}
          className="aSliderContainer">{this.displayChildren()}</div>
        </div>
        {this.props.buttonLeft ? (
            <div className="aSliderButtonLeft">{this.props.buttonLeft}</div>
            ) : (false)
        }
        {this.props.buttonRight ? (
          <div className="aSliderButtonRight">{this.props.buttonRight}</div>
        ) : (
          false
        )}
      </div>
    );
  }
}

export default ASlider;

/*
class of container = .aSliderContainer
class of each card = .card
class of selected card = .active
left button = .buttonLeft
right button = .buttonRight
*/