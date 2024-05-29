"use client";
import { AiOutlineCheck, AiOutlineLeft } from "react-icons/ai";
import { ScreenBaseModel, TReference } from "@/models";
import { Button, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { RefferenceContainer, RefferenceItemStyled } from "./styled";
import TextArea from "antd/es/input/TextArea";
import {
  useGetItineraryRefRepo,
  useGetReferences,
} from "@/repositories/refference/useReferrence";
import { useLandingPageStore } from "@/stores";

const Page: ScreenBaseModel = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [refferenceList, setRefferenceList] = useState<TReference[]>([]);
  const { startDate, endDate, destination } = useLandingPageStore();
  const { data, isLoading } = useGetReferences();
  const { getItinerary, isPending, itinerary } = useGetItineraryRefRepo();

  useEffect(() => {
    if (data?.references?.length) {
      setRefferenceList(data.references);
    }
  }, [data?.references]);

  const handleChangeRefference = (data: TReference) => {
    const newRefferenceList = refferenceList.map((item) => {
      if (item.id === data.id) {
        return data;
      }
      return item;
    });
    setRefferenceList(newRefferenceList);
  };

  useEffect(() => {
    const getItineraryRes = async () => {
      if (
        refferenceList[refferenceList.length - 1]?.suggestions.find(
          (item) => item.selected
        )
      ) {
        const referenceReq = refferenceList.reduce((acc, item) => {
          acc[item.type] = item.suggestions
            .filter((suggestion) => suggestion.selected)
            .map((suggestion) => suggestion.value);
          return acc;
        }, {} as any);
        const dataReq = {
          destination,
          startDate,
          endDate,
          ...referenceReq,
        };
        await getItinerary({
          ...dataReq,
          member: dataReq?.member?.[0] || "",
        });
      }
    };
    getItineraryRes();
  }, [refferenceList]);

  return (
    <RefferenceContainer>
      <div className="refference-navbar"></div>
      <RefferenceItemStyled>
        <h1>Reference</h1>
        {isLoading ? (
          <div className="chat-box-container">
            <Skeleton active />
          </div>
        ) : (
          <div className="chat-box-container">
            {data?.greetings && <p>{data?.greetings}</p>}
            {data?.references.map((item, index) => {
              if (index > currentQuestion) return null;
              return (
                <RefferenceItem
                  key={item.id}
                  isActive={index === currentQuestion}
                  data={item}
                  onBackStep={
                    index === currentQuestion && index > 0
                      ? () => setCurrentQuestion(index - 1)
                      : undefined
                  }
                  onSubmit={(refData) => {
                    setCurrentQuestion(index + 1);
                    handleChangeRefference(refData);
                  }}
                />
              );
            })}

            {isPending ? (
              <Skeleton active />
            ) : (
              <div>
                {itinerary?.schedule ? (
                  <>
                    <h2>Schedule:</h2>
                    {itinerary.schedule.map((item, i) => (
                      <div key={i.toString()}>
                        <h3 style={{ margin: "10px 0" }}>Day {item.day}:</h3>
                        {item.locations.map((location, j) => (
                          <div key={j.toString()} style={{ margin: "10px 0" }}>
                            <h4>{location.locationName}</h4>
                            <p>Time: {location.time}</p>
                            <p>Note: {location.note}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}
                {itinerary?.accommodations ? (
                  <>
                    <h2>Accommodations:</h2>
                    {itinerary.accommodations.map((item, i) => (
                      <div key={i.toString()} style={{ margin: "10px 0" }}>
                        <p style={{ fontWeight: "bold" }}>
                          Hotel: {item.accommodationName}
                        </p>
                        <p>Description: {item.description}</p>
                        {/* <p>
                          Booking link:{" "}
                          <a
                            style={{ color: "blue" }}
                            href={item.link}
                            target="_blank"
                          >
                            {" "}
                            {item.link}
                          </a>
                        </p> */}
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        )}
        <div>
          <TextArea
            placeholder="Aa"
            rows={1}
            autoSize={{ minRows: 1, maxRows: 6 }}
          />
        </div>
      </RefferenceItemStyled>
    </RefferenceContainer>
  );
};

type TRefferenceItem = {
  data: TReference;
  isActive: boolean;
  onBackStep: (() => void) | undefined;
  onSubmit: (data: TReference) => void;
};

const RefferenceItem = ({
  data,
  isActive,
  onSubmit,
  onBackStep,
}: TRefferenceItem) => {
  const [refferenceTemp, setReferrenceTemp] = useState(
    data?.suggestions?.map((item) => ({
      ...item,
      selected: false,
    })) || []
  );

  useEffect(() => {
    if (data?.suggestions)
      setReferrenceTemp(
        data?.suggestions?.map((item) => ({
          ...item,
          selected: false,
        })) || []
      );
  }, [data?.suggestions]);

  return (
    <div className="refference-item">
      <p>
        {onBackStep && (
          <Button type="text" onClick={onBackStep} icon={<AiOutlineLeft />} />
        )}
        {data.question}
      </p>
      <div className="actions-container">
        {refferenceTemp.map((item) => {
          return (
            <Button
              className={item.selected ? "active" : ""}
              key={item.id}
              onClick={() => {
                if (isActive) {
                  const newRefferenceTemp = refferenceTemp.map((ref) => {
                    if (ref.id === item.id) {
                      return { ...item, selected: !ref.selected };
                    }
                    return ref;
                  });
                  setReferrenceTemp(newRefferenceTemp);
                  onSubmit({ ...data, suggestions: newRefferenceTemp });
                }
              }}
            >
              {item.value}
            </Button>
          );
        })}
        {refferenceTemp.filter((item) => item.selected).length > 0 &&
          isActive && (
            <Button
              className="confirm-btn"
              onClick={() => {
                if (isActive)
                  onSubmit({ ...data, suggestions: refferenceTemp });
              }}
            >
              <AiOutlineCheck />
            </Button>
          )}
      </div>
    </div>
  );
};

export default Page;
