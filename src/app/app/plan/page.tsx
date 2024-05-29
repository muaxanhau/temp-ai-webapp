"use client";

import "leaflet/dist/leaflet.css";
import { ScreenBaseModel } from "@/models";
import React, { useEffect, useRef } from "react";
import styles from "./page.module.css";
import { ButtonComponent } from "@/components";
import Link from "next/link";
import { useGetItineraryRepo } from "@/repositories";

const Page: ScreenBaseModel = () => {
  const { itinerary, getItinerary, isPending } = useGetItineraryRepo();

  const onClickGenerateItinerary = () => {
    const destination = "Japan";
    const startDate = new Date("2024-05-29");
    const endDate = new Date("2024-06-2");
    const quantity = "alone";
    const travelTypes = ["nature", "mountain"];
    const activities = ["climb", "trekking"];

    getItinerary({
      destination,
      startDate,
      endDate,
      quantity,
      travelTypes,
      activities,
    });
  };

  return (
    <div className={styles.container}>
      <h1>Plan</h1>

      <div className={styles.main}>
        <div className={styles.scheduleContainer}>
          <ButtonComponent
            title="Generate Itinerary"
            type="outline"
            onClick={onClickGenerateItinerary}
            isLoading={isPending}
          />

          {itinerary?.schedule.map((item, i) => (
            <div key={i.toString()} className={styles.scheduleWrapper}>
              <h4>{item.locationName}</h4>
              <p>Day: {item.day}</p>
              <p>Time: {item.time}</p>
              <p>Note: {item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
