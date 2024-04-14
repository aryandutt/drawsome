import { stringify } from 'flatted';
import checkPointOnDrawing from './checkPointOnDrawing';
import { DrawingsElement, InitialValueType } from './types';

const erase = (
    x1: number,
    y1: number,
    drawings: DrawingsElement[],
    setDrawings: (value: InitialValueType<DrawingsElement[]>) => void
) => {
    const erasedDrawings = drawings.filter(
        (drawing) => !checkPointOnDrawing(drawing, x1, y1)
    );

    if (erasedDrawings.length !== drawings.length) {
        setDrawings(erasedDrawings);
        localStorage.setItem('drawings', stringify(erasedDrawings));
    }
};

export default erase;
