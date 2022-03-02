import { useEffect, useRef } from "react";

export function useInterval<C extends CallableFunction>(callback: C, delay: number | null) {
  const savedCallBack = useRef<C>();

  // remember latest callback.
  useEffect(() => {
    savedCallBack.current = callback;
  }, [callback]);

  // Set up interval.
  useEffect(() => {
    function tick() {
      if (savedCallBack.current) return savedCallBack.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
