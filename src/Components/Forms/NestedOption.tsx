import React from 'react';
import { useFieldArray } from 'react-hook-form'
import './QuickSingle.css'
// Define the props interface
interface NestedOptionProps {
    nestIndex: number;
    control: any; // Replace with the appropriate type if needed
    register: any;
    
}

const NestedOption: React.FC<NestedOptionProps> = ({ nestIndex, control, register}) => {
    // You can access and use props.nestIndex, props.control, and props.register here
    const { fields, append, remove } = useFieldArray({
        name: `questions.${nestIndex}.options`,
        control: control
    });

    return (
        <div className="nested-option-container">

            
            {fields.map((field, index) => (
                <div key={field.id} className="option-row">
                    <input
                        className="option-input"
                        {...register(`questions.${nestIndex}.options.${index}.option`,{
                            required:'option is required'
                        })}
                        placeholder='Enter Your Option Value'
                    />
                  { fields.length>2&&  <button className="remove-option-button" onClick={() => { remove(index) }}>Remove</button>}
                </div>
            ))}

            {fields.length < 4 && (
                <button className="add-option-button" type="button" onClick={() => {  append({ id: fields.length + 1, option: '' }) }}>Add Options</button>
            )}
        </div>
    );
};

export default NestedOption;
