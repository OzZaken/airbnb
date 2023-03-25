import { useFormRegister } from '../../hooks/useFormRegister'
import { useSelector } from 'react-redux'

/*  form with various input fields set user filter state */
export const UserFilter = ({ onChangeFilter }) => {
    /*  access the current state of the userModule */
    const { user, users, filterBy } = useSelector((state) => state.userModule)
    console.log({ filterBy }, { users }, { user })

    /* handle changes in input fields (initialState, callBack). */
    const [register] = useFormRegister({
        model: '',
        type: '',
        minScore: '',
        maxScore: '',
        date: new Date(),
    }, onChangeFilter)


    const formProps = { className: 'user-filter' }

    return <form {...formProps} >
        <div>
            {/* When a user clicks on the label, it will trigger*/}
            <label htmlFor="model">Model</label>
            {/* Each input element has a name, type and binds onChange handle from register*/}
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
}