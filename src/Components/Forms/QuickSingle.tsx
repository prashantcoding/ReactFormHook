import React from 'react';
import { DevTool } from "@hookform/devtools";
import { useForm, useFieldArray } from "react-hook-form";
import { quickSinglesQuestion as dummyQuestion } from './savedQuestion';
import NestedOption from "./NestedOption";
import './QuickSingle.css'; // Import the CSS file

const QuickSingle = () => {
  const { register, control, setValue, getValues } = useForm({
    defaultValues: {
      questions: [{
        question: '',
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

  return (
    <div className="quick-single-container">
      <h1 className="quick-single-header">Quick single Form</h1>
      {
        fields.map((field, index) => (
          <div key={field.id} className="question-container">
            <select className="question-select" {...register(`questions.${index}.question`)}>
              {
                dummyQuestion.map((que) => (
                  <option value={que.question} key={index}>{que.question}</option>
                ))
              }
            </select>
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
