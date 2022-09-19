export function ViewPortHelper() {
    let elBody = document.querySelector('body')
    let gViewportWidth = window.innerWidth
    elBody.onresize = () => {
        gViewportWidth = window.innerWidth
        renderViewPort()
    }
    
    elBody.onresize()
    function renderViewPort() {
        document.querySelector('.viewport')
            .innerText = `Width: ${gViewportWidth}px`
    }

    return (
        <div className="viewport">
            
        </div>
    )
}


