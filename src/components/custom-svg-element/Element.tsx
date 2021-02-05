import {CustomSvgElement} from "../../interface/interface";
import React, {useRef, useState} from 'react';

interface CustomElementParam extends CustomSvgElement {
    children: any;
}

const CIRCLE_BUFFER = 5;

function getDegree(x: number, y: number) {
    return Math.atan2(y, x) * 180 / Math.PI;
}

export function CustomElement(props: CustomElementParam) {
    const [position, setPosition] = useState<{ x: number, y: number }>({x: props.x, y: props.y});
    const [mouseDownPosition, setMouseDownPosition] = useState({x: 0, y: 0});
    const [isRotate, setRotateMode] = useState<boolean>(false);
    const {selected, onDrag, onSelect, index, degree = 0} = props;
    const gTagRef = useRef<SVGGElement>(null);

    const onMouseDown = (evt: React.MouseEvent) => {
        const target = evt.target as HTMLElement;
        const {clientX: x, clientY: y} = evt;
        setRotateMode(target.tagName === 'circle');
        onSelect(index);
        setMouseDownPosition({x, y});
    }

    const onMouseMove = (evt: React.MouseEvent) => {
        const isDragging = evt.buttons === 1 && selected;
        if (isDragging && isRotate) {
            const {x: mouseDownedX, y: mouseDownedY} = mouseDownPosition;
            const movementX = evt.clientX - mouseDownedX;
            const movementY = evt.clientY - mouseDownedY;
            console.log('movement', movementX, movementY);
        } else if(isDragging && !isRotate) {
            const {x: mouseDownedX, y: mouseDownedY} = mouseDownPosition;
            const {x: prevX, y: prevY} = props;
            const movementX = evt.clientX - mouseDownedX;
            const movementY = evt.clientY - mouseDownedY;
            const newX = prevX + movementX;
            const newY = prevY + movementY;
            setPosition(() => ({x: newX, y: newY}));
        }
    }

    const onMouseUp = () => {
        const {x, y} = position;
        onDrag(index, x, y);
    }

    const selectedView = (selected: boolean) => {
        if (selected && gTagRef.current) {
            const {width} = gTagRef.current!.getBBox();
            return (
                <circle r="4"
                        transform={`translate(${width + CIRCLE_BUFFER} ${CIRCLE_BUFFER})`}
                        strokeWidth={2}
                        fill="#ff8b3d"
                        stroke="#ffffff"/>
            )
        }
    }

    return (
        <g transform={`translate(${position.x} ${position.y}) rotate(${degree})`}
           onMouseMove={onMouseMove}
           onMouseDown={onMouseDown}
           onMouseUp={onMouseUp}>
            <g ref={gTagRef}>
                {props.children}
            </g>
            {selectedView(selected)}
        </g>
    )
}
