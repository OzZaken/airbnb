import { useFormRegister } from '../hooks/useFormRegister'
import { useSelector } from 'react-redux'

export const UserFilter = (props) => {
    const { user, users, filterBy } = useSelector((state) => state.userModule)
    console.log(`🚀 ~ filterBy:`, filterBy)
    console.log(`🚀 ~ users:`, users)
    console.log(`🚀 ~ user:`, user)


    const [register] = useFormRegister({
        model: '',
        type: '',
        minScore: '',
        maxScore: '',
        date: new Date(),
    }, props.onChangeFilter)

    const classObj = { className: 'user-filter' }
    return (
        <form {...classObj} >

            <div>
                <label htmlFor="model">Model</label>
                <input {...register('model', 'text')} />
            </div>

            <div>
                <label htmlFor="type">Type</label>
                <input {...register('type', 'text')} />
            </div>

            <div>
                <label htmlFor="minScore">minScore</label>
                <input {...register('minScore', 'number')} />
            </div>

            <div>
                <label htmlFor="maxScore">maxScore</label>
                <input {...register('maxScore', 'number')} />
            </div>

            <div>
                <label htmlFor="date">maxScore</label>
                <input {...register('date', 'date')} />
            </div>
        </form>
    )
}
