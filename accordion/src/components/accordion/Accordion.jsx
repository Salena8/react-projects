import React, { useState } from "react";
import data from "./data";

const Accordion = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentid) {
    setSelected((prev) => (prev === getCurrentid ? null : getCurrentid));
  }

  function handleMultiSelection(getCurrentid){
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentid);

    console.log(findIndexOfCurrentId);
    if(findIndexOfCurrentId === -1) copyMultiple.push(getCurrentid);
    else copyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(copyMultiple);
  }
  return (
    <>
      <div className="bg-gray-950 w-full h-screen flex flex-col gap-3 justify-center items-center gap-3 text-white">
        <button
          className="px-2 py-1 bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-500"
          onClick={() => setEnableMultiSelection(!enableMultiSelection)}
        >
          enable multiple selection
        </button>
        <div className="w-[500px] h-auto">
          {data && data.length > 0 ? (
            data.map((dataItem) => (
              <div
                className="py-4 px-2.5 mb-2.5 bg-gray-800  "
                key={dataItem.id}
              >
                <div
                  className="flex justify-between items-center cursor-pointer "
                  onClick={
                    enableMultiSelection
                      ? () => handleMultiSelection(dataItem.id)
                      : () => handleSingleSelection(dataItem.id)
                  }
                >
                  <h3>{dataItem.question}</h3>
                  <span>{selected === dataItem.id ? "-" : "+"}</span>
                </div>
                {selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                <div>{dataItem.answer}</div> 
                : null}
              </div>
            ))
          ) : (
            <div>No data found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Accordion;
