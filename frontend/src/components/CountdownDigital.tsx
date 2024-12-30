import type React from "react";
import { MILLIS_SECOND, SECONDS_MINUTE, MINUTES_HOUR, HOURS_DAY } from "utils/utilTypes";
import { useEffect, useMemo, useState } from "react";

const FULL_COUNTER_DAYS = 60; //Reference number of days for countdown progress circle
const FULL_PERCENTAGE = 100;
const REFRESH_RATE = 30; //in seconds

interface ProgressCircleProps {
  sqSize: "xs" | "s" | "m" | "l" | "xl";
  percentage: number;
}

const sizeMap = {
  xs: 20,
  s: 80,
  m: 140,
  l: 200,
  xl: 260,
};

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  sqSize,
  percentage

}) => {
  const size = sizeMap[sqSize];
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / FULL_PERCENTAGE;

  return (
    <svg width={size} height={size} viewBox={viewBox}>
            <circle
            className="fill-none stroke-gray-200"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={`${strokeWidth / 2}px`} />
            <circle
              className="fill-none stroke-cyan-600 transition-all delay-200 ease-in"
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeLinecap="round"
              strokeWidth={`${strokeWidth}px`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset,
              }} />
          </svg>
  );
};

interface DateParams {
  days: number,
  hours: number,
  minutes: number
}

const computeTimeDiff = (fromDate: Date, toDate: Date): DateParams => {
  const timeDiff = toDate.getTime() - fromDate.getTime();

  const days = Math.floor(
    (timeDiff) / (MILLIS_SECOND * SECONDS_MINUTE * MINUTES_HOUR * HOURS_DAY),
  );
  const hours = Math.floor(
    ((timeDiff) % (MILLIS_SECOND * SECONDS_MINUTE * MINUTES_HOUR * HOURS_DAY)) /
      (MILLIS_SECOND * SECONDS_MINUTE * MINUTES_HOUR),
  );
  const minutes = Math.floor(
    ((timeDiff) % (MILLIS_SECOND * SECONDS_MINUTE * MINUTES_HOUR)) / (MILLIS_SECOND * SECONDS_MINUTE),
  );

  return { days, hours, minutes };
};

interface CountdownDigitalProps {
  date: Date;
  title?: string;
}

const CountdownDigital: React.FC<CountdownDigitalProps> = ({
  date,
}) => {
  const currentTime = new Date();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, MILLIS_SECOND * REFRESH_RATE);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const countdownInfo = useMemo(() => computeTimeDiff(currentTime, date), [count]);
  const percentageDays = ((FULL_COUNTER_DAYS-countdownInfo.days)/FULL_COUNTER_DAYS)*FULL_PERCENTAGE;
  const percentageHours = ((HOURS_DAY-countdownInfo.hours)/HOURS_DAY)*FULL_PERCENTAGE;
  const percentageMins = ((MINUTES_HOUR-countdownInfo.minutes)/MINUTES_HOUR)*FULL_PERCENTAGE;

  const counterSize = "m";
  const widgetData = [
    [percentageDays, countdownInfo.days, "Days"],
    [percentageHours, countdownInfo.hours, "Hours"],
    [percentageMins, countdownInfo.minutes, "Mins"]
  ];


  return (
    <div className={`flex flex-row max-w-max justify-evenly gap-8`}>
        {
          widgetData.map((data, index)=>(
            <div className="relative" key={index}>
                {ProgressCircle({sqSize: counterSize, percentage: Number(data[0])})}

                <div className={`absolute top-${sizeMap[counterSize] / 2} left-${sizeMap[counterSize] / 2} top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center`}>
                  <span className={`font-bold text-3xl`}>{data[1]}</span>
                  <span className={`block text-l`}>{data[2]}</span>
                </div>
            </div>
          ))
        }
    </div>
  );
};

export default CountdownDigital;
