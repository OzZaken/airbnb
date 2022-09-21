export const BtnLinearGradient = () => {
    onmousemove =  (ev)=> {
        let rect = ev.target.getBoundingClientRect()
        let x = ev.clientX - rect.left;
        btn.style.setProperty("--x", x + "px")
    }
    return <button id="btn">Click here</button>
}