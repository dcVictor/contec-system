import "../../styles/header.css"

function Header() {
    return(

        <header>
            <div class="logo-wrapper">
                <div class="logo-square"></div>
                <div class="logo-text">CONTEC</div>
            </div>
            <div class="user-info">
                <div class="user-name" id="userName"></div>
                <div class="user-group" id="userGroup"></div>
            </div>
        </header>


    )}
    export default Header;