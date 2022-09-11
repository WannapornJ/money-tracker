const StyledInput = (props) => {
    return (
        <div className='flex flex-col items-start w-full'>
            <label className='p-0 text-sm text-gray-200'>{props.title}</label>
            <input
                ref={props.refs}
                className={'w-full h-11 rounded bg-offWhite border border-gray-200 px-3'}
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                onChange={(e) => props.change(e)}
            />
        </div>
    )
}

export default StyledInput