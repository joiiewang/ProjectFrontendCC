import React from 'react'
import '../css/HomePlant.css'

// EXAMPLE IMAGES (.SVG to resize well)
import plant1 from '../plantimages/plant1.svg'
import plant2 from '../plantimages/plant2.svg'
import plant3 from '../plantimages/plant3.svg'
import plant4 from '../plantimages/plant4.svg'
import plant5 from '../plantimages/plant5.svg'
import plant6 from '../plantimages/plant6.svg'


class HomePlant extends React.Component {

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
            return plant1
        } else if(pointTotal > 5 && pointTotal < 11) {
            return plant2
        } else if(pointTotal > 10 && pointTotal < 16) {
            return plant3
        } else if(pointTotal > 15 && pointTotal < 21) {
            return plant4
        } else if(pointTotal > 20 && pointTotal < 26) {
            return plant5
        } else {
            return plant6
        } 
    }

    render() {
        return(
        <div>
            <img src={this.choosePlant(this.state.points)} alt="Happy Plant"/>
        </div>
        );
    }
}


export default HomePlant;
