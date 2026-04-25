import React from "react";
import { getMosiSessions } from "@/app/actions/mosi";
import ScheduleClient from "./ScheduleClient";

export default async function MosiSchedulePage() {
  const sessions = await getMosiSessions();

  return (
    <ScheduleClient initialSessions={sessions} />
  );
}
