import React from "react";
import { Layout } from "../../layouts/Layout";
import { EventDetailsContent } from "../../components/events/EventDetailsContent";
import { useParams } from "react-router-dom";
export const EventDetails = () => {
  const { id } = useParams();

  return (
    <Layout>
      <EventDetailsContent conatctId={id} />
    </Layout>
  );
};
