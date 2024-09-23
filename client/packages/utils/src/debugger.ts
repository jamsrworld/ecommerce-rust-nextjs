
export const timeDebugger = () => {
  let startTime: Date;
  let endTime: Date;

  return {
    start() {
      startTime = new Date();
    },
    end() {
      endTime = new Date();
      const diff = endTime.getTime() - startTime.getTime();
      console.log({ startTime, endTime, diff: `${diff} milliseconds` });
    },
  };
};
