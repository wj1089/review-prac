import React from 'react';
import { withRouter } from "react-router-dom";
import Navbar from '../navi/Navbar';
import "./home.css"

const Home = () => {

 

    


    return (
        <>
            <div className="full-screen">
                <div className="screen-layout">

                </div>

                <div  className="screen-main">
                    <div >
                    <Navbar />
                        <header style={{width:"100%",backgroundColor:"lightPink",height:400, border:"1px solid"}}>
                            <div>
                                header Bener
                            </div>
                        </header>



                        <body style={{backgroundColor:"lightYellow", border:"1px solid"}}>
                            <div style={{backgroundColor:"lightYellow", height:400, border:"1px solid",textAlign:"center"}}>
                                Slider
                            </div>
                            <div style={{backgroundColor:"lightYellow", height:400, border:"1px solid",textAlign:"center"}}>
                                Slider
                            </div>
                            <div style={{backgroundColor:"lightYellow", height:400, border:"1px solid",textAlign:"center"}}>
                                Slider
                            </div>
                        </body>

                        


                        <footer style={{backgroundColor:"lightBlue", height:400, border:"1px solid"}}>
                            <div>
                                footer
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Home);

