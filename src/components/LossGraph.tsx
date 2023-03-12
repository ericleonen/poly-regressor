import { useEffect, useRef } from "react";

interface props {
    losses: number[]
};

const LossGraph = ({ losses }: props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    interface drawLossesOptions {
        height: number,
        width: number,
        color: string,
        lineWidth: number,
        scale: number
    };

    const drawLosses = (options: drawLossesOptions) => {
        let { height, width, color, lineWidth, scale } = options;

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        clearCanvas();

        if (!canvas || !context || !losses.length) return;

        const maxLoss = Math.max(...losses);
        const epochs = losses.length;

        context.beginPath();

        height -= lineWidth;
        width -= lineWidth;

        for (let epoch = 0; epoch < epochs; epoch++) {
            const moveToX = (width / epochs) * (epoch - 1) + lineWidth / 2;
            const moveToY = height - (height / maxLoss * losses[epoch - 1]) + lineWidth / 2;

            context.moveTo(moveToX * scale, moveToY * scale);

            const lineToX = (width / epochs) * epoch + lineWidth / 2;
            const lineToY = height - (height / maxLoss * losses[epoch]) + lineWidth / 2;

            context.lineTo(lineToX * scale, lineToY * scale);
        }

        context.strokeStyle = color;
        context.lineWidth = lineWidth * scale;
        context.lineCap = "round";
        context.stroke();
        context.closePath();
    };

    useEffect(() => {
        drawLosses({
            height: 200,
            width: 400,
            color: "red",
            lineWidth: 3,
            scale: 2
        });
    }, [losses]);

    return (
        <div className="flex items-center justify-center flex-col w-[500px] bg-gray-300 mt-4 border-8 rounded-xl shadow-sm border-gray-300 box-content pt-3 pb-[50px]">
            <p className="w-full text-center font-medium">m.s.e vs. epochs</p>
            <div className="relative">
                <p className="absolute rotate-[-90deg] left-[-2.25rem] top-1/2 translate-y-[-50%]">m.s.e</p>
                <div className="relative">
                    <canvas 
                        width="800px"
                        height="400px"
                        className="mt-3 bg-white h-[200px] w-[400px]"
                        ref={canvasRef}
                    />
                    <div className="text-red-500 shadow-sm top-2 right-2 absolute bg-gray-300/70 p-2 rounded-xl font-serif">
                        loss: {losses.length ? Math.round(losses[losses.length - 1] * 1000) / 1000 : 0}
                    </div>
                </div>
                <p className="absolute left-1/2 translate-x-[-50%] bottom-[-1.75rem]">epoch</p>
            </div>
        </div>
    );
};

export default LossGraph;