import { useFormRegister } from '../../hooks/useFormRegister'

export const UserFilter = (props) => {

    const [register] = useFormRegister({
        model: '',
        type: '',
        minBatteryStatus: '',
        maxBatteryStatus: '',
        date: new Date(),
    }, props.onChangeFilter)

    const classObj = { className: 'user-filter' }
    return (
        <form {...classObj} >
          
            <section>
                <label htmlFor="model">Model</label>
                <input {...register('model', 'text')} />
            </section>

            <section>
                <label htmlFor="type">Type</label>
                <input {...register('type', 'text')} />
            </section>

            <section>
                <label htmlFor="minBatteryStatus">minBatteryStatus</label>
                <input {...register('minBatteryStatus', 'number')} />
            </section>

            <section>
                <label htmlFor="maxBatteryStatus">maxBatteryStatus</label>
                <input {...register('maxBatteryStatus', 'number')} />
            </section>
            
            <section>
                <label htmlFor="date">maxBatteryStatus</label>
                <input {...register('date', 'date')} />
            </section>
        </form>
    )
}
