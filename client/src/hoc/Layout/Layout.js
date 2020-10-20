import React, { PureComponent } from 'react'
import classes from './Layout.css';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems'

class Layout extends PureComponent {
    

    render() {
        return (
            <div >
                <header>
                    <NavigationItems />
                </header>
                <main>
                    {this.props.children}
                </main>
            </div>
    
        )
    }
}

export default Layout