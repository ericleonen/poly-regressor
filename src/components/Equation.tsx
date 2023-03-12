interface props {
    coefficients: number[],
    pointsExist: boolean
};

const Equation = ({ coefficients, pointsExist }: props) => {
    return pointsExist ? (
        <div className="pointer-events-none shadow-sm bottom-2 right-2 absolute bg-gray-300/70 p-2 rounded-xl">
            {
                coefficients.some(coefficient => isNaN(coefficient) || Math.abs(coefficient) > 10000 || Math.abs(coefficient) < 0.0001) ?
                    <div className="font-serif flex text-red-500">Error: Overflow</div> :
                    <div className="font-serif flex text-blue-500">
                    <span className="pr-1">y =</span>
                    { 
                        coefficients.map((coefficient, i) => {
                            return (
                                <p className="flex" key={`equation_${i}`}>
                                    {
                                        i < coefficients.length - 1 ? <span className="px-1">{
                                            coefficient >= 0 ? "+" : "-"
                                        }</span> : ""
                                    }
                                    {Math.round(Math.abs(coefficient) * 1000) / 1000}
                                    {
                                        i > 1 ? <span>x<sup>{i}</sup></span> :
                                        i == 1 ? <span>x</span> : ""
                                    } 
                                </p>
                            )
                        }).reverse()
                    }
            </div>
            }
        </div>
    ): null;
};

export default Equation;