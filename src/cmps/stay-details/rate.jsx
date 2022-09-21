import AppIcon from '../icon'
export const StayRate = ({ reviews }) => {
    if (!reviews) return 
    return <div className="stay-rate">
        <span><AppIcon iconKey='star' /></span>
        <span>4.75</span>   {/* <StayAvg/> */}
        <button className="underline reviews"> 14 reviews</button>
    </div>
}