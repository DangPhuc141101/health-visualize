import React from 'react'
import { Container } from "react-bootstrap";
import * as d3 from 'd3';

// const BarChart = (props) => {
//     return (
//         <Container className="w-100">
            
//         </Container>
//     );
// }

// export default BarChart;
/*
class Line extends React.Component {
    drawLine() {
        let xScale = d3.scaleTime()
            .domain(d3.extent(this.props.data, ({date}) => date));
            .rangeRound([0, this.props.width]);

        let yScale = d3.scaleLinear()
            .domain(d3.extent(this.props.data, ({value}) => value))
            .rangeRound([this.props.height, 0]);

        let line = d3.line()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.value));

        return (
            <path
                className="line"
                d={line(this.props.data)}
            />
        );
    }

    render() {
        <svg
           className="line-container"
           width={this.props.width}
           height={this.props.height}
        >
           {this.drawLine()}
        </svg>
    }
}
*/

class BarChart extends React.Component {

   constructor(props)
   {
       super(props)
   }
   
    drawLine() {    
        try{
        let xScale = d3.scaleTime()
            .domain(d3.extent(this.props.data[this.props.X]))
            .rangeRound([0, this.props.width]);

        let yScale = d3.scaleLinear()
            .domain(d3.extent(this.props.data[this.props.Y]))
            .rangeRound([this.props.height, 0]);
            
        let line = d3.line()
            .x((d) => xScale(d[this.props.X]))
            .y((d) => yScale(d[this.props.Y]));
           
            return (
                <path
                    className="line"
                    d={line(this.props.data)}
                />
            );
        }
        catch(e) {

        }
        return(<p>Hello</p>)
    }

    render() {
        return (<svg
            className="line-container"
            width={this.props.width}
            height={this.props.height}
         >
            {this.drawLine()}
         </svg>)   
    }
}

export default BarChart;