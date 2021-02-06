import React, {useRef, useState} from 'react';
import styles from './SvgRenderer.module.css';
import {ChangeParam, ChangeType, CustomImage, CustomText, Point, SvgType} from "../../interface/interface";
import {Text} from "../custom-svg-text/Text";
import {CustomImageComponent} from "../custom-svg-image/Image";
import {getDegree} from "../../util/utils";
import {CustomElement} from "../custom-svg-element/Element";

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
        x: 137,
        y: 160,
        elementKey: 'image2',
        degree: -4,
        width: 172,
        height: 216,
        className: 'background2'
    },
    {
        type: SvgType.image,
        x: 149,
        y: 90,
        elementKey: 'image1',
        degree: 9,
        width: 172,
        height: 216,
        className: 'background1'
    }
] as CustomImage[]

export function SvgRenderer() {
    const [textElements, setTextElements] = useState<CustomText[]>([
        ...texts,
    ]);
    const [mouseDownPosition, setMouseDownPosition] = useState<Point>({x: 0, y: 0});
    const [isRotate, setRotateMode] = useState<boolean>(false);
    const [selectedElement, setSelectedElement] = useState<CustomText | null | undefined>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const panElement = (evt: React.MouseEvent) => {
        const {clientX, clientY} = evt;
        const {x: mouseDownedX, y: mouseDownedY} = mouseDownPosition;
        const {x: prevX, y: prevY} = selectedElement!;
        const movementX = clientX - mouseDownedX;
        const movementY = clientY - mouseDownedY;
        setTextElements(prev => {
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
        setTextElements(prev => {
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
        const _customText = {...args} as any as CustomText;
        setTextElements(prev => {
            const _textElements = prev.map(text => text.elementKey === key ? {...text, ..._customText} : {
                ...text,
                selected: false
            });
            if (type === ChangeType.select) {
                setSelectedElement(_textElements.find(({selected}) => selected));
            }
            return _textElements;
        })
    }

    const getTextComponents = (elements: CustomText[]) => {
        return elements.map(({elementKey, ...rest}) => {
            return <Text
                {...rest as CustomText}
                key={elementKey}
                elementKey={elementKey}
                onChange={onChange}/>
        })
    }

    const getImageComponents = (elements: CustomImage[]) => {
        return elements.map(({...rest}) => {
            return <CustomImageComponent {...rest as CustomImage} key={rest.elementKey}/>
        })
    }

    return (
        <div className="svg-renderer-component">
            <svg className={styles.svgContainer}
                 onMouseDown={onMouseDown}
                 onMouseMove={onMouseMove}
                 ref={svgRef}
            >
                <foreignObject className={styles.foreignObject}>
                    {getImageComponents(images)}
                </foreignObject>
                {getTextComponents(textElements)}
            </svg>
        </div>
    );
}
