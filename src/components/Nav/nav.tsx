const Nav = () =>{
    return(
        <>  
            <div className="flex justify-between  bg-custom-bg">
                <a href="#landing-page" className="pl-2 m-3">MJF</a>
                <div id="r" className="flex justify-end content-evenly m-3">
                    <a href="#about_me" className="pr-5">About Me</a>
                    <a href="#view_work" className="pr-5">View My Work</a>
                    <a href="#contact_me" className="pr-5">Contact Me</a>
                </div>
            </div>
        </>
    )
}

export default Nav