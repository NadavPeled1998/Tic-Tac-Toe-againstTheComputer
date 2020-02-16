import React from 'react'

class Choose extends React.Component{
  render(){
    return(
      <div>
        {this.props.game && <p>Start play or choose a player</p>}
      </div>
    );
  }
}
export default Choose