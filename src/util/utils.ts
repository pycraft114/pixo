import {Point} from "../interface/interface";

export const uploadFile = (evt: any): Promise<string> => {
    return new Promise((resolve) => {
        const input = evt.target;

        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result as string);
        };
        fileReader.readAsDataURL(input.files[0]);
    });
};

export const CIRCLE_BUFFER = 5;

export const DEGREE = 180 / Math.PI;

export const getDegree = (x: number, y: number) => {
    return Math.atan2(y, x) * DEGREE;
}

export const angleBetweenPoints = (p1: Point, p2: Point) => {
    const isSamePosition = p1.x === p2.x && p1.y === p2.y;
    const angle = isSamePosition ? Math.PI / 2 : Math.atan2(p2.y - p1.y, p2.x - p1.x);
    return (angle * DEGREE) + -90;
}
