//used in PostForm component
import React, {useId} from 'react'

function Select({
    options, //active/inactive (array)
    label,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <select
            {...props}
            id={id} // to enable it to be associated with a <label> for accessibility purposes
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {//Each menu option is defined by an <option> element 
                    options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                /* The value attribute specifies the value that will be sent to the server when the 
                        user selects a particular option.When the user selects an option, you can access the 
                        selected value in JavaScript using the value property of the <select> element.
                        The text displayed to the user in the dropdown menu is the content of the
                        <option> element, not the value attribute.
                        */
                }
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
//this is also one of the syntax of 'passing ref' apart from what we used in the input.jsx