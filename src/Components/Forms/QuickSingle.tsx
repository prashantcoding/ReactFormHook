import React, { useEffect } from 'react';
import { DevTool } from "@hookform/devtools";
import { useForm, useFieldArray } from "react-hook-form";
import { quickSinglesQuestion as dummyQuestion } from './savedQuestion';
import NestedOption from "./NestedOption";
import './QuickSingle.css'; // Import the CSS file
let Render = 0;
const QuickSingle = () => {
  
 
  console.log( Render++);

  const { register, control } = useForm({
    defaultValues: {
      questions: [{
        question: 'Select A Question',
        options: [{
          id: 1,
          option: ''
        }]
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: 'questions',
    control: control
  });
  console.log(fields);
  return (
    <div className="quick-single-container">
      <h1 className="quick-single-header">Quick single Form</h1>
      {
        fields.map((field, index) => (
          <div key={field.id} className="question-container">
            <label htmlFor='question'></label>
            <select className="question-select" {...register(`questions.${index}.question`)} >
              {
                dummyQuestion.map((que) => (
                  <option value={que.question} >{que.question}</option>
                ))
              }
            </select>
            {
              field.question == 'custom' ? <div>
                <label htmlFor='customQuestion'><h5>Enter your Custom Question Here:</h5></label>
                <input placeholder='enter Your question' {...register(`questions.${index}.question`)} className='option-input'></input> 
              </div>: ''
            }
            <NestedOption nestIndex={index} {...{ control, register }} />

            <button className="remove-question-button" onClick={() => { remove(index) }}>Remove Question</button>

          </div>

        ))
      }

      <br />
      {
        fields.length < 3 && (
          <button className="add-question-button" type="button" onClick={() => {
            append({
              question: '',
              options: [
                {
                  id: 1,
                  option: ''
                }
              ]
            })
          }}>Add Question</button>
        )
      }

      <DevTool control={control} />
    </div>
  );
};

export default QuickSingle;
