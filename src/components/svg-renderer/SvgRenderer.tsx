import React, {useRef, useState} from 'react';
import styles from './SvgRenderer.module.css';
import {
    ChangeParam,
    ChangeType,
    CustomImage,
    CustomSvgElement,
    CustomText,
    Point,
    SvgType
} from "../../interface/interface";
import {SvgText} from "../custom-svg-text/SvgText";
import {SvgImageBox} from "../custom-svg-image/SvgImageBox";
import {getDegree} from "../../util/utils";

const CIRCLE_TAG_NAME = 'circle';

const texts = [
    {
        text: '2020',
        type: SvgType.text,
        x: 149,
        y: 90,
        elementKey: 'year'
    },
    {
        text: 'Summer',
        type: SvgType.text,
        x: 137,
        y: 160,
        elementKey: 'summer'
    }
] as CustomText[];

const images = [
    {
        type: SvgType.image,
        x: 139,
        y: 344,
        elementKey: 'image2',
        degree: -4,
        width: 172,
        height: 216,
        className: 'background2'
    },
    {
        type: SvgType.image,
        x: -17,
        y: 220,
        elementKey: 'image1',
        degree: 9,
        width: 172,
        height: 216,
        className: 'background1'
    }
] as CustomImage[]

export function SvgRenderer() {
    const [elements, setElements] = useState<CustomSvgElement[]>([
        ...texts,
        ...images
    ]);
    const [mouseDownPosition, setMouseDownPosition] = useState<Point>({x: 0, y: 0});
    const [isRotate, setRotateMode] = useState<boolean>(false);
    const [selectedElement, setSelectedElement] = useState<CustomSvgElement | null | undefined>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const panElement = (evt: React.MouseEvent) => {
        const {clientX, clientY} = evt;
        const {x: mouseDownedX, y: mouseDownedY} = mouseDownPosition;
        const {x: prevX, y: prevY} = selectedElement!;
        const movementX = clientX - mouseDownedX;
        const movementY = clientY - mouseDownedY;
        setElements(prev => {
            return prev.map((element, idx) => {
                return element.elementKey === selectedElement!.elementKey ?
                    {...element, x: prevX + movementX, y: prevY + movementY} :
                    element;
            });
        });
    }

    const rotateElement = (evt: React.MouseEvent) => {
        const {x: mouseDownedX, y: mouseDownedY} = mouseDownPosition;
        const movementX = evt.clientX - mouseDownedX;
        const movementY = evt.clientY - mouseDownedY;
        // Svg 의 (0,0) Coordinate 은 좌측상단이기 때문
        const degree = getDegree(movementX, movementY);
        setElements(prev => {
            return prev.map((element, idx) => {
                return element.elementKey === selectedElement!.elementKey ?
                    {...element, degree: degree - 90} :
                    element;
            });
        });
    }

    const onMouseDown = (evt: React.MouseEvent) => {
        const target = evt.target as HTMLElement;
        const {clientX: x, clientY: y} = evt;
        setMouseDownPosition({x, y});
        setRotateMode(target.tagName === CIRCLE_TAG_NAME);
    }

    const onMouseMove = (evt: React.MouseEvent) => {
        const isDragging = evt.buttons === 1 && selectedElement;
        if (isDragging) {
            isRotate ? rotateElement(evt) : panElement(evt);
        }
    }

    const onChange = ({key, type, ...args}: ChangeParam) => {
        const changes = {...args};
        setElements(prev => {
            const _elements = prev.map(element => element.elementKey === key ? {...element, ...changes} : {
                ...element,
                selected: false
            });
            if (type === ChangeType.select) {
                setSelectedElement(_elements.find(({selected}) => selected));
            }
            console.log(_elements);
            return _elements;
        })
    }

    const getSvgComponents = (elements: CustomSvgElement[]) => {
        return elements.map(({elementKey, type, ...rest}) => {
            return type === SvgType.text ?
                <SvgText
                    {...rest as CustomText}
                    key={elementKey}
                    elementKey={elementKey}
                    onChange={onChange}
                /> :
                <SvgImageBox {...rest as CustomImage}
                             key={elementKey}
                             elementKey={elementKey}
                             onChange={onChange}
                />

        })
    }

    return (
        <div className="svg-renderer-component">
            <svg className={styles.svgContainer}
                 onMouseDown={onMouseDown}
                 onMouseMove={onMouseMove}
                 ref={svgRef}
            >
                {getSvgComponents(elements)}
            </svg>
        </div>
    );
}
