export const BtnTrigger = (ev) => {
// todo: bug onMouseOver 
    return <button className="btn-linear"
        onMouseOver={(ev) => {
            let rect = ev.target.getBoundingClientRect()
            let x = ev.clientX - rect.left;
            ev.target.style.setProperty("--btn-linear", x + "px")
        }}>
        reserve
    </button>
}
// https://yannik-sturm.medium.com/how-to-create-stunning-gradient-buttons-with-mouse-cursor-tracking-d4cc4758a9f7