import { useCallback, useState } from "react";
import { InitialValueType, ReturnValueType } from "../types";

const useHistoryState: <T>(
  initialValue: InitialValueType<T>
) => ReturnValueType<T> = <T>(initialValue: InitialValueType<T>) => {
  const [drawings, _setDrawings] = useState<T>(initialValue);
  const [history, setHistory] = useState<InitialValueType<T>[]>(
    initialValue !== undefined && initialValue !== null ? [initialValue] : []
  );
  const [pointer, setPointer] = useState<number>(
    initialValue !== undefined && initialValue !== null ? 0 : -1
  );

  const setDrawings: (value: InitialValueType<T>) => void = useCallback(
    (value: InitialValueType<T>) => {
      let valueToAdd = value;
      if (typeof value === "function") {
        valueToAdd = (value as (prev?: T) => T)(drawings);
      }
      setHistory((prev) => [...prev.slice(0, pointer + 1), valueToAdd]);
      setPointer((prev) => prev + 1);
      _setDrawings(value);
    },
    [setHistory, setPointer, _setDrawings, drawings, pointer]
  );

  const undo: () => void = useCallback(() => {
    if (pointer <= 0) return;
    _setDrawings(history[pointer - 1]);
    setPointer((prev) => prev - 1);
  }, [history, pointer, setPointer]);

  const redo: () => void = useCallback(() => {
    if (pointer + 1 >= history.length) return;
    _setDrawings(history[pointer + 1]);
    setPointer((prev) => prev + 1);
  }, [pointer, history, setPointer]);

  return [drawings, setDrawings, _setDrawings, undo, redo];
};

export default useHistoryState;
