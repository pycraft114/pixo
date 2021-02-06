import React, {ReactNode, useState} from 'react';

export const FileContext = React.createContext({
    setSvgRef: (ref: any) => {
    },
    downloadImage: () => {
    },
});

export function FileProvider(props: Readonly<{ children?: ReactNode }>) {
    const [svgRef, _setSvgRef] = useState();
    const setSvgRef = (ref: any) => {
        _setSvgRef(ref);
    }
    const downloadImage = (imageType?: string, width?: number, height?: number) => {
        if (svgRef) {
            //@ts-ignore
            const svg = svgRef!.current as SVGElement;
            const canvas = document.createElement('canvas') as HTMLCanvasElement;
            canvas.width = 300;
            canvas.height = 300;
            const context = canvas.getContext('2d') as CanvasRenderingContext2D;
            const data = new XMLSerializer().serializeToString(svg);

            const image = new Image();
            // cors error 방지
            image.crossOrigin = '*'
            const svgBlob = new Blob([data], {type: "image/svg+xml;charset=utf-8"});
            const url = URL.createObjectURL(svgBlob);

            console.log('blob', svg);
            image.onload = () => {
                context.drawImage(image, 0, 0, 1000, 1000);
                const anchorTag = document.createElement("a");
                anchorTag.download = "image";
                // anchorTag.href = canvas.toDataURL("image/png");
                anchorTag.href = 'data:image/svg+xml;utf8,' + data;
                anchorTag.click();
                URL.revokeObjectURL(url);

            };

            image.src = url;
        }
    }
    return (
        <FileContext.Provider value={{
            setSvgRef,
            downloadImage,
        }}>{props.children}</FileContext.Provider>
    );
}
