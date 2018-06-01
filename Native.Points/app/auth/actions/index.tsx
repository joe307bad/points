export const DATA_AVAILABLE: string = "DATA_AVAILABLE";

const Data = {
    "instructions": "data"
};

export function getData(): (dispatch: any) => void {
    return (dispatch: any) => {
        setTimeout(() => {
            const data: string = Data.instructions;
            dispatch({ type: DATA_AVAILABLE, data: data });
        }, 2000);

    };
}