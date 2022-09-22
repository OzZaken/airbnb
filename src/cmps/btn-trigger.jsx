export const BtnTrigger = () => {

    onmousemove = (e) => {
        let btn = document.getElementById("btn");
        btn.onmousemove = function (e) {
          let rect = e.target.getBoundingClientRect();
          let x = e.clientX - rect.left;
          btn.style.setProperty("--btn-linear", x + "px");
        }    }

    return <button
        onmousemove={onmousemove()}
        className="btn-linear">
        reserve
    </button>
}