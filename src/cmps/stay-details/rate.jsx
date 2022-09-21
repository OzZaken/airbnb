import AppIcon from '../icon'
export const StayRate = ({ stay }) => {
    return <div className="stay-rate">
        <span><AppIcon iconKey='star' /></span>
        <span>4.75</span>   {/* <StayAvg/> */}
        <button className="underline reviews"> 14 reviews</button>
    </div>
}