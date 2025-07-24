import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Fact } from "../types/Fact";
import CountUp from "react-countup";

export default function Result() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<Fact | null>(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const number = searchParams.get("number");
    const type = searchParams.get("type");
    const month = searchParams.get("month");
    const day = searchParams.get("day");

    let url = "";

    if (type === "math" || type === "year") {
      url = `http://numbersapi.com/${number}/${type}?json`;
    } else if (type === "date" && month && day) {
      url = `http://numbersapi.com/${month}/${day}/date?json`;
    } else {
      url = `http://numbersapi.com/${number}?json`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Xatolik:", err));
  }, [searchParams]);
  return (
    <div className="p-4">
      {data ? (
        <div className="border lg:w-1/3 md:w-3/5 w-full mx-auto text-center space-y-6 p-4 mt-10 rounded-lg">
          <div className="flex justify-center">
            {data ? (
              <CountUp
                end={data?.number}
                className="text-[160px]"
                duration={2}
                separator=""
                key={data?.number}
                onStart={() => { setShowText(false) }}
                onEnd={() => { setShowText(true) }}
              />
            ) : (
              <div className="h-[160px] w-[160px] bg-gray-300 rounded animate-pulse" />
            )}
          </div>

          {showText ? (
            <p className="text-xl">{data?.text}</p>
          ) : (
            <div className="space-y-2">
              <div className="h-6 w-full bg-gray-300 mx-auto rounded animate-pulse"></div>
              <div className="h-6 w-5/6 bg-gray-300 mx-auto rounded animate-pulse"></div>
              <div className="h-6 w-2/3 bg-gray-300 mx-auto rounded animate-pulse"></div>
            </div>
          )}
        </div>

      ) : (
        <div className="border w-1/3 mx-auto text-center space-y-6 p-4 mt-10">
          <div className="flex justify-center"><p className="text-[160px]">0</p></div>
          <p className="text-xl">0 is the atomic number of the theoretical element tetraneutron.</p>
        </div>
      )}
    </div>
  );
}
