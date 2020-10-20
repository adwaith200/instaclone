import React, { PureComponent } from 'react'
import './Layout.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Layout extends PureComponent {
    

    render() {
        return (
            <div>
            <header>
                <nav   className='header'>
                    <h3>Socioholic</h3>
                    <input type='text' placeholder="search" className="search_bar"/>
                    <div className="header_nav">
                        <a href='/' ><FontAwesomeIcon icon='home' className="icon_styling"/></a>
                        <a href='/' ><FontAwesomeIcon icon='compass' className="icon_styling"/></a>
                        <a href='/' ><FontAwesomeIcon icon='user' className="icon_styling"/></a>
                    </div>
                    <footer className="footer">
                    <a href='/' ><FontAwesomeIcon icon='search' className="icon_styling"/></a> 
                            <a href='/' ><FontAwesomeIcon icon='home' className="icon_styling"/></a>
                            <a href='/' ><FontAwesomeIcon icon='compass' className="icon_styling"/></a>
                            <a href='/' ><FontAwesomeIcon icon='user' className="icon_styling"/></a> 
                    </footer>
                </nav>
            </header>
            <main>
                {this.props.children}
            </main>
        </div>
    
        )
    }
}

export default Layout