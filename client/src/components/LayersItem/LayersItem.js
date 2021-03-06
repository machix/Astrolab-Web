import React, { Component } from 'react';
import API from "../../utils/API"
import './LayersItem.css';
class LayersItem extends Component {

   



    render() {
        return (
            <article className="dt w-100 b--black-05 pb2 mt3 layers-item" href="#0">

                <div className="dtc w2 w3-ns v-mid checkbox-div">
                    <input className="mr1"
                        name={[this.props.title, this.props.myId]}
                        checked={this.props.isChecked}
                        type="checkbox"
                        onChange={this.props.balls}
                        id = {this.props.myId}
                    />
                </div>

                <div className="dtc v-mid pl3">
                    <h1 className="f6 f5-ns lh-title mv0">{this.props.title} </h1>
                </div>

                <div className="dtc v-mid tr">
                    <img className="f6 h-10 b--black-10 dim pointer pv1 black-60" src={this.props.icon} alt=""/>
                </div>

            </article>
        )
    }
}

export default LayersItem;
