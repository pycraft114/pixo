export enum SvgType{
    text = 'text',
    image = 'image'
}

export interface Point {
    x: number,
    y: number
}

export interface CustomSvgElement {
    x: number;
    y: number;
    degree: number;
    type: SvgType;
    key: string;
    index: number;
    selected: boolean;
    onDrag: (index: number, x: number, y: number) => void;
    onSelect: (index: number) => void;
}

export interface CustomText extends CustomSvgElement{
    color?: string;
    texts: string[];
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
