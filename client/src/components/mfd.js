import { Component } from "react";
import BTN from "./button";

class MFD extends Component {
    state = {
        app: this.props.app,
        position: this.props.position || "",
        background: this.props.background || "",
        buttons: this.props.buttons || [],
        left: this.props.left || "",
        right: this.props.right || "",
        top: this.props.top || "",
        bottom: this.props.bottom || ""
    }

    runCommand = async (el, app, cmd) => {
        el.disabled = true;
        const response = await fetch(`/send?app=${app}&cmd=${cmd}`);
        const body = await response.json();
        el.disabled = false;
        
        if(body.status === "OK") {
            el.style.background = 'green';
        } else {
            el.style.background = 'red';
        }
        setTimeout(() => {el.style.background = ''}, 250);
    }

    //div className={`labels mfd-${this.state.position}`}

    render = function() {
        let T = this;
        return(
            <table className={`mfd`} style={{left: this.props.left, right: this.props.right, top: this.props.top, bottom: this.props.bottom}}>
                <tr>
                    <td></td>
                    <td className="topButtons">
                        <BTN />
                        <BTN />
                        <BTN />
                        <BTN />
                        <BTN />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td className="leftButtons">
                        <BTN />
                        <BTN />
                        <BTN />
                        <BTN />
                        <BTN />
                    </td>
                    <td className="middleScreen"><img className="background" src={this.state.background} alt="a background"/></td>
                    <td className="rightButtons">
                        <BTN />
                        <BTN />
                        <BTN />
                        <BTN />
                        <BTN />
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td className="bottomButtons">
                        <BTN />
                        <BTN />
                        <BTN />
                        <BTN />
                        <BTN />
                    </td>
                    <td></td>
                </tr>
              
            </table>
        )
    }
}

export default MFD;