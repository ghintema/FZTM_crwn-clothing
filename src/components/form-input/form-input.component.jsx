import './form-input.styles.scss';

function FormInput({label, ...otherProps}) {
    
    return ( 
        <div className='label-input-container'>
            <input className='form-input' {...otherProps} /> 
            {/*The <input/> need be above the <label> in order for the css to work properly*/}
            {label && (
                <label 
                className={`${otherProps.value.length ? 'shrink' : '' } form-input-label`}>
                        {label}
                </label>
            )}
        </div>
     );
}

export default FormInput;