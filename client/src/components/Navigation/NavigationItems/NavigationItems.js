import React from 'react';
import classes from './NavigationItems.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom'

const NavigationItems=(props)=> {
    return (
        <header>
              <nav className={classes.header}>
                    <h3>Socioholic</h3>
                    <input type='text' placeholder="search" className={classes.search_bar}/>
                    <div className={classes.header_nav}>
                        <Link to='/' ><FontAwesomeIcon icon='home' className={classes.icon_styling}/></Link>
                        <Link to='/explore' ><FontAwesomeIcon icon='compass' className={classes.icon_styling}/></Link>
                        <Link to='/profile' ><FontAwesomeIcon icon='user' className={classes.icon_styling}/></Link>
                    </div>
                    <footer className={classes.footer}>
                    <a href='/' ><FontAwesomeIcon icon='search' className={classes.icon_styling}/></a> 
                            <Link to='/' ><FontAwesomeIcon icon='home' className={classes.icon_styling}/></Link>
                            <Link to='/explore' ><FontAwesomeIcon icon='compass' className={classes.icon_styling}/></Link>
                            <Link to='/profile' ><FontAwesomeIcon icon='user' className={classes.icon_styling}/></Link>
                    </footer>
                </nav>

            </header>
       
    )
}

export default NavigationItems;
