import { h } from 'preact';
import { Router, Link } from 'preact-router';
import Home from './home'
import Page2 from './page2'
import Page3 from './page3'
import style from './style';


const Main = (props) => {

    //show and hide setting dropdown background changed
    function functions() {
        //get items by ids
        const drop = document.getElementById('dropdown')
        const display = window.getComputedStyle(drop).display;

        //add display style to dropdown style
        if (display == 'flex') {
            //if display flex means it's visible make it none (unvisible)
            drop.style.display = 'none';
        } else {
            //else make it flex (visible)
            drop.style.display = 'flex';
        }
    }


    function changeBackground(parameter) {
        //set background url dpends on the parameter
        const url = 'url(../../assets/backgrounds/' + parameter + '.jpg)';

        //get container by id
        var container = document.getElementById('container');

        //change containg bg
        container.style.background = url;
    }


    return (
        <div class={style.container} id='container'>

            {/* page header */}
            <div class={style.title}>
                WeatherSavvy
                <div class={style.changer}>
                    <button onclick={functions}><img class={style.settings} src="../assets/icons/gear-solid.svg" /></button>
                    <div class={style.dropdown} id='dropdown'>
                        <button onClick={() => changeBackground('first')}>Background 1</button>
                        <button onClick={() => changeBackground('second')}>Background 2</button>
                        <button onClick={() => changeBackground('third')}>Background 3</button>
                        <button onClick={() => changeBackground('fourth')}>Background 4</button>
                        <button onClick={() => changeBackground('fifth')}>Background 5</button>
                    </div>
                </div>
            </div>

            <main>
                {/* pages Router container */}
                {/* anyting inside this Router will have a path and can be navigated using Link */}
                <Router>
                    <Home path='' />
                    <Page2 path='/page2' />
                    <Page3 path='/page3' />
                </Router>
            </main>

            {/* buttom navigation bar */}
            <nav class={style.bottom}>
                <Link href='/page2'>
                    <img src="./assets/icons/circle-info-solid.svg" />
                </Link>
                <Link href='/'>
                    <img src="./assets/icons/house-solid.svg" />
                </Link>
                <Link href='/page3'>
                    <img src="./assets/icons/comment-solid.svg" />
                </Link>
            </nav>
        </div >
    )
}

export default Main