const Settings = ({ children, clear }: any) => {
    return (
        <div className="bg-gray-300 flex w-[500px] text-md border-8 py-1 box-content rounded-xl border-gray-300 mt-8 shadow-sm">
            <div className="px-3 flex w-full justify-between items-center">
                {children}
                <button 
                    className="px-3 h-min py-1 rounded-lg text-red-400 font-medium hover:bg-red-400 hover:text-white"
                    onClick={clear}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default Settings;