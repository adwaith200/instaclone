import React from 'react';
import classes from './NavigationItems.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const NavigationItems=(props)=> {
    return (
        <header>
              <nav className={classes.header}>
                    <h3>Socioholic</h3>
                    <input type='text' placeholder="search" className={classes.search_bar}/>
                    <div className={classes.header_nav}>
                        <a href='/' ><FontAwesomeIcon icon='home' className={classes.icon_styling}/></a>
                        <a href='/' ><FontAwesomeIcon icon='compass' className={classes.icon_styling}/></a>
                        <a href='/' ><FontAwesomeIcon icon='user' className={classes.icon_styling}/></a>
                    </div>
                    <footer className={classes.footer}>
                    <a href='/' ><FontAwesomeIcon icon='search' className={classes.icon_styling}/></a> 
                            <a href='/' ><FontAwesomeIcon icon='home' className={classes.icon_styling}/></a>
                            <a href='/' ><FontAwesomeIcon icon='compass' className={classes.icon_styling}/></a>
                            <a href='/' ><FontAwesomeIcon icon='user' className={classes.icon_styling}/></a> 
                    </footer>
                </nav>

            </header>
       
    )
}

export default NavigationItems;
