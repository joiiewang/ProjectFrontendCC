import React from 'react'

class Plant extends React.Component {

    constructor () {
        super()

        // Need to set points = to result of backend database query 
        this.state = {
            points: 0
        }
    }

    // Number of images and point values can be changed!
    choosePlant = (pointTotal) => {
        if(pointTotal < 5){
            return "./plantimages/plant1.jpg"
        } else if(pointTotal > 5 && pointTotal < 11) {
            return "./plantimages/plant2.jpg"
        } else if(pointTotal > 10 && pointTotal < 16) {
            return "./plantimages/plant3.jpg"
        } else if(pointTotal > 15 && pointTotal < 21) {
            return "./plantimages/plant4.jpg"
        } else {
            return "./plantimages/plant5.jpg"
        } 
    }

    render() {
        return(
        <div>
            <img src={this.choosePlant(this.state.points)} alt="Happy Plant" height={200} width={200} />
        </div>
        );
    }
}

export default Plant;