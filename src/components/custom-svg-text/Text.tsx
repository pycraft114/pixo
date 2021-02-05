import {CustomText} from "../../interface/interface";
import React, {useEffect, useRef, useState} from 'react';

const getTextElement = (texts: string[]) => {
    return texts.map((text, idx) => {
        return (
            // <foreignObject x="10" y="10" width="100" height="150" key={idx}>
            //     <input value={text}></input>
            // </foreignObject>
            <tspan key={idx}>{text}</tspan>
        )
    });
}

const CIRCLE_BUFFER = 5;

export function Text(props: CustomText) {
    const {onSelect, index, degree = 0, x = 0, y = 0} = props;
    const textTagRef = useRef<SVGTextElement>(null);
    const [bbox, setBbox] = useState<any>(null);

    useEffect(() => {
        setBbox(textTagRef.current!.getBBox());
    }, [textTagRef]);

    const onMouseDown = (evt: React.MouseEvent) => {
        onSelect(index);
    }

    const selectedView = () => {
        if (bbox) {
            const {width} = bbox;
            return (
                <circle r="4"
                        transform={`translate(${width + CIRCLE_BUFFER} ${CIRCLE_BUFFER})`}
                        strokeWidth={2}
                        fill="#ff8b3d"
                        stroke="#ffffff"/>
            )
        }
    }

    const getCenter = () => {
        if (!bbox) {
            return {
                x: 0,
                y: 0
            }
        } else {
            const {x,y,width, height} = bbox;
            return {
                x: x + width / 2,
                y: y + height / 2
            };
        }
    }
    const {texts} = props;

    return (
        <g transform={`translate(${x} ${y}) rotate(${degree} ${getCenter().x} 0)`}
           onMouseDown={onMouseDown}>
            <text ref={textTagRef}>
                {getTextElement(texts)}
            </text>
            {selectedView()}
        </g>
    )
}
