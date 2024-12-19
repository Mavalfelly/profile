const Nav = () =>{
    return(
        <>  
            <div className="flex justify-between m-3">
                <a href="#localhost:5173" className="pl-2">MJF</a>
                <div id="r" className="flex justify-end content-evenly">
                    <a href="#about_me" className="pr-5">About Me</a>
                    <a href="#view_work" className="pr-5">View My Work</a>
                    <a href="#contact_me" className="pr-5">Contact Me</a>
                </div>
            </div>
        </>
    )
}

export default Nav