import React, { Component } from 'react'
import Aside from './all/Aside'
import NavBar from './all/NavBar'
import Footer from './all/Footer';

class Home extends Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Aside/>
                <Footer/>
            </div>
        )
    }
}

export default Home
