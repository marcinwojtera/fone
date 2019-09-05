import React from 'react';
import {Header} from 'semantic-ui-react'

export const WikiData = ({data}) => {
  const sections = data.sections ?  data.sections.filter(x=> x.depth > 0 && !x.templates && !x.references && x.paragraphs) : [];

  return (
    <div>
      {data && sections.map(x => {
        return (<div>
          <h4>{x.title}</h4>

          {x.paragraphs && x.paragraphs.map((para, index) => {
            return (
              <div key={{index}}>{para.sentences && para.sentences.map((fin, i) => {
                return (<span key={i}>{fin.text.length > 5 && fin.text}</span>)
              })}</div>
            )
          })}
          <hr />
        </div>)
      })}
    </div>
  )

  // return data
};