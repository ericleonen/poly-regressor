import { useEffect, useRef } from "react";

interface props {
    coefficients: number[],
    pointsExist: boolean
};

const GraphCanvas = ({ coefficients, pointsExist }: props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        clearCanvas();

        if (!pointsExist) return;

        drawPredPolynomial(computePredPolynomial({
            minX: -10,
            maxX: 10,
            numIntervals: 100
        }));
    }, [coefficients, pointsExist]);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const computePred = (x: number) => {
        let pred = 0;
        let xi = 1;

        for (let coefficient of coefficients) {
            pred += coefficient * xi;
            xi *= x;
        }

        return pred;
    };

    interface computePredPolynomialOptions {
        minX: number,
        maxX: number,
        numIntervals: number
    };

    const computePredPolynomial = (options: computePredPolynomialOptions) => {
        const points: [number, number][] = [];
        const { maxX, minX, numIntervals } = options;

        const dX = (maxX - minX) / numIntervals;

        for (let x = minX; x <= maxX + dX; x += dX) {
            points.push([x, computePred(x)]);
        }

        return points;
    };

    const drawPredPolynomial = (points: [number, number][]) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (!canvas || !context || !points.length) return;

        context.beginPath();
        for (let p = 1; p < points.length; p++) {
            context.moveTo(points[p - 1][0] * 50 + canvas.width / 2, -points[p - 1][1] * 50 + canvas.height / 2);
            context.lineTo(points[p][0] * 50 + canvas.width / 2, -points[p][1] * 50 + canvas.height / 2);
        }

        context.strokeStyle = "rgb(59, 130, 246)";
        context.lineWidth = 5;
        context.lineCap = "round";
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

export default GraphCanvas;