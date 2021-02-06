import React, {useRef, useState} from 'react';
import styles from './SvgRenderer.module.css';
import {
    ChangeParam,
    CustomImage,
    CustomSvgElement,
    CustomText,
    Point,
    SelectionInfo,
    SvgType
} from "../../interface/interface";
import {SvgText} from "../custom-svg-text/SvgText";
import {SvgImageBox} from "../custom-svg-image/SvgImageBox";
import image1 from '../../assets/template_scrapbook_2_1_image.png';
import image2 from '../../assets/template_scrapbook_2_2_image.png';
import {angleBetweenPoints} from "../../util/utils";

const CIRCLE_TAG_NAME = 'circle';

const texts = [
    {
        text: '2020',
        type: SvgType.text,
        x: 136,
        y: 67,
        fontSize: 30,
        elementKey: 'year'
    },
    {
        text: 'Summer',
        type: SvgType.text,
        x: 83,
        y: 120,
        fontSize: 50,
        elementKey: 'summer'
    }
] as CustomText[];

const images = [
    {
        type: SvgType.image,
        x: 139,
        y: 344,
        elementKey: 'image2',
        contextImageDegree: -4,
        width: 240,
        height: 270,
        className: 'background2',
        backgroundImageUrl: image2
    },
    {
        type: SvgType.image,
        x: -17,
        y: 220,
        elementKey: 'image1',
        contextImageDegree: 9,
        width: 240,
        height: 270,
        className: 'background1',
        backgroundImageUrl: image1
    }
] as CustomImage[]

const defaultSelectionInfo = {elementKey: '', bbox: {x: 0, y: 0, width: 0, height: 0, cx: 0, cy: 0}};

export function SvgRenderer() {
    const [elements, setElements] = useState<CustomSvgElement[]>([
        ...texts,
        ...images
    ]);
    const [mouseDownPosition, setMouseDownPosition] = useState<Point>({x: 0, y: 0});
    const [isRotate, setRotateMode] = useState<boolean>(false);
    const [selectionInfo, setSelectionInfo] = useState<SelectionInfo | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    const panElement = (evt: React.MouseEvent, selectionInfo: SelectionInfo) => {
        const {clientX, clientY} = evt;
        const {x: mouseDownedX, y: mouseDownedY} = mouseDownPosition;
        const {x: prevX, y: prevY} = selectionInfo.bbox;
        const movementX = clientX - mouseDownedX;
        const movementY = clientY - mouseDownedY;
        setElements(prev => {
            return prev.map((element, idx) => {
                return element.elementKey === selectionInfo.elementKey ?
                    {...element, x: prevX + movementX, y: prevY + movementY} :
                    element;
            });
        });
    }

    const rotateElement = (evt: React.MouseEvent, selectionInfo: SelectionInfo) => {
        const svg = svgRef.current!;
        const point = svg.createSVGPoint();
        const {clientX, clientY} = evt;
        point.x = clientX;
        point.y = clientY;
        const calculatedPoint = point.matrixTransform(svg.getScreenCTM()!.inverse())
        const {cx, cy} = selectionInfo.bbox;
        const degree = angleBetweenPoints({x: cx, y: cy}, calculatedPoint);
        setElements(prev => {
            return prev.map((element, idx) => {
                return element.elementKey === selectionInfo.elementKey ?
                    {...element, degree} :
                    element;
            });
        });
    }

    const onMouseDown = (evt: React.MouseEvent) => {
        const target = evt.target as HTMLElement;
        const {clientX: x, clientY: y} = evt;
        if (target.tagName === 'svg') {
            setSelectionInfo(null);
        }
        setMouseDownPosition({x, y});
        setRotateMode(target.tagName === CIRCLE_TAG_NAME);
    }

    const onMouseMove = (evt: React.MouseEvent) => {
        const isDragging = evt.buttons === 1 && selectionInfo;
        if (isDragging && selectionInfo) {
            isRotate ? rotateElement(evt, selectionInfo) : panElement(evt, selectionInfo);
        }
    }

    const onChange = ({elementKey, type, ...args}: ChangeParam) => {
        const changes = {...args};
        setElements(prev => {
            return prev.map(element => element.elementKey === elementKey ? {...element, ...changes} : {
                ...element,
                selected: false
            });
        })
    }

    const onSelect = (info: SelectionInfo) => {
        setSelectionInfo(info);
    }

    const getSvgComponents = (elements: CustomSvgElement[]) => {
        return elements.map(({elementKey, type, ...rest}) => {
            return type === SvgType.text ?
                <SvgText
                    {...rest as CustomText}
                    key={elementKey}
                    elementKey={elementKey}
                    onChange={onChange}
                    onSelect={onSelect}
                /> :
                <SvgImageBox {...rest as CustomImage}
                             key={elementKey}
                             elementKey={elementKey}
                             onSelect={onSelect}
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
