import {CustomText} from "../../interface/interface";
import React from 'react';

function getTextElement(texts: string[]) {
    return texts.map((text, idx) => {
        return (
            // <foreignObject x="10" y="10" width="100" height="150" key={idx}>
            //     <input value={text}></input>
            // </foreignObject>
            <tspan key={idx}>{text}</tspan>
        )
    });
}

export function Text(props: CustomText) {
    const {texts} = props;

    return (
        <text onKeyDown={e => console.log(e)}>
            {getTextElement(texts)}
        </text>
    )
}
