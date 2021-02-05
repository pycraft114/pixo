export enum SvgType{
    text = 'text',
    image = 'image'
}

export enum ChangeType{
    select = 'select'
}

export interface Point {
    x: number,
    y: number
}

export interface ChangeParam{
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


export interface CustomText extends CustomSvgElement{
    color?: string;
    text: string;
    fontSize?: number;
    letterSpacing?: number;
    alignment?: string;
}

export interface CustomImage extends CustomSvgElement{
    width: number;
    height: number;
    // 임시방편
    className: string;
}
