import { useEffect, useRef, useState } from "react";

interface props {
    points: [number, number][],
    setPoints: React.Dispatch<React.SetStateAction<[number, number][]>>
};

const UserCanvas = ({ points, setPoints }: props) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [origin, setOrigin] = useState<[number, number] | null>(null);
    const [currPoint, setCurrPoint] = useState<[number, number] | null>(null);

    const resetOrigin = () => {
        const canvas = canvasRef.current;

        if (origin === null && canvas) {
            const canvasRect = canvas.getBoundingClientRect();
            setOrigin([canvasRect.left + canvasRect.width / 2, canvasRect.top + canvasRect.height / 2]);
        }
    }

    useEffect(() => {
        resetOrigin();
        window.addEventListener("resize", resetOrigin);
        window.addEventListener("scroll", resetOrigin);

        return () => {
            window.removeEventListener("resize", resetOrigin);
            window.removeEventListener("scroll", resetOrigin);
        };
    }, [])

    useEffect(() => {
        clearCanvas();
        for (const point of points) {
            drawPoint(point);
        }
        if (currPoint) drawPoint(currPoint);
    }, [points, currPoint]);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawPoint = (point: [number, number]) => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context) return;

        context.beginPath();
        context.fillStyle = context.strokeStyle = "rgba(255, 0, 0, 0.6)";
        context.arc(point[0] * 50 + canvas.width / 2, -point[1] * 50 + canvas.height / 2, 10, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();
        context.closePath();
    };

    const trackPoint = ({ clientX, clientY } : React.MouseEvent<HTMLCanvasElement>) => {
        if (origin) {
            const x = (clientX - origin[0]) * 2;
            const y = -(clientY - origin[1]) * 2;

            setCurrPoint([x / 50, y / 50]);
        }
    };

    const setPoint = () => {
        if (currPoint) 
            setPoints((points: [number, number][]): [number, number][] => [...points, currPoint]);
    };

    return (
        <canvas 
            className="cursor-none absolute h-[500px] w-[500px]"
            height="1000"
            width="1000"
            ref={canvasRef}

            onClick={setPoint}
            onMouseMove={trackPoint}
            onMouseLeave={() => setCurrPoint(null)}
        />
    );
};

export default UserCanvas;