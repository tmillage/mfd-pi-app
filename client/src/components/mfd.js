import { Component } from "react";

class MFD extends Component {
    state = {
        app: this.props.app,
        position: this.props.position || "",
        background: this.props.background || "",
        buttons: this.props.buttons || []
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

    render() {
        let T = this;
        return(
            <div className={`labels mfd-${this.state.position}`}>
              <img className="background" src={this.state.background}/>
              {this.state.buttons.map(function(button, index) {
                if(typeof button === "string") {
                    button = {
                        label: button,
                        command: "one"
                    }
                }
                let buttonEl = null;

                return (
                <button
                    key={index}
                    ref={ el => buttonEl = el }
                    className={`label pos-${index + 1}`}
                    onClick={() => { T.runCommand(buttonEl, T.state.app, button.command)} }
                >
                    {button.label}
                </button>);
              })}
            </div>
        )
    }
}

export default MFD;