import { useEffect, useRef } from "react";

const GridCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        clearCanvas(canvas);

        drawGrid(canvas, {
            thickness: 1,
            n: 20,
            color: "lightgray"
        });
        
        drawAxes(canvas, {
            thickness: 3,
            color: "gray"
        });
    }, [])

    const clearCanvas = (canvas: HTMLCanvasElement) => {
        const context = canvas.getContext("2d");
        if (!context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    interface drawGridOptions {
        thickness: number,
        n: number,
        color: string
    };

    const drawGrid = (canvas: HTMLCanvasElement, options: drawGridOptions) => {
        const context = canvas.getContext("2d");
        if (!context) return;

        const { thickness, n, color } = options;
        const dX = canvas.width / n;

        context.beginPath();

        for (let x = dX; x < canvas.width - 1; x += dX) {
            context.moveTo(thickness + x, 0);
            context.lineTo(thickness + x, canvas.height);
        }

        const dY = canvas.height / n;

        for (let y = dY; y < canvas.height - 1; y += dY) {
            context.moveTo(0, thickness + y);
            context.lineTo(canvas.width, thickness + y);
        }

        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();

        context.closePath();
    };

    interface drawAxesOptions {
        thickness: number,
        color: string
    }

    const drawAxes = (canvas: HTMLCanvasElement, options: drawAxesOptions) => {
        const context = canvas.getContext("2d");
        if (!context) return;

        const { thickness, color } = options;

        context.beginPath();

        context.moveTo(canvas.width / 2, 0);
        context.lineTo(canvas.width / 2, canvas.height);

        context.moveTo(0, canvas.height / 2);
        context.lineTo(canvas.width, canvas.height / 2);

        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();

        context.closePath();
    };

    return (
        <canvas 
            className="absolute h-[500px] w-[500px] top-0 left-0"
            height="1000"
            width="1000"
            ref={canvasRef}
        />
    );
};

export default GridCanvas;