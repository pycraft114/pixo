export enum SvgType {
    text = 'text',
    image = 'image'
}

export enum ChangeType {
    select = 'select'
}

export interface Point {
    x: number,
    y: number
}

export interface Bbox {
    x: number,
    y: number,
    width: number,
    height: number,
    cx: number,
    cy: number
}

export interface ChangeParam {
    [key: string]: any;

    key: string;
}

export interface CustomSvgElement {
    x: number;
    y: number;
    degree: number;
    type: SvgType;
    elementKey: string;
    index: number;
    selected: boolean;
    onChange: (param: ChangeParam) => void;
}


export interface CustomText extends CustomSvgElement {
    color?: string;
    text: string;
    fontSize?: number;
    letterSpacing?: number;
    alignment?: string;
}

export interface CustomImage extends CustomSvgElement {
    width: number;
    height: number;
    backgroundImageUrl: string;
    // 임시방편
    className: string;
    // background image 가 이미 tilting 되어있어서 workaround
    contextImageDegree: number;
}
