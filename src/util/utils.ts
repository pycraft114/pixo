import {Point} from "../interface/interface";

export const uploadFile = (evt: any): Promise<string> => {
    return new Promise((resolve) => {
        const input = evt.target;

        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result as string);
        };
        const file = input.files[0];
        file ? fileReader.readAsDataURL(input.files[0]) : resolve('');
    });
};

export const angleBetweenPoints = (p1: Point, p2: Point): number => {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI + 90;
}
