import React from 'react';
import style from './square.module.css'

class Square extends React.Component {
    render(i){
        return (
            <button className={style.square} onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        )
    }
}
export default Square